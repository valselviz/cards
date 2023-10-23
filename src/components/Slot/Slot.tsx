import styles from './Slot.module.css'

import {Card} from '../../game-core/cards'
import { Zone } from '../../game-core/zones';
import CardBox from '../CardBox/CardBox';

interface SlotProps {
    position: number;
    card?: Card;
}

export default function Slot({position, card}: SlotProps) {
    return <div className={styles['slot']}>
        {
            card && <CardBox key={position} card={card}/>
        }
    </div>
};