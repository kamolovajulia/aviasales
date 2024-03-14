import {SET_TICKETS, SET_SEARCH_ID, LOADED_TRUE, INCREASE_LIMIT_TICKETS, CHANGE_FILTER, SHOW_ONE_STOP, SHOW_ALL_TICKETS} from './constants';

export const setSearchIdCreator = (id) => ({type: SET_SEARCH_ID, id})
export const setTicketsCreator = (body) => ({type: SET_TICKETS, body})
export const loadedTrueCreator = () => ({type: LOADED_TRUE})

export const increaseLimitTicketsCreator =() => ({type: INCREASE_LIMIT_TICKETS})
export const changeFilterCreator = (filter) => ({type: CHANGE_FILTER, filter})

export const showAllTicketsCreator = (value) => ({type: SHOW_ALL_TICKETS, value})
export const showTicketsWithOneStopCreator = (name1, value1, nameAll, valueAll) => ({type: SHOW_ONE_STOP, name1, value1, nameAll, valueAll})
