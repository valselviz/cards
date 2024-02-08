import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
