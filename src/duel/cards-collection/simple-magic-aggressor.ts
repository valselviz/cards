import { CardModel } from "../CardModel";
import { addCardModel, labelMagic } from "./cards-collection";
import { Color } from "../color";
import { Card } from "../Card";
import { Zone } from "../zone";

// "Simple-Magic-Aggressors" are cards that:
// - are generic (they don't depend on specific colors or circumstances)
// - can destroy a rival card
// - are not very good competive cards
// - are not considered rare cards
// The purpose of these cards is that new players have options to destroy rival cards,
// and prevent fields from getting filled with cards.
export function loadSimpleMagicAggressors() {

  const beastTrapMaxDef = 17;
  addCardModel(
    new CardModel(9, "Beast Trap", null, 0, 0, Color.Green, 1.4, [
      labelMagic,
    ]).withHandEffect((card: Card) => {
      const destroyCriteria = (availableCard: Card) =>
        availableCard.getDefense() <= beastTrapMaxDef;
      if (
        !card.duel.cards[1 - card.playerId][Zone.Field].some(destroyCriteria)
      ) {
        card.duel.alertPlayer(
          `You opponent does not have any card with ${beastTrapMaxDef} defense or less.`
        );
        return;
      }
      card.duel.queueStartSelectionAction(
        1 - card.playerId,
        Zone.Field,
        destroyCriteria
      );
      card.duel.queueDestroyAction(() => card.duel.selectedTarget);
      card.duel.queueDiscardAction(() => card);
    }, `Select a card from your opponent’s field with ${beastTrapMaxDef} defense or less and destroy it.`)
  );

  const fireBallMaxDef = 19;
  addCardModel(
    new CardModel(11, "Fire Ball", null, 0, 0, Color.Red, 1.5, [
      labelMagic,
    ]).withHandEffect((card: Card) => {
      if (card.duel.cards[card.playerId][Zone.Deck].length <= 1) {
        card.duel.alertPlayer("You don't have enough cards in your deck.");
        return;
      }
      const destroyCriteria = (availableCard: Card) =>
        availableCard.getDefense() <= fireBallMaxDef;
      if (
        !card.duel.cards[1 - card.playerId][Zone.Field].some(destroyCriteria)
      ) {
        card.duel.alertPlayer(
          `You opponent does not have any card with ${fireBallMaxDef} defense or less.`
        );
        return;
      }
      card.duel.queueDamagePlayerAction(card.playerId, 1);
      card.duel.queueStartSelectionAction(
        1 - card.playerId,
        Zone.Field,
        destroyCriteria
      );
      card.duel.queueDestroyAction(() => card.duel.selectedTarget);
      card.duel.queueDiscardAction(() => card);
    }, `Discard a card from your deck. Then select a card from your opponent’s field with ${fireBallMaxDef} defense or less and destroy it.`)
  );

  const vortexMaxDef = 20;
  addCardModel(
    new CardModel(747, "Vortex", null, 0, 0, Color.Yellow, 1.8, [
      labelMagic,
    ]).withHandEffect((card: Card) => {
      if (card.duel.cards[card.playerId][Zone.Hand].length < 2) {
        card.duel.alertPlayer(
          "You need an additional card in your hand to offer as sacrifice."
        );
        return;
      }
      const destroyCriteria = (availableCard: Card) =>
        availableCard.getDefense() <= vortexMaxDef;
      if (
        !card.duel.cards[1 - card.playerId][Zone.Field].some(destroyCriteria)
      ) {
        card.duel.alertPlayer(
          `You opponent does not have any card with ${vortexMaxDef} defense or less.`
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
    }, `Discard a card from your hand. Then select a card from your opponent’s field with ${vortexMaxDef} defense or less and destroy it.`)
  );
}
