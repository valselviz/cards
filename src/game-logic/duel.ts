import { DuelUI } from "./DuelUI";
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

  ui: DuelUI;

  selectionCriteria: (card: Card) => boolean = () => false;

  constructor(players: Player[], ui: DuelUI) {
    this.players = players;
    this.ui = ui;
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
      (cardModel, index) => new Card(index, cardModel, this, 0)
    );
    this.cards[1][Zone.Deck] = players[1].deck.map(
      (cardModel, index) => new Card(100 + index, cardModel, this, 1)
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
    this.ui.refreshUI(this.cards);
    return action;
  }

  passTurn() {
    this.cards[this.playerTurn][Zone.Field].forEach(
      (card) => (card.usableFromField = true)
    );
    this.playerTurn = 1 - this.playerTurn;
    this.draw(this.playerTurn);
  }

  invoke(cardProvider: () => Card | null) {
    const card = cardProvider();
    if (!card) return;
    const invokeAction = new Action(() => {
      if (this.cards[card.playerId][Zone.Field].length < 5) {
        const position = this.cards[card.playerId][Zone.Hand].indexOf(card);
        this.cards[card.playerId][Zone.Hand].splice(position, 1);
        card.zone = Zone.Field;
        card.usableFromField = false;
        this.cards[card.playerId][Zone.Field].push(card);
      } else {
        this.alertPlayer("Field is full");
      }
    });
    this.actionsQueue.push(invokeAction);
  }

  discard(cardProvider: () => Card | null) {
    const discardAction = new Action(() => {
      const card = cardProvider();
      if (!card) return;
      const position = this.cards[card.playerId][Zone.Hand].indexOf(card);
      this.cards[card.playerId][Zone.Hand].splice(position, 1);
      card.zone = Zone.Graveyard;
    });
    this.actionsQueue.push(discardAction);
  }

  destroy(cardProvider: () => Card | null) {
    const destroyAction = new Action(() => {
      const card = cardProvider();
      if (!card) return;
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

  damagePlayer(playerId: number, amount: number) {
    const damagePlayerAction = new Action(() => {
      for (let i = 0; i < amount; i++) {
        if (this.cards[playerId][Zone.Deck].length > 0) {
          this.cards[playerId][Zone.Deck].shift();
        }
      }
    });
    this.actionsQueue.push(damagePlayerAction);
  }

  startSelection(
    selectedCardOwner: number,
    zone: Zone,
    selectionCriteria: (card: Card) => boolean = () => true
  ) {
    const startSelectionAction = new Action(
      () => {
        if (this.cards[selectedCardOwner][zone].some(selectionCriteria)) {
          if (this.players[this.playerTurn].human) {
            this.waitingForCardSelection = true;
            this.selectingFromZone = zone;
            this.selectedCardOwner = selectedCardOwner;
            this.selectionCriteria = selectionCriteria;
          } else {
            const ai = this.players[this.playerTurn].ai;
            if (ai) {
              this.selectedTarget = ai.selectTarget(
                this,
                selectedCardOwner,
                zone,
                selectionCriteria
              );
            }
          }
        } else {
          this.selectedTarget = null;
        }
      },
      () =>
        this.cards[selectedCardOwner][zone].some(selectionCriteria) &&
        this.players[this.playerTurn].human,
      ""
    );
    this.actionsQueue.push(startSelectionAction);
  }

  draw(playerId: number) {
    const drawAction = new Action(() => {
      if (this.cards[playerId][Zone.Deck].length === 0) return;
      const deckPosition = rndInt(this.cards[playerId][Zone.Deck].length);
      const card = this.cards[playerId][Zone.Deck].splice(deckPosition, 1)[0];
      card.zone = Zone.Hand;
      this.cards[playerId][Zone.Hand].push(card);
    });
    this.actionsQueue.push(drawAction);
  }

  withdraw(cardProvider: () => Card | null) {
    const withdrawAction = new Action(() => {
      const card = cardProvider();
      if (!card) return;
      const position = this.cards[card.playerId][Zone.Field].indexOf(card);
      this.cards[card.playerId][Zone.Field].splice(position, 1);
      this.cards[card.playerId][Zone.Hand].push(card);
      card.zone = Zone.Hand;
    });
    this.actionsQueue.push(withdrawAction);
  }

  alertPlayer(message: string) {
    if (this.players[this.playerTurn].human) {
      alert(message);
    }
  }

  useFromField(card: Card) {
    if (!card.usableFromField) {
      this.alertPlayer("Card not available. It'll be available the next turn.");
      return;
    }
    card.model.useFromField(card);
    card.usableFromField = false;
  }
}
