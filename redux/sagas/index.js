import { all } from 'redux-saga/effects'
import { getCuppas, addCuppaListen, removeCuppaListen } from "./sagaCuppas";
import { getTeams, addTeamMemberWatch, deleteTeamMemberWatch, createTeamWatch } from "./sagaTeams";


export default function* rootSaga() {
  yield all([

    // Cuppas...
    getCuppas(),
    addCuppaListen(),
    removeCuppaListen(),

    // Teams...
    getTeams(),
    addTeamMemberWatch(),
    deleteTeamMemberWatch(),
    createTeamWatch()
  ])
}