import React, { Component } from 'react';
import { Field } from 'redux-form';

import LineItem from '../../order/line-item';

class Shipment extends Component {
  componentDidMount () {
    this.setShipmentIdInHiddenField(this.props.shipment.id);
  };

  renderHiddenFieldForShipmentId (field) {
    this.onChangeCallbackForShipmentId = field.input.onChange;
    return <input {...field.input} value={this.props.shipment.id} type="hidden"/>
  };

  /*
  :DIRTY HACK:
  Redux-form form doesn't support hidden fields. So, we create a hidden field
  and manually trigger its onChange to set the value in redux-form reducer.
  */
  setShipmentIdInHiddenField(value) {
    this.onChangeCallbackForShipmentId(value);
  };

  _shipmentLineItemsMarkup() {
    let thisShipment = this.props.shipment;

    let shipmentLineItems = this.props.orderLineItems.filter((lineItem) => {
      return (lineItem.variant_id !== thisShipment.manifest.variant_id);
    });

    return shipmentLineItems.map((lineItem, idx) => {
      return <LineItem lineItem={ lineItem } key={ idx } />
    });
  };

  render() {
    let shipment = this.props.shipment;

    let shipmentMarkup = shipment.shipping_rates.map((shippingRate, idx) => {
      let label = `${ shippingRate.name }( ${ shippingRate.display_cost } )`;
      return (
        <div key={ idx } className="form-group">
          <div className="radio inline">
            <label>
              <Field name={ `${ this.props.fieldNamePrefix }[selected_shipping_rate_id]` }
                    component="input"
                    type="radio"
                    value={ `${shippingRate.id}` } />
              { shippingRate.name }
              ( { shippingRate.display_cost } )
            </label>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="form-heading-title">
            { `Shipment - ${ this.props.shipmentIndex }` }
          </div>
          <p>Please select a shipping method for these Items.</p>
          { this._shipmentLineItemsMarkup() }
          { shipmentMarkup }

          <Field name={ `${ this.props.fieldNamePrefix }[id]` } component={this.renderHiddenFieldForShipmentId.bind(this)} />
        </div>
      </div>
    );
  };
};

export default Shipment;
