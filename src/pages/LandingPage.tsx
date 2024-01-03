import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <title>Collectable Cards Game</title>
      <Link to="/home">Continue</Link>
      <Link to="/home">Start New Game</Link>
    </>
  );
}
