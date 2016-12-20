import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Actions from '../../actions';
import APP_ACTIONS from '../../constants/app-actions';
import CheckoutSuccessForm from '../../components/checkout-steps/checkout-success-form';
import CheckoutStepCalculator from '../../services/checkout-step-calculator';
import APP_ROUTES from '../../constants/app-routes';

const mapStateToProps = (state, ownProps) => {
  return {
    order: state.order,
    placedOrder: state.placedOrder
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAsPlaced: (order) => {
      dispatch(Actions.addPlacedOrder(order));
    },

    setCurrentCheckoutStep: () => {
      dispatch({
        type: APP_ACTIONS.SET_CURRENT_CHECKOUT_STEP,
        payload: 'complete'
      });
    },

    handleCheckoutStepNotEditable: (order) => {
      const previousStep = CheckoutStepCalculator.previous(order.checkout_steps, 'complete');

      dispatch ( push(APP_ROUTES.checkout[`${ previousStep }PageRoute`]));
    },

    clearOrder: () => {
      dispatch (Actions.clearOrder());
    }
  };
};

const CheckoutSuccessConnector = connect(mapStateToProps, mapDispatchToProps)(CheckoutSuccessForm);

export default CheckoutSuccessConnector;
