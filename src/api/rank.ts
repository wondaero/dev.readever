// src/api/rank.ts
import api from '@/lib/axios';
import axios from 'axios';

export const getRankList = async () => {
  // const response = await api.get('dummyData/rank.json');
  const response = await axios.get('/dummyData/rank.json'); // API 경로가 아니라 정적 파일 경로
  return response.data;
};




export const getRankDetail = async (id: string) => {
  const response = await api.get(`/rank/${id}`);
  return response.data;
};
