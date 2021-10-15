import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aps8semestre.herokuapp.com',
});

export default api;
