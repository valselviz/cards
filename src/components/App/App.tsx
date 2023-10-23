import React, { useState } from 'react';
import CardsRow from '../CardsRow/CardsRow';
import Hand from '../Hand/Hand';
import getRandomCardModel from '../../game-core/card-types/card-types';
import { ReactDuel } from '../../react-duel/ReactDuel';
import DuelComp from '../DuelComp/DuelComp';
import { CardModel } from '../../game-core/cards';

function App() {
  const deck0 = [];
  const deck1 = [];
  for (let i = 0; i < 50; i++) {
    deck0.push(getRandomCardModel());
    deck1.push(getRandomCardModel());
  }

  return <DuelComp cardModelDeck0={deck0} cardModelDeck1={deck1} />;
}

export default App;
