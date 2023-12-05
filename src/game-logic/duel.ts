import { Action } from "./action";
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

  actionsQueue: Action[] = [];

  players: Player[];

  waitingForCardSelection: boolean = false;

  selectedCardOwner: number = 0;

  selectedTarget: Card | null = null;

  selectingFromZone: Zone | null = null;

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
  hasNextAction(): boolean {
    return this.actionsQueue.length > 0;
  }

  // Executes one automatic action
  executeOneAction(): Action | null {
    const action = this.actionsQueue.shift();
    if (!action) return null;
    action.execute();
    this.refreshUI();
    return action;
  }

  refreshUI() {}

  invoke(cardProvider: () => Card | null) {
    const card = cardProvider();
    if (!card) return;
    const invokeAction = new Action(() => {
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
    this.actionsQueue.push(invokeAction);
  }

  discard(cardProvider: () => Card | null) {
    const discardAction = new Action(() => {
      const card = cardProvider();
      if (!card) return;
      console.log("Discard action");
      const position = this.cards[card.playerId][Zone.Hand].indexOf(card);
      this.cards[card.playerId][Zone.Hand].splice(position, 1);
      card.zone = Zone.Graveyard;
    });
    this.actionsQueue.push(discardAction)
  }

  destroy(cardProvider: () => Card | null) {
    const destroyAction = new Action(() => {
      const card = cardProvider();
      if (!card) return;
      console.log("Destroy action");
      const position = this.cards[card.playerId][Zone.Field].indexOf(card);
      this.cards[card.playerId][Zone.Field].splice(position, 1);
      card.zone = Zone.Graveyard;
    });
    this.actionsQueue.push(destroyAction);
  }

  attack(
    attackProvider: () => Card | null,
    defenderProvider: () => Card | null
  ) {
    const attackAction = new Action(() => {
      const attackCard = attackProvider();
      if (!attackCard) return;
      const defenderCard = defenderProvider();
      if (!defenderCard) {
        const defenderPlayer = 1 - attackCard.playerId;
        this.cards[defenderPlayer][Zone.Deck].shift();
      } else if (attackCard.model.attack > defenderCard.model.defense) {
        const position =
          this.cards[defenderCard.playerId][Zone.Field].indexOf(defenderCard);
        this.cards[defenderCard.playerId][Zone.Field].splice(position, 1);
        defenderCard.zone = Zone.Graveyard;
      }
    });
    this.actionsQueue.push(attackAction);
  }

  selectFieldCard(selectedCardOwner: number) {
    const selectFieldCardAction = new Action(
      () => {
        if (this.cards[selectedCardOwner][Zone.Field].length > 0) {
          this.waitingForCardSelection = true;
          this.selectingFromZone = Zone.Field;
          this.selectedCardOwner = selectedCardOwner;
        } else {
          this.selectedTarget = null;
        }
      },
      () => this.cards[selectedCardOwner][Zone.Field].length > 0,
      ""
    );
    this.actionsQueue.push(selectFieldCardAction);
  }

  selectHandCard(selectedCardOwner: number) {
    const selectHandCardAction = new Action(
      () => {
        if (this.cards[selectedCardOwner][Zone.Hand].length > 0) {
          this.waitingForCardSelection = true;
          this.selectingFromZone = Zone.Hand;
          this.selectedCardOwner = selectedCardOwner;
        } else {
          this.selectedTarget = null;
        }
      },
      () => this.cards[selectedCardOwner][Zone.Hand].length > 0,
      ""
    );
    this.actionsQueue.push(selectHandCardAction)
  }

  draw(playerId: number) {
    const drawAction = new Action(() => {
      console.log("Draw action");
      const deckPosition = rndInt(this.cards[playerId][Zone.Deck].length);
      const card = this.cards[playerId][Zone.Deck].splice(deckPosition, 1)[0];
      card.zone = Zone.Hand;
      this.cards[playerId][Zone.Hand].push(card);
    });
    this.actionsQueue.push(drawAction);
  }
}
