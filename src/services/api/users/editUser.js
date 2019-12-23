import { get_API_URL, xmlRequest } from '../../misc';

export default (data, token) => {
  const requestInfo = {
    path: `${ get_API_URL() }/users/${ data.user.id }`,
    method: 'PUT',
    data: data,
    token: token
  };

  return xmlRequest(requestInfo);
}
