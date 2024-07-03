import { NavLink, useOutletContext } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useMacrogame } from "pages/common-components/useMacrogame/useMacrogame";

interface NavBarProps {
  openDialog: (error: boolean, ...message: string[]) => void;
}

export default function NavBar({ openDialog }: NavBarProps) {
  const [macrogame] = useMacrogame();

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

      <NavLink
        to="/league"
        className={navLinkCssClass}
        onClick={(e) => {
          if (!macrogame || macrogame.deck.length < 32) {
            e.preventDefault();
            openDialog(
              true,
              "You need at least 32 cards to participate on the league"
            );
          }
        }}
      >
        LEAGUE
      </NavLink>
    </div>
  );
}
