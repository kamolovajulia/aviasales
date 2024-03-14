import {connect} from 'react-redux';

import {changeFilterCreator} from '../../redux/actions';

import Filters from './filters';

const mapStateToProps = (state) => ({
    currentFilter: state.currentFilterType
  })
  const mapDispatchToProps = (dispatch) => ({
    changeFilter: (filter) => dispatch(changeFilterCreator(filter))
  })
  
export default connect(mapStateToProps, mapDispatchToProps)(Filters);