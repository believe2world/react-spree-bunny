import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Actions from '../../actions';
import APP_ACTIONS from '../../constants/app-actions';
import DeliveryForm from '../../components/checkout-steps/delivery-form';
import CheckoutStepCalculator from '../../services/checkout-step-calculator';
import APP_ROUTES from '../../constants/app-routes';

const mapStateToProps = (state, ownProps) => {
  return {
    order: state.order
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentCheckoutStep: () => {
      dispatch ({
        type: APP_ACTIONS.SET_CURRENT_CHECKOUT_STEP,
        payload: 'delivery'
      });
    },

    handleDeliveryFormSubmit: (formData, order) => {
      dispatch (Actions.goToNextStep(order, formData));
    },

    handleCheckoutStepNotEditable: (order) => {
      const previousStep = CheckoutStepCalculator.previous(order.checkout_steps, 'delivery');

      dispatch ( push(APP_ROUTES.checkout[`${ previousStep }PageRoute`]));
    }
  };
};

const DeliveryFormConnector = connect(mapStateToProps, mapDispatchToProps)(DeliveryForm);

export default DeliveryFormConnector;
