import { Link, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
