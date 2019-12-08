import { get_API_URL, xmlRequest } from '../../misc';

export default (post_id) => {
  const requestInfo = {
    path: `${ get_API_URL() }/comments/${ post_id }`,
    method: 'DELETE'
  };

  return xmlRequest(requestInfo);
}
