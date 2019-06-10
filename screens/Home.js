import React, {Component} from 'react';
import {View} from 'react-native';
import CuppaMade from '../components/CuppaMade';
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import Team from "./Team";


type Props = {
};

class Home extends Component<Props> {

  constructor(props, context) {
    super(props, context);

  }

  render(): void {
    return (
      <View>
        <CuppaMade defaultCuppas={1}/>
      </View>
    )
  }
}


const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Team: Team
  },
  {
    initialRouteName: "Team"
  }
);

export default createAppContainer(TabNavigator)