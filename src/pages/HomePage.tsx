import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/deck")}>Manage Deck</button>
      <button onClick={() => navigate("/store")}>Cards Store</button>
      <button onClick={() => navigate("/rivals")}>Face Rival</button>
    </>
  );
}
