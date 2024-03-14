import React, { useEffect } from 'react';

import ComponentTicketsContainer from '../components/tickets-container/component-tickets-container';
import ComponentAdditionalFilters from '../components/checkbox-filters/component-additional-filters';
import ComponentMainFilters from '../components/main-filters/component-main-filters';
import Preloader from '../components/preloader/preloader';

import styles from './App.module.scss';
import logo from '../assets/logo-aviasales.svg';


const App = (props) => {

useEffect (()=>props.getSearchId(), []);

  return (
      <div className={styles.content}>
        <header className={styles.content__logo}>
          <img src={logo} className={styles.logo} alt='logo-aviasales'/>
        </header>
        <div className={styles.content__main}>
          <aside>
            <ComponentAdditionalFilters />
          </aside>
          <main>
            <ComponentMainFilters />
            {props.loaded ? <ComponentTicketsContainer /> : <Preloader />}
            <button className={styles.showTickets} onClick={props.addMoreTickets}>ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!</button>
          </main>
        </div>
      </div>
  );
}

export default App;
 