export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> SMART TRAVEL, BETTER BUDGETS</span>
        <h1>Go further.<br /><em>Spend smarter.</em></h1>
        <p>Tell us your budget, your travel crew and the experiences you love. TripWise finds destinations and builds a practical plan around them.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#planner">Plan my trip <span>→</span></a>
          <a className="text-link" href="#how-it-works">See how it works <span>↓</span></a>
        </div>
        <div className="hero-proof">
          <div><strong>01</strong><span>Set your budget</span></div>
          <div><strong>02</strong><span>Find your place</span></div>
          <div><strong>03</strong><span>Enjoy the journey</span></div>
        </div>
      </div>
      <div className="hero-art">
        <div className="hero-photo">
          <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85" alt="Mountain lake surrounded by green hills" />
          <div className="photo-caption"><span>YOUR NEXT ESCAPE</span><strong>Somewhere beautiful.</strong></div>
        </div>
        <div className="floating-note"><span className="note-icon">₹</span><div><strong>Budget comes first</strong><small>Plans made around your spend</small></div></div>
        <div className="photo-index">TRAVEL WELL · 2026</div>
      </div>
    </section>
  );
}