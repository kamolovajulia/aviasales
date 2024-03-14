import Segment from "./segment/segment";

import styles from './segments-of-time.module.scss';

const SegmentsOfTime = ({state, myKey}) => {
    let elements = state.map((el, index)=><Segment state={el} 
        key={`${myKey}${index}`}/>)
    return (
        <div className={styles.segments}>{elements}</div>
    );
}

export default SegmentsOfTime;