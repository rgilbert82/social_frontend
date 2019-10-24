const initialState = {
  title: 'Social Media Test',
  currentUser: {},
  loggedIn: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
