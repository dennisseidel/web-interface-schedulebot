import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/';


class SignupForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return(
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <Field name="passwordConfirm" component="input" type="password" className="form-control"/>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}

// Decorate the form component
SignupForm = reduxForm({
  // a unique name for this form
  form: 'signup'
})(SignupForm);

//Use connect from react-redux to gain access to actions
SignupForm = connect(null, actions)(SignupForm);

export default SignupForm;
