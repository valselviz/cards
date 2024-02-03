import DuelBoard from "../duel-components/DuelBoard/DuelBoard";
import { Duelist } from "../duel/Duelist";
import { ArtificialIntelligence } from "duel/ArtificialIntelligence";
import { useContext } from "react";
import MacroGameContext from "MacroGameContext";

function DuelPage() {
  const macroGame = useContext(MacroGameContext);
  const players = [
    new Duelist("Player", true, macroGame.deck, null),
    new Duelist(
      "Opponent",
      false,
      macroGame.rivals[0].deck,
      new ArtificialIntelligence()
    ),
  ];

  return <DuelBoard players={players} />;
}

export default DuelPage;
