import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const navLinkCssClass = ({ isActive }: { isActive: any }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;
  return (
    <div className={styles.navBar}>
      <NavLink to="/deck" className={navLinkCssClass}>
        MY DECK
      </NavLink>

      <NavLink to="/store" className={navLinkCssClass}>
        STORE
      </NavLink>

      <NavLink to="/rivals" className={navLinkCssClass}>
        FACE RIVAL
      </NavLink>
    </div>
  );
}
