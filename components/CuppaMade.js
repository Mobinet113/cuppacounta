/**
 * CuppaCounta React Native App
 * https://www.nowcomms.com
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {action} from "../redux/main";
import {Card, Button, Text, Tile} from "react-native-elements";

type Props = {
  myCups: [],
  totalCups: 0,
  loading: true
};

class CuppaMade extends Component<Props> {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount(): void {
    action('CUPPAS_FETCH_TOTAL');
  }

  _handleAddCuppaTap = (): void => {
    if ( !this.props.loading ) {
      action("CUPPAS_ADD");
    }
  };

  _handleRemoveCuppaTap = (): void => {
    if ( !this.props.loading ) {
      action("CUPPAS_REMOVE");
    }
  };

  render(): * {

    const {totalCups, loading} = this.props;

    return (

      <View>
        <Tile imageSrc={require("../src/images/annie-spratt-76930-unsplash.jpg")}
              title={this.props.totalCups}
              caption="Cups made by you"
              featured
              height={200}
        />
        <Card>

          <Text style={{textAlign: 'center', marginBottom: 40, marginTop: 30}}>
            This is the number of cups of tea (or coffee!) you have made. Use the Add Cuppa button below to add more!
          </Text>

          <Button
            onPress={this._handleAddCuppaTap}
            style={{marginBottom: 20}}
            loading={loading}
            icon={
              <Icon
                style={{marginRight: 5, marginTop: -2}}
                name="mug-hot"
                size={20}
                color="white"
              />
            }
            title="Add cuppa"
          />

          <Button
            style={{marginBottom: 20}}
            onPress={this._handleRemoveCuppaTap}
            loading={loading}
            type="clear"
            title="Remove cuppa"
          />

        </Card>
      </View>
    );
  }

}

const mapStateToProps = state => {
  return {
    myCups: state.cuppas.myCups.data,
    totalCups: state.cuppas.myCups.total,
    loading: state.cuppas.loading
  }
};

export default connect(mapStateToProps)(CuppaMade)