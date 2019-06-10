import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Button, Card, Input, Text, ListItem, Tile} from "react-native-elements";
import {connect} from "react-redux";
import {action} from "../../redux/main";

type Props = {
  teamName: "",
  members: [],
  loading: false
}

class MyTeam extends Component<Props> {

  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      newUserName: null
    }
  }

  componentDidMount(): void {
    this.setState({loading: false});
  }

  _onInputChange = (field: string | null, evt: string | null): void => {
    this.setState({[field]: evt});
  };

  _onSubmit = () => {
    if (this.state.newUserName) {
      action('TEAMS_MEMBER_ADD', {username: this.state.newUserName})
    }
  };

  render() {
    return (

      <View>

        <Tile imageSrc={require("../../src/images/nordwood-themes-490552-unsplash.jpg")}
              title={this.props.teamName}
              caption="Manage your team"
              featured
              height={200}
        />

        <Card title="Team members">
          {this.props.members.map((member, index) => (

            <ListItem
              key={index}
              title={member}
              bottomDivider={true}
            />

          ))}
        </Card>

        <Card title="Add team members">

          <Input label="Username"
                 onChangeText={evt => {
                   this._onInputChange('newUserName', evt)
                 }}
          />

          <Button
            title="Add member"
            style={{marginTop: 40}}
            loading={this.state.loading}
            onPress={this._onSubmit}
          />

        </Card>
      </View>
    )
  }
}

const styles = {
  heading: {
    textAlign: 'center',
    marginTop: 10
  }
};

const mapStateToProps = state => {
  return {
    teamName: state.teams.teamName,
    members: state.teams.members,
    loading: state.teams.loading
  }
};

export default connect(mapStateToProps)(MyTeam)
