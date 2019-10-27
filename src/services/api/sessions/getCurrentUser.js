import { get_API_URL, xmlRequest } from '../../misc';

export default (token) => {
  const requestInfo = {
    path: `${ get_API_URL() }/sessions/1`,
    method: 'GET',
    token: token
  };

  return xmlRequest(requestInfo);
}
