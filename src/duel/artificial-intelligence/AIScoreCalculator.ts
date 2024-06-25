import Hand from "duel-components/Hand/Hand";
import { Duel } from "../Duel";
import { Zone } from "../zone";
import { log } from "console";

export class AIScoreCalculator {
  deckCardScore: number = 0.3;
  maxScoreByCardStat: number = 1.0;
  fieldCardExtraScore: number = 0.5;
  fielCardMinScore: number = 1.1;

  // The AI cares about having stronger cards than his opponent. But that is limited by this margin.
  // If this margin is too low, the AI will not care about invoking strong cards (unless the opponent already has them).
  // If this margin is too high, the AI might overappriciate having strong card,
  // to the point of not attacking if that cause stats lose (EG, when you attack a bonus card).
  relevantStatMargin: number = 6;

  calculatePlayerPoints(duel: Duel, playerId: number): number {
    if (duel.cards[playerId][Zone.Deck].length === 0) return -1000;

    // The AI does not considere useful to have more than 5 cards in the hand.
    // This is an incentive to make the AI play its cards and not accumulate them.
    const handCards = duel.cards[playerId][Zone.Hand].length;
    let handScore = handCards < 5 ? (handCards * 5) / (handCards + 5) : 2.5;

    const deckScore =
      duel.cards[playerId][Zone.Deck].length * this.deckCardScore;

    const [minRelevantAtk, maxRelevantAtk, minRelevantDef, maxRelevantDef] =
      this.relevantStats(duel, playerId);

    let fieldScore = 0;
    for (const card of duel.cards[playerId][Zone.Field]) {
      let relevantAttack = card.getAttack();
      if (relevantAttack <= minRelevantAtk) relevantAttack = 0;
      else if (relevantAttack >= maxRelevantAtk)
        relevantAttack = this.maxScoreByCardStat;
      else
        relevantAttack =
          (this.maxScoreByCardStat * (relevantAttack - minRelevantAtk)) /
          (maxRelevantAtk - minRelevantAtk);

      let relevantDefense = card.getDefense();
      if (relevantDefense <= minRelevantDef) relevantDefense = 0;
      else if (relevantDefense >= maxRelevantDef)
        relevantDefense = this.maxScoreByCardStat;
      else
        relevantDefense =
          (this.maxScoreByCardStat * (relevantDefense - minRelevantDef)) /
          (maxRelevantDef - minRelevantDef);

      let fieldCardScore =
        relevantAttack + relevantDefense + this.fieldCardExtraScore;

      if (fieldCardScore < 1.1)
        // Remember that even if a card has 0 atk/def, it can have effects that make them strong.
        // So it is important to give a minimum score to all field cards.
        fieldCardScore = 1.1;
      fieldScore += fieldCardScore;
    }

    // This coefficient decresses the more cards the player has in the field
    fieldScore =
      (fieldScore * 5) / (duel.cards[playerId][Zone.Field].length + 5);

    return handScore + fieldScore + deckScore;
  }

  calculeScore(duel: Duel, playerId: number): number {
    const playerPoints = this.calculatePlayerPoints(duel, playerId);
    const opponentPoints = this.calculatePlayerPoints(duel, 1 - playerId);
    return playerPoints - opponentPoints;
  }

  relevantStats(duel: Duel, playerId: number): number[] {
    let minAtk = 1000;
    let maxAtk = 0;
    let minDef = 1000;
    let maxDef = 0;
    for (const card of duel.cards[1 - playerId][Zone.Field]) {
      const cardAttack = card.getAttack();
      if (cardAttack > maxAtk) {
        maxAtk = cardAttack;
      }
      if (cardAttack < minAtk) {
        minAtk = cardAttack;
      }
      const cardDefense = card.getDefense();
      if (cardDefense > maxDef) {
        maxDef = cardDefense;
      }
      if (cardDefense < minDef) {
        minDef = cardDefense;
      }
    }
    const oppoenentHasCards = duel.cards[1 - playerId][Zone.Field].length > 0;
    const minRelevantAtk = oppoenentHasCards ? minDef : 0;
    const maxRelevantAtk = oppoenentHasCards
      ? maxDef + this.relevantStatMargin
      : this.relevantStatMargin;
    const minRelevantDef = oppoenentHasCards && minAtk > 0 ? minAtk - 1 : 0;
    const maxRelevantDef = oppoenentHasCards
      ? maxAtk + this.relevantStatMargin
      : this.relevantStatMargin;
    return [minRelevantAtk, maxRelevantAtk, minRelevantDef, maxRelevantDef];
  }
}
