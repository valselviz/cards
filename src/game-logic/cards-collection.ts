import { Card } from "./card";
import { CardModel } from "./card-model";
import { Color } from "./color";
import { rndInt } from "./utils";

import elfArcher from "assets/cards/elfArcher.jpg";
import minotaur from "assets/cards/minotaur.jpg";
import fireDemon from "assets/cards/fireDemon.jpg";
import giantSpider from "assets/cards/giantSpider.jpg";
import golem from "assets/cards/golem.jpg";
import griffin from "assets/cards/griffin.jpg";
import hammerDwarf from "assets/cards/hammerDwarf.jpg";
import lizardSpearman from "assets/cards/lizardSpearman.jpg";
import wizard from "assets/cards/wizard.jpg";
import blackDragon from "assets/cards/blackDragon.jpg";
import vortex from "assets/cards/vortex.jpg";
import owlGuardian from "assets/cards/owlGuardian.jpg";
import magicCup from "assets/cards/magicCup.jpg";
import dragonMistress from "assets/cards/dragonMistress.jpg";
import raid from "assets/cards/raid.jpg";
import siren from "assets/cards/siren.jpg";
import tigerWarrior from "assets/cards/tigerWarrior.jpg";
import { Zone } from "./zone";
import { Action } from "./action";

function checkFullField(card: Card) {
  if (card.duel.cards[card.playerId][Zone.Field].length === 5) {
    card.duel.alertPlayer("Field is full.");
    return true;
  }
  return false;
}

const simpleInvokationInfo = "Invoke.";
function simpleInvokation(card: Card) {
  if (checkFullField(card)) return;
  card.duel.queueInvokeAction(() => card);
}

const oneSacrificeInvokationInfo =
  "Invoke by sacrifying a card from your field.";
