import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const fetchClient = () => {

    var path = "https://pharmvstu.azurewebsites.net/api";

  const defaultOptions = {
    baseURL: path,
    headers: {
    },
  };

  const token = localStorage.getItem('jwt');
  if (token !== null ? `Bearer ${token}` : '')
    defaultOptions.headers.Authorization = token;

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default fetchClient();