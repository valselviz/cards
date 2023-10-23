
interface CardModel {
    name: string
}

interface Card {
    model: CardModel
}

export class Duel {
  decks: Card[];
  fields: Card[];
  hands: Card[];

  constructor(deck0: CardModel[], deck1: CardModel[]) {

    // TODO 
    // set in the decks array an array of Cards created from the incomming array of CardModels

    this.decks = [];
    this.fields = [];
    this.hands = [];
    
  }
}
