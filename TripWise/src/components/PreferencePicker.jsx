import { preferences } from "../data/preferences";

export default function PreferencePicker({ selected, onToggle }) {
  return (
    <div className="preference-grid">
      {preferences.map((item) => {
        const active = selected.includes(item.id);
        return (
          <button
            type="button"
            key={item.id}
            className={`preference-card ${active ? "active" : ""}`}
            onClick={() => onToggle(item.id)}
            aria-pressed={active}
          >
            <span className="preference-icon">{item.icon}</span>
            <span className="preference-name">{item.id}</span>
            <span className="preference-description">{item.description}</span>
            <span className="preference-check">{active ? "✓" : "+"}</span>
          </button>
        );
      })}
    </div>
  );
}