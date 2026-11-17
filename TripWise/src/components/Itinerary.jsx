export default function Itinerary({ itinerary }) {
  if (!itinerary) return null;
  return (
    <section className="itinerary-section">
      <div className="section-title"><span className="eyebrow">YOUR DAY-BY-DAY PLAN</span><h2>{itinerary.destination} itinerary</h2><p>A suggested pace you can adjust to your interests and travel time.</p></div>
      <div className="itinerary-list">
        {itinerary.days.map((day) => (
          <article className="itinerary-day" key={day.day}>
            <div className="day-number">DAY <strong>{day.day}</strong></div>
            <div className="day-content"><h3>{day.title}</h3><p>{day.description}</p><div className="activity-list">{day.activities.map((activity) => <span key={activity}>{activity}</span>)}</div></div>
          </article>
        ))}
      </div>
    </section>
  );
}