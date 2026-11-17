import { Check } from "lucide-react";
import { INTERESTS } from "../data/careers";
export function ProfileFields({ details, setDetails }) {
  return (
    <>
      <label className="field">
        What should we call you?
        <input
          required
          maxLength={60}
          autoComplete="given-name"
          placeholder="Your first name"
          value={details.name}
          onChange={(event) =>
            setDetails({ ...details, name: event.target.value })
          }
        />
      </label>
      <label className="field">
        Where are you in your journey?
        <select
          value={details.stage}
          onChange={(event) =>
            setDetails({ ...details, stage: event.target.value })
          }
        >
          {[
            "School student",
            "College student",
            "Recent graduate",
            "Exploring my options",
          ].map((stage) => (
            <option key={stage}>{stage}</option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend>What are you curious about?</legend>
        <p className="field-help">
          Pick one or more. It’s okay if you’re still figuring it out.
        </p>
        <div className="interest-picker">
          {INTERESTS.map((interest) => (
            <button
              type="button"
              key={interest}
              aria-pressed={details.interests.includes(interest)}
              className={details.interests.includes(interest) ? "selected" : ""}
              onClick={() =>
                setDetails({
                  ...details,
                  interests: details.interests.includes(interest)
                    ? details.interests.filter((item) => item !== interest)
                    : [...details.interests, interest],
                })
              }
            >
              {interest}
              {details.interests.includes(interest) ? (
                <Check size={16} />
              ) : (
                <span aria-hidden="true">+</span>
              )}
            </button>
          ))}
        </div>
      </fieldset>
    </>
  );
}
