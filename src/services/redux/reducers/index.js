const initialState = {
  title: 'Social Media Test',
  currentUser: {},
  loggedIn: false,
  friends: [],
  pending_friends: [],
  pending_inverse_friends: [],
  message: { content: false, type: 'error' }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_USER':
      return { ...state,
        currentUser: action.payload.currentUser.user,
        friends: action.payload.currentUser.friends,
        pending_friends: action.payload.currentUser.pending_friends,
        pending_inverse_friends: action.payload.currentUser.pending_inverse_friends,
        loggedIn: action.payload.loggedIn
      };
    case 'SET_MESSAGE':
      return { ...state,
        message: action.payload,
      };
    case 'UPDATE_FRIENDS':
      return { ...state,
        friends: action.payload.friends,
        pending_friends: action.payload.pending_friends,
        pending_inverse_friends: action.payload.pending_inverse_friends,
      };
    default:
      return state;
  }
}

export default rootReducer;
