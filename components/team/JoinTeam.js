import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Card, Input} from "react-native-elements";

type props = {}

export default class JoinTeam extends Component<Props> {

  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      teamName: null
    };
  }

  componentDidMount(): void {
    this.setState({loading: false});
  }

  _onInputChange(field, evt){
    this.setState({[field]: evt});
  }

  render() {
    return (

      <View>
        <Card title="Join a team">

          <Input label="Team Name"
                 onChangeText={evt => {
                   this._onInputChange('teamName', evt)
                 }}
          />

          <Button
            title="Join team"
            style={{marginTop: 40}}
            loading={this.state.loading}
            onPress={this._onSubmit}
          />

        </Card>
      </View>
    )
  }
}



