import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Tile} from "react-native-elements";
import {action} from "../redux/main";
import {connect} from "react-redux";
import CreateTeam from "../components/team/CreateTeam";
import JoinTeam from "../components/team/JoinTeam";
import MyTeam from "../components/team/MyTeam";

type Props = {
  teams: null,
  loading: true
};

class Team extends Component<Props> {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount(): void {
    action('TEAMS_FETCH');
  }

  conditionalRender() {

    if ( this.props.loading ){
      return <ActivityIndicator />
    }

    const {teamId} = this.props;

    switch (teamId) {

      case null:
        return (
          <View>
            <CreateTeam/>
            <JoinTeam/>
          </View>
        )

      default:
        return <MyTeam/>


    }

  }


  render() {

    const {teams} = this.props;

    return (
      <View>




        {this.conditionalRender()}

      </View>
    )
  }

}


const mapStateToProps = state => {
  return {
    members: state.teams.members,
    teamId: state.teams.teamId,
    loading: state.teams.loading
  }
};

export default connect(mapStateToProps)(Team)