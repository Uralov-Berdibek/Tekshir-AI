// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'mongodb+srv://admin:LvBxTwwi5j6iltKM@cluster0.wiqaxyz.mongodb.net/',
  withCredentials: true,
});

export const loginUser = (data: { username: string; password: string }) =>
  api.post('/auth/login', data);
export const registerUser = (data: { username: string; password: string }) =>
  api.post('/auth/register', data);

export default api;
