import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import Modal from './shared/modal';
import FlashConnector from '../containers/flash-connector';

class userLogin extends Component {

  handleFormSubmit (formData) {
    this.props.submitLoginForm(formData).then((response) => {
      this.closeModal();
    },
    (error) => {});
  };

  closeModal () {
    this.props.closeModal();
    /* Reset the redux form when modal is closed */
    this.props.reset();
  };

  render() {
    const { handleSubmit, valid, submitting } = this.props;

    return (
      <Modal modalClasses="user-form-modal" showModal={ this.props.showModal } closeModal={ this.closeModal.bind(this) } >
        <div className="center-block user-form-process">
          <div className="cmn-user-form">
            <div className="form-heading-title center-heading no-border big">Login</div>
            <FlashConnector />
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
              <div className="form-group row no-margin">
                <label className="col-sm-12 control-label">
                  Email
                </label>
                <div className="col-sm-12">
                  <Field className="form-control"
                      name="user[email]"
                      component="input"
                      type="text" />
                </div>
              </div>

              <div className="form-group clearfix">
                <label className="col-sm-12 control-label">
                  Password
                </label>
                <div className="col-sm-12">
                  <Field className="form-control"
                      name="user[password]"
                      component="input"
                      type="password" />
                </div>
              </div>

              <div className="form-group clearfix">
                <div className="col-sm-12 text-center">
                  <button type="submit"
                          disabled={ !valid || submitting }
                          className="btn btn-success btn-lg btn-common">
                          Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  };
};

userLogin = reduxForm({
  form: 'userLogin'
})(userLogin);

export default userLogin;
