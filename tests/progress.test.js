import test from "node:test";
import assert from "node:assert/strict";
import { rankCareers } from "../src/data/careers.js";
import {
  createPlanText,
  EMPTY_PROGRESS,
  readProgress,
  toggleStep,
} from "../src/data/progress.js";
const storage = (value) => ({ getItem: () => value });
test("new and corrupt browser storage starts with a blank student journey", () => {
  for (const value of [null, "invalid json", "null", "42", "{}"]) {
    assert.deepEqual(readProgress(storage(value)), EMPTY_PROGRESS);
  }
  assert.deepEqual(
    readProgress({
      getItem() {
        throw new Error("blocked");
      },
    }),
    EMPTY_PROGRESS,
  );
});
test("saved journeys survive reload with progress and reflections intact", () => {
  const progress = {
    ...EMPTY_PROGRESS,
    name: "Riya",
    interests: ["Design"],
    answers: [1, 1, 1],
    assessed: true,
    goal: "design",
    completedSteps: ["design-0"],
    reflections: { curiosity: "I enjoy sketching and making useful things." },
  };
  assert.deepEqual(readProgress(storage(JSON.stringify(progress))), progress);
});
test("untrusted or outdated saved data cannot create invalid roadmap progress", () => {
  const progress = readProgress(
    storage(
      JSON.stringify({
        name: 42,
        stage: "unknown",
        interests: ["Design", "invalid"],
        answers: [9, 0, 0],
        assessed: true,
        goal: "missing",
        completedSteps: ["design-0", "missing-0", "design-0"],
        reflections: {
          curiosity: "A reflection",
          unknown: "not a real activity",
        },
      }),
    ),
  );
  assert.equal(progress.name, "");
  assert.equal(progress.stage, "College student");
  assert.deepEqual(progress.interests, ["Design"]);
  assert.equal(progress.assessed, false);
  assert.deepEqual(progress.answers, []);
  assert.equal(progress.goal, null);
  assert.deepEqual(progress.completedSteps, ["design-0"]);
  assert.deepEqual(progress.reflections, { curiosity: "A reflection" });
});
test("assessment answers change the career order while preserving every option", () => {
  const design = rankCareers({ interests: ["Design"], answers: [1, 1, 1] });
  const impact = rankCareers({
    interests: ["Social impact"],
    answers: [3, 3, 3],
  });
  assert.equal(design[0].id, "design");
  assert.equal(impact[0].id, "impact");
  assert.equal(design.length, 6);
  assert.equal(impact.length, 6);
  assert.equal(new Set(design.map((career) => career.id)).size, 6);
});
test("roadmap completion is reversible and stays specific to each career", () => {
  const original = ["frontend-0"];
  const completed = toggleStep(original, "design-0");
  assert.deepEqual(completed, ["frontend-0", "design-0"]);
  assert.deepEqual(toggleStep(completed, "design-0"), original);
  assert.deepEqual(original, ["frontend-0"]);
});
test("download includes the chosen roadmap, completion state, resources, and saved reflections", () => {
  const text = createPlanText({
    ...EMPTY_PROGRESS,
    name: "Riya",
    goal: "design",
    completedSteps: ["design-0"],
    reflections: { curiosity: "I enjoy making things." },
  });
  assert.match(text, /CareerCrafts/);
  assert.match(text, /Riya/);
  assert.match(text, /Product designer/);
  assert.match(text, /\[x\] Notice a real problem/);
  assert.match(text, /\[ \] Sketch a better experience/);
  assert.match(text, /https:\/\/www.figma.com/);
  assert.match(text, /I enjoy making things/);
  assert.match(createPlanText(EMPTY_PROGRESS), /Not chosen yet/);
});
