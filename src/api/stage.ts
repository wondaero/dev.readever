// src/api/rank.ts
import api from '@/lib/axios';
import axios from 'axios';

export const getStageInfo = async () => {
  // const response = await api.get('dummyData/stage.json');
  const response = await axios.get('/dummyData/stage.json'); // API 경로가 아니라 정적 파일 경로
  return response.data;
};