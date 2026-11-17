import {
  ArrowUpRight,
  Bookmark,
  Code2,
  PenTool,
  BarChart3,
  Compass,
  MessageCircle,
  Sprout,
  Sparkles,
} from "lucide-react";
const ICONS = {
  code: Code2,
  pen: PenTool,
  chart: BarChart3,
  compass: Compass,
  message: MessageCircle,
  sprout: Sprout,
};
export function CareerIcon({ career, size = 25 }) {
  const Icon = ICONS[career.icon];
  return <Icon size={size} strokeWidth={1.5} />;
}
export function Button({ children, variant = "", className = "", ...props }) {
  return (
    <button className={`button ${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
export function PageHeading({ eyebrow, title, text }) {
  return (
    <div className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
export function EmptyState({ icon, title, text, action, onClick }) {
  return (
    <div className="empty-state grid-paper">
      {icon}
      <h2>{title}</h2>
      <p>{text}</p>
      <Button variant="coral" onClick={onClick}>
        {action}
        <ArrowUpRight size={18} />
      </Button>
    </div>
  );
}
export function CareerCard({ career, saved, recommended, onOpen }) {
  return (
    <article className="career-card">
      <div className={`career-art ${career.color}`}>
        <CareerIcon career={career} size={49} />
        <span className="art-orbit" aria-hidden="true" />
        <span className="eyebrow">{career.category}</span>
        {saved && (
          <span className="saved-badge">
            <Bookmark size={13} fill="currentColor" /> My direction
          </span>
        )}
      </div>
      <div className="career-card-body">
        <div className="card-top">
          <span className="eyebrow">{career.category}</span>
          {recommended && (
            <span className="recommendation">
              <Sparkles size={13} /> Interest fit
            </span>
          )}
        </div>
        <h3>{career.title}</h3>
        <p>{career.tagline}</p>
        <button className="text-button" onClick={onOpen}>
          Explore this path
          <ArrowUpRight size={20} />
        </button>
      </div>
    </article>
  );
}
