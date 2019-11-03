export default (token) => {
  // let cookieString;
  // let date = new Date();
  //
  // date.setDate(date.getDate() + 10);
  // cookieString = `token=${token}; expires=${date.toUTCString()};`;
  // document.cookie = cookieString;

  window.localStorage.setItem('rg-social-frontend-11022019', token);
}
