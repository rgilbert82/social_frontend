import { get_API_URL, xmlRequest } from '../../misc';

export default (post_id, token) => {
  const requestInfo = {
    path: `${ get_API_URL() }/posts/${ post_id }`,
    method: 'DELETE',
    token: token
  };

  return xmlRequest(requestInfo);
}
