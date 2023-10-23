import CardBox from '../CardBox/CardBox'
import styles from './Hand.module.css'
import {Card} from '../../game-core/cards'

interface HandProps {
  cards: Card[]
}

export default function Hand({cards}: HandProps) {
  console.log(cards)
  return (
    <div className={styles['hand']}>
      {cards.map((card, index) => <CardBox key={index} card={card}/>)}
    </div>
  );
}
