import Hand from "duel-components/Hand/Hand";
import { Duel } from "./Duel";
import { Zone } from "./zone";

export class AIScoreCalculator {
  handCardScore: number = 1;
  deckCardScore: number = 0.3;
  fieldCardStatFactor: number = 0.15;
  fieldCardExtraScore: number = -2.3;
  fielCardMinScore: number = 1.1;

  calculatePlayerPoints(duel: Duel, playerId: number) {
    if (duel.cards[playerId][Zone.Deck].length === 0) return -1000;
    const handScore =
      duel.cards[playerId][Zone.Hand].length * this.handCardScore;
    const deckScore =
      duel.cards[playerId][Zone.Deck].length * this.deckCardScore;
    let fieldScore = 0;
    for (const card of duel.cards[playerId][Zone.Field]) {
      let fieldCardScore =
        (card.model.attack + card.model.defense) * this.fieldCardStatFactor +
        this.fieldCardExtraScore;
      if (fieldCardScore < 1.1) fieldCardScore = 1.1;
      fieldScore += fieldCardScore;
    }
    return handScore + deckScore + fieldScore;
  }

  calculeScore(duel: Duel, playerId: number) {
    const playerPoints = this.calculatePlayerPoints(duel, playerId);
    const opponentPoints = this.calculatePlayerPoints(duel, 1 - playerId);
    return playerPoints - opponentPoints;
  }
}
