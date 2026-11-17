import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Code2,
  PenTool,
  Sprout,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { CAREERS } from "../data/careers";
import { Button, CareerCard } from "../components/ui";
export function LandingPage({ navigate, onOpen, profile }) {
  return (
    <>
      <section className="hero grid-paper">
        <div className="hero-copy">
          <span className="label">
            <span className="tiny-dot" /> A BIG FUTURE STARTS WITH A LITTLE
            CURIOSITY
          </span>
          <h1>
            You don’t need
            <br />
            all the answers.
            <br />
            <em>Just a direction.</em>
          </h1>
          <p>
            Discover what moves you, explore what’s possible, and take your
            first real steps toward a career that feels like you.
          </p>
          <div className="button-row">
            <Button variant="coral" onClick={() => navigate("discover")}>
              Find my direction <ArrowUpRight size={20} />
            </Button>
            <Button variant="outline" onClick={() => navigate("explore")}>
              Explore careers <ArrowRight size={19} />
            </Button>
          </div>
          <span className="hero-note">
            <Check size={15} /> Free to explore. No account needed. Your pace.
          </span>
        </div>
        <div
          className="possibility-board"
          aria-label="Explore your possibilities"
        >
          <div className="board-grid" aria-hidden="true" />
          <span className="board-kicker">
            THE FUTURE ISN’T ONE SIZE FITS ALL.
          </span>
          <div className="future-label">
            Your next
            <br />
            <i>chapter.</i>
            <Sparkles size={35} strokeWidth={1} />
          </div>
          <button
            className="collage-card collage-code"
            onClick={() => onOpen(CAREERS[0])}
          >
            <span>
              <Code2 size={25} /> THE BUILDER
            </span>
            <strong>
              Make things
              <br />
              that matter.
            </strong>
            <small>
              Explore technology <ArrowUpRight size={17} />
            </small>
            <div className="code-lines" aria-hidden="true">
              &lt;your_idea&gt;
              <br />
              &nbsp; hello, world.
              <br />
              &lt;/your_idea&gt;
            </div>
          </button>
          <button
            className="collage-card collage-design"
            onClick={() => onOpen(CAREERS[1])}
          >
            <span>
              <PenTool size={22} /> THE CREATOR
            </span>
            <div className="design-shapes" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <strong>See it differently.</strong>
            <small>
              Explore design <ArrowUpRight size={17} />
            </small>
          </button>
          <button
            className="collage-card collage-impact"
            onClick={() => onOpen(CAREERS[5])}
          >
            <Sprout size={42} strokeWidth={1.3} />
            <div>
              <span>THE CHANGEMAKER</span>
              <strong>
                A little you.
                <br />A lot of possibility.
              </strong>
            </div>
            <ArrowUpRight size={24} />
          </button>
          <span className="sticker" aria-hidden="true">
            start
            <br />
            somewhere<span>↗</span>
          </span>
        </div>
      </section>
      <div className="belief-strip">
        <span>LESS “WHAT SHOULD I BE?”</span>
        <span className="strip-star">✳</span>
        <span>MORE “WHAT COULD I TRY?”</span>
        <button
          onClick={() =>
            document.getElementById("how-it-works")?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            })
          }
        >
          Let’s figure it out <ChevronDown size={17} />
        </button>
      </div>
      <section id="how-it-works" className="section how-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              A LITTLE CLARITY. A LITTLE MOMENTUM.
            </span>
            <h2>Your future, one step at a time.</h2>
          </div>
          <p>
            No perfect plan required.
            <br />
            Just a willingness to explore.
          </p>
        </div>
        <div className="how-grid">
          {[
            [
              "01",
              "Start with you.",
              "A few thoughtful questions to uncover your interests and the work that makes you curious.",
              "Discover my interests",
              "discover",
              "pink",
            ],
            [
              "02",
              "Open a few doors.",
              "Get to know different careers: what people do, what skills help, and how you can try them.",
              "Meet the possibilities",
              "explore",
              "green",
            ],
            [
              "03",
              "Make your first move.",
              "Choose a direction, follow a simple roadmap, and learn something about yourself by doing.",
              "See my roadmap",
              "plan",
              "peach",
            ],
          ].map(([number, title, text, action, route, color]) => (
            <article className={`how-card ${color}`} key={number}>
              <span className="step-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <button className="text-button" onClick={() => navigate(route)}>
                {action}
                <ArrowUpRight size={19} />
              </button>
            </article>
          ))}
        </div>
      </section>
      <section className="section possibilities-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THERE’S MORE THAN ONE WAY FORWARD</span>
            <h2>What sparks your curiosity?</h2>
          </div>
          <button className="text-button" onClick={() => navigate("explore")}>
            See all career paths <ArrowUpRight size={20} />
          </button>
        </div>
        <div className="career-grid home-careers">
          {CAREERS.slice(0, 3).map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              onOpen={() => onOpen(career)}
              saved={profile.goal === career.id}
            />
          ))}
        </div>
      </section>
      <section className="start-banner grid-paper">
        <span className="banner-star" aria-hidden="true">
          ✳
        </span>
        <div>
          <span className="eyebrow">
            YOU’RE ALLOWED TO BE A WORK IN PROGRESS.
          </span>
          <h2>Let’s find your next chapter.</h2>
        </div>
        <Button variant="coral" onClick={() => navigate("discover")}>
          Start with yourself <ArrowUpRight size={20} />
        </Button>
      </section>
    </>
  );
}
