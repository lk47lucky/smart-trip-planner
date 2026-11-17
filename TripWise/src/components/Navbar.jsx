export default function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#">
        <span className="brand-mark">✦</span>
        <span>TripWise</span>
      </a>
      <nav>
        <a href="#planner">Plan a trip</a>
        <a href="#how-it-works">How it works</a>
        <a href="#reviews">Reviews</a>
      </nav>
      <a className="nav-cta" href="#planner">Start planning <span>↗</span></a>
    </header>
  );
}