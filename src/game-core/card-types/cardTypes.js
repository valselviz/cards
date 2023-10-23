import { rndInt } from "../utils";

export const cardTypes = {
  Elf: {
    name: "Elf",
    atk: 10,
    def: 10,
  },
  Wizard: {
    name: "Wizard",
    atk: 15,
    def: 15,
  },
  Dragon: {
    name: "Dragon",
    atk: 20,
    def: 20,
  },
};

export default function getRandomCard() {
  const keys = Object.keys(cardTypes);
  return cardTypes[keys[rndInt(keys.length)]];
}
