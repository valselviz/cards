import { Card } from "./card";
import { CardModel } from "./card-model";
import { Color } from "./color";
import { rndInt } from "./utils";

import elfArcher from "assets/cards/elfArcher.png";
import minotaur from "assets/cards/minotaur.png";
import fireDemon from "assets/cards/fireDemon.png";
import giantSpider from "assets/cards/giantSpider.png";
import golem from "assets/cards/golem.png";
import hammerDwarf from "assets/cards/hammerDwarf.png";
import wizard from "assets/cards/wizard.png";
import blackDragon from "assets/cards/blackDragon.png";
import vortex from "assets/cards/vortex.png";
import owlGuardian from "assets/cards/owlGuardian.png";
import magicCup from "assets/cards/magicCup.png";
import dragonMistress from "assets/cards/dragonMistress.png";
import raid from "assets/cards/raid.png";
import siren from "assets/cards/siren.png";
import { Zone } from "./zone";
import { Action } from "./action";

const simpleInvokationInfo = "Invoke.";
function simpleInvokation(card: Card) {
  card.duel.invoke(() => card);
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
  card.duel.startSelection(card.playerId, Zone.Field);
  card.duel.destroy(() => card.duel.selectedTarget);
  card.duel.invoke(() => card);
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
  card.duel.startSelection(card.playerId, Zone.Field);
  card.duel.destroy(() => card.duel.selectedTarget);
  card.duel.startSelection(card.playerId, Zone.Field);
  card.duel.destroy(() => card.duel.selectedTarget);
  card.duel.invoke(() => card);
}

const simpleAttackInfo = "Attack.";
function simpleAttack(card: Card) {
  const selectTargetCriteria = (opponentCard: Card) =>
    opponentCard.model.defense < card.model.attack;
  if (
    card.duel.cards[1 - card.playerId][Zone.Field].length === 0 ||
    card.duel.cards[1 - card.playerId][Zone.Field].some(selectTargetCriteria)
  ) {
    card.duel.startSelection(
      1 - card.playerId,
      Zone.Field,
      selectTargetCriteria
    );
    card.duel.attack(
      () => card,
      () => card.duel.selectedTarget
    );
  } else {
    card.duel.alertPlayer(
      "Your opponent cards have too much defense to be attacked."
    );
  }
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
    Color.Red,
    oneSacrificeInvokation,
    simpleAttack,
    oneSacrificeInvokationInfo,
    simpleAttackInfo
  ),
  Golem: new CardModel(
    "Golem",
    golem,
    12,
    29,
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
      card.duel.startSelection(
        card.playerId,
        Zone.Hand,
        (availableCard) => availableCard !== card
      );
      card.duel.discard(() => card.duel.selectedTarget);
      card.duel.startSelection(1 - card.playerId, Zone.Field, destroyCriteria);
      card.duel.destroy(() => card.duel.selectedTarget);
      card.duel.discard(() => card);
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

      card.duel.startSelection(
        1 - card.playerId,
        Zone.Field,
        selectTargetCriteria
      );
      card.duel.attack(
        () => card,
        () => card.duel.selectedTarget
      );
      card.duel.draw(card.playerId);
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
      card.duel.discard(() => card);
      function drawCardAndCheckRepetition() {
        card.duel.draw(card.playerId);
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
      card.duel.startSelection(card.playerId, Zone.Field);
      card.duel.destroy(() => card.duel.selectedTarget);
      card.duel.invoke(() => card);
      card.duel.startSelection(1 - card.playerId, Zone.Field);
      card.duel.withdraw(() => card.duel.selectedTarget);
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
      card.duel.damagePlayer(card.playerId, 3);
      card.duel.startSelection(1 - card.playerId, Zone.Field);
      card.duel.destroy(() => card.duel.selectedTarget);
      card.duel.discard(() => card);
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
      if (card.duel.cards[card.playerId][Zone.Field].length === 5) {
        card.duel.alertPlayer("Field is full");
        return;
      }
      card.duel.invoke(() => card);
      card.duel.startSelection(
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
    "Invoke this card. Then select a not usable card from your field and make it usable.",
    simpleAttackInfo
  ),
};

export default function getRandomCardModel(): CardModel {
  const keys = Object.keys(cardModels);
  return cardModels[keys[rndInt(keys.length)]];
}
