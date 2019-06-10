const initialState = {
  myCups: {
    data: [],
    total: 0
  },
  loading: true,
  error: null
};

export default function cuppasReducer(state = initialState, action) {
  switch (action.type) {
    case 'CUPPAS_FETCH_SUCCEEDED':
      return {
        ...state,
        myCups: action.payload
      };

    case 'CUPPAS_FETCH_FAILED':
      return {
        ...state,
        error: action.message
      };

    case 'CUPPAS_ADD_SUCCEEDED':
      return {
        ...state,
        myCups: {
          ...state.myCups,
          data: [...state.myCups.data, action.payload],
          total: state.myCups.total + 1
        }
      };

    case 'CUPPAS_ADD_FAILED':
      return {
        ...state,
        error: action.message
      };

    case 'CUPPAS_DECREASE_SUCCEEDED':
      return {
        ...state,
        myCups: {
          ...state.myCups,
          data: action.payload.cuppas,
          total: state.myCups.total - 1
        }
      };

    case 'CUPPAS_DECREASE_FAILED':
      return {
        ...state,
        error: action.message
      };

    case 'CUPPAS_LOADING_TOGGLE':
      return {
        ...state,
        loading: !state.loading
      };

    default:
      return state;
  }
}