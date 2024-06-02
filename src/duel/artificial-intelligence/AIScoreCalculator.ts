import Hand from "duel-components/Hand/Hand";
import { Duel } from "../Duel";
import { Zone } from "../zone";

export class AIScoreCalculator {
  handCardScore: number = 1;
  deckCardScore: number = 0.3;
  fieldCardStatFactor: number = 0.15;
  fieldCardExtraScore: number = -2.3;
  fielCardMinScore: number = 1.1;

  calculatePlayerPoints(duel: Duel, playerId: number): number {
    if (duel.cards[playerId][Zone.Deck].length === 0) return -1000;
    const handScore =
      duel.cards[playerId][Zone.Hand].length * this.handCardScore;

    // This coefficient decresses the more cards the player has in the hand
    const handCoefficient = 5 / (duel.cards[playerId][Zone.Hand].length + 5);

    const deckScore =
      duel.cards[playerId][Zone.Deck].length * this.deckCardScore;

    let fieldScore = 0;
    for (const card of duel.cards[playerId][Zone.Field]) {
      let fieldCardScore =
        (card.getAttack() + card.getDefense()) * this.fieldCardStatFactor +
        this.fieldCardExtraScore;
      if (fieldCardScore < 1.1) fieldCardScore = 1.1;
      fieldScore += fieldCardScore;
    }

    // This coefficient decresses the more cards the player has in the field
    const fieldCoefficient = 5 / (duel.cards[playerId][Zone.Field].length + 5);

    return (
      handScore * handCoefficient + fieldScore + fieldCoefficient + deckScore
    );
  }

  calculeScore(duel: Duel, playerId: number): number {
    const playerPoints = this.calculatePlayerPoints(duel, playerId);
    const opponentPoints = this.calculatePlayerPoints(duel, 1 - playerId);
    return playerPoints - opponentPoints;
  }
}
