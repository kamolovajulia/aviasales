import {connect} from 'react-redux';
import TicketsContainer from './tickets-container';

const mapStateToProps = (state) => ({
    tickets: state.limitTickets
})
  
export default connect(mapStateToProps)(TicketsContainer);