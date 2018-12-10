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
import s from './Login.css';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import HelpBlock from '../../components/Labels/HelpBlock';
import Input from '../../components/Input/Input';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    const hmacDigest = Base64.stringify(
      hmacSHA512(
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
        'myPassphrase',
      ),
    );

    fetch('http://localhost:4000/api/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'sample2',
        password: 'password',
      }),
    }).then(response => {
      console.log(response);
    });

    e.preventDefault();
  }

  saveInputToState(event) {
    const inputName = event.target.id;
    this.setState({
      [inputName]: event.target.value,
    });
  }
}

export default withStyles(s)(Login);
