import { useState } from "react";
import { ArrowRight, Check, Download, Heart } from "lucide-react";
import { Button, PageHeading } from "../components/ui";
import { ProfileFields } from "../components/ProfileFields";
export function ProfilePage({
  profile,
  onSave,
  onReset,
  onDownload,
  navigate,
}) {
  const [details, setDetails] = useState({
    name: profile.name,
    stage: profile.stage,
    interests: [...profile.interests],
  });
  const [error, setError] = useState("");
  return (
    <section className="workspace section">
      <PageHeading
        eyebrow="YOUR JOURNEY, IN YOUR WORDS"
        title="A little about you."
        text="Your interests can change. Keep your profile in step with the person you’re becoming."
      />
      <div className="profile-layout">
        <form
          className="profile-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!details.name.trim() || !details.interests.length) {
              setError("Add your name and choose at least one interest.");
              return;
            }
            setError("");
            onSave({ ...details, name: details.name.trim() });
          }}
        >
          <ProfileFields details={details} setDetails={setDetails} />
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <Button variant="coral" type="submit">
            Save my profile
            <Check size={17} />
          </Button>
        </form>
        <aside className="profile-aside">
          <div className="pink">
            <Heart size={28} strokeWidth={1.4} />
            <h3>You’re more than a career choice.</h3>
            <p>
              Your answers suggest things to try. They don’t define what you’re
              capable of becoming.
            </p>
            <button
              className="text-button"
              onClick={() => navigate("discover")}
            >
              {profile.assessed
                ? "Revisit my interests"
                : "Discover my interests"}
              <ArrowRight size={18} />
            </button>
          </div>
          <div>
            <h3>Your progress belongs to you.</h3>
            <p>
              Saved on this browser, on this device. Download a copy to keep
              your roadmap and reflections.
            </p>
            <button className="text-button" onClick={onDownload}>
              Download my plan
              <Download size={17} />
            </button>
          </div>
          <div className="reset-section">
            <h3>Ready for a fresh start?</h3>
            <p>Clear your saved profile and progress.</p>
            <button className="text-button danger" onClick={onReset}>
              Clear my progress
              <ArrowRight size={17} />
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
