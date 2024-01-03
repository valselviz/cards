import { useNavigate } from "react-router-dom";

export default function RivalsPage() {
  const navigate = useNavigate();

  return (
    <>
      <title>Choose Your Match</title>
      <button onClick={() => navigate("/duel")}>Rival</button>
    </>
  );
}
