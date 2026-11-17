import PreferencePicker from "./PreferencePicker";

export default function TripForm({ values, onChange, selected, onToggle, onSubmit, loading, error }) {
  return (
    <form className="trip-form" onSubmit={onSubmit}>
      <div className="form-section-heading">
        <span className="step-number">01</span>
        <div><h3>Start with the basics</h3><p>We'll use these details to shape your trip.</p></div>
      </div>
      <div className="form-grid">
        <label className="field field-wide">
          <span>Starting location</span>
          <input name="origin" value={values.origin} onChange={onChange} placeholder="e.g. Bengaluru" required />
        </label>
        <label className="field">
          <span>Total trip budget (₹)</span>
          <input name="budget" type="number" min="1000" value={values.budget} onChange={onChange} placeholder="15000" required />
        </label>
        <label className="field">
          <span>Number of travellers</span>
          <input name="people" type="number" min="1" max="30" value={values.people} onChange={onChange} required />
        </label>
        <label className="field">
          <span>Trip duration (days)</span>
          <input name="days" type="number" min="1" max="14" value={values.days} onChange={onChange} required />
        </label>
        <label className="field">
          <span>Departure date</span>
          <input
           name="date"
           type="date"
           min={new Date().toISOString().slice(0, 10)}
           value={values.date}
           onChange={onChange}
           required
          />
        </label>
      </div>
      <div className="form-section-heading preference-heading">
        <span className="step-number">02</span>
        <div><h3>What kind of places do you love?</h3><p>Choose one or more travel styles.</p></div>
      </div>
      <PreferencePicker selected={selected} onToggle={onToggle} />
      {error && <div className="alert alert-error">{error}</div>}
      <button className="button button-primary submit-button" type="submit" disabled={loading}>
        {loading ? "Finding your trip..." : "Find my trip"} <span>{loading ? "◌" : "→"}</span>
      </button>
      <p className="form-footnote">Estimates are indicative. Confirm current prices before booking.</p>
    </form>
  );
}