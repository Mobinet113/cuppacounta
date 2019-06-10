/**
 * CuppaCounta React Native App
 * https://www.nowcomms.com
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Authenticator, VerifyContact} from 'aws-amplify-react-native';
import {View, Text} from 'react-native';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';

import CustomSignIn from '../components/auth/CustomSignIn';
import CustomSignUp from '../components/auth/CustomSignUp';
import CustomLogout from "../components/auth/CustomLogout";

Amplify.configure(awsmobile);

type Props = {
  initialState: 'default',
  initialData: {}
};


class CustomAuthenticator extends Component<Props> {

  constructor(props, context) {
    super(props, context);

    this.state = {
      authState: this.props.initialState,
      authData: this.props.initialData,
      authenticated: false
    };

  }

  onAuthStateChange = (newState, newData) => {
    const data = Object.assign({}, this.state.authData, newData);
    this.setState({authState: newState, authData: data});

    if (newState === 'authenticated' || newState === 'verifyContact') {
      this.setState({authenticated: true});
    } else {
      this.setState({authenticated: false});
    }
  };

  map = (message) => {
    if (/incorrect.*username.*password/i.test(message)) {
      return 'Incorrect username or password';
    }

    return message;
  };


  render(): * {

    const props = {
      authData: this.state.authData,
      authState: this.state.authState,
      onAuthStateChange: (s, d) => this.onAuthStateChange(s, d)
    };

    console.log("AUTHENTICATED: " + this.state.authenticated);

    return (
      <Authenticator hideDefault={true} onStateChange={this.onAuthStateChange} errorMessage={this.map} >

        <CustomSignIn {...props}/>
        <CustomSignUp {...props}/>

        <View>
          {this.state.authenticated &&
          <View>
            {this.props.children}
            <CustomLogout {...props}/>
          </View>
          }
        </View>

      </Authenticator>
    )
  }
}


export default CustomAuthenticator;