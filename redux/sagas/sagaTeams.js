import {put, take, takeEvery, call, select} from 'redux-saga/effects';
import {API, graphqlOperation} from "aws-amplify";
import {Auth} from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';

export const getTeamsState = (state) => state.teams;

/**
 * Get all the teams this person belongs to
 * @returns {IterableIterator<PutEffect<{payload: {teamId: *, members: *}, type: string}>|PutEffect<{type: string}>|ChannelTakeEffect<any>|CallEffect|PutEffect<{type: string, message: *}>>}
 */
export function* getTeams() {

  yield take('TEAMS_FETCH', getTeams);

  yield put({type: "TEAMS_LOADING_TOGGLE"});

  try {

    // Get team data from the server
    const response = yield call(() => {
      return Auth.currentAuthenticatedUser().then(user => {

        return API.graphql(graphqlOperation(queries.listTeams, {
          limit: 1,
          filter: {
            MEMBERS: {"contains": user.userDataKey}
          }
        }));

      });
    });

    const team = response.data.listTeams.items;

    yield put({
      type: "TEAMS_FETCH_SUCCEEDED", payload: {
        teamName: team[0].TEAMID,
        id: team[0].id,
        members: team[0].MEMBERS
      }
    })


  } catch (e) {
    yield put({type: 'TEAMS_FETCH_FAILED', message: e.message});
  }

  yield put({type: "CUPPAS_LOADING_TOGGLE"});

}

/**
 * Create a new team
 * @param action
 * @returns {IterableIterator<CallEffect|PutEffect<{payload: *, type: string}>>}
 */
export function* createTeam(action) {

  yield put({type: "TEAMS_LOADING_TOGGLE"});

  try {

    const response = yield call(() => {
      return Auth.currentAuthenticatedUser().then(user => {

        return API.graphql(graphqlOperation(mutations.createTeam, {
          input: {
            USERID: user.userDataKey,
            TEAMID: action.payload.form.teamName,
            MEMBERS: [
              user.userDataKey
            ]
          }
        }));

      });
    });


    yield put({type: 'TEAMS_CREATE_SUCCESS', payload: response.data.createTeam})

  } catch (e) {
    yield put({type: 'TEAMS_CREATE_FAILED', message: e.message})
  }

  yield put({type: "TEAMS_LOADING_TOGGLE"});


}

export function* createTeamWatch() {
  yield takeEvery('TEAMS_CREATE', createTeam);
}

/**
 * Add a new member to the team
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* addTeamMember(action) {

  yield put({type: "TEAMS_LOADING_TOGGLE"});

  try {

    const team = yield select(getTeamsState);
    const newUser = action.payload.username;

    let newMembers = [];

    // Construct the members array
    team.members.map( (member, index) => {
      newMembers.concat({"S": member});
    });

    newMembers.concat({"S": newUser});

    const response = yield call( () => {

      console.log(team.id);

      API.graphql(graphqlOperation(mutations.updateTeam, {
        input: {
          id: team.id,
          MEMBERS: newMembers
        }
      }))
    });

    yield put({type: 'TEAMS_MEMBER_ADD_SUCCESS', payload: { members: team.members.concat(action.payload.username) } })

  } catch (e) {
    console.log(e);

    yield put({type: 'TEAMS_MEMBER_ADD_FAILED', message: e.message})
  }

  yield put({type: "TEAMS_LOADING_TOGGLE"});
}

export function* addTeamMemberWatch() {
  yield takeEvery('TEAMS_MEMBER_ADD', addTeamMember);
}

/**
 * Delete a team member
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* deleteTeamMember(action) {
}

export function* deleteTeamMemberWatch() {
  yield take('TEAMS_MEMBER_DELETE', deleteTeamMember);
}