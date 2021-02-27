import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const fetchClient = () => {

    var path = "https://pharmvstu.azurewebsites.net/api";

  const defaultOptions = {
    baseURL: path,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwt');
    config.headers.Authorization =  token !== null ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();