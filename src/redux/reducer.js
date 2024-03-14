import {SET_TICKETS, SET_SEARCH_ID, LOADED_TRUE, INCREASE_LIMIT_TICKETS, 
    CHANGE_FILTER, CHEAPEST_TICKETS, FASTEST_TICKETS, SHOW_ONE_STOP, SHOW_ALL_TICKETS} from './constants';
import {setSearchIdCreator, setTicketsCreator, loadedTrueCreator} from './actions';
import { sortByPrice, sortByTime } from '../utils/utils';

const initialState = {
    searchId: null,
    tickets: [],
    loaded: false,
    limit: 5,
    limitTickets: [],
    currentFilterType: CHEAPEST_TICKETS,
    additionalFilters: {
        all: true,
        without: true,
        one: true,
        two: true,
        three: true
    },
    partTickets: {
        all: [],
        without: [],
        one: [],
        two: [],
        three: []
    }
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_ID: return {...state, searchId: action.id}
        case SET_TICKETS: {
            state.tickets.push(...action.body);
            if (state.currentFilterType == FASTEST_TICKETS) {
                let array = sortByTime(state.tickets);
                return {...state, tickets: [...array], limitTickets: array.slice(0, 5), loaded: true};
            }
            if (state.currentFilterType == CHEAPEST_TICKETS)
            sortByPrice(state.tickets);
            return {...state, limitTickets: state.tickets.slice(0, 5), loaded: true};
        }
        case LOADED_TRUE: {
            state.tickets.sort(function (a, b) {
                return a.price - b.price;
            });
            state.tickets.filter(el => {
                let arr = el.segments;
                state.partTickets.all = [...state.tickets];
                if (arr[0].stops.length == 0 && arr[1].stops.length == 0) state.partTickets.without.push(el);
                if (arr[0].stops.length == 1 && arr[1].stops.length == 1) state.partTickets.one.push(el);
                if (arr[0].stops.length == 2 && arr[1].stops.length == 2) state.partTickets.two.push(el);
                if (arr[0].stops.length == 3 && arr[1].stops.length == 3) state.partTickets.three.push(el);
            })
            return {...state, loaded: true, limitTickets: state.tickets.slice(0, state.limit)}
        }
        case INCREASE_LIMIT_TICKETS: {
            state.limit = state.limit+5;
            return {...state, limitTickets: state.tickets.slice(0, state.limit) }
        }
        case CHANGE_FILTER: {
            if (action.filter === FASTEST_TICKETS) {
                let arr = sortByTime(state.tickets);
                return {...state, currentFilterType: action.filter, limit: 5, limitTickets: arr.slice(0, 5), tickets: [...arr]};
            } else
            if (action.filter === CHEAPEST_TICKETS)
                sortByPrice(state.tickets);
            return {...state, currentFilterType: action.filter, limit: 5, limitTickets: state.tickets.slice(0, 5)};
        }
        case SHOW_ONE_STOP: {
            let array = [];
            let newTicketsArray;
            if (action.nameAll) {
                state.additionalFilters = {...state.additionalFilters, [action.name1]: action.value1, [action.nameAll]: action.valueAll};
                if (action.valueAll) {
                if (state.currentFilterType === CHEAPEST_TICKETS) {
                    newTicketsArray = sortByPrice(state.partTickets.all);
                } else 
                if (state.currentFilterType === FASTEST_TICKETS) {
                    newTicketsArray = sortByTime(state.partTickets.all);
                }
                return {...state, tickets: [...newTicketsArray], limit: 5, limitTickets: newTicketsArray.slice(0, 5)}
                }
            }
            state.additionalFilters = {...state.additionalFilters, [action.name1]: action.value1};
            for (let part in state.additionalFilters) {
                if (state.additionalFilters[part] == true)
                array.push(...state.partTickets[part]);
            }
            if (state.currentFilterType === CHEAPEST_TICKETS) {
                newTicketsArray = sortByPrice(array);
            } else 
            if (state.currentFilterType === FASTEST_TICKETS) {
                newTicketsArray = sortByTime(array);
            }
            return {...state, tickets: [...newTicketsArray], limit: 5, limitTickets: newTicketsArray.slice(0, 5)};
        }
        case SHOW_ALL_TICKETS: {
            let newTicketsArray;
            state.additionalFilters = {
                all: action.value,
                without: action.value,
                one: action.value,
                two: action.value,
                three: action.value};
            if (action.value) {
                if (state.currentFilterType === CHEAPEST_TICKETS) {
                    newTicketsArray = sortByPrice(state.partTickets.all);
                } else 
                if (state.currentFilterType === FASTEST_TICKETS) {
                    newTicketsArray = sortByTime(state.partTickets.all);
                }
                return {...state,
                tickets: [...newTicketsArray],
                limit: 5,
                limitTickets: newTicketsArray.slice(0, 5)
                }
            }
            else return {...state,
                tickets: [],
                limit: 5,
                limitTickets: []
                }
        }
        default: {
            return state;
        }
    }
}


export const getSearchIdCreator = () => {
    return (dispatch) => {
        fetch(`https://aviasales-test-api.kata.academy/search`)
        .then(response=>response.json())
        .then(result=>{
            dispatch(setSearchIdCreator(result.searchId)); 
            return result.searchId
        })
        .then(searchId=>dispatch(getTicketsThunkCreator(searchId)))
    }
}

export const getTicketsThunkCreator = (searchId) => {
    let status;
    return (dispatch) => {
            fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
            .then(response=> {
              status = response.ok;
              return response.json();
            })
            .then(result=>{
              if (!result.stop) dispatch(setTicketsCreator(result.tickets));
              if (!status || !result.stop) setTimeout (dispatch(getTicketsThunkCreator(searchId)), 3000);
              if (result.stop) {
                dispatch(loadedTrueCreator());
              }
            })
            .catch(e=>
                !e.ok ? setTimeout(dispatch(getTicketsThunkCreator(searchId)), 3000) : 
                console.log(e))
    }
}

export default Reducer;