import { get_API_URL, xmlRequest } from '../../misc';

export default (slug) => {
  const requestInfo = {
    path: `${ get_API_URL() }/users/${ slug }`,
    method: 'GET'
  };

  return xmlRequest(requestInfo);
}
