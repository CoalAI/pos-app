import axios from 'axios';

const serverRequest = async (method: any, url: any, isHeader: any, data: any = {}, params: any = {}) => {
  let headers = {};
  if (isHeader) {
    if (localStorage.token) {
      headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.token}`,
      };
    } else {
      // TODO: check if auth fails
    }
  }
  try {
    const response = await axios({
      method,
      url,
      data,
      params,
      headers,
      baseURL: 'http://127.0.0.1:8000/api/',
    });
    return response;
  } catch (e) {
    return e;
  }
};

export default serverRequest;
