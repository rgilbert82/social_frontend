export default (requestInfo) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject(JSON.parse(request.responseText));
        }
      }
    }

    request.open(requestInfo.method, requestInfo.path);
    request.setRequestHeader('Content-Type', 'application/json');

    if (requestInfo.token) {
      request.setRequestHeader('Authorization', requestInfo.token || '');
    }

    if (requestInfo.data) {
      request.send(JSON.stringify(requestInfo.data));
    } else {
      request.send();
    }
  });
}
