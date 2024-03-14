import preloader from '../../assets/preloader.svg';
import styles from './preloader.module.scss';

const Preloader = () => (
    <img src={preloader} className={styles.preloader} alt='Loading' />
)

export default Preloader;