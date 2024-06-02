import { Card } from "duel/Card";
import { Color } from "duel/color";
import { addCardModel, labelMagic } from "./cards-collection";
import { CardModel } from "duel/CardModel";

import eruption from "assets/cards/eruption.jpg";
import natureAmulet from "assets/cards/natureAmulet.jpg";
import vortex from "assets/cards/vortex.jpg";
import raid from "assets/cards/raid.jpg";
import magicCup from "assets/cards/magicCup.jpg";

import { Action } from "duel/Action";
import { Zone } from "duel/zone";

export function loadMagicCards() {
  addCardModel(
    new CardModel(747, "Vortex", vortex, 0, 0, Color.Yellow, 1.8, [
      labelMagic,
    ]).withHandEffect((card: Card) => {
      if (card.duel.cards[card.playerId][Zone.Hand].length < 2) {
        card.duel.alertPlayer(
          "You need an additional card in your hand to offer as sacrifice."
        );
        return;
      }
      const destroyCriteriaDefense = 20;
      const destroyCriteria = (availableCard: Card) =>
        availableCard.getDefense() <= destroyCriteriaDefense;
      if (
        !card.duel.cards[1 - card.playerId][Zone.Field].some(destroyCriteria)
      ) {
        card.duel.alertPlayer(
          `You opponent does not have any card with ${destroyCriteriaDefense} defense or less.`
        );
        return;
      }
      card.duel.queueStartSelectionAction(
        card.playerId,
        Zone.Hand,
        (availableCard) => availableCard !== card
      );
      card.duel.queueDiscardAction(() => card.duel.selectedTarget);
      card.duel.queueStartSelectionAction(
        1 - card.playerId,
        Zone.Field,
        destroyCriteria
      );
      card.duel.queueDestroyAction(() => card.duel.selectedTarget);
      card.duel.queueDiscardAction(() => card);
    }, "Discard a card from your hand. Then select a card from your opponent’s field with 20 defense or less and destroy it.")
  );

  addCardModel(
    new CardModel(113, "Nature Amulet", natureAmulet, 0, 0, Color.Green, 2.8, [
      labelMagic,
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
    new CardModel(565, "Magic Cup", magicCup, 0, 0, Color.Red, 1.8, [
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
    new CardModel(567, "Raid", raid, 0, 0, Color.Red, 1.7, [
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
    new CardModel(329, "Eruption", eruption, 0, 0, Color.Red, 1.6, [
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
      if (card.duel.cards[1 - card.playerId][Zone.Field].length == 0) {
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
}
