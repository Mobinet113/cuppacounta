import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Auth} from 'aws-amplify';
import {Button, Card, Input, Text} from "react-native-elements";

type props = {
  authData: {},
  authState: 'signUp',
}

export default class CustomSignUp extends Component<Props> {

  constructor(props, context) {
    super(props, context);

    this.state = {
      authData: this.props.authData,
      authState: this.props.authState,
      modalShowing: false,
      error: null,
      loading: true,
      username: '',
      emailaddress: '',
      phone: '',
      password: '',
      buttonLoading: false
    };
  }

  componentDidMount(): void {
    this.setState({loading: false});
  }

  _onNewAccount = () => {

    const {password, emailaddress} = this.state;

    const username = emailaddress;

    this.setState({loading: true, buttonLoading: true}, () => {
      Auth.signUp({
        username,
        password,
        attributes: {
          email: emailaddress,          // optional
          // other custom attributes
        },
        validationData: []  //optional
      })
        .then(data => this.signUserIn())
        .catch(err => {

          this.setState({buttonLoading: false, loading: false});

          if (typeof err === 'string') {
            this.setState({error: err})
          } else {
            this.setState({error: err.message})
          }
        });
    });
  };

  signUserIn = () => {

    const {emailaddress, password} = this.state;
    const username = emailaddress;

    Auth.signIn({
      username,
      password
    }).then(user => this.setState({
      username: null,
      emailaddress: null,
      password: null,
      error: null,
      buttonLoading: false
    }))
  };

  _onInputChange = (field, value) => {
    this.setState({[field]: value})
  };

  gotoSignIn = () => {
    // to switch the authState to 'signIn'
    this.props.onStateChange('signIn', {});
  };


  render() {

    const settings = {
      autoCapitalize: "none"
    };

    if (this.props.authState !== 'signUp') {
      return null
    }

    return (

      <Card title="Create an account"
            style={styles.container}
            containerStyle={styles.container}
            image={require('../../src/images/annie-spratt-76930-unsplash.jpg')}>

        <Text style={{color: 'red'}}>{this.state.error}</Text>

        <Input label="Email address" autoCapitalize='none' keyboardType='email-address' onChangeText={evt => {
          this._onInputChange('emailaddress', evt)
        }}/>

        <Input label="Password"
               secureTextEntry={true}
               style={{marginBottom: 20}}
               onChangeText={evt => {
                 this._onInputChange('password', evt)
               }}/>


        <Button onPress={this._onNewAccount} title="Create account" loading={this.state.buttonLoading} style={{marginBottom: 20, marginTop: 40}}/>
        <Button type="clear" onPress={this.gotoSignIn} title="Sign in"/>
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