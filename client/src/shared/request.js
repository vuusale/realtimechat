import axios from 'axios';
import { devBackendURL, backendURL } from './constants';

const instance = axios.create({
    // baseURL: devBackendURL,
    baseURL: backendURL,
    withCredentials: true
});

instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response.status >= 400) {
        window.location = '/'
      }
      return Promise.reject(error.response.data)
    }
  )

function getRooms() {
    return instance.get('/rooms');
}

export { getRooms };