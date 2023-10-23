import {rndInt} from '../../game-core/utils';
import {Card, CardModel} from '../../game-core/cards'
import { Zone } from '../../game-core/zones';
import { useState } from 'react';
import { ReactDuel } from '../../react-duel/ReactDuel';
import CardsRow from '../CardsRow/CardsRow';
import Hand from '../Hand/Hand';

import styles from './DuelComp.module.css'


interface DuelCompProps {
  cardModelDeck0: CardModel[];
  cardModelDeck1: CardModel[];
}

export default function DuelComp({cardModelDeck0, cardModelDeck1}: DuelCompProps) {
  
    // 0 or 1, depending on what player is currently playing his turn
    const [turn, setTurn] = useState(0)

    // True if wating for a player action. False it the game is executing something
    const [idle, setIdle] = useState(false)

    const [deck0, setDeck0] = useState<Card[]>([]);
    const [deck1, setDeck1] = useState<Card[]>([]);
    const [hand0, setHand0] = useState<Card[]>([]);
    const [hand1, setHand1] = useState<Card[]>([]);
    const [field0, setField0] = useState<Card[]>([]);
    const [field1, setField1] = useState<Card[]>([]);

    const duel: ReactDuel = new ReactDuel(
      turn,
      setTurn,
      idle,
      setIdle,
      [deck0, deck1],
      [setDeck0, setDeck1],
      [hand0, hand1],
      [setHand0, setHand1],
      [field0, field1],
      [setField0, setField1]
    );

    setDeck0(cardModelDeck0.map(model => new Card(model, duel, 0)));
    setDeck1(cardModelDeck1.map(model => new Card(model, duel, 1)));

    
    console.log(cardModelDeck0.map(model => new Card(model, duel, 0)))
    console.log(deck0)

    for (let i = 0; i < 5; i++) {
      duel.draw(0);
      duel.draw(1);
    }

    setIdle(true);
    
    return (
      <div>
        <div className={styles["field"]}>
          <CardsRow cards={duel.fields[0]} />
          <CardsRow cards={duel.fields[1]} />
        </div>
        <Hand cards={duel.hands[0]} />
      </div>
    );
}
