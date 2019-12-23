import { get_API_URL, xmlRequest } from '../../misc';

export default (data, token) => {
  const requestInfo = {
    path: `${ get_API_URL() }/messages`,
    method: 'POST',
    data: data,
    token: token
  };

  return xmlRequest(requestInfo);
}
