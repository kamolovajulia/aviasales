import React from "react";

import Ticket from "./ticket/ticket";
import Message from "../message/message";

import styles from './tickets-container.module.scss';


const TicketsContainer = ({tickets}) => {
    let elements = tickets.map(el=>{
        let myKey = `${el.carrier}${el.price}${el.segments[0].origin}${el.segments[0].destination}${el.segments[0].duration}${el.segments[0].stops.join('')}
        ${el.segments[1].origin}${el.segments[1].destination}${el.segments[1].duration}${el.segments[1].stops.join('')}`;
        return <Ticket state={el} key={myKey} myKey={myKey}/>
    })
    return (
        <div className={styles.container} >
            {elements.length > 0 ? elements : <Message />}
        </div>
    )
}

export default TicketsContainer;
   