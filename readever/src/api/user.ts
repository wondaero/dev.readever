// src/api/rank.ts
import api from '@/lib/axios';
import axios from 'axios';

export const getUserList = async () => {
  // const response = await api.get('dummyData/rank.json');
  const response = await axios.get('/dummyData/user.json'); // API 경로가 아니라 정적 파일 경로

  console.log('[getUserList] response:', response);
  console.log('[getUserList] response.data:', response.data);
  return response.data;
};




export const getUserDetail = async (id: string) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};
