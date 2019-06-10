import {put, take, takeEvery, call, select} from 'redux-saga/effects';
import {API, graphqlOperation} from "aws-amplify";
import {Auth} from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';


export function* saveUser() {
  yield take("USER_SAVE");

  try {

    const response = yield call(() => {
      return Auth.currentAuthenticatedUser().then(user => {

        return API.graphql(graphqlOperation(mutations.createUser, {
          input: {
            USERID: user.userDataKey,
            USERNAME: user.username
          }
        }));

      });
    });

    console.log(response);

    //yield put( {type: "USER_SAVE_SUCCEEDED", payload: {userId: respo}})


  } catch (e) {

  }
}