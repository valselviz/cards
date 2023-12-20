import getRandomCardModel from "../../game-logic/cards-collection";
import DuelComp from "../DuelBoard/DuelBoard";
import { Player } from "../../game-logic/player";

function App() {
  const deck0 = [];
  const deck1 = [];
  for (let i = 0; i < 40; i++) {
    deck0.push(getRandomCardModel());
    deck1.push(getRandomCardModel());
  }

  const players = [
    new Player("Player", true, deck0),
    new Player("Opponent", true, deck1),
  ];

  return <DuelComp players={players} />;
}

export default App;
