export default () => {
  // const token = document.cookie.split('token=')[1];
  // return token;

  const token = window.localStorage.getItem('rg-social-frontend-11022019');
  return token;
}
