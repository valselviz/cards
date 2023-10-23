import styles from './CardBox.module.css'

import {Card} from '../../game-core/cards'
import { Zone } from '../../game-core/zones';

interface CardBoxProps {
    card: Card;
}

export default function CardBox({card}: CardBoxProps) {

    function useCard() {
        console.log('Attempt to use card: ' + card.model.name);
        if (card.duel.idle && card.duel.turn == card.playerId) {
            if (card.zone == Zone.Hand) {
                card.model.invoke(card);
            }
        }
    }

    return <div className={styles['card-box']} onClick={useCard}>
        {card?.model.name}
    </div>
};