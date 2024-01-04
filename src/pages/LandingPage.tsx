import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Collectable Cards Game</h1>
      <p>by Valeria Selviz</p>
      <Link to="/home">Continue</Link>
      <Link to="/home">Start New Game</Link>
    </div>
  );
}
