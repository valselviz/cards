import { Action } from "./action";
import { Duel } from "./duel";
import { Player } from "./player";
import { Card } from "./card";
import { cardModels } from "./cards-collection";
import { Zone } from "./zone";

function createDuel() {
  const players = [
    new Player("Player", true, [], null),
    new Player("Opponent", true, [], null),
  ];
  const dummyInterface = {
    refreshUI: () => {},
    notifyCardUsage: () => {},
    notifyCardTargeted: () => {},
    notifyDamage: () => {},
  };
  const duel = new Duel(players, dummyInterface);
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
    const card = new Card(cardModels.ElfArcher, duel, 0);
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
      const fieldCard = new Card(cardModels.ElfArcher, duel, 0);
      fieldCard.zone = Zone.Field;
      duel.cards[0][Zone.Field].push(fieldCard);
    }
    const card = new Card(cardModels.ElfArcher, duel, 0);
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
    const card = new Card(cardModels.ElfArcher, duel, 0);
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
