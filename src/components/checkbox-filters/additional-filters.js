import { useRef, useState } from "react";

import styles from "./additional-filters.module.scss";
import Checkbox from "./checkbox/checbox";

const AdditionalFilters = (props) => {
  const AllCheckbox = useRef(null);
  const WithoutCheckbox = useRef(null);
  const OneCheckbox = useRef(null);
  const TwoCheckbox = useRef(null);
  const ThreeCheckbox = useRef(null);

  const [checkedAll, setCheckedAll] = useState(props.state.all);
  const [checkedWithout, setCheckedWithout] = useState(props.state.without);
  const [checkedOne, setCheckedOne] = useState(props.state.one);
  const [checkedTwo, setCheckedTwo] = useState(props.state.two);
  const [checkedThree, setCheckedThree] = useState(props.state.three);
  
  let checkboxes = [WithoutCheckbox, OneCheckbox, TwoCheckbox, ThreeCheckbox];
    let countChecked = (e) => {
        let checkedCount = 0;
        let value;
        if (e.target.id == 'without') {
            value = !checkedWithout
            setCheckedWithout(value)
        }
        if (e.target.id == 'one') {
            value = !checkedOne
            setCheckedOne(value)
        }
        
        if (e.target.id == 'two') {
            value = !checkedTwo
            setCheckedTwo(value)
        }
        
        if (e.target.id == 'three') {
            value = !checkedThree
            setCheckedThree(value)
        }
        
        for (let el of checkboxes) {
          console.log(checkboxes)
          if (el.current.checked === true)
            checkedCount += 1;
        }
        
        let boolean = null;
        if (checkedCount > checkboxes.length-1)
            boolean = true;
        if (checkedCount >= 0 && checkedCount < checkboxes.length)
            boolean = false;
        if (checkedAll != boolean)
          setCheckedAll(boolean)
        else boolean = null;

        if (boolean != null)
          props.showMoreTicketsToggleOneParam(e.target.id, value, 'all', boolean) 
        else props.showMoreTicketsToggleOneParam(e.target.id, value)
    }
  
  let AllChecked = () => {
    setCheckedAll(!checkedAll);
    setCheckedWithout(!checkedAll);
    setCheckedOne(!checkedAll);
    setCheckedTwo(!checkedAll);
    setCheckedThree(!checkedAll);

    props.showAllTickets(!checkedAll);
  }

  return (
    <div className={styles.group}>
      <label className={styles.group__label}>Количество пересадок</label>
      <ul className={styles.checkfilters}>
        <Checkbox name='all' countChecked={AllChecked} el={AllCheckbox} checked={checkedAll} value='Все'/>
        <ul className={styles.smallFilters}>
          <Checkbox name='without' countChecked={(e)=>countChecked(e)} el={WithoutCheckbox} checked={checkedWithout} value='Без пересадок'/>
          <Checkbox name='one' countChecked={(e)=>countChecked(e)} el={OneCheckbox} checked={checkedOne} value='1 пересадка'/>
          <Checkbox name='two' countChecked={(e)=>countChecked(e)} el={TwoCheckbox} checked={checkedTwo} value='2 пересадки'/>
          <Checkbox name='three' countChecked={(e)=>countChecked(e)} el={ThreeCheckbox} checked={checkedThree} value='3 пересадки'/>
        </ul>
      </ul>
    </div>
  );
};

export default AdditionalFilters;