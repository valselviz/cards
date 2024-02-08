import DuelBoard from "../../duel-components/DuelBoard/DuelBoard";
import { Duelist } from "../../duel/Duelist";
import { ArtificialIntelligence } from "duel/ArtificialIntelligence";
import { useContext } from "react";
import MacroGameContext from "MacroGameContext";

function DuelPage() {
  const macroGame = useContext(MacroGameContext);
  if (macroGame.facingRival) {
    const players = [
      new Duelist("Player", true, macroGame.deck, null),
      new Duelist(
        "Opponent",
        false,
        macroGame.facingRival.deck,
        new ArtificialIntelligence()
      ),
    ];
    return <DuelBoard players={players} />;
  } else {
    alert("You can not got to /duel directly");
    window.location.href = "/";
    return <></>;
  }
}

export default DuelPage;
