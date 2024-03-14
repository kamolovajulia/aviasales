import {connect} from 'react-redux';

import {showTicketsWithOneStopCreator, showAllTicketsCreator} from '../../redux/actions';

import AdditionalFilters from './additional-filters';

const mapStateToProps = (state) => ({
    state: state.additionalFilters
})
const mapDispatchToProps = (dispatch) => ({
    showMoreTicketsToggleOneParam: (name1, value1, nameAll, valueAll) => dispatch(showTicketsWithOneStopCreator(name1, value1, nameAll, valueAll)),
    showAllTickets: (value) => dispatch(showAllTicketsCreator(value))
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdditionalFilters);