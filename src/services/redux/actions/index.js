export const changeCurrentUser = (user) => {
  return {
    type: 'CHANGE_CURRENT_USER',
    payload: user
  }
};
