const initialState = {
  userId: null,
  username: null,
  error: null,
  loading: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_SAVE_SUCCEEDED':
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username
      };

    case 'USER_SAVE_FAILED':
      return {
        ...state,
        error: action.payload.message
      };

    case 'USER_FETCH_SUCCEEDED':
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username
      };

    case 'TEAMS_LOADING_TOGGLE':
      return {
        ...state,
        loading: !state.loading
      };

    default:
      return state;
  }
}