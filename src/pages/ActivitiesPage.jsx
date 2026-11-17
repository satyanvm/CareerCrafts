import { ArrowUpRight, CheckCircle2, Sprout } from "lucide-react";
import { ACTIVITIES } from "../data/careers";
import { PageHeading } from "../components/ui";
export function ActivitiesPage({ profile, onOpen }) {
  return (
    <section className="workspace section">
      <PageHeading
        eyebrow="SMALL STEPS, BIG DISCOVERIES"
        title="Learn a little more about you."
        text="A few thoughtful activities to turn “I’m not sure” into “I could try that.” Do them in any order, at your own pace."
      />
      <div className="activity-summary">
        <Sprout size={21} />
        <span>
          {Object.keys(profile.reflections).length} of {ACTIVITIES.length}{" "}
          reflections saved
        </span>
        <span className="muted">Every small step counts.</span>
      </div>
      <div className="activity-grid">
        {ACTIVITIES.map((activity, index) => (
          <article
            className={`activity-card ${activity.color}`}
            key={activity.id}
          >
            <div className="card-top">
              <span className="eyebrow">{activity.category}</span>
              <span>{activity.time}</span>
            </div>
            <span className="activity-number">0{index + 1}</span>
            <h3>{activity.title}</h3>
            <p>{activity.prompt}</p>
            <button className="text-button" onClick={() => onOpen(activity)}>
              {profile.reflections[activity.id]
                ? "View my reflection"
                : "Give it a try"}
              {profile.reflections[activity.id] ? (
                <CheckCircle2 size={19} />
              ) : (
                <ArrowUpRight size={19} />
              )}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
