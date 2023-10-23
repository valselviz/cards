import Slot from '../Slot/Slot'
import {Card} from '../../game-core/cards'

import styles from './CardsRow.module.css'

interface CardsRowProps {
  cards: Card[]
}

export default function CardsRow({cards}: CardsRowProps) {
  const cardBoxes: JSX.Element[] = []
  for (let i = 0; i < 5; i++) {
    const card = cards[i];
    cardBoxes.push(<Slot key={i} position={i} card={card}/>);
  }
  return (
    <div className={styles['cardsRow']}>
      {cardBoxes}
    </div>
  );
}
