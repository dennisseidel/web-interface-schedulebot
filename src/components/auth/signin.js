import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/';

class SigninForm extends Component {
  handleSignin({ email, password }) {
    console.log('Email:', email);
    console.log('Password:', password);
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }
  render() {
    // Get handleSubmit of the props, supplied by redux-form
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleSignin.bind(this))}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password" className="form-control"/>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}

// Decorate the form component
SigninForm = reduxForm({
  // a unique name for this form
  form: 'signin'
})(SigninForm);

//Use connect from react-redux to gain access to actions
SigninForm = connect(null, actions)(SigninForm);

export default SigninForm;


// Documentation:
// https://redux-form.com/6.3.1/docs/GettingStarted.md/
