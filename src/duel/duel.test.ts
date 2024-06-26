import { Action } from "./Action";
import { Duel } from "./Duel";
import { Duelist } from "./duelist/Duelist";
import { Card } from "./Card";
import {
  cardModels,
  getCardModelIdByName,
} from "./cards-collection/cards-collection";
import { Zone } from "./zone";
import { loadAllCardModels } from "./cards-collection/load-all-card-models";

loadAllCardModels();
const elfArcherId = getCardModelIdByName("Elf Archer");
const elfArcherCardModel = cardModels[elfArcherId];

function createDuel() {
  const players = [
    new Duelist("Player", true, []),
    new Duelist("Opponent", true, []),
  ];
  const duel = new Duel(players, null);
  duel.actionsQueue = [];
  return duel;
}

describe("duel hasNextAction", () => {
  test("returns true if there are pending draw actions", () => {
    const duel = createDuel();
    const action = new Action(() => {});
    duel.actionsQueue.push(action);
    const result = duel.hasNextAction();
    expect(result).toBe(true);
  });

  test("returns false when the action queue is empty", () => {
    const duel = createDuel();
    const result = duel.hasNextAction();
    expect(result).toBe(false);
  });
});

describe("duel executeOneAction", () => {
  test("returns null if action queue is empty", () => {
    const duel = createDuel();
    const result = duel.executeOneAction();
    expect(result).toBe(null);
  });
  test("execute and returns action if it has one to excecute", () => {
    const duel = createDuel();
    const mockFunction = jest.fn();
    const action = new Action(mockFunction);
    duel.actionsQueue.push(action);
    const result = duel.executeOneAction();
    expect(result).toBe(action);
    expect(mockFunction).toHaveBeenCalled();
  });
});

describe("duel queueInvokeAction", () => {
  test("queue and execute invoke", () => {
    const duel = createDuel();
    const card = new Card(elfArcherCardModel, duel, 0);
    card.zone = Zone.Hand;
    duel.cards[0][Zone.Hand].push(card);
    const cardProvider = () => card;
    duel.queueInvokeAction(cardProvider);

    // Check the action was queued
    expect(duel.actionsQueue.length).toBe(1);

    // Check the action is executed properly
    duel.executeOneAction();
    expect(card.zone).toBe(Zone.Field);
    expect(duel.cards[0][Zone.Field]).toHaveLength(1);
    expect(duel.cards[0][Zone.Field][0]).toBe(card);
    expect(duel.cards[0][Zone.Hand]).toHaveLength(0);
  });

  test("queue and execute with full field", () => {
    const duel = createDuel();
    for (let i = 0; i < 5; i++) {
      const fieldCard = new Card(elfArcherCardModel, duel, 0);
      fieldCard.zone = Zone.Field;
      duel.cards[0][Zone.Field].push(fieldCard);
    }
    const card = new Card(elfArcherCardModel, duel, 0);
    card.zone = Zone.Hand;
    duel.cards[0][Zone.Hand].push(card);
    const cardProvider = () => card;
    duel.queueInvokeAction(cardProvider);

    // Check the action was queued
    expect(duel.actionsQueue.length).toBe(1);

    // Check the card remains in the hand
    duel.executeOneAction();
    expect(card.zone).toBe(Zone.Hand);
    expect(duel.cards[0][Zone.Field]).toHaveLength(5);
    expect(duel.cards[0][Zone.Hand][0]).toBe(card);
    expect(duel.cards[0][Zone.Hand]).toHaveLength(1);
  });
});

describe("duel queueWithdrawAction", () => {
  test("queue and execute withdraw", () => {
    const duel = createDuel();
    const card = new Card(elfArcherCardModel, duel, 0);
    card.zone = Zone.Field;
    duel.cards[0][Zone.Field].push(card);
    const cardProvider = () => card;
    duel.queueWithdrawAction(cardProvider);

    // Check the action was queued
    expect(duel.actionsQueue.length).toBe(1);

    // Check the action is executed properly
    duel.executeOneAction();
    expect(card.zone).toBe(Zone.Hand);
    expect(duel.cards[0][Zone.Hand]).toHaveLength(1);
    expect(duel.cards[0][Zone.Hand][0]).toBe(card);
    expect(duel.cards[0][Zone.Field]).toHaveLength(0);
  });
});

describe("duel queueDestroyAction", () => {
  test("queue and execute Destroy", () => {
    const duel = createDuel();
    const card = new Card(elfArcherCardModel, duel, 0);
    card.zone = Zone.Field;
    duel.cards[0][Zone.Field].push(card);
    const cardProvider = () => card;
    duel.queueDestroyAction(cardProvider);

    // Check the action was queued
    expect(duel.actionsQueue.length).toBe(1);

    // Check the action is executed properly
    duel.executeOneAction();
    expect(card.zone).toBe(Zone.Graveyard);
    expect(duel.cards[0][Zone.Field]).toHaveLength(0);
  });
});
