import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useMacrogame } from "pages/common-components/useMacrogame/useMacrogame";
import { DECK_PAGE_DESCRIPTION, LEAGUE_PAGE_DESCRIPTION, RIVALS_PAGE_DESCRIPTION, STORE_PAGE_DESCRIPTION } from "pages/common-components/sectionDescriptions";

interface NavBarProps {
  openDialog: (error: boolean, ...message: string[]) => void;
}

export default function NavBar({ openDialog }: NavBarProps) {
  const [macrogame] = useMacrogame();

  const navLinkCssClass = ({ isActive }: { isActive: any }) =>
    isActive
      ? `${styles.navLink} ${styles.navLinkActive} ${styles.tooltip}`
      : `${styles.navLink} ${styles.tooltip}`;
  return (
    <div className={styles.navBar}>
      <NavLink to="/deck" className={navLinkCssClass}>
        MY DECK
        <span className={styles.tooltiptext}>{DECK_PAGE_DESCRIPTION}</span>
      </NavLink>

      <NavLink to="/store" className={navLinkCssClass}>
        STORE
        <span className={styles.tooltiptext}>{STORE_PAGE_DESCRIPTION}</span>
      </NavLink>

      <NavLink to="/rivals" className={navLinkCssClass}>
        FACE RIVAL
        <span className={styles.tooltiptext}>{RIVALS_PAGE_DESCRIPTION}</span>
      </NavLink>

      <NavLink
        to="/league"
        className={navLinkCssClass}
        onClick={(e) => {
          if (!macrogame || macrogame.deck.length < 33) {
            e.preventDefault();
            openDialog(
              true,
              "You need at least 33 cards to participate on the league"
            );
          }
        }}
      >
        LEAGUE
        <span className={styles.tooltiptext}>{LEAGUE_PAGE_DESCRIPTION}</span>
      </NavLink>
    </div>
  );
}
