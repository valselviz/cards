import { Card } from "./Card";
import { CardModel } from "./CardModel";
import { Color } from "./color";
import { rndInt } from "./utils";

import centaurSocerer from "assets/cards/centaurSorcerer.jpg";
import elfArcher from "assets/cards/elfArcher.jpg";
import minotaur from "assets/cards/minotaur.jpg";
import fireDemon from "assets/cards/fireDemon.jpg";
import giantSpider from "assets/cards/giantSpider.jpg";
import golem from "assets/cards/golem.jpg";
import griffin from "assets/cards/griffin.jpg";
import hammerDwarf from "assets/cards/hammerDwarf.jpg";
import knight from "assets/cards/knight.jpg";
import lizardSpearman from "assets/cards/lizardSpearman.jpg";
import wizard from "assets/cards/wizard.jpg";
import blackDragon from "assets/cards/blackDragon.jpg";
import vortex from "assets/cards/vortex.jpg";
import owlGuardian from "assets/cards/owlGuardian.jpg";
import magicCup from "assets/cards/magicCup.jpg";
import natureAmulet from "assets/cards/natureAmulet.jpg";
import dragonMistress from "assets/cards/dragonMistress.jpg";
import raid from "assets/cards/raid.jpg";
import siren from "assets/cards/siren.jpg";
import tigerWarrior from "assets/cards/tigerWarrior.jpg";
import tundraSkeleton from "assets/cards/tundraSkeleton.jpg";
import { Zone } from "./zone";
import { Action } from "./Action";
import { error } from "console";

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
// This is a list where the cards are ordered arbitrarely (by insertion order).
// This can be used to iterate over the CardModels.
const cardModelsList: CardModel[] = [];

// This is an array of 1000 positions, where the CardModels are scatter across the array .
// This is used for fast access by id
export const cardModels: CardModel[] = [];

function addCardModel(cardModel: CardModel) {
  if (cardModels[cardModel.id]) {
    throw new Error("There's already a CardModel with id: " + cardModel.id);
  }
  cardModels[cardModel.id] = cardModel;
  cardModelsList.push(cardModel);
}

addCardModel(
  new CardModel(
    470,
    "Elf Archer",
    elfArcher,
    10,
    10,
    Color.Yellow,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    64,
    "Tundra Skeleton",
    tundraSkeleton,
    12,
    13,
    Color.Blue,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    932,
    "Fire Demon",
    fireDemon,
    9,
    13,
    Color.Red,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    755,
    "Minotaur",
    minotaur,
    14,
    16,
    Color.Red,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    223,
    "Hammer Dwarf",
    hammerDwarf,
    8,
    16,
    Color.Blue,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    264,
    "Knight",
    knight,
    5,
    17,
    Color.Yellow,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    15,
    "Wizard",
    wizard,
    15,
    15,
    Color.Green,
    simpleInvokation,
    simpleAttack,
    simpleInvokationInfo,
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    889,
    "Giant Spider",
    giantSpider,
    25,
    10,
    Color.Green,
    oneSacrificeInvokation,
    simpleAttack,
    oneSacrificeInvokationInfo,
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    431,
    "Golem",
    golem,
    12,
    27,
    Color.Red,
    oneSacrificeInvokation,
    simpleAttack,
    oneSacrificeInvokationInfo,
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    133,
    "Black Dragon",
    blackDragon,
    35,
    25,
    Color.Blue,
    twoSacrificesInvokation,
    simpleAttack,
    twoSacrificesInvokationInfo,
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    412,
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
  )
);

addCardModel(
  new CardModel(
    747,
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
  )
);

addCardModel(
  new CardModel(
    113,
    "Nature Amulet",
    natureAmulet,
    0,
    0,
    Color.Green,
    (card: Card) => {
      const sacrificeCriteria = (sacrificedCard: Card) =>
        sacrificedCard.model.color == Color.Green;
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
    },
    () => null,
    "Sacrifice a green card from your field. Your rival loses 5 cards.",
    null
  )
);

addCardModel(
  new CardModel(
    80,
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
  )
);

addCardModel(
  new CardModel(
    43,
    "Centaur Socerer",
    centaurSocerer,
    18,
    18,
    Color.Green,
    (card: Card) => {
      if (checkFullField(card)) return;
      if (card.duel.cards[card.playerId][Zone.Hand].length > 1) {
        card.duel.alertPlayer(
          "You can invoke this card only if it is the only card in your hand."
        );
        return;
      }
      card.duel.queueInvokeAction(() => card);
    },
    simpleAttack,
    "You can invoke this card only if it is the only card in your hand.",
    simpleAttackInfo
  )
);

addCardModel(
  new CardModel(
    565,
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
  )
);

addCardModel(
  new CardModel(
    76,
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
  )
);

addCardModel(
  new CardModel(
    567,
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
  )
);

addCardModel(
  new CardModel(
    222,
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
  )
);

addCardModel(
  new CardModel(
    548,
    "Griffin",
    griffin,
    28,
    19,
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
    oneSacrificeInvokationInfo,
    "Attack. Then withdraw this card."
  )
);

addCardModel(
  new CardModel(
    984,
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
  )
);

export function getRandomCardModelId(): number {
  return cardModelsList[rndInt(cardModelsList.length)].id;
}

export function getCardModelIdByName(name: string) {
  for (const card of cardModelsList) {
    if (card.name === name) {
      return card.id;
    }
  }
  throw new Error("No card with name: " + name);
}
