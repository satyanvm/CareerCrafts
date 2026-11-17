import { ACTIVITIES, CAREERS, INTERESTS, QUESTIONS } from "./careers.js";
export const STORAGE_KEY = "careercrafts.progress.v1";
export const EMPTY_PROGRESS = {
  name: "",
  stage: "College student",
  interests: [],
  answers: [],
  assessed: false,
  goal: null,
  completedSteps: [],
  reflections: {},
};
export function readProgress(storage) {
  try {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return { ...EMPTY_PROGRESS };
    const answers = Array.isArray(saved.answers) ? saved.answers : [];
    const validAnswers =
      answers.length === QUESTIONS.length &&
      answers.every(
        (answer, index) =>
          Number.isInteger(answer) && Boolean(QUESTIONS[index].options[answer]),
      );
    return {
      name: typeof saved.name === "string" ? saved.name.slice(0, 60) : "",
      stage: [
        "School student",
        "College student",
        "Recent graduate",
        "Exploring my options",
      ].includes(saved.stage)
        ? saved.stage
        : EMPTY_PROGRESS.stage,
      interests: Array.isArray(saved.interests)
        ? saved.interests.filter((item) => INTERESTS.includes(item))
        : [],
      answers: validAnswers ? answers : [],
      assessed: saved.assessed === true && validAnswers,
      goal: CAREERS.some((career) => career.id === saved.goal)
        ? saved.goal
        : null,
      completedSteps: Array.isArray(saved.completedSteps)
        ? [
            ...new Set(
              saved.completedSteps.filter((id) =>
                CAREERS.some((career) =>
                  career.steps.some(
                    (_, index) => id === `${career.id}-${index}`,
                  ),
                ),
              ),
            ),
          ]
        : [],
      reflections: Object.fromEntries(
        ACTIVITIES.filter(
          (activity) => typeof saved.reflections?.[activity.id] === "string",
        ).map((activity) => [
          activity.id,
          saved.reflections[activity.id].slice(0, 2000),
        ]),
      ),
    };
  } catch {
    return { ...EMPTY_PROGRESS };
  }
}
export function toggleStep(completedSteps, id) {
  return completedSteps.includes(id)
    ? completedSteps.filter((step) => step !== id)
    : [...completedSteps, id];
}
export function createPlanText(profile) {
  const goal = CAREERS.find((career) => career.id === profile.goal);
  return [
    "# My CareerCrafts plan",
    "",
    `Name: ${profile.name || "Career explorer"}`,
    `Stage: ${profile.stage}`,
    `Interests: ${profile.interests.join(", ") || "Still exploring"}`,
    "",
    `## Career to explore: ${goal?.title || "Not chosen yet"}`,
    "",
    ...(goal
      ? goal.steps.flatMap((step, index) => [
          `- [${profile.completedSteps.includes(`${goal.id}-${index}`) ? "x" : " "}] ${step.title} (${step.time})`,
          `  ${step.task}`,
        ])
      : ["Explore careers at CareerCrafts to choose a direction."]),
    ...(goal
      ? ["", `Learning resource: ${goal.resource.title}`, goal.resource.url]
      : []),
    "",
    "## My reflections",
    "",
    ...ACTIVITIES.filter(
      (activity) => profile.reflections[activity.id],
    ).flatMap((activity) => [
      `### ${activity.title}`,
      profile.reflections[activity.id],
      "",
    ]),
    "A starting point for exploration. Your interests can grow and change.",
  ].join("\n");
}
