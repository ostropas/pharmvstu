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
  const authParam = token !== null ? `Bearer ${token}` : '';
  if (authParam !== '')
    defaultOptions.headers.Authorization = authParam;

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default fetchClient();