// src/api/rank.ts
import api from '@/lib/axios';
import axios from 'axios';

export const getBookList = async () => {
  // const response = await api.get('dummyData/book.json');
  const response = await axios.get('/dummyData/book.json'); // API 경로가 아니라 정적 파일 경로

  console.log('[getBookList] response:', response);
  console.log('[getBookList] response.data:', response.data);
  return response.data;
};




export const getBookDetail = async (id: string) => {
  const response = await api.get(`/book/${id}`);
  return response.data;
};
