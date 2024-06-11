import { Card } from "../Card";
import { CardModel } from "../CardModel";
import { RND } from "../Rnd";
import { Zone } from "../zone";

export const labelNoSacrifice = "NO SACRIFICE";
export const labelOneSacrifice = "ONE SACRIFICE";
export const labelTwoSacrifice = "TWO SACRIFICE";
export const labelMagic = "MAGIC";
export const labelEffect = "EFFECT";
export const labelRitualMagic = "RITUAL MAGIC";
export const labelRitualCreature = "RITUAL CREATURE";
export const labelPassive = "PASSIVE";

export function checkFullField(card: Card) {
  if (card.duel.cards[card.playerId][Zone.Field].length === 5) {
    card.duel.alertPlayer("Field is full.");
    return true;
  }
  return false;
}

export const simpleInvokationInfo = "Invoke.";
export function simpleInvokation(card: Card) {
  if (checkFullField(card)) return;
  card.duel.queueInvokeAction(() => card);
}

export const oneSacrificeInvokationInfo =
  "Invoke by sacrifying a card from your field.";
export function oneSacrificeInvokation(card: Card) {
  if (card.duel.cards[card.playerId][Zone.Field].length === 0) {
    card.duel.alertPlayer(
      "You need one card in the field to offer as sacrifice."
    );
    return;
  }
  card.duel.queueStartSelectionAction(card.playerId, Zone.Field);
  card.duel.queueDestroyAction(() => card.duel.selectedTarget);
  card.duel.queueInvokeAction(() => card);
}

export const twoSacrificesInvokationInfo =
  "Invoke by sacrifying two cards from your field.";
export function twoSacrificesInvokation(card: Card) {
  if (card.duel.cards[card.playerId][Zone.Field].length < 2) {
    card.duel.alertPlayer(
      "You need two cards in the field to offer as sacrifices."
    );
    return;
  }
  card.duel.queueStartSelectionAction(card.playerId, Zone.Field);
  card.duel.queueDestroyAction(() => card.duel.selectedTarget);
  card.duel.queueStartSelectionAction(card.playerId, Zone.Field);
  card.duel.queueDestroyAction(() => card.duel.selectedTarget);
  card.duel.queueInvokeAction(() => card);
}

export const simpleAttackInfo = "Attack.";
export function simpleAttack(card: Card) {
  const selectTargetCriteria = (opponentCard: Card) =>
    opponentCard.getDefense() < card.getAttack();
  if (
    card.duel.cards[1 - card.playerId][Zone.Field].length > 0 &&
    !card.duel.cards[1 - card.playerId][Zone.Field].some(selectTargetCriteria)
  ) {
    card.duel.alertPlayer(
      "Your opponent cards have too much defense to be attacked."
    );
    return;
  }
  card.duel.queueStartSelectionAction(
    1 - card.playerId,
    Zone.Field,
    selectTargetCriteria
  );
  card.duel.queueAttackAction(
    () => card,
    () => card.duel.selectedTarget
  );
}

// This is a list where the cards are ordered arbitrarely (by insertion order).
// This can be used to iterate over the CardModels.
export const cardModelsList: CardModel[] = [];

// This is an array of 1000 positions, where the CardModels are scatter across the array .
// This is used for fast access by id
export const cardModels: CardModel[] = [];

export function addCardModel(cardModel: CardModel) {
  if (cardModels[cardModel.id]) {
    throw new Error("There's already a CardModel with id: " + cardModel.id);
  }
  cardModels[cardModel.id] = cardModel;
  cardModelsList.push(cardModel);
}

export function getRandomCardModelId(): number {
  return cardModelsList[RND.nextInt(cardModelsList.length)].id;
}

export function getCardModelIdByName(name: string) {
  for (const card of cardModelsList) {
    if (card.name === name) {
      return card.id;
    }
  }
  console.error("No card with name: " + name);
  throw new Error("No card with name: " + name);
}

export function getRandomCardModelIdByCriteria(
  label: string,
  maxRarity: number
) {
  const suitable = [];
  for (const card of cardModelsList) {
    if (card.rarity <= maxRarity && card.labels.includes(label)) {
      suitable.push(card);
    }
  }
  return suitable[RND.nextInt(suitable.length)].id;
}
