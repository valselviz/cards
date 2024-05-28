import { AIScoreCalculator } from "duel/artificial-intelligence/AIScoreCalculator";
import { Card } from "../Card";
import { Duel } from "../Duel";
import { UsedOrTargetedCard } from "../DuelRecord";
import { Zone } from "../zone";
import { ArtificialIntelligence } from "./ArtificialIntelligence";
import { DuelSnapshot } from "./DuelSnapshot";

const LOG_AI = true;

export class SmartAI implements ArtificialIntelligence {
  scoreCalculator: AIScoreCalculator = new AIScoreCalculator();

  play(duel: Duel) {
    log("", "PLAYING");
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
    const usedOrTargeted = this.chooseBestMove(possibleMoves, duel, true);
    duel.executeDuelistMove(usedOrTargeted);
  }

  selectTarget(
    duel: Duel,
    selectedCardOwner: number,
    zone: Zone,
    selectionCriteria: (card: Card) => boolean = () => true,
    indentation: string = ""
  ) {
    log(indentation, "SELECTING");
    const possibleCards =
      duel.cards[selectedCardOwner][zone].filter(selectionCriteria);
    const possibleMoves = possibleCards.map((card) => ({
      player: selectedCardOwner,
      zone: zone,
      position: duel.cards[selectedCardOwner][zone].indexOf(card),
      passTurn: false,
    }));
    const usedOrTargeted = this.chooseBestMove(
      possibleMoves,
      duel,
      false,
      indentation
    );
    duel.executeDuelistMove(usedOrTargeted);
  }

  chooseBestMove(
    possibleMoves: UsedOrTargetedCard[],
    duel: Duel,
    passTurnAllowed: boolean,
    indentation: string = ""
  ): UsedOrTargetedCard {
    log(indentation, "possible moves: " + possibleMoves.length);
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
      bestScore = -1000000;
    }
    const snapshot = new DuelSnapshot(duel);
    for (const move of possibleMoves) {
      duel.ui = null;
      duel.duelRecord = null;
      logMove(indentation, duel, move);
      if (duel.executeDuelistMove(move)) {
        while (duel.hasNextAction()) {
          const action = duel.executeOneAction();
          if (action && action.shouldWaitForTargetSelection()) {
            this.selectTarget(
              duel,
              duel.selectedCardOwner,
              duel.selectingFromZone as Zone,
              duel.selectionCriteria,
              indentation + "  "
            );
          }
        }
        const newScore = this.scoreCalculator.calculeScore(
          duel,
          duel.playerTurn
        );
        log(indentation, "Move score: " + newScore);
        if (newScore > bestScore) {
          bestScore = newScore;
          bestMove = move;
        }
      }
      snapshot.restoreDuel(duel);
    }
    return bestMove as UsedOrTargetedCard;
  }
}

function log(indentation: string, msg: string) {
  if (LOG_AI) console.log(indentation + msg);
}

function logMove(indentation: string, duel: Duel, move: UsedOrTargetedCard) {
  log(
    indentation,
    "D0:" +
      duel.cards[0][0].length +
      " H0:" +
      duel.cards[0][1].length +
      " F0:" +
      duel.cards[0][1].length +
      " D1:" +
      duel.cards[1][0].length +
      " H1:" +
      duel.cards[1][1].length +
      " F1:" +
      duel.cards[1][1].length
  );
  log(
    indentation,
    "move: " +
      duel.cards[move.player as number][move.zone as number][
        move.position as number
      ].model.name
  );
}
