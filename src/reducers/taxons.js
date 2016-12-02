import APP_ACTIONS from '../constants/app-actions';

const initialState = [];

const taxons = function(state = initialState, action) {
  switch (action.type) {
    case APP_ACTIONS.ADD_TAXONS:
      return Object.assign( [], action.payload);
    default:
      return state;
  }
}

export default taxons;
