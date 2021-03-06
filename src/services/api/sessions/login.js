import { get_API_URL, xmlRequest } from '../../misc';

export default (data) => {
  const requestInfo = {
    path: `${ get_API_URL() }/sessions`,
    method: 'POST',
    data: data
  };

  return xmlRequest(requestInfo);
}
