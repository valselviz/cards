import { DuelUI } from "./DuelUI";
import { Action } from "./Action";
import { Card } from "./Card";
import { Duelist } from "./duelist/Duelist";
import { rndInt } from "./utils";
import { Zone } from "./zone";
import { EventType } from "./EventType";
import { DuelEvent } from "./DuelEvent";
import { CardModel } from "./CardModel";
import { DuelRecord, UsedOrTargetedCard } from "./DuelRecord";
import { ReproductionDuelist } from "./duelist/ReproductionDuelist";

export class Duel {
  // This matrix contains all the cards of the duel
  // First index is the player: 0 or 1
  // Second index is the zone: Deck, Hand, or Field
  // Third index is the card position inside that zone
  cards: Card[][][];

  playerTurn: number; // 0 if it is Player0's turn, 1 if it is Player1's turn

  actionsQueue: Action[] = [];

  players: Duelist[];

  waitingForCardSelection: boolean = false;

  selectedCardOwner: number = 0;

  selectedTarget: Card | null = null;

  selectingFromZone: Zone | null = null;

  ui: DuelUI;

  selectionCriteria: (card: Card) => boolean = () => false;

  reproducingDuel: boolean;

  // If reproducingDuel is false
  // This object accumulates the different player moves (for both human and AI)
  // If reproducingDuel is true
  // This object starts with all the player moves, and they are extracted turn by turn to repdoduce the game
  duelRecord: DuelRecord;

  constructor(players: Duelist[], ui: DuelUI) {
    const duelReproduction = localStorage.getItem("duelReproduction");
    let duelRecord = null;
    if (duelReproduction) {
      duelRecord = JSON.parse(duelReproduction);
      this.reproducingDuel = true;
    } else {
      this.reproducingDuel = false;
    }
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
    if (!duelRecord) {
      this.reproducingDuel = false;
      this.players = players;
      this.cards[0][Zone.Deck] = this.createShuffledCards(0);
      this.cards[1][Zone.Deck] = this.createShuffledCards(1);
      this.duelRecord = {
        player0: this.players[0].name,
        player1: this.players[1].name,
        deck0: this.cards[0][Zone.Deck].map((card) => card.model.id),
        deck1: this.cards[1][Zone.Deck].map((card) => card.model.id),
        playerMoves: [],
        date: JSON.stringify(new Date()),
      };
    } else {
      this.reproducingDuel = true;
      this.duelRecord = duelRecord;
      const player0 = new ReproductionDuelist(
        duelRecord.player0,
        duelRecord.deck0
      );
      const player1 = new ReproductionDuelist(
        duelRecord.player1,
        duelRecord.deck1
      );
      this.players = [player0, player1];
      this.cards[0][Zone.Deck] = player0.deck.map(
        (card) => new Card(card, this, 0)
      );
      this.cards[1][Zone.Deck] = player1.deck.map(
        (card) => new Card(card, this, 1)
      );
    }
    for (let i = 0; i < 5; i++) {
      this.queueDrawAction(0);
      this.queueDrawAction(1);
    }

    this.playerTurn = 0;
  }

  // Returns true if there are more actions ready to be executed automatically
  // Returns false if it is time for the player to play
  hasNextAction(): boolean {
    return this.actionsQueue.length > 0;
  }

  isDuelOver() {
    return (
      this.cards[0][Zone.Deck].length === 0 ||
      this.cards[1][Zone.Deck].length === 0
    );
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
    this.playerTurn = 1 - this.playerTurn;
    this.cards[this.playerTurn][Zone.Field].forEach(
      (card) => (card.usableFromField = true)
    );
    this.queueDrawAction(this.playerTurn);
  }

  queueInvokeAction(cardProvider: () => Card | null) {
    const invokeAction = new Action(() => {
      const card = cardProvider();
      if (!card) return;
      if (this.cards[card.playerId][Zone.Field].length === 5) return;
      const position = this.cards[card.playerId][Zone.Hand].indexOf(card);
      this.cards[card.playerId][Zone.Hand].splice(position, 1);
      card.zone = Zone.Field;
      card.usableFromField = false;
      this.cards[card.playerId][Zone.Field].push(card);
      this.notifyEvent(EventType.Invoke, card);
    });
    this.actionsQueue.push(invokeAction);
  }

  queueDiscardAction(cardProvider: () => Card | null) {
    const discardAction = new Action(() => {
      const card = cardProvider();
      if (!card) return;
      const position = this.cards[card.playerId][Zone.Hand].indexOf(card);
      this.cards[card.playerId][Zone.Hand].splice(position, 1);
      card.zone = Zone.Graveyard;
      this.notifyEvent(EventType.Discard, card);
    });
    this.actionsQueue.push(discardAction);
  }

  queueDestroyAction(cardProvider: () => Card | null) {
    const destroyAction = new Action(() => {
      const card = cardProvider();
      if (!card) return;
      const position = this.cards[card.playerId][Zone.Field].indexOf(card);
      this.cards[card.playerId][Zone.Field].splice(position, 1);
      card.zone = Zone.Graveyard;
      this.notifyEvent(EventType.Destroy, card);
    });
    this.actionsQueue.push(destroyAction);
  }

