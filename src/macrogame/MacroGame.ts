import { Rival } from "./Rival";
import {
  cardModels,
  getCardModelIdByName,
  getRandomCardModelId,
  getRandomCardModelIdByCriteria,
  labelMagic,
  labelNoSacrifice,
  labelOneSacrifice,
} from "../duel/cards-collection/cards-collection";

export interface OnSaleCard {
  model: number;
  price: number;
}
export class MacroGame {
  gold: number = 20;
  deck: number[] = [];
  cardsPool: number[] = [];
  cardsInStore: OnSaleCard[] = [];
  rivals: Rival[] = [];
  facingRival: Rival | null = null;
  manualGamesStarted: number = 0;
  manualGamesFinished: number = 0;
  manualGamesWon: number = 0;

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.addOnSaleCard();
    }
    for (let i = 0; i < 17; i++) {
      this.deck.push(getRandomCardModelIdByCriteria(labelNoSacrifice, 2));
    }
    for (let i = 0; i < 7; i++) {
      this.deck.push(getRandomCardModelIdByCriteria(labelMagic, 2));
    }
    for (let i = 0; i < 6; i++) {
      this.deck.push(getRandomCardModelIdByCriteria(labelOneSacrifice, 2.2));
    }

    this.rivals.push(new Rival(getCardModelIdByName("Tundra Skeleton"), true));
    this.rivals.push(new Rival(getCardModelIdByName("Elf Archer"), false));
    this.rivals.push(new Rival(getCardModelIdByName("Lizard Spearman"), false));
    this.rivals.push(new Rival(getCardModelIdByName("Giant Spider"), false));
    this.rivals.push(new Rival(getCardModelIdByName("Black Dragon"), false));
  }

  addOnSaleCard() {
    const cardId = getRandomCardModelId();
    const cardModel = cardModels[cardId];
    const cardRarity = cardModel.rarity;
    this.cardsInStore.unshift({
      model: cardId,
      price: Math.ceil((Math.random() * 10 + 10) * cardRarity ** 2),
    });
  }

  finishDuel(victory: boolean) {
    if (!this.facingRival) return;
    
    if (victory) {
      // Give the player his reward
      if (this.facingRival.rewardCard) {
        this.cardsPool.push(this.facingRival.rewardCard);
      } else if (this.facingRival.rewardGold) {
        this.gold += this.facingRival.rewardGold;
      }

      // Increase level of defeated rival
      this.facingRival.level += 1;
      this.facingRival.deck.push(getRandomCardModelId());

      // Unlock new rival if needed
      const nextRival = this.rivals[this.rivals.indexOf(this.facingRival) + 1];
      if (nextRival) {
        nextRival.unlocked = true;
      }

      this.manualGamesWon ++;
    }

    this.manualGamesFinished ++;

    this.facingRival = null;

    // Refreshing rivals rewards
    for (const rival of this.rivals) {
      const randomNumber = Math.random();
      if (randomNumber <= 0.33) {
        rival.rewardCard = null;
        rival.rewardGold = 10;
      } else if (0.33 < randomNumber && randomNumber <= 0.66) {
        rival.rewardCard = null;
        rival.rewardGold = 20;
      } else {
        rival.rewardCard = getRandomCardModelId();
        rival.rewardGold = null;
      }
    }

    // Add a new card to the store
    this.addOnSaleCard();
    if (this.cardsInStore.length > 5) {
      this.cardsInStore.pop();
    }
  }
}
