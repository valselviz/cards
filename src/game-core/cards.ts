
import { useContext } from 'react';
import { Zone } from './zones';

export class CardModel {
    name: string;
    attack: number;
    defense: number;
    invoke: (card: Card) => void;
    
    constructor(name: string, attack: number, defense: number, invoke?: (card: Card) => void) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;

        if (invoke) {
            this.invoke = invoke;
        } else {
            this.invoke = (card) => {
                console.log('This card can not be invoked')
            }
        }

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

// Duel class should not depend on react
// It could be implemented:
//  - using react states
//    EG: to fit into a react application
//  - using simple js objects
//    EG: to allow a node js script to execute hundreds of duels in seconds
export class Duel {

    removeFromHand(card: Card) {}

    placeOnField(card: Card) {}
    
}