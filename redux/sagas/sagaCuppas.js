import {put, take, takeEvery, call, select} from 'redux-saga/effects';
import {API, graphqlOperation} from "aws-amplify";
import {Auth} from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';

export const getCuppasState = (state) => state.cuppas;

/**
 * Get all cuppas from the database
 * @returns {IterableIterator<PutEffect<{type: string, message: *}>|CallEffect|TakeEffect|PutEffect<{payload: {total: *, data: *}, type: string}>|PutEffect<{type: string}>>}
 */
export function* getCuppas() {
  yield take("CUPPAS_FETCH_TOTAL");

  yield put({type: "CUPPAS_LOADING_TOGGLE"});

  try {

    // Get cuppas from the server
    const response = yield call(() => {
      return Auth.currentAuthenticatedUser().then(user => {

        return API.graphql(graphqlOperation(queries.listCuppass, {
          limit: 1000,
          filter: {
            USERID: {"contains": user.userDataKey}
          }
        }));

      });
    });

    let cuppas = response.data.listCuppass.items;


    yield put({type: "CUPPAS_FETCH_SUCCEEDED", payload: {data: cuppas, total: cuppas.length}})

  } catch (e) {
    yield put({type: "CUPPAS_FETCH_FAILED", message: e})
  }

  yield put({type: "CUPPAS_LOADING_TOGGLE"});

}

/**
 * Add a cuppa
 * @returns {IterableIterator<PutEffect<{type: string}>>}
 */
export function* addCuppa() {

  yield put({type: "CUPPAS_LOADING_TOGGLE"});

  try {

    // Add a cuppa to the server
    const response = yield call(() => {
      return Auth.currentAuthenticatedUser().then(user => {

        return API.graphql(graphqlOperation(mutations.createCuppas, {
          input: {
            USERID: user.userDataKey
          }
        })).then(response => {
          return response
        });

      }).catch(e => {
        console.log(e);
      });
    });

    const newCuppa = response.data.createCuppas;

    yield put({type: "CUPPAS_ADD_SUCCEEDED", payload: newCuppa});

  } catch (e) {
    console.log(e);
    yield put({type: "CUPPAS_ADD_FAILED", message: e})
  }

  yield put({type: "CUPPAS_LOADING_TOGGLE"});
}

export function* addCuppaListen() {
  yield takeEvery("CUPPAS_ADD", addCuppa);
}

/**
 * Remove the last cuppa
 * @returns {IterableIterator<PutEffect<{type: string}>>}
 */
export function* removeCuppa() {

  yield put({type: "CUPPAS_LOADING_TOGGLE"});

  try {

    // Get the last cuppa
    const cuppas = yield select(getCuppasState);
    const lastCuppa = cuppas.myCups.data[cuppas.myCups.data.length - 1];

    // Remove the last cuppa from the database
    const data = yield call(() => {

      return API.graphql(graphqlOperation(mutations.deleteCuppas, {
        input: {
          id: lastCuppa.id
        }
      })).catch(e => console.log(e));

    });

    cuppas.myCups.data.pop(); // Remove last item from array

    // Update the local state
    yield put({type: "CUPPAS_DECREASE_SUCCEEDED", payload: {cuppas: cuppas.myCups.data}});

  } catch (e) {
    yield put({type: "CUPPAS_DECREASE_FAILED", message: e})
  }

  yield put({type: "CUPPAS_LOADING_TOGGLE"});

}

export function* removeCuppaListen() {
  yield takeEvery("CUPPAS_REMOVE", removeCuppa);
}

