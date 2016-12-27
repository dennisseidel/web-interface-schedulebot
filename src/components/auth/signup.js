import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/';


class SignupForm extends Component {
  handleSignup(formProps) {
    // call action creator to signup the user
    this.props.signupUser(formProps);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Error:</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleSignup.bind(this))}>
          <Field name="email" label="Email" component={renderField} type="text" />
          <Field name="password" label="Password" component={renderField} type="password" />
          <Field name="passwordConfirm" label="Confirm Password" component={renderField} type="password" />
          {this.renderAlert()}
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

const renderField = (props) => {
  const { input, label, type, meta: { touched, error , invalid} } = props;
	//Construct form-group class depending on form state
	const groupClass = touched ? (invalid ? 'form-group has-danger':'form-group has-success') : 'form-group';
	//Construct form-control class depending on form state
	const inputClass = touched ? (invalid ? 'form-control form-control-danger':'form-control form-control-success') : 'form-control';
	return (
		<div className={groupClass}>
			<label>{label}</label>
			<input {...input} placeholder={label} type={type} className={inputClass} />
			<div className="form-control-feedback">
				{touched ? <span>{error}</span> : ''}
			</div>
		</div>
	)
}

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter an password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm the password';
  }
  if (formProps.passwordConfirm !== formProps.password) {
    errors.passwordConfirm = 'Passwords must match';
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// Decorate the form component
SignupForm = reduxForm({
  // a unique name for this form
  form: 'signup',
  validate
})(SignupForm);

//Use connect from react-redux to gain access to actions
SignupForm = connect(mapStateToProps, actions)(SignupForm);

export default SignupForm;
