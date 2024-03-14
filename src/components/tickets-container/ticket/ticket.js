import SegmentsOfTime from '../../segments-of-time/segments-of-time';
import styles from './ticket.module.scss';

const Ticket = ({state, myKey}) => {
    let price = String(state.price).split('');
    price.splice(price.length - 3, 0, ' ');
    price = price.join('');

    let logo = `http://pics.avs.io/99/36/${state.carrier}.png`;
    
    return (
        <div className={styles.ticket}>
            <div className={styles.info}>
                <span className={styles.price}>{`${price} P`}</span>
                <img src={logo} className={styles.logo} alt='logo'/>
            </div>
            <SegmentsOfTime state={state.segments} myKey={myKey}/>
        </div>
    );
}

export default Ticket;