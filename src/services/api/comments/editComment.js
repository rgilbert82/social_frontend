import { get_API_URL, xmlRequest } from '../../misc';

export default (data) => {
  const requestInfo = {
    path: `${ get_API_URL() }/comments/${ data.comment.id }`,
    method: 'PUT',
    data: data
  };

  return xmlRequest(requestInfo);
}
