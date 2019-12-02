import { get_API_URL, xmlRequest } from '../../misc';

export default (userId) => {
  const requestInfo = {
    path: `${ get_API_URL() }/users/${ userId }/posts`,
    method: 'GET'
  };

  return xmlRequest(requestInfo);
}
