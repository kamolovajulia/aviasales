import styles from './segment.module.scss';

import { add } from "date-fns";

const Segment = ({state}) => {
    const originDate = new Date(state.date);
    const durationDate = add(originDate, {
        minutes: state.duration
      })
    let durationTime = durationDate.getHours().toString().padStart(2, '0') + ':' + durationDate.getMinutes().toString().padStart(2, '0');
    let originTime = originDate.getHours().toString().padStart(2, '0') + ':' + originDate.getMinutes().toString().padStart(2, '0');
    
    let count = state.stops.length;
    let countWords;
    if (count > 4) countWords = `${count} ПЕРЕСАДОК`;
    if (count > 1 && count <= 4) countWords = `${count} ПЕРЕСАДКИ`;
    if (count == 1) countWords = `${count} ПЕРЕСАДКА`;
    if (count == 0) countWords = 'ПЕРЕСАДКИ';
    
    return (
    <div className={styles.segment}>
        <div className={styles.name}>
            <span className={styles.item}>{`${state.origin} - ${state.destination}`}</span>
            <span className={styles.item}>В ПУТИ</span>
            <span className={styles.item}>{countWords}</span>
        </div>
        <div className={styles.value}>
            <span className={styles.item}>{`${originTime} - ${durationTime}`}</span>
            <span className={styles.item}>{`${Math.floor(state.duration/60)}ч ${state.duration%60}м`}</span>
            <span className={styles.item}>{state.stops.length == 0 ? '-' : state.stops.join(', ')}</span>
        </div>
    </div>
)
}

export default Segment;