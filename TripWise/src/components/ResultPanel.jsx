const money = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;

function DestinationCard({ destination, onReview }) {
  return (
    <article className="destination-result">
      <div className="destination-result-image" style={{ backgroundImage: `linear-gradient(0deg, rgba(10,35,25,.65), transparent 70%), url("${destination.image}")` }}>
        <span className="match-pill">{destination.matchScore}% match</span>
        <div><span>{destination.state}</span><h3>{destination.name}</h3></div>
      </div>
      <div className="destination-result-body">
        <p className="destination-summary">{destination.summary}</p>
        <div className="cost-total"><span>Estimated trip total</span><strong>{money(destination.estimatedTotal)}</strong></div>
        <div className="cost-breakdown">
          <div><span>Travel</span><strong>{money(destination.costs.transport)}</strong></div>
          <div><span>Stay</span><strong>{money(destination.costs.accommodation)}</strong></div>
          <div><span>Food</span><strong>{money(destination.costs.food)}</strong></div>
          <div><span>Activities</span><strong>{money(destination.costs.activities)}</strong></div>
        </div>
        <div className="stay-block">
          <h4>Average accommodation</h4>
          <div className="stay-options">
            {destination.accommodation.map((item) => <div key={item.type}><span>{item.type}</span><strong>{item.priceRange}</strong><small>{item.capacity}</small></div>)}
          </div>
        </div>
        <div className="transport-block">
          <h4>Transport options</h4>
          <div className="transport-tags">{destination.transport.map((item) => <span key={item.mode}>{item.mode}: {item.priceRange}</span>)}</div>
        </div>
        <div className="destination-actions">
          <a href={destination.mapUrl} target="_blank" rel="noreferrer">View on map ↗</a>
          <button type="button" onClick={() => onReview(destination)}>Read / add reviews</button>
        </div>
      </div>
    </article>
  );
}

export default function ResultPanel({ result, onReview }) {
  if (!result) return null;
  return (
    <section className="results-section" id="results">
      <div className="results-heading">
        <div><span className="eyebrow">YOUR TRIPWISE SHORTLIST</span><h2>Places that fit your plan.</h2><p>{result.message}</p></div>
        <div className="budget-summary"><span>Your budget</span><strong>{money(result.input.budget)}</strong><small>{result.input.people} travellers · {result.input.days} days</small></div>
      </div>
      {result.budgetWarning && <div className="alert alert-warning">{result.budgetWarning}</div>}
      <div className="result-notice">{result.estimateNote}</div>
      <div className="destination-results">
        {result.destinations.map((destination) => <DestinationCard key={destination.id} destination={destination} onReview={onReview} />)}
      </div>
    </section>
  );
}