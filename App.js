/**
 * CuppaCounta React Native App
 * https://www.nowcomms.com
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';

import {Provider} from "react-redux";
import {store} from './redux/main';
import {ThemeProvider, Header} from 'react-native-elements';
import CustomTheme from './CustomTheme';
import Home from "./screens/Home";


Amplify.configure(awsmobile);

type Props = {};


class App extends Component<Props> {

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={CustomTheme}>
          <Header
            centerComponent={{ text: 'CuppaCounta', style: { color: '#fff' } }}
          />

          <Home myCups={0}/>
        </ThemeProvider>
      </Provider>
    );
  }
}


export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"]
  }
} );