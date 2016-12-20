import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import Layout from "../layout";
import BaseCheckoutLayout from "./base-checkout-layout";
import Shipment from './delivery/shipment';
import CheckoutStepCalculator from '../../services/checkout-step-calculator';

class DeliveryForm extends Component {

  /* Render this step only if order is present and in a valid checkout state. */
  componentWillMount() {
    let order = this.props.order;

    if (!CheckoutStepCalculator.isStepEditable(order.checkout_steps, 'delivery', order.state)){
      this.props.handleCheckoutStepNotEditable(order);
    }
  };

  componentDidMount() {
    this.props.setCurrentCheckoutStep();
  };

  handleDeliveryFormSubmit (formData) {
    this.props.handleDeliveryFormSubmit(formData, this.props.order);
  };

  render() {
    let shipments = this.props.order.shipments;
    const { handleSubmit, valid, submitting } = this.props;

    let shipmentsMarkup = shipments.map((shipment, idx) => {
      return (
        <Shipment shipment={ shipment }
                  key={ idx }
                  shipmentIndex={ idx + 1 }
                  orderLineItems={ this.props.order.line_items }
                  fieldNamePrefix={`order[shipments_attributes][${ idx }]`} />
      );
    });

    return (
      <Layout>
        <BaseCheckoutLayout currentStep="delivery"
                            displayLoader={ this.props.displayLoader }
                            checkoutSteps={ this.props.order.checkout_steps || [] } >
          <form onSubmit={ handleSubmit(this.handleDeliveryFormSubmit.bind(this)) }>
            <div>
              { shipmentsMarkup }
            </div>

            <button type="submit"
                    className="btn btn-success btn-lg"
                    disabled={ !valid || submitting }>
                      Save Delivery Details
            </button>
          </form>
        </BaseCheckoutLayout>
      </Layout>
    );
  };
};

DeliveryForm = reduxForm({
  form: 'deliveryForm'
})(DeliveryForm);

const selector = formValueSelector('deliveryForm');
DeliveryForm = connect(
  state => {
    const shipments = state.order.shipments || [];
    const shipments_attributes = {};

    shipments.forEach((shipment, idx) => {
      shipments_attributes[idx] = { selected_shipping_rate_id: `${shipment.selected_shipping_rate.id}` }
    });

    return {
      initialValues: {
        order: {
          shipments_attributes
        }
      }
    };
  }
)(DeliveryForm)

export default DeliveryForm;
