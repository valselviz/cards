import BlackDragon from "assets/cards/blackDragon.jpg";
import Blacksmith from "./assets/cards/blacksmith.jpg";
import CorruptedMage from "./assets/cards/corruptedMage.jpg";
import Harpy from "./assets/cards/harpy.jpg";
import NightmareBeast from "./assets/cards/nightmareBeast.jpg";
import SandTitan from "./assets/cards/sandTitan.jpg";
import SkyGoddess from "./assets/cards/skyGoddess.jpg";
import CentaurSocerer from "assets/cards/centaurSorcerer.jpg";
import Guardian from "assets/cards/guardian.jpg";
import LizardSpearman from "assets/cards/lizardSpearman.jpg";
import Siren from "assets/cards/siren.jpg";
import OwlGuardian from "assets/cards/owlGuardian.jpg";
import TreeGuardian from "assets/cards/treeGuardian.jpg";
import DragonMistress from "assets/cards/dragonMistress.jpg";
import Griffin from "assets/cards/griffin.jpg";
import Reaper from "assets/cards/reaper.jpg";
import TigerWarrior from "assets/cards/tigerWarrior.jpg";
import Eruption from "assets/cards/eruption.jpg";
import NatureAmulet from "assets/cards/natureAmulet.jpg";
import Vortex from "assets/cards/vortex.jpg";
import Raid from "assets/cards/raid.jpg";
import MagicCup from "assets/cards/magicCup.jpg";
import Ballista from "./assets/cards/ballista.jpg";
import WhiteKnight from "./assets/cards/whiteKnight.jpg";
import Fiend from "./assets/cards/fiend.jpg";
import DarkRitual from "assets/cards/darkRitual.jpg";
import DeathLord from "assets/cards/deathLord.jpg";
import Imp from "assets/cards/imp.jpg";
import Slayer from "assets/cards/slayer.jpg";
import WolfBarbarian from "assets/cards/wolfBarbarian.jpg";
import ElfArcher from "assets/cards/elfArcher.jpg";
import Minotaur from "assets/cards/minotaur.jpg";
import FireDemon from "assets/cards/fireDemon.jpg";
import GoblinWarrior from "assets/cards/goblinWarrior.jpg";
import HammerDwarf from "assets/cards/hammerDwarf.jpg";
import OceanTraitor from "assets/cards/oceanTraitor.jpg";
import ThunderTraitor from "assets/cards/thunderTraitor.jpg";
import Paladin from "assets/cards/paladin.jpg";
import TundraSkeleton from "assets/cards/tundraSkeleton.jpg";
import Wizard from "assets/cards/wizard.jpg";
import GiantSpider from "assets/cards/giantSpider.jpg";
import Golem from "assets/cards/golem.jpg";
import TundraRider from "assets/cards/tundraRider.jpg";
import DragonTreasure from "assets/cards/dragonTreasure.jpg";

import { cardModelsList } from "./duel/cards-collection/cards-collection";

const cardModelImages: any = {
  BlackDragon: BlackDragon,
  Blacksmith: Blacksmith,
  CorruptedMage: CorruptedMage,
  Harpy: Harpy,
  NightmareBeast: NightmareBeast,
  SandTitan: SandTitan,
  SkyGoddess: SkyGoddess,
  CentaurSocerer: CentaurSocerer,
  Guardian: Guardian,
  LizardSpearman: LizardSpearman,
  DragonMistress: DragonMistress,
  Griffin: Griffin,
  Reaper: Reaper,
  TigerWarrior: TigerWarrior,
  Eruption: Eruption,
  NatureAmulet: NatureAmulet,
  MagicCup: MagicCup,
  Ballista: Ballista,
  WhiteKnight: WhiteKnight,
  Fiend: Fiend,
  DarkRitual: DarkRitual,
  DeathLord: DeathLord,
  Imp: Imp,
  Slayer: Slayer,
  WolfBarbarian: WolfBarbarian,
  ElfArcher: ElfArcher,
  Minotaur: Minotaur,
  FireDemon: FireDemon,
  GoblinWarrior: GoblinWarrior,
  HammerDwarf: HammerDwarf,
  OceanTraitor: OceanTraitor,
  ThunderTraitor: ThunderTraitor,
  Paladin: Paladin,
  TundraSkeleton: TundraSkeleton,
  Wizard: Wizard,
  GiantSpider: GiantSpider,
  Golem: Golem,
  Siren: Siren,
  OwlGuardian: OwlGuardian,
  TreeGuardian: TreeGuardian,
  Vortex: Vortex,
  Raid: Raid,
  TundraRider: TundraRider,
  DragonTreasure: DragonTreasure,
};

export function loadAllCardModelsImages() {
  for (const cardModel of cardModelsList) {
    cardModel.image = cardModelImages[cardModel.name.replaceAll(" ", "")];
  }
}
