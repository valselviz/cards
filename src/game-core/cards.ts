
import { Duel } from './duel';
import { Zone } from './zones';

export class CardModel {
    name: string
    
    constructor(name: string) {
        this.name = name;
    }

    invoke(card: Card) {
        console.log('Card invokation method was not override')
    }
}

export class Card {
    model: CardModel;
    duel: Duel;
    playerId: number;
    zone: Zone;

    constructor(model: CardModel, duel: Duel, playerId: number) {
        this.model = model;
        this.duel = duel;
        this.playerId = playerId;
        this.zone = Zone.Deck;
    }
}
