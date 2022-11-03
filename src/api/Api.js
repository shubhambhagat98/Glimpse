import axios from 'axios';
import {NEWS_API_KEY} from '@env';

export const newsAPI = axios.create({
  baseURL: 'https://api.newscatcherapi.com/v2',
  headers: {
    'x-api-key': `${NEWS_API_KEY}`,
  },
});
