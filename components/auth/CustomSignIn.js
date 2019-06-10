/**
 * CuppaCounta React Native App
 * https://www.nowcomms.com
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import {StyleSheet, View} from 'react-native';
import {Input, Card, Button, Text} from 'react-native-elements';

type props = {}

export default class CustomSignIn extends Component<Props> {

  constructor(props, context) {
    super(props, context);

    this.state = {
      username: null,
      password: null,
      error: null,
      buttonLoading: false
    }
  }

  gotoSignIn = () => {
    // to switch the authState to 'signIn'
    this.props.onStateChange('signUp', {});
  };

  gotoForgotPassword = () => {
    // to switch the authState to 'signIn'
    this.props.onStateChange('forgotPassword', {});
  };

  _onSignIn = () => {
    const {username, password} = this.state;

    this.setState({buttonLoading: true});

    Auth.signIn({
      username,
      password
    }).then(user => this.setState({
      username: null,
      password: null,
      error: null,
      buttonLoading: false
    }))

      .catch(err => {
        if (typeof err === 'string') {
          this.setState({error: err, buttonLoading: false})
        } else {
          this.setState({error: err.message, buttonLoading: false})
        }
      })
  };

  _onInputChange = (field, value) => {
    this.setState({[field]: value})
  };

  render() {

    if (this.props.authState !== 'signIn') {
      return null
    }

    return (

      <Card title="Sign in"
            style={styles.container}
            containerStyle={styles.container}
            image={require('../../src/images/nordwood-themes-490552-unsplash.jpg')}>


        <Text style={{color: 'red'}}>{this.state.error}</Text>

        <Input label="Username" autoCapitalize='none' keyboardType='email-address' onChangeText={evt => {
          this._onInputChange('username', evt)
        }}/>

        <Input label="Password"
               secureTextEntry={true}
               style={{marginBottom: 20}}
               onChangeText={evt => {
                 this._onInputChange('password', evt)
               }}/>


        <Button onPress={this._onSignIn}
                title="Sign in"
                loading={this.state.buttonLoading}
                style={{marginBottom: 20, marginTop: 40}}/>


        <Button type="clear" onPress={this.gotoSignIn} title="Create an account"/>

      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    margin: 0
  },
});

