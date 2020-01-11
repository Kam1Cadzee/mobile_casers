import axios from 'axios';
import {config} from '../config';

let instance = axios.create({
  baseURL: config.API,
});

const initialize = (timeout: number = 8000) => {
  const source = axios.CancelToken.source();

  instance = axios.create({
    baseURL: config.API,
    cancelToken: source.token,
  });

  setTimeout(() => {
    source.cancel('Немає підключення до мережі');
  }, timeout);
};

const getTransports = async () => {
  try {
    initialize();
    const res = await instance.get('/transports?status=way');
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const getTransport = async (id: string) => {
  try {
    initialize();
    const res = await instance.get('/transports/' + id);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    throw e;
  }
};

const addTransport = async (data: any) => {
  try {
    initialize(3000);
    const res = await instance.post('/transports', data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateTransport = async (id: string, data: any) => {
  try {
    initialize(3000);
    const res = await instance.put('/transports/' + id, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export default {
  getTransports,
  addTransport,
  updateTransport,
  getTransport,
};
