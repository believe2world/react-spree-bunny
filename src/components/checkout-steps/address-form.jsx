import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, SubmissionError } from 'redux-form';

import Layout from "../layout";
import BaseCheckoutLayout from "./base-checkout-layout";
import AddressFieldsConnector from "../../containers/checkout-steps/address-fields-connector";
import CheckoutStepCalculator from '../../services/checkout-step-calculator';
import FormField from './shared/form-field';

class AddressForm extends Component {

  /* Render this step only if order is present and in a valid checkout state. */
  componentWillMount() {
    let order = this.props.order;

    if (!CheckoutStepCalculator.isStepEditable(order.checkout_steps, 'address', order.state)){
      this.props.handleOrderNotPresent();
    }
  };

  handleAddressFormSubmit (formData) {
    return this.props.handleAddressFormSubmit(formData, this.props.order).then((response) => {
    },
    (error) => {
      throw new SubmissionError({order: error.response.body.errors});
    });
  };

  componentDidMount () {
    this.props.setCurrentCheckoutStep();
    if (this.props.countries.length === 0) {
      this.props.fetchCountries();
    }
  };

  render() {
    const useBilling = this.props.useBilling;
    const { error, handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Layout>
        <BaseCheckoutLayout currentStep="address"
                            displayLoader={ this.props.displayLoader }
                            checkoutSteps={ this.props.order.checkout_steps || [] } >
          <form onSubmit={ handleSubmit(this.handleAddressFormSubmit.bind(this)) }>

            <div className="form-heading-title">General Info</div>
            <div className="form-group">
              <label htmlFor="order_email" className="col-sm-2 control-label">Email</label>
              <div className="col-sm-10">
                <Field name="order[email]" className="form-control" type="text" label="Email" component={FormField.inputFieldMarkup} />
                <Field name="order[email]" component="input" type="text" id="order_email" />
              </div>
            </div>

            <div className="form-heading-title">Billing Info</div>
            <AddressFieldsConnector fieldNamePrefix="order[bill_address_attributes]"
                                    countries={ this.props.countries } />
            <div className="form-group">
              <div className="col-sm-10 col-sm-offset-2">
                <label className="checkbox inline">
                  <Field name="order[use_billing]" component="input" type="checkbox" />
                  Ship to billing address
                </label>
              </div>
            </div>


            {
              !useBilling &&

              <AddressFieldsConnector fieldNamePrefix="order[ship_address_attributes]"
                                      countries={ this.props.countries } >
                <div className="form-heading-title">Shipping Info</div>
              </AddressFieldsConnector>
            }

            <div className="form-group">
              <div className="col-sm-10 col-sm-offset-2">
                <label className="checkbox inline">
                  <Field name="save_user_address" component="input" type="checkbox" id="save_user_address" />
                  Remember this Address
                </label>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-10 col-sm-offset-2">
                <button type="submit" className="btn btn-success">Submit</button>
              </div>
            </div>
          </form>
        </BaseCheckoutLayout>
      </Layout>
    );
  };

  // def shipping_eq_billing_address?
  //     (bill_address.empty? && ship_address.empty?) || bill_address.same_as?(ship_address)
  //   end
};

AddressForm = reduxForm({
  form: 'addressForm'
})(AddressForm);

const selector = formValueSelector('addressForm');
AddressForm = connect(
  state => {
    const useBilling = selector(state, 'order[use_billing]');
    const billAddress = state.order.bill_address || {};
    const shipAddress = state.order.ship_address || {};
    return {
      useBilling,
      initialValues: {
        save_user_address: true,
        order: {
          use_billing: true,
          email: state.order.email,
          bill_address_attributes: {
            address1: billAddress.address1,
            address2: billAddress.address2,
            firstname: billAddress.firstname,
            lastname: billAddress.lastname,
            city: billAddress.city,
            country_id: billAddress.country_id,
            state_id: billAddress.state_id,
            zipcode: billAddress.zipcode,
            phone: billAddress.phone
          },
          ship_address_attributes: {
            address1: shipAddress.address1,
            address2: shipAddress.address2,
            firstname: shipAddress.firstname,
            lastname: shipAddress.lastname,
            city: shipAddress.city,
            country_id: shipAddress.country_id,
            state_id: shipAddress.state_id,
            zipcode: shipAddress.zipcode,
            phone: shipAddress.phone,
          }
        }
      }
    };
  }
)(AddressForm)

export default AddressForm;
