import React, {Component} from 'react';
import {View} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import {action} from "../../redux/main";

type props = {}

export default class CreateTeam extends Component<Props> {

  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      form: {}
    };
  }

  componentDidMount(): void {
    this.setState({loading: false});
  }

  _onInputChange = (field, evt) => {

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [field]: evt
      }

    }))

  };

  _onSubmit = () => {
    this.setState({loading: true}, () => {

      if (this.state.form.teamName) {
        action('TEAMS_CREATE', {form: this.state.form})
      }

      this.setState({loading: false});

    });
  };

  render() {
    return (
      <View>
        <Card title="Create a team">

          <Input label="Team Name"
                 onChangeText={evt => {
                   this._onInputChange('teamName', evt)
                 }}
          />

          <Button
            title="Create team"
            style={{marginTop: 40}}
            loading={this.state.loading}
            onPress={this._onSubmit}
          />

        </Card>
      </View>
    )
  }
}




