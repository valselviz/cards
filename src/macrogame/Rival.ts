import { getRandomCardModelId } from "duel/cards-collection/cards-collection";

export class Rival {
  portraitCard: number;
  deck: number[] = [];
  level: number = 1;
  unlocked: boolean;
  rewardCard: number | null;
  rewardGold: number | null;

  constructor(portraitCard: number, unlocked: boolean) {
    this.portraitCard = portraitCard;
    for (let i = 0; i < 27; i++) {
      this.deck.push(getRandomCardModelId());
    }
    for (let i = 0; i < 3; i++) {
      this.deck.push(portraitCard);
    }
    this.unlocked = unlocked;
    this.rewardCard = getRandomCardModelId();
    this.rewardGold = 0;
  }
}
