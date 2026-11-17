import { useEffect, useState } from "react";

export default function ReviewModal({ destination, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", rating: "5", comment: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!destination) return;
    fetch(`http://localhost:5000/api/reviews/${destination.id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => setStatus("Reviews are temporarily unavailable."));
  }, [destination]);

  if (!destination) return null;

  const submitReview = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinationId: destination.id, ...form, rating: Number(form.rating) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to submit review.");
      setReviews((previous) => [data.review, ...previous]);
      setForm({ name: "", rating: "5", comment: "" });
      setStatus("Thanks! Your review has been submitted.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="review-modal">
        <button className="modal-close" type="button" onClick={onClose}>×</button>
        <span className="eyebrow">TRAVELLER COMMUNITY</span>
        <h2>{destination.name} reviews</h2>
        <div className="review-list">
          {reviews.length ? reviews.map((review) => <article className="review-item" key={review.id}><div><strong>{review.name}</strong><span>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span></div><p>{review.comment}</p></article>) : <p className="empty-reviews">No reviews yet. Be the first to share your experience.</p>}
        </div>
        <form className="review-form" onSubmit={submitReview}>
          <h3>Share your experience</h3>
          <label className="field"><span>Your name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength="50" /></label>
          <label className="field"><span>Your rating</span><select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}><option value="5">5 - Excellent</option><option value="4">4 - Very good</option><option value="3">3 - Good</option><option value="2">2 - Fair</option><option value="1">1 - Poor</option></select></label>
          <label className="field"><span>Your review</span><textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required minLength="8" maxLength="500" rows="3" /></label>
          {status && <p className="form-status">{status}</p>}
          <button className="button button-primary" disabled={loading}>{loading ? "Submitting..." : "Submit review"}</button>
        </form>
      </section>
    </div>
  );
}