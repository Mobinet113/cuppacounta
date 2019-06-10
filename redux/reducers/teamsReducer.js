const initialState = {
  teamId: null,
  teamName: null,
  members: [],
  error: null,
  loading: true
};

export default function teamsReducer(state = initialState, action) {
  switch (action.type) {
    case 'TEAMS_FETCH_SUCCEEDED':
      return {
        ...state,
        teamId: action.payload.id,
        teamName: action.payload.teamName,
        members: action.payload.members
      };

    case 'TEAMS_FETCH_FAILED':
      return {
        ...state,
        error: action.message
      };

    case 'TEAMS_LOADING_TOGGLE':
      return {
        ...state,
        loading: !state.loading
      };

    case 'TEAMS_CREATE_SUCCESS':
      return {
        ...state,
        teamId: action.payload.id,
        teamName: action.payload.TEAMID
      };

    case 'TEAMS_CREATE_FAILED':
      return {
        ...state,
        error: action.message
      };

    case 'TEAMS_MEMBER_ADD_SUCCESS':
      return {
        ...state,
        members: action.payload.members
      };

    case 'TEAMS_MEMBER_ADD_FAILED':
      return {
        ...state,
        error: action.message
      };

    default:
      return state;
  }
}