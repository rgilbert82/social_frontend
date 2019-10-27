export const changeCurrentUser = (user) => {
  return {
    type: 'CHANGE_CURRENT_USER',
    payload: user
  }
};

export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    payload: message
  }
};
