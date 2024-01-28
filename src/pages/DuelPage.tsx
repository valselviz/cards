import getRandomCardModel from "../game-logic/cards-collection";
import DuelBoard from "../components/DuelBoard/DuelBoard";
import { Duelist } from "../game-logic/Duelist";
import { ArtificialIntelligence } from "game-logic/ArtificialIntelligence";

function DuelPage() {
  const players = [
    new Duelist("Player", true, deck0, null),
    new Duelist("Opponent", false, deck1, new ArtificialIntelligence()),
  ];

  return <DuelBoard players={players} />;
}

export default DuelPage;
