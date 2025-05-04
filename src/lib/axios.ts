import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // 공통 경로
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
