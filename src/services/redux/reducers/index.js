const initialState = {
  title: 'Social Media Test',
  currentUser: {},
  loggedIn: false,
  message: { content: false, type: 'error' }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_USER':
      return { ...state,
        currentUser: action.payload.currentUser,
        loggedIn: action.payload.loggedIn
      };
    case 'SET_MESSAGE':
      return { ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
