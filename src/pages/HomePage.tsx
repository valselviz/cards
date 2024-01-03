import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Link to="/deck">Manage Deck</Link>
      <Link to="/store">Cards Store</Link>
      <Link to="/rivals">Face Rival</Link>
    </>
  );
}
