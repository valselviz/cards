import { CardModel } from "../CardModel";
import {
  addCardModel,
  checkFullField,
  labelNoSacrifice,
  labelPassive,
  simpleAttack,
  simpleAttackInfo,
  simpleInvokation,
  simpleInvokationInfo,
} from "./cards-collection";
import { Color } from "../color";
import { Card } from "../Card";
import { DuelEvent } from "../DuelEvent";
import { EventType } from "../EventType";
import { Zone } from "../zone";

export function loadPassiveCards() {
  addCardModel(
    new CardModel(77, "Ballista", null, 7, 10, Color.Blue, 1.5, [
      labelNoSacrifice,
      labelPassive,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {
        if (event.eventType !== EventType.Destroy) return;
        if (card.playerId !== card.duel.playerTurn) return;
        if (!event.target || card.playerId !== event.target.playerId) return;
        card.duel.queueDamagePlayerAction(1 - card.playerId, 1);
      }, "If one of your cards is destroyed during your own turn, your opponent’s deck loses a card.")
  );

  addCardModel(
    new CardModel(74, "White Knight", null, 8, 11, Color.Yellow, 1.6, [
      labelNoSacrifice,
      labelPassive,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {
        if (event.eventType !== EventType.Invoke) return;
        if (!event.target || event.target.getAttack() < 15) return;
        card.duel.queueDrawAction(event.target.playerId);
      }, "When a player invokes a card with 15 attack or more, he draws a card.")
  );

  addCardModel(
    new CardModel(66, "Fiend", null, 5, 0, Color.Red, 1.7, [
      labelNoSacrifice,
      labelPassive,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {
        if (event.eventType !== EventType.Attack) return;
        if (!event.target || !event.source) return;
        if (event.target !== card) return;
        card.duel.queueDestroyAction(() => event.source);
      }, "The card that attacks Fiend is destroyed.")
  );

  addCardModel(
    new CardModel(333, "Sand Assassin", null, 18, 15, Color.Yellow, 1.7, [
      labelNoSacrifice,
      labelPassive,
    ])
      .withHandEffect((card: Card) => {
        if (checkFullField(card)) return;
        if (card.duel.cards[card.playerId][Zone.Field].length >= 2) {
          card.duel.alertPlayer(
            "This card can not share the field with 2 or more cards."
          );
          return;
        }
        card.duel.queueInvokeAction(() => card);
      }, simpleInvokationInfo)
      .withFieldEffect(simpleAttack, simpleAttackInfo)
      .withPassiveEffect((card: Card, event: DuelEvent) => {
        if (event.eventType !== EventType.Invoke) return;
        if (event.target?.playerId !== card.playerId) return;
        if (card.duel.cards[card.playerId][Zone.Field].length < 3) return;
        card.duel.queueDestroyAction(() => card);
      }, "This card gets destroyed if you have 3 or more cards on your field.")
  );

  addCardModel(
    new CardModel(10, "Ancient Tree", null, 0, 10, Color.Blue, 2.7, [
      labelNoSacrifice,
      labelPassive,
    ])
      .withHandEffect(simpleInvokation, simpleInvokationInfo)
      .withFieldEffect((card: Card) => {
        card.duel.queueDamagePlayerAction(1 - card.playerId, 1);
        card.duel.queueDestroyAction(() => card);
      }, "Your opponent loses 1 card from their deck. This card is destroyed.")
      .withPassiveEffect((card: Card, event: DuelEvent) => {
        if (event.eventType !== EventType.PassTurn) return;
        if (card.duel.playerTurn !== card.playerId) return;
        card.duel.queueDrawAction(card.playerId);
      }, "Draw an extra card on every turn.")
  );
}
