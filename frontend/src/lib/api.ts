import axios from 'axios';

const serviceApi = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { serviceApi }