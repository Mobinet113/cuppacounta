import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

type props = {}

export default class CustomLogout extends Component<Props> {

  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true
    };
  }

  componentDidMount(): void {
    this.setState({loading: false});
  }

  _onLogout = () => {
    Auth.signOut()
      .then(data => {
        this.props.onAuthStateChange('signIn', {});
        console.log(data)
      })
      .catch(err => console.log(err));

  };

  render() {
    return (
      <View style={styles.stretch}>
        <Button onPress={this._onLogout} title="Logout" />
      </View>
    )
  }
}


let styles = StyleSheet.create({
  stretch: {
    alignSelf: 'stretch'
  }
});

