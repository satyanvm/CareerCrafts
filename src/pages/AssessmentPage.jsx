import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Check, Sprout } from "lucide-react";
import { QUESTIONS } from "../data/careers";
import { Button } from "../components/ui";
import { ProfileFields } from "../components/ProfileFields";
export function AssessmentPage({ profile, onFinish, onExit }) {
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState({
    name: profile.name,
    stage: profile.stage,
    interests: [...profile.interests],
    answers: [...profile.answers],
  });
  const [error, setError] = useState("");
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);
  const next = (event) => {
    event.preventDefault();
    if (step === 0 && (!details.name.trim() || !details.interests.length)) {
      setError("Add your name and choose at least one interest to continue.");
      return;
    }
    if (step > 0 && details.answers[step - 1] === undefined) {
      setError("Choose the option that feels closest to you.");
      return;
    }
    setError("");
    if (step === QUESTIONS.length)
      onFinish({ ...details, name: details.name.trim() });
    else setStep(step + 1);
  };
  return (
    <section className="assessment-page grid-paper">
      <div className="assessment-top">
        <button className="text-button" onClick={onExit}>
          <ArrowLeft size={18} />
          Back to home
        </button>
        <span className="eyebrow">A FEW MINUTES. A FRESH PERSPECTIVE.</span>
      </div>
      <div className="assessment-layout">
        <aside>
          <span className="eyebrow">LET’S START WITH YOU</span>
          <h1>
            Good things <br />
            begin with <br />
            <em>curiosity.</em>
          </h1>
          <p>
            No right answers. No boxes to fit into. Just a little space to think
            about what you enjoy.
          </p>
          <Sprout size={79} strokeWidth={1} />
        </aside>
        <div className="assessment-card">
          <div className="assessment-progress">
            {[
              "About you",
              "How you think",
              "What matters",
              "What you’d try",
            ].map((label, index) => (
              <div key={label} className={step >= index ? "active" : ""}>
                <span>{index < step ? <Check size={14} /> : index + 1}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
          <form onSubmit={next}>
            <span className="eyebrow">STEP {step + 1} OF 4</span>
            <h2 ref={headingRef} tabIndex={-1}>
              {step === 0
                ? "A little introduction."
                : QUESTIONS[step - 1].title}
            </h2>
            {step === 0 ? (
              <ProfileFields details={details} setDetails={setDetails} />
            ) : (
              <fieldset className="question-options">
                <legend className="sr-only">{QUESTIONS[step - 1].title}</legend>
                {QUESTIONS[step - 1].options.map((option, index) => (
                  <label
                    key={option.text}
                    className={
                      details.answers[step - 1] === index ? "chosen" : ""
                    }
                  >
                    <input
                      type="radio"
                      name={`question-${step}`}
                      value={index}
                      checked={details.answers[step - 1] === index}
                      onChange={() => {
                        const answers = [...details.answers];
                        answers[step - 1] = index;
                        setDetails({ ...details, answers });
                        setError("");
                      }}
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </fieldset>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="assessment-buttons">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setStep(step - 1);
                    setError("");
                  }}
                >
                  <ArrowLeft size={17} />
                  Back
                </Button>
              )}
              <Button type="submit" variant="coral">
                {step === 3 ? "Meet my possibilities" : "Keep going"}
                <ArrowRight size={18} />
              </Button>
            </div>
            <p className="fine-print">
              Saved in this browser when you finish. You can revisit your
              answers anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
