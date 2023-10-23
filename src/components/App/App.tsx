import React from 'react';
import { Duel } from '../../game-core/duel';
import CardsRow from '../CardsRow/CardsRow';
import Hand from '../Hand/Hand';
import './App.css';
import getRandomCard from '../../game-core/card-types/cardTypes';

function App() {
  const deck0 = [];
  const deck1 = [];
  for (let i = 0; i < 50; i++) {
    deck0.push(getRandomCard());
    deck1.push(getRandomCard());
  }

  const duel = new Duel(deck0, deck1);

  return (
    <div>
      <div className="field">
        <CardsRow cards={duel.fields[0]} />
        <CardsRow cards={duel.fields[1]} />
      </div>
      <Hand cards={duel.hands[0]} />
    </div>
  );
}

export default App;
