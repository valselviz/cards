import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <title>Collectable Cards Game</title>
      <button onClick={() => navigate("/home")}>Continue</button>
      <button onClick={() => navigate("/home")}>Start New Game</button>
    </>
  );
}
