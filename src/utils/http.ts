import axios, { AxiosRequestConfig } from 'axios';
import bcrypt from 'bcryptjs';

const createHash = () => {
  const key = process.env.REACT_APP_BATTLE_API_KEY;

  if (!key) {
    console.error(`No API KEY!`);
    throw new Error(`No API KEY!`);
  }

  return bcrypt.hashSync(key, 10);
};

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    ...config.headers,
    Authorization: createHash()
  };

  return config;
});

export { axios };
