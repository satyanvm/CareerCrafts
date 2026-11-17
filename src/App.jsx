import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Menu,
  Sprout,
  X,
} from "lucide-react";
import {
  EMPTY_PROGRESS,
  readProgress,
  STORAGE_KEY,
  createPlanText,
} from "./data/progress";
import { Modal } from "./components/Modal";
import { Reflection } from "./components/Reflection";
import { Button, CareerIcon } from "./components/ui";
import { LandingPage } from "./pages/LandingPage";
import { AssessmentPage } from "./pages/AssessmentPage";
import { ExplorePage } from "./pages/ExplorePage";
import { PlanPage } from "./pages/PlanPage";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { ProfilePage } from "./pages/ProfilePage";
const PAGES = ["home", "discover", "explore", "plan", "activities", "profile"];
const pageFromHash = () =>
  PAGES.includes(window.location.hash.slice(1))
    ? window.location.hash.slice(1)
    : "home";
const NAV = [
  ["explore", "Explore careers"],
  ["plan", "My roadmap"],
  ["activities", "Small steps"],
];
export default function App() {
  const [profile, setProfile] = useState(() => {
    try {
      return readProgress(window.localStorage);
    } catch {
      return { ...EMPTY_PROGRESS };
    }
  });
  const [page, setPage] = useState(pageFromHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [storageError, setStorageError] = useState(false);
  const mainRef = useRef(null);
  const mounted = useRef(false);
  useEffect(() => {
    const onHash = () => {
      setPage(pageFromHash());
      setMenuOpen(false);
      setModal(null);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    if (mounted.current) mainRef.current?.focus({ preventScroll: true });
    mounted.current = true;
    document.title = `${{ home: "Find your next chapter", discover: "Discover yourself", explore: "Explore careers", plan: "My roadmap", activities: "Small steps", profile: "My profile" }[page]} · CareerCrafts`;
  }, [page]);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [profile]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const navigate = (next) => {
    window.location.hash = next;
    setMenuOpen(false);
  };
  const onOpen = (career) => setModal({ type: "career", career });
  const chooseGoal = (career) => {
    setProfile((previous) => ({ ...previous, goal: career.id }));
    setModal(null);
    navigate("plan");
    setToast(`${career.title} added to your roadmap.`);
  };
  const downloadPlan = () => {
    const url = URL.createObjectURL(
      new Blob([createPlanText(profile)], {
        type: "text/markdown;charset=utf-8",
      }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "CareerCrafts-my-plan.md";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setToast("Your plan has been downloaded.");
  };
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="CareerCrafts home">
          CareerCrafts<span>✳</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={page === id ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="profile-link" href="#profile">
            <span className="profile-name">
              {profile.name ? profile.name.split(" ")[0] : "My profile"}
            </span>
            <span className="profile-dot">
              {profile.name ? (
                profile.name[0].toUpperCase()
              ) : (
                <Sprout size={17} />
              )}
            </span>
          </a>
          <Button
            variant="nav-cta"
            onClick={() => navigate(profile.assessed ? "plan" : "discover")}
          >
            {profile.assessed ? "My next step" : "Find my direction"}
            <ArrowUpRight size={17} />
          </Button>
          <button
            className="icon-button menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ...NAV,
              ["profile", "My profile"],
              ["discover", "Find my direction"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={page === id ? "page" : undefined}
              >
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main" ref={mainRef} tabIndex={-1}>
        {storageError && (
          <p className="storage-notice" role="alert">
            Your browser couldn’t save your progress. Keep exploring and
            download your plan before leaving.
          </p>
        )}
        {page === "home" && <LandingPage {...{ navigate, onOpen, profile }} />}
        {page === "discover" && (
          <AssessmentPage
            profile={profile}
            onExit={() => navigate("home")}
            onFinish={(details) => {
              setProfile((previous) => ({
                ...previous,
                ...details,
                assessed: true,
              }));
              navigate("explore");
              setToast(
                "Your starting points are ready. Explore what feels right.",
              );
            }}
          />
        )}
        {page === "explore" && (
          <ExplorePage {...{ profile, navigate, onOpen }} />
        )}
        {page === "plan" && (
          <PlanPage {...{ profile, setProfile, navigate, downloadPlan }} />
        )}
        {page === "activities" && (
          <ActivitiesPage
            profile={profile}
            onOpen={(activity) => setModal({ type: "activity", activity })}
          />
        )}
        {page === "profile" && (
          <ProfilePage
            profile={profile}
            onSave={(details) => {
              setProfile((previous) => ({ ...previous, ...details }));
              setToast("Your profile has been saved.");
            }}
            onReset={() => setModal({ type: "reset" })}
            onDownload={downloadPlan}
            navigate={navigate}
          />
        )}
      </main>
      <footer className="site-footer">
        <div>
          <a className="wordmark" href="#home">
            CareerCrafts<span>✳</span>
          </a>
          <p>A little guidance. A world of possibility.</p>
        </div>
        <div className="footer-links">
          <a href="#explore">Explore careers</a>
          <button onClick={() => setModal({ type: "about" })}>
            About the project
          </button>
          <button onClick={() => setModal({ type: "privacy" })}>
            Your data & privacy
          </button>
        </div>
        <span className="footer-note">
          Made for the next chapter.
          <br />© {new Date().getFullYear()} CareerCrafts
        </span>
      </footer>
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={19} />
          <span>{toast}</span>
          <button
            className="icon-button"
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          >
            <X size={17} />
          </button>
        </div>
      )}
      {modal?.type === "career" && (
        <Modal title={modal.career.title} onClose={() => setModal(null)}>
          <div className={`modal-career-icon ${modal.career.color}`}>
            <CareerIcon career={modal.career} size={35} />
          </div>
          <p className="modal-intro">{modal.career.description}</p>
          <h3>A day might look like…</h3>
          <p>{modal.career.day}</p>
          <h3>Skills you’ll explore</h3>
          <div className="tags">
            {modal.career.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <div className="try-box">
            <span className="eyebrow">YOUR FIRST EXPERIMENT</span>
            <h3>{modal.career.steps[0].title}</h3>
            <p>{modal.career.steps[0].task}</p>
          </div>
          <Button variant="coral wide" onClick={() => chooseGoal(modal.career)}>
            {profile.goal === modal.career.id
              ? "View my roadmap"
              : "Make this my direction"}
            <ArrowRight size={19} />
          </Button>
          <p className="fine-print">
            You can explore another direction anytime. Completed steps stay
            saved.
          </p>
        </Modal>
      )}
      {modal?.type === "activity" && (
        <Reflection
          activity={modal.activity}
          saved={profile.reflections[modal.activity.id] || ""}
          onClose={() => setModal(null)}
          onSave={(text) => {
            setProfile((previous) => ({
              ...previous,
              reflections: {
                ...previous.reflections,
                [modal.activity.id]: text,
              },
            }));
            setModal(null);
            setToast("Reflection saved. That’s another small step forward.");
          }}
        />
      )}
      {modal?.type === "reset" && (
        <Modal title="Start a fresh chapter?" onClose={() => setModal(null)}>
          <p>
            This clears your profile, assessment, roadmap progress, and
            reflections from this browser. Download your plan first if you want
            to keep a copy.
          </p>
          <div className="button-row">
            <Button variant="outline" onClick={() => setModal(null)}>
              Keep my progress
            </Button>
            <Button
              variant="coral"
              onClick={() => {
                setProfile({ ...EMPTY_PROGRESS });
                setModal(null);
                navigate("home");
                setToast(
                  "Your progress has been cleared. Ready for a fresh start.",
                );
              }}
            >
              Clear my progress
            </Button>
          </div>
        </Modal>
      )}
      {modal?.type === "privacy" && (
        <Modal
          title="Your journey stays with you."
          onClose={() => setModal(null)}
        >
          <p>
            CareerCrafts saves your profile, answers, chosen career, completed
            steps, and reflections in this browser’s local storage. This MVP has
            no account system or server database.
          </p>
          <p>
            Anyone using the same browser profile can see this progress.
            Clearing browser data removes it, and it won’t sync to another
            device. Download your plan to keep a copy.
          </p>
          <p>
            Learning resource links open third-party websites, which have their
            own privacy practices. CareerCrafts does not send your profile or
            reflections to those sites.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setModal(null);
              navigate("profile");
            }}
          >
            Manage my profile
            <ArrowRight size={18} />
          </Button>
        </Modal>
      )}
      {modal?.type === "about" && (
        <Modal
          title="A little guidance can change a lot."
          onClose={() => setModal(null)}
        >
          <p>
            CareerCrafts helps students discover their interests, explore career
            possibilities, and build confidence through small practical steps.
          </p>
          <p>
            This student MVP uses a simple interest-based assessment.
            Suggestions are starting points for exploration, and don’t measure
            aptitude or guarantee a career outcome.
          </p>
          <h3>The people behind the project</h3>
          <p>
            Aftab Hussain, Mahadev Keshari, Raghav Agarwal, Animesh Jain, Ajeet
            Singh, and Satya Narayan Verma.
          </p>
          <p className="fine-print">
            Developed by Computer Science and Engineering students under the
            guidance of Dr. Dilip Kumar Choubey.
          </p>
        </Modal>
      )}
    </>
  );
}
