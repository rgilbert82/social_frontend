import { get_API_URL, xmlRequest } from '../../misc';

export default (userId, token) => {
  const requestInfo = {
    path: `${ get_API_URL() }/users/${ userId }/inbox`,
    method: 'GET',
    token: token
  };

  return xmlRequest(requestInfo);
}
