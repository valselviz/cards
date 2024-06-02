import { CardModel } from "duel/CardModel";
import {
  addCardModel,
  labelNoSacrifice,
  labelPassive,
  simpleAttack,
  simpleAttackInfo,
  simpleInvokation,
  simpleInvokationInfo,
} from "./cards-collection";
import ballista from "../../assets/cards/ballista.jpg";
import whiteKnight from "../../assets/cards/whiteKnight.jpg";
import fiend from "../../assets/cards/fiend.jpg";
import { Color } from "duel/color";
import { Card } from "duel/Card";
import { DuelEvent } from "duel/DuelEvent";
import { EventType } from "duel/EventType";

export function loadPassiveCards() {
  addCardModel(
    new CardModel(77, "Ballista", ballista, 7, 10, Color.Blue, 1.5, [
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
    new CardModel(74, "White Knight", whiteKnight, 8, 11, Color.Yellow, 1.6, [
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
    new CardModel(66, "Fiend", fiend, 5, 0, Color.Red, 1.7, [
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
}