function oneSacrificeInvokation(card: Card) {
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

const twoSacrificesInvokationInfo =
  "Invoke by sacrifying two cards from your field.";
function twoSacrificesInvokation(card: Card) {
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

const simpleAttackInfo = "Attack.";
function simpleAttack(card: Card) {
  const selectTargetCriteria = (opponentCard: Card) =>
    opponentCard.model.defense < card.model.attack;
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

export const cardModels: any = {
  ElfArcher: new CardModel(
    "Elf Archer",
    elfArcher,
    10,
    10,
    Color.Yellow,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  ),
  FireDemon: new CardModel(
    "Fire Demon",
    fireDemon,
    9,
    13,
    Color.Red,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  ),
  Minotaur: new CardModel(
    "Minotaur",
    minotaur,
    14,
    16,
    Color.Red,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  ),
  HammerDwarf: new CardModel(
    "Hammer Dwarf",
    hammerDwarf,
    8,
    16,
    Color.Blue,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  ),
  Wizard: new CardModel(
    "Wizard",
    wizard,
    15,
    15,
    Color.Green,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  ),
  GiantSpider: new CardModel(
    "Giant Spider",
    giantSpider,
    25,
    10,
    Color.Green,
    oneSacrificeInvokation,
    simpleAttack,
    oneSacrificeInvokationInfo,
    simpleAttackInfo
  ),
  Golem: new CardModel(
    "Golem",
    golem,
    12,
    27,
    Color.Red,
    oneSacrificeInvokation,
    simpleAttack,
    oneSacrificeInvokationInfo,
    simpleAttackInfo
  ),
  BlackDragon: new CardModel(
    "Black Dragon",
    blackDragon,
    35,
    25,
    Color.Blue,
    twoSacrificesInvokation,
    simpleAttack,
    twoSacrificesInvokationInfo,
    simpleAttackInfo
  ),
  LizardSpearman: new CardModel(
    "Lizard Spearman",
    lizardSpearman,
    12,
    8,
    Color.Green,
    (card: Card) => {
      if (checkFullField(card)) return;
      card.duel.queueInvokeAction(() => card);
      const newAction = new Action(() => (card.usableFromField = true));
      card.duel.actionsQueue.push(newAction);
    },
    simpleAttack,
    "Invoke. This card is ready to attack immediately.",
    simpleAttackInfo
  ),
  Vortex: new CardModel(
    "Vortex",
    vortex,
    0,
    0,
    Color.Yellow,
    (card: Card) => {
      if (card.duel.cards[card.playerId][Zone.Hand].length < 2) {
        card.duel.alertPlayer(
          "You need an additional card in your hand to offer as sacrifice."
        );
        return;
      }
      const destroyCriteriaDefense = 20;
      const destroyCriteria = (availableCard: Card) =>
        availableCard.model.defense <= destroyCriteriaDefense;
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
    },
    () => null,
    "Discard a card from your hand. Then select a card from your opponent’s field with 20 defense or less and destroy it.",
    null
  ),
  OwlGuardian: new CardModel(
    "Owl Guardian",
    owlGuardian,
    12,
    5,
    Color.Green,
    simpleInvokation,
    (card: Card) => {
      const selectTargetCriteria = (opponentCard: Card) =>
        opponentCard.model.defense < card.model.attack;
      if (
        card.duel.cards[1 - card.playerId][Zone.Field].length > 0 &&
        !card.duel.cards[1 - card.playerId][Zone.Field].some(
          selectTargetCriteria
        )
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
      card.duel.queueDrawAction(card.playerId);
    },
    simpleInvokationInfo,
    "Attack. Then draw a card."
  ),
  MagicCup: new CardModel(
    "Magic Cup",
    magicCup,
    0,
    0,
    Color.Red,
    (card: Card) => {
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
    },
    () => null,
    "Discard this card. Then draw cards until you draw a card of a color that is in your hand already.",
    null
  ),
  DragonMistress: new CardModel(
    "Dragon Mistress",
    dragonMistress,
    14,
    0,
    Color.Blue,
    (card: Card) => {
      if (card.duel.cards[card.playerId][Zone.Field].length === 0) {
        card.duel.alertPlayer(
          "You need one card in the field to offer as sacrifice."
        );
        return;
      }
      card.duel.queueStartSelectionAction(card.playerId, Zone.Field);
      card.duel.queueDestroyAction(() => card.duel.selectedTarget);
      card.duel.queueInvokeAction(() => card);
      card.duel.queueStartSelectionAction(1 - card.playerId, Zone.Field);
      card.duel.queueWithdrawAction(() => card.duel.selectedTarget);
    },
    simpleAttack,
    "Invoke by sacrifying a card from your field. Then withdraw a card from your opponent field.",
    simpleAttackInfo
  ),
  Raid: new CardModel(
    "Raid",
    raid,
    0,
    0,
    Color.Red,
    (card: Card) => {
      if (card.duel.cards[card.playerId][Zone.Deck].length < 3) {
        card.duel.alertPlayer(
          "You need at least 3 cards in your deck to offer as sacrifice."
        );
        return;
      }
      if (card.duel.cards[1 - card.playerId][Zone.Field].length < 3) {
        card.duel.alertPlayer(
          "Your opponent needs 3 or more cards on the field for you to use this card."
        );
        return;
      }
      card.duel.queueDamagePlayerAction(card.playerId, 3);
      card.duel.queueStartSelectionAction(1 - card.playerId, Zone.Field);
      card.duel.queueDestroyAction(() => card.duel.selectedTarget);
      card.duel.queueDiscardAction(() => card);
    },
    () => null,
    "Usable only if your opponent has 3 or more cards on the field. Discard 3 cards from your deck, then select and destroy one card from your opponent's field.",
    null
  ),
  Siren: new CardModel(
    "Siren",
    siren,
    5,
    13,
    Color.Blue,
    (card: Card) => {
      if (checkFullField(card)) return;
      card.duel.queueInvokeAction(() => card);
      card.duel.queueStartSelectionAction(
        card.playerId,
        Zone.Field,
        (ownedCard: Card) => !ownedCard.usableFromField
      );
      const newAction = new Action(() => {
        if (card.duel.selectedTarget) {
          card.duel.selectedTarget.usableFromField = true;
        }
      });
      card.duel.actionsQueue.push(newAction);
    },
    simpleAttack,
    "Invoke this card. Then select a not-ready card from your field and make it ready for use.",
    simpleAttackInfo
  ),
  Griffin: new CardModel(
    "Griffin",
    griffin,
    22,
    19,
    Color.Yellow,
    simpleInvokation,
    (card: Card) => {
      const selectTargetCriteria = (opponentCard: Card) =>
        opponentCard.model.defense < card.model.attack;
      if (
        card.duel.cards[1 - card.playerId][Zone.Field].length > 0 &&
        !card.duel.cards[1 - card.playerId][Zone.Field].some(
          selectTargetCriteria
        )
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
      card.duel.queueWithdrawAction(() => card);
    },
    simpleInvokationInfo,
    "Attack. Then withdraw this card."
  ),
  TigerWarrior: new CardModel(
    "Tiger Warrior",
    tigerWarrior,
    30,
    13,
    Color.Yellow,
    oneSacrificeInvokation,
    (card: Card) => {
      const selectTargetCriteria = (opponentCard: Card) =>
        opponentCard.model.defense < card.model.attack;
      if (
        card.duel.cards[1 - card.playerId][Zone.Field].length > 0 &&
        !card.duel.cards[1 - card.playerId][Zone.Field].some(
          selectTargetCriteria
        )
      ) {
        card.duel.alertPlayer(
          "Your opponent cards have too much defense to be attacked."
        );
        return;
      }
      if (card.duel.cards[card.playerId][Zone.Hand].length === 0) {
        card.duel.alertPlayer(
          "You need at least one card in your hand to offer as sacrifice."
        );
        return;
      }
      card.duel.queueStartSelectionAction(card.playerId, Zone.Hand);
      card.duel.queueDiscardAction(() => card.duel.selectedTarget);
      card.duel.queueStartSelectionAction(1 - card.playerId, Zone.Field);
      card.duel.queueAttackAction(
        () => card,
        () => card.duel.selectedTarget
      );
    },
    oneSacrificeInvokationInfo,
    "Discard a card from your hand. Then attack."
  ),
};

export default function getRandomCardModel(): CardModel {
  const keys = Object.keys(cardModels);
  return cardModels[keys[rndInt(keys.length)]];
}
