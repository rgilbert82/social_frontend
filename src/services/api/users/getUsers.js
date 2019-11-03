import { get_API_URL, xmlRequest } from '../../misc';

export default () => {
  const requestInfo = {
    path: `${ get_API_URL() }/users`,
    method: 'GET'
  };

  return xmlRequest(requestInfo);
}
