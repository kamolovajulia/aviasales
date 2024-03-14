import React from 'react';
import styles from './checkbox.module.scss';

function Checkbox(props) {
    return (
        <li className={styles.checkfilter}>
            <label className={styles.checklabel} id={props.name}>
                <input
                    type='checkbox'
                    className={styles.checkbox}
                    onClick={props.countChecked}
                    ref={props.el}
                    id={props.name}
                    defaultChecked={props.checked}
                />
                <span className={styles.checkname}>{props.value}</span>
            </label>
        </li>
    );
}

export default Checkbox;
