import {rndInt} from './utils';
import {Card, CardModel} from '../game-core/cards'

export class Duel {
  decks: Card[][];
  fields: Card[][];
  hands: Card[][];

  turn: number;// 0 or 1, depending on what player is currently playing his turn
  idle: boolean;// True if wating for a player action. False it the game is executing something

  constructor(deck0: CardModel[], deck1: CardModel[]) {
    // The game data is structured in pair of arrays
    // The first array belongs to the first player (player 0)
    // The second arrays belongs to the second player (player 1)
    this.decks = [[],[]];
    this.fields = [[],[]];
    this.hands = [[],[]];

    this.decks[0] = deck0.map(model => new Card(model, this, 0));
    this.decks[1] = deck1.map(model => new Card(model, this, 1));

    for (let i = 0; i < 5; i++) {
      this.draw(0);
      this.draw(1);
    }


    this.turn = 0;
    this.idle = true;

  }

  draw(playerId: number) {
    const cardIndex = rndInt(this.decks[playerId].length);
    const card = this.decks[playerId].splice(cardIndex, 1)[0];
    this.hands[playerId].push(card);
  }
  
}
