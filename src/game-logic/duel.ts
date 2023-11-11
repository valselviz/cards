import { Card } from "./card";
import { Player } from "./player";
import { rndInt } from "./utils";
import { Zone } from "./zone";

export class Duel {
  // This matrix contains all the cards of the duel
  // First index is the player: 0 or 1
  // Second index is the zone: Deck, Hand, or Field
  // Third index is the card position inside that zone
  cards: Card[][][];

  playerTurn: number; // 0 if it is Player0's turn, 1 if it is Player1's turn

  actionsQueue: (() => void)[] = [];

  players: Player[];

  constructor(players: Player[]) {
    this.players = players;
    this.cards = [
      [
        // Player0
        [], // Deck
        [], // Hand
        [], // Field
      ],
      [
        // Player1
        [], // Deck
        [], // Hand
        [], // Field
      ],
    ];

    this.cards[0][Zone.Deck] = players[0].deck.map(
      (cardModel) => new Card(cardModel, this, 0)
    );
    this.cards[1][Zone.Deck] = players[1].deck.map(
      (cardModel) => new Card(cardModel, this, 1)
    );

    for (let i = 0; i < 5; i++) {
      this.draw(0);
      this.draw(1);
    }

    this.playerTurn = 0;
  }

  // Returns true if there are more actions ready to be executed automatically
  // Returns false if it is time for the player to play
  hasNextAction() {
    return this.actionsQueue.length > 0;
  }

  // Executes one automatic action
  executeOneAction() {
    const action = this.actionsQueue.shift();
    if (!action) return;
    action();
    this.refreshUI();
  }

  refreshUI() {}

  invoke(card: Card) {
    console.log("Queuing invoke action");
    this.actionsQueue.push(() => {
      if (this.cards[card.playerId][Zone.Field].length < 5) {
        console.log("Invoke action");
        const position = this.cards[card.playerId][Zone.Hand].indexOf(card);
        this.cards[card.playerId][Zone.Hand].splice(position, 1);
        card.zone = Zone.Field;
        this.cards[card.playerId][Zone.Field].push(card);
      } else {
        console.log("Field is full");
      }
    });
  }

  draw(playerId: number) {
    console.log("Queuing draw action");
    this.actionsQueue.push(() => {
      console.log("Draw action");
      const deckPosition = rndInt(this.cards[playerId][Zone.Deck].length);
      const card = this.cards[playerId][Zone.Deck].splice(deckPosition, 1)[0];
      card.zone = Zone.Hand;
      this.cards[playerId][Zone.Hand].push(card);
    });
  }
}
