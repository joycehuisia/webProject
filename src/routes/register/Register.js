/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import Input from '../../components/Input/Input';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: ""
    };

    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleRegistration(e) {
    e.preventDefault();
  }

  saveInputToState(event) {
    const inputName = event.target.id;
    this.setState({
      [inputName]: event.target.value
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>

          <form onSubmit={this.handleRegistration}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="sample">
                Email Address:
                <Input
                  saveInputToState={this.saveInputToState.bind(this)}
                  defaultValue="Email Address"
                  defaultValidationState="true"
                  id="username"
                  validation="EMAIL"
                  hasErrorMessage="true"
                  errorMessage="Invalid Email"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
                <Input
                  saveInputToState={this.saveInputToState.bind(this)}
                  defaultValidationState="true"
                  id="password"
                  validation="NOTEMPTY"
                  type="password"
                  name="password"
                  hasErrorMessage="true"
                  errorMessage="Password cannot be empty"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Confirm Password:
                <Input
                  saveInputToState={this.saveInputToState.bind(this)}
                  defaultValidationState="true"
                  id="password"
                  validation="NOTEMPTY"
                  type="password"
                  name="password"
                  hasErrorMessage="true"
                  errorMessage="Password cannot be empty"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="sample">
                First Name:
                <Input
                  saveInputToState={this.saveInputToState.bind(this)}
                  defaultValue="First Name"
                  defaultValidationState="true"
                  id="firstname"
                  validation="NOTEMPTY"
                  hasErrorMessage="true"
                  errorMessage="This field cannot be empty"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="sample">
                Last Name:
                <Input
                  saveInputToState={this.saveInputToState.bind(this)}
                  defaultValue="Last Name"
                  defaultValidationState="true"
                  id="lastname"
                  validation="NOTEMPTY"
                  hasErrorMessage="true"
                  errorMessage="This field cannot be empty"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
