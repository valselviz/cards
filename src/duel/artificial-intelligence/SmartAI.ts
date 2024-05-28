import { AIScoreCalculator } from "duel/AIScoreCalculator";
import { Card } from "../Card";
import { Duel } from "../Duel";
import { UsedOrTargetedCard } from "../DuelRecord";
import { Zone } from "../zone";
import { ArtificialIntelligence } from "./ArtificialIntelligence";

export class SmartAI implements ArtificialIntelligence {
  scoreCalculator: AIScoreCalculator = new AIScoreCalculator();

  play(duel: Duel) {
    const possibleMoves: UsedOrTargetedCard[] = [];
    for (const card of duel.cards[duel.playerTurn][Zone.Field]) {
      possibleMoves.push({
        player: duel.playerTurn,
        zone: card.zone,
        position: duel.cards[duel.playerTurn][Zone.Field].indexOf(card),
        passTurn: false,
      });
    }
    for (const card of duel.cards[duel.playerTurn][Zone.Hand]) {
      possibleMoves.push({
        player: duel.playerTurn,
        zone: card.zone,
        position: duel.cards[duel.playerTurn][Zone.Hand].indexOf(card),
        passTurn: false,
      });
    }
    const usedOrTargeted = this.evaluatePlay(possibleMoves, duel, true);
    duel.executeDuelistMove(usedOrTargeted);
  }

  selectTarget(
    duel: Duel,
    selectedCardOwner: number,
    zone: Zone,
    selectionCriteria: (card: Card) => boolean = () => true
  ) {
    const possibleCards =
      duel.cards[selectedCardOwner][zone].filter(selectionCriteria);
    const possibleMoves = possibleCards.map((card) => ({
      player: duel.playerTurn,
      zone: card.zone,
      position: duel.cards[duel.playerTurn][Zone.Hand].indexOf(card),
      passTurn: false,
    }));
    const usedOrTargeted = this.evaluatePlay(possibleMoves, duel, false);
    duel.executeDuelistMove(usedOrTargeted);
  }

  evaluatePlay(
    possibleMoves: UsedOrTargetedCard[],
    duel: Duel,
    passTurnAllowed: boolean
  ): UsedOrTargetedCard {
    let bestMove: UsedOrTargetedCard | null = null;
    let bestScore: number = 0;
    if (passTurnAllowed) {
      bestMove = {
        player: null,
        zone: null,
        position: null,
        passTurn: true,
      };
      bestScore = this.scoreCalculator.calculeScore(duel, duel.playerTurn);
    } else {
      bestScore = -1000;
    }
    for (const move of possibleMoves) {
      const duelCopy = this.cloneDuel(duel);
      if (duelCopy.executeDuelistMove(move)) {
        const newScore = this.scoreCalculator.calculeScore(
          duelCopy,
          duelCopy.playerTurn
        );
        if (newScore > bestScore) {
          bestScore = newScore;
          bestMove = move;
        }
      }
    }
    return bestMove as UsedOrTargetedCard;
  }

  cloneDuel(duel: Duel) {

  }
}
