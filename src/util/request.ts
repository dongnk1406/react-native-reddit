import axios from 'axios';

export const request = axios.create({
  baseURL: 'https://62ff2c7134344b6431f3db0c.mockapi.io/api/v1',
});

export const get = async (path: string, options: object) => {
  const response = await request.get(path, options);
  return response.data;
};

export const post = async (path: string, options: object) => {
  const response = await request.post(path, options);
  return response.data;
};
 