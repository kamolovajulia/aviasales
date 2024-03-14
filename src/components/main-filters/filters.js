import {useState} from 'react';
import {CHEAPEST_TICKETS, FASTEST_TICKETS} from '../../redux/constants';
import styles from './filters.module.scss';

const Filters = (props) => {
    
const [activeButton, setActiveButton] = useState(props.currentFilter);

const firstButtonPressed = () => {
    setActiveButton(CHEAPEST_TICKETS);
    props.changeFilter(CHEAPEST_TICKETS);
}

const secondButtonPressed = () => {
    setActiveButton(FASTEST_TICKETS);
    props.changeFilter(FASTEST_TICKETS);
}

return (
    <div className={styles.filters}>
        <button className={`${styles.filter__left} ${styles.filter} ${activeButton === CHEAPEST_TICKETS ? styles.active  : null}`} onClick={firstButtonPressed}>Самый дешевый</button>
        <button className={`${styles.filter} ${styles.filter__middle} ${activeButton === FASTEST_TICKETS ? styles.active  : null}`} onClick={secondButtonPressed}>Самый быстрый</button>
        <button className={`${styles.filter} ${styles.filter__right}`}>Оптимальный</button>
    </div>
)
};

export default Filters;
   