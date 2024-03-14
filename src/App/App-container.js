import {connect} from 'react-redux';
import {getSearchIdCreator} from '../redux/reducer';
import {increaseLimitTicketsCreator} from '../redux/actions';
import App from './App';

const mapStateToProps = (state) => ({
    loaded: state.loaded
  })
  const mapDispatchToProps = (dispatch) => ({
    getSearchId: () => dispatch(getSearchIdCreator()),
    addMoreTickets: () => dispatch(increaseLimitTicketsCreator())
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);