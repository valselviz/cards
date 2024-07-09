import { Card } from "../Card";
import { Color } from "../color";
import {
  addCardModel,
  labelGreenSynergy,
  labelMagic,
  labelYellowSynergy,
} from "./cards-collection";
import { CardModel } from "../CardModel";
import { Action } from "../Action";
import { Zone } from "../zone";

export function loadMagicCards() {
  addCardModel(
    new CardModel(113, "Nature Amulet", null, 0, 0, Color.Green, 2.8, [
      labelMagic,
      labelGreenSynergy,
    ]).withHandEffect((card: Card) => {
      const sacrificeCriteria = (sacrificedCard: Card) =>
        sacrificedCard.model.color === Color.Green;
      if (!card.duel.cards[card.playerId][Zone.Field].some(sacrificeCriteria)) {
        card.duel.alertPlayer(
          "You need one Green card in your field to offer as sacrifice"
        );
        return;
      }
      card.duel.queueStartSelectionAction(
        card.playerId,
        Zone.Field,
        sacrificeCriteria
      );
      card.duel.queueDestroyAction(() => card.duel.selectedTarget);
      card.duel.queueDamagePlayerAction(1 - card.playerId, 5);
      card.duel.queueDiscardAction(() => card);
    }, "Sacrifice a green card from your field. Your rival loses 5 cards.")
  );

  addCardModel(
    new CardModel(565, "Magic Cup", null, 0, 0, Color.Red, 1.8, [
      labelMagic,
    ]).withHandEffect((card: Card) => {
      card.duel.queueDiscardAction(() => card);
      function drawCardAndCheckRepetition() {
        card.duel.queueDrawAction(card.playerId);
        const newAction = new Action(() => {
          const handClone = [...card.duel.cards[card.playerId][Zone.Hand]];
          const lastDrawnCard = handClone.pop();
          if (
            !handClone.some(
              (handCard) => handCard.model.color === lastDrawnCard?.model.color
            )
          ) {
            drawCardAndCheckRepetition();
          }
        });
        card.duel.actionsQueue.push(newAction);
      }
      drawCardAndCheckRepetition();
    }, "Discard this card. Then draw cards until you draw a card of a color that is in your hand already.")
  );

  addCardModel(
    new CardModel(567, "Raid", null, 0, 0, Color.Red, 1.7, [
      labelMagic,
    ]).withHandEffect((card: Card) => {
      if (card.duel.cards[card.playerId][Zone.Deck].length < 2) {
        card.duel.alertPlayer(
          "You need at least 2 cards in your deck to offer as sacrifice."
        );
        return;
      }
      if (card.duel.cards[1 - card.playerId][Zone.Field].length < 3) {
        card.duel.alertPlayer(
          "Your opponent needs 3 or more cards on the field for you to use this card."
        );
        return;
      }
      card.duel.queueDamagePlayerAction(card.playerId, 2);
      card.duel.queueStartSelectionAction(1 - card.playerId, Zone.Field);
      card.duel.queueDestroyAction(() => card.duel.selectedTarget);
      card.duel.queueDiscardAction(() => card);
    }, "Usable only if your opponent has 3 or more cards on the field. Discard 2 cards from your deck, then select and destroy one card from your opponent's field.")
  );

  addCardModel(
    new CardModel(329, "Eruption", null, 0, 0, Color.Red, 1.6, [
      labelMagic,
    ]).withHandEffect((card: Card) => {
      if (
        card.duel.cards[card.playerId][Zone.Field].length <=
        card.duel.cards[1 - card.playerId][Zone.Field].length
      ) {
        card.duel.alertPlayer(
          "You can use this card only if you have more cards on the field than your rival."
        );
        return;
      }
      if (card.duel.cards[1 - card.playerId][Zone.Field].length === 0) {
        card.duel.alertPlayer(
          "Your rival does not have any card on the field to destroy."
        );
        return;
      }
      for (const fieldCard of card.duel.cards[1 - card.playerId][Zone.Field]) {
        card.duel.queueDestroyAction(() => fieldCard);
      }
      for (const fieldCard of card.duel.cards[card.playerId][Zone.Field]) {
        card.duel.queueDestroyAction(() => fieldCard);
      }
      card.duel.queueDiscardAction(() => card);
    }, "If you have more cards on the field than your rival, this card destroys every card on the field.")
  );

  addCardModel(
    new CardModel(561, "Fate Rune", null, 0, 0, Color.Yellow, 2.8, [
      labelMagic,
      labelYellowSynergy,
    ]).withHandEffect((card: Card) => {
      const discardCriteria = (discardedCard: Card) =>
        discardedCard.model.color === Color.Yellow && discardedCard !== card;
      if (!card.duel.cards[card.playerId][Zone.Hand].some(discardCriteria)) {
        card.duel.alertPlayer(
          "You need one extra yellow card in your hand to be discarded."
        );
        return;
      }
      card.duel.queueStartSelectionAction(
        card.playerId,
        Zone.Hand,
        discardCriteria
      );
      card.duel.queueDiscardAction(() => card.duel.selectedTarget);
      card.duel.queueDrawAction(card.playerId);
      card.duel.queueDrawAction(card.playerId);
      card.duel.queueDrawAction(card.playerId);
      card.duel.queueDiscardAction(() => card);
    }, "Discard a yellow card from your hand. Then draw 3 cards.")
  );

  addCardModel(
    new CardModel(111, "Lightning Breath", null, 0, 0, Color.Yellow, 2.4, [
      labelMagic,
      labelYellowSynergy,
    ]).withHandEffect((card: Card) => {
      const discardCriteria = (discardedCard: Card) =>
        discardedCard.model.color === Color.Yellow && discardedCard !== card;
      if (!card.duel.cards[card.playerId][Zone.Hand].some(discardCriteria)) {
        card.duel.alertPlayer(
          "You need one extra yellow card in your hand to be discarded."
        );
        return;
      }
      card.duel.queueStartSelectionAction(
        card.playerId,
        Zone.Hand,
        discardCriteria
      );
      card.duel.queueDiscardAction(() => card.duel.selectedTarget);
      card.duel.queueDamagePlayerAction(1 - card.playerId, 4);
      card.duel.queueDiscardAction(() => card);
    }, "Discard a yellow card from your hand. Your rival loses 4 cards.")
  );

  addCardModel(
    new CardModel(4, "Shipwreck", null, 0, 0, Color.Blue, 2.1, [
      labelMagic,
    ]).withHandEffect((card: Card) => {
      const duel = card.duel;
      if (duel.cards[card.playerId][Zone.Field].length === 0) {
        duel.alertPlayer("You need one card in your field to sacrifie.");
        return;
      }

      duel.queueStartSelectionAction(card.playerId, Zone.Field);

      const newAction = new Action(() => {
        for (const fieldCard of duel.cards[card.playerId][Zone.Field]) {
          if (fieldCard.model.color === duel.selectedTarget?.model.color) {
            duel.queueDestroyAction(() => fieldCard);
          }
        }
        for (const fieldCard of duel.cards[1 - card.playerId][Zone.Field]) {
          if (fieldCard.model.color === duel.selectedTarget?.model.color) {
            duel.queueDestroyAction(() => fieldCard);
          }
        }
        duel.queueDiscardAction(() => card);
      });
      duel.actionsQueue.push(newAction);
    }, "Sacrifice a card from your field. Every card on the field with the same color is destroyed.")
  );
}
