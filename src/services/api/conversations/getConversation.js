import { get_API_URL, xmlRequest } from '../../misc';

export default (slug, token) => {
  const requestInfo = {
    path: `${ get_API_URL() }/conversations/${ slug }`,
    method: 'GET',
    token: token
  };

  return xmlRequest(requestInfo);
}
