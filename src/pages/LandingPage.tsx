import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Collectable Cards Game</h1>
      <p>by Valeria Selviz</p>
      <Link to="/deck">Continue</Link>
      <Link to="/deck">Start New Game</Link>
    </div>
  );
}
