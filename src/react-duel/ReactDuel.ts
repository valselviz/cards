
import { Dispatch, SetStateAction, useContext } from 'react';
import { Zone } from '../game-core/zones';
import { Card, Duel } from '../game-core/cards';
import { rndInt } from '../game-core/utils';

export class ReactDuel extends Duel {
    turn: number;
    setTurn: Dispatch<SetStateAction<number>>;
    idle: boolean;
    setIdle: Dispatch<SetStateAction<boolean>>;
    decks: Card[][];
    setDecks: Dispatch<SetStateAction<Card[]>>[];
    hands: Card[][];
    setHands: Dispatch<SetStateAction<Card[]>>[];
    fields: Card[][];
    setFields: Dispatch<SetStateAction<Card[]>>[];

    constructor(
        turn: number,
        setTurn: Dispatch<SetStateAction<number>>,
        idle: boolean,
        setIdle: Dispatch<SetStateAction<boolean>>,
        decks: Card[][], 
        setDecks: Dispatch<SetStateAction<Card[]>>[],
        hands: Card[][], 
        setHands: Dispatch<SetStateAction<Card[]>>[],
        fields: Card[][], 
        setFields: Dispatch<SetStateAction<Card[]>>[])
    {
        super()
        this.turn = turn;
        this.setTurn = setTurn;
        this.idle = idle;
        this.setIdle = setIdle;
        this.decks = decks;
        this.setDecks = setDecks;
        this.hands = hands;
        this.setHands = setHands;
        this.fields = fields;
        this.setFields = setFields;
    }

    removeFromHand(card: Card) {
        const position = this.hands[card.playerId].indexOf(card);
        this.setHands[card.playerId](oldHand => oldHand.splice(position, 1))
    }

    placeOnField(card: Card) {
        card.zone = Zone.Field;
        this.setFields[card.playerId](oldField => {
            oldField.push(card)
            return oldField;
        });
    }

    draw(playerId: number) {
        const deckPosition = rndInt(this.decks[playerId].length);
        const card = this.decks[playerId][deckPosition];
        this.setDecks[playerId](oldDeck => oldDeck.splice(deckPosition, 1));
        card.zone = Zone.Hand;
        this.setHands[card.playerId](oldHand => {
            oldHand.push(card)
            return oldHand;
        });
    }
}



