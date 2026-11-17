import { useState } from "react";
import { ArrowRight, Search, Sparkles, Sprout, X } from "lucide-react";
import { INTERESTS, rankCareers } from "../data/careers";
import { CareerCard, EmptyState, PageHeading } from "../components/ui";
export function ExplorePage({ profile, navigate, onOpen }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All paths");
  const ranked = rankCareers(profile);
  const visible = ranked.filter(
    (career) =>
      (category === "All paths" || career.category === category) &&
      `${career.title} ${career.description} ${career.skills.join(" ")} ${career.category}`
        .toLowerCase()
        .includes(search.toLowerCase().trim()),
  );
  return (
    <section className="workspace section">
      <PageHeading
        eyebrow="SIX STARTING POINTS. ENDLESS POSSIBILITIES."
        title={
          profile.assessed
            ? "A few doors worth opening."
            : "Your future has options."
        }
        text={
          profile.assessed
            ? `Based on your interests and answers${profile.name ? `, ${profile.name.split(" ")[0]}` : ""}, these paths could be worth trying. They’re invitations to explore, and you can change direction anytime.`
            : "Get curious about what people do, the skills they use, and the small steps that could get you started."
        }
      />
      <div className="discovery-prompt">
        {profile.assessed ? <Sprout size={23} /> : <Sparkles size={23} />}
        <p>
          {profile.assessed
            ? "“Interest fit” means your selections connect with this path. Explore freely."
            : "Not sure where to begin? Start with what makes you curious."}
        </p>
        <button className="text-button" onClick={() => navigate("discover")}>
          {profile.assessed ? "Retake the questions" : "Find my direction"}
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="explore-controls">
        <label className="search-field">
          <Search size={20} />
          <input
            aria-label="Search careers"
            placeholder="Search a career, interest, or skill…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button
              className="icon-button"
              aria-label="Clear search"
              onClick={() => setSearch("")}
            >
              <X size={17} />
            </button>
          )}
        </label>
        <span className="result-count" role="status">
          {visible.length} {visible.length === 1 ? "path" : "paths"} to explore
        </span>
      </div>
      <div className="filter-row" aria-label="Filter careers">
        {["All paths", ...INTERESTS].map((item) => (
          <button
            key={item}
            className={category === item ? "selected" : ""}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="career-grid">
        {visible.map((career) => (
          <CareerCard
            key={career.id}
            career={career}
            saved={profile.goal === career.id}
            recommended={
              profile.assessed &&
              career.score > 0 &&
              ranked.findIndex((item) => item.id === career.id) < 3
            }
            onOpen={() => onOpen(career)}
          />
        ))}
      </div>
      {!visible.length && (
        <EmptyState
          icon={<Search size={33} />}
          title="A different search might open a door."
          text="Try another interest or skill, or clear your filters to see every path."
          action="Show all careers"
          onClick={() => {
            setCategory("All paths");
            setSearch("");
          }}
        />
      )}
    </section>
  );
}
