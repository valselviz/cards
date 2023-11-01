import getRandomCardModel from "../../game-logic/cards-collection";
import DuelComp from "../DuelBoard/DuelBoard";
import { Player } from "../../game-logic/player";

function App() {
  const deck0 = [];
  const deck1 = [];
  for (let i = 0; i < 50; i++) {
    deck0.push(getRandomCardModel());
    deck1.push(getRandomCardModel());
  }

  const players = [
    new Player("Ramon", true, deck0),
    new Player("Computer", false, deck1),
  ];

  return <DuelComp players={players} />;
}

export default App;