  queueAttackAction(
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
        this.ui.notifyDamage(defenderPlayer);
        this.notifyEvent(EventType.Attack, null);
      } else if (attackCard.model.attack > defenderCard.model.defense) {
        this.notifyEvent(EventType.Attack, defenderCard, attackCard);
        const position =
          this.cards[defenderCard.playerId][Zone.Field].indexOf(defenderCard);
        this.cards[defenderCard.playerId][Zone.Field].splice(position, 1);
        defenderCard.zone = Zone.Graveyard;
        this.notifyEvent(EventType.Destroy, defenderCard);
      }
    });
    this.actionsQueue.push(attackAction);
  }

  queueDamagePlayerAction(playerId: number, amount: number) {
    const damagePlayerAction = new Action(() => {
      if (this.cards[playerId][Zone.Deck].length > 0) {
        for (let i = 0; i < amount; i++) {
          if (this.cards[playerId][Zone.Deck].length > 0) {
            this.cards[playerId][Zone.Deck].shift();
          }
        }
        this.ui.notifyDamage(playerId);
      }
    });
    this.actionsQueue.push(damagePlayerAction);
  }

  queueStartSelectionAction(
    selectedCardOwner: number,
    zone: Zone,
    selectionCriteria: (card: Card) => boolean = () => true
  ) {
    const startSelectionAction = new Action(
      () => {
        if (this.cards[selectedCardOwner][zone].some(selectionCriteria)) {
          this.waitingForCardSelection = true;
          this.selectingFromZone = zone;
          this.selectedCardOwner = selectedCardOwner;
          this.selectionCriteria = selectionCriteria;
          this.players[this.playerTurn].executeDuelistCardSelection(this);
        } else {
          this.selectedTarget = null;
        }
      },
      () =>
        this.cards[selectedCardOwner][zone].some(selectionCriteria) &&
        this.players[this.playerTurn].human &&
        !this.reproducingDuel,
      ""
    );
    this.actionsQueue.push(startSelectionAction);
  }

  createShuffledCards(playerId: number): Card[] {
    const clonedDeck = this.players[playerId].deck.map(
      (cardModel) => new Card(cardModel, this, playerId)
    );
    const shuffledDeck = [];
    while (clonedDeck.length > 0) {
      const deckPosition = rndInt(clonedDeck.length);
      const card = clonedDeck.splice(deckPosition, 1)[0];
      shuffledDeck.push(card);
    }
    return shuffledDeck;
  }

  queueDrawAction(playerId: number) {
    const drawAction = new Action(() => {
      if (this.cards[playerId][Zone.Deck].length === 0) return;
      const card = this.cards[playerId][Zone.Deck].shift() as Card;
      card.zone = Zone.Hand;
      this.cards[playerId][Zone.Hand].push(card);
    });
    this.actionsQueue.push(drawAction);
  }

  queueWithdrawAction(cardProvider: () => Card | null) {
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
    if (this.players[this.playerTurn].human && !this.reproducingDuel) {
      alert(message);
    }
  }

  useFromField(card: Card) {
    if (!card.usableFromField) {
      this.alertPlayer("Card not ready. It'll be ready next turn.");
      return;
    }
    card.model.useFromField(card);
    card.usableFromField = false;
  }

  notifyEvent(
    eventType: EventType,
    target: Card | null,
    source: Card | null = null
  ) {
    const event = new DuelEvent(eventType, target, source);
    for (const card of this.cards[1 - this.playerTurn][Zone.Field]) {
      card.model.passiveEffect(card, event);
    }
    for (const card of this.cards[this.playerTurn][Zone.Field]) {
      card.model.passiveEffect(card, event);
    }
  }

  // If the player move is valid, then executes it and returns true
  // If the move is not valid, then it just returns false
  executeDuelistMove(usedOrTargeted: UsedOrTargetedCard): boolean {
    if (usedOrTargeted.passTurn) {
      if (!this.waitingForCardSelection) {
        this.passTurn();
      } else {
        this.alertPlayer("Can not pass turn during a card selection");
        return false;
      }
    } else {
      const card: Card =
        this.cards[usedOrTargeted.player as number][
          usedOrTargeted.zone as number
        ][usedOrTargeted.position as number];

      if (this.waitingForCardSelection) {
        if (
          card.playerId === this.selectedCardOwner &&
          card.zone === this.selectingFromZone &&
          this.selectionCriteria(card)
        ) {
          this.selectedTarget = card;
          this.waitingForCardSelection = false;
          this.ui.notifyCardTargeted(
            card.playerId,
            card.zone,
            this.cards[card.playerId][card.zone].indexOf(card)
          );
        } else {
          return false;
        }
      } else if (!this.hasNextAction()) {
        // Manually triggered actions
        if (card.playerId !== this.playerTurn) return false;
        if (card.zone === Zone.Hand) {
          card.model.useFromHand(card);
        } else if (card.zone === Zone.Field) {
          this.useFromField(card);
        }
        if (this.actionsQueue.length > 0) {
          this.ui.notifyCardUsage(
            card.playerId,
            card.zone,
            this.cards[card.playerId][card.zone].indexOf(card)
          );
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    if (!this.reproducingDuel) {
      this.duelRecord.playerMoves.push(usedOrTargeted);
      localStorage.setItem("duelRecord", JSON.stringify(this.duelRecord));
    }
    return true;
  }
}
