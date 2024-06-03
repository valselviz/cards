import { loadBonusCards } from "./bonus-cards";
import { cardModelsList } from "./cards-collection";
import { loadEffectCards } from "./effect-cards";
import { loadEffectSacrificeCards } from "./effect-sacrifice-cards";
import { loadMagicCards } from "./magic-cards";
import { loadPassiveCards } from "./passive-cards";
import { loadRitualCards } from "./ritual-cards";
import { loadSimpleAggressors } from "./simple-aggressor";
import { loadSimpleDefenders } from "./simple-defender";
import { loadSimpleSacrificeCards } from "./simple-sacrifice-cards";

export function loadAllCardModels() {
  if (cardModelsList && cardModelsList.length > 0) return;
  loadEffectCards();
  loadEffectSacrificeCards();
  loadMagicCards();
  loadSimpleDefenders();
  loadSimpleAggressors();
  loadSimpleSacrificeCards();
  loadRitualCards();
  loadPassiveCards();
  loadBonusCards();
}
