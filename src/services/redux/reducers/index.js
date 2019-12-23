const initialState = {
  title: 'database test',
  currentUser: {},
  unreadMessagesCount: 0,
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
        message: {
          content: action.payload.content,
          type: action.payload.type
        },
      };
    case 'UPDATE_UNREAD_MESSAGES_COUNT':
      return { ...state,
        unreadMessagesCount: action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;
