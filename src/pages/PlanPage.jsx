import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Download,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button, CareerIcon, EmptyState, PageHeading } from "../components/ui";
import { CAREERS } from "../data/careers";
import { toggleStep } from "../data/progress";
export function PlanPage({ profile, setProfile, navigate, downloadPlan }) {
  const goal = CAREERS.find((career) => career.id === profile.goal);
  const completed = goal
    ? goal.steps.filter((_, index) =>
        profile.completedSteps.includes(`${goal.id}-${index}`),
      ).length
    : 0;
  const toggle = (id) =>
    setProfile((previous) => ({
      ...previous,
      completedSteps: toggleStep(previous.completedSteps, id),
    }));
  return (
    <section className="workspace section">
      <PageHeading
        eyebrow="YOUR DIRECTION. YOUR PACE."
        title={
          profile.name
            ? `${profile.name.split(" ")[0]}’s next chapter.`
            : "A little plan. Real possibility."
        }
        text="A career choice can start as an experiment. Choose something to try, then see where it takes you."
      />
      {!goal ? (
        <EmptyState
          icon={<Compass size={40} />}
          title="Every journey starts somewhere."
          text="Pick a career that makes you curious. We’ll turn it into three practical steps you can actually try."
          action="Explore career paths"
          onClick={() => navigate("explore")}
        />
      ) : (
        <>
          <div className={`goal-banner ${goal.color}`}>
            <div className="goal-icon">
              <CareerIcon career={goal} size={37} />
            </div>
            <div>
              <span className="eyebrow">MY CURRENT DIRECTION</span>
              <h2>{goal.title}</h2>
              <p>{goal.tagline}</p>
            </div>
            <button className="text-button" onClick={() => navigate("explore")}>
              Explore another path
              <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="plan-layout">
            <div>
              <div className="progress-heading">
                <h3>Your first three steps</h3>
                <span>{completed} of 3 complete</span>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Roadmap completion"
                aria-valuenow={completed}
                aria-valuemin={0}
                aria-valuemax={3}
              >
                <span style={{ width: `${(completed / 3) * 100}%` }} />
              </div>
              <div className="roadmap-steps">
                {goal.steps.map((step, index) => {
                  const id = `${goal.id}-${index}`;
                  const done = profile.completedSteps.includes(id);
                  return (
                    <article
                      className={`roadmap-step ${done ? "is-complete" : ""}`}
                      key={id}
                    >
                      <button
                        className="step-checkbox"
                        aria-label={`${done ? "Mark incomplete" : "Complete"}: ${step.title}`}
                        aria-pressed={done}
                        onClick={() => toggle(id)}
                      >
                        {done ? <Check size={20} /> : `0${index + 1}`}
                      </button>
                      <div>
                        <span className="eyebrow">
                          STEP {index + 1} · {step.time}
                        </span>
                        <h3>{step.title}</h3>
                        <p>{step.task}</p>
                        <button
                          className="text-button"
                          onClick={() => toggle(id)}
                        >
                          {done ? "Completed · Undo" : "Mark as complete"}
                          <Check size={16} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              {completed === 3 && (
                <div className="completion-note">
                  <Sparkles size={25} />
                  <div>
                    <h3>You turned curiosity into action.</h3>
                    <p>
                      Take a moment to reflect on what you enjoyed. Keep
                      exploring, or build on what you learned.
                    </p>
                    <button
                      className="text-button"
                      onClick={() => navigate("activities")}
                    >
                      Reflect on the experience <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <aside className="plan-aside">
              <span className="eyebrow">A GOOD PLACE TO BEGIN</span>
              <h3>A little learning goes a long way.</h3>
              <p>
                Use this resource alongside your steps. Some providers may ask
                you to create an account.
              </p>
              <a
                className="resource-link"
                href={goal.resource.url}
                target="_blank"
                rel="noreferrer"
              >
                {goal.resource.title}
                <ExternalLink size={18} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <hr />
              <span className="eyebrow">KEEP IT WITH YOU</span>
              <p>
                Download your roadmap and reflections to revisit whenever you
                like.
              </p>
              <Button variant="outline" onClick={downloadPlan}>
                Download my plan <Download size={17} />
              </Button>
            </aside>
          </div>
        </>
      )}
    </section>
  );
}
