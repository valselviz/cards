import getRandomCardModel from "../../game-logic/cards-collection";
import DuelComp from "../DuelBoard/DuelBoard";
import { Player } from "../../game-logic/player";
import { ArtificialIntelligence } from "game-logic/ArtificialIntelligence";

function App() {
  const deck0 = [];
  const deck1 = [];
  for (let i = 0; i < 30; i++) {
    deck0.push(getRandomCardModel());
    deck1.push(getRandomCardModel());
  }

  const players = [
    new Player("Player", true, deck0, null),
    new Player("Opponent", false, deck1, new ArtificialIntelligence()),
  ];

  return <DuelComp players={players} />;
}

export default App;
