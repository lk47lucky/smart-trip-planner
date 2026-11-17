
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TripForm from "./components/TripForm";
import ResultPanel from "./components/ResultPanel";
import Itinerary from "./components/Itinerary";
import ReviewModal from "./components/ReviewModal";
import "./App.css";

const initialValues = {
  origin: "",
  budget: "",
  people: "",
  days: "",
  date: ""
};

function App() {
  const [values, setValues] = useState(initialValues);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviewDestination, setReviewDestination] = useState(null);

  const onChange = (event) => {
    setValues((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const onToggle = (value) => {
    setSelected((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResult(null);
    setItinerary(null);

    if (!values.origin.trim() || !values.budget || !values.people || !values.days || !values.date) {
      setError("Please fill in all trip details.");
      return;
    }

    if (!selected.length) {
      setError("Choose at least one kind of destination to continue.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/trips/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          budget: Number(values.budget),
          people: Number(values.people),
          days: Number(values.days),
          preferences: selected
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "We couldn't plan this trip.");
      }

      setResult(data);
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Unable to reach TripWise server. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const createItinerary = async (destination) => {
    try {
      const response = await fetch("http://localhost:5000/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationId: destination.id,
          days: Number(values.days),
          preferences: selected
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create itinerary.");
      }

      setItinerary(data.itinerary);
      setTimeout(() => {
        document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Hero />

      <main>
        <section className="planner-section" id="planner">
          <div className="section-title">
            <span className="eyebrow">LET'S MAKE IT HAPPEN</span>
            <h2>Your trip starts with a few details.</h2>
            <p>Set your budget and choose the kind of escape you're looking for.</p>
          </div>

          <div className="planner-shell">
            <TripForm
              values={values}
              onChange={onChange}
              selected={selected}
              onToggle={onToggle}
              onSubmit={onSubmit}
              loading={loading}
              error={error}
            />
          </div>
        </section>

        <div id="results">
          <ResultPanel result={result} onReview={setReviewDestination} />
        </div>

        {result && (
          <section className="itinerary-chooser" id="itinerary">
            <div>
              <span className="eyebrow">MAKE THE MOST OF YOUR DAYS</span>
              <h2>Want a day-wise plan?</h2>
              <p>Choose a recommended destination to generate a suggested itinerary.</p>
            </div>

            <div className="itinerary-buttons">
              {result.destinations.map((destination) => (
                <button
                  className="button button-outline"
                  key={destination.id}
                  onClick={() => createItinerary(destination)}
                >
                  {destination.name} itinerary →
                </button>
              ))}
            </div>
          </section>
        )}

        <div id="itinerary">
          <Itinerary itinerary={itinerary} />
        </div>

        <section className="how-section" id="how-it-works">
          <div className="section-title">
            <span className="eyebrow">THE TRIPWISE METHOD</span>
            <h2>Less guesswork. More getaway.</h2>
          </div>

          <div className="how-grid">
            <article>
              <span>01</span>
              <h3>Tell us your budget</h3>
              <p>Add your starting point, group size, dates and travel preferences.</p>
            </article>

            <article>
              <span>02</span>
              <h3>Compare destinations</h3>
              <p>See estimated costs for travel, stays, food and activities in one place.</p>
            </article>

            <article>
              <span>03</span>
              <h3>Plan your days</h3>
              <p>Build a practical itinerary and learn from feedback shared by travellers.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">✦</span> TripWise
        </a>
        <p>Explore more. Spend smarter. Travel better.</p>
        <span>© 2026 TripWise · Travel estimates are indicative.</span>
      </footer>

      <ReviewModal
        destination={reviewDestination}
        onClose={() => setReviewDestination(null)}
      />
    </>
  );
}

export default App;
