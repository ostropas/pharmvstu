import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const fetchClient = () => {

    var path = "";
    if (process.env.NODE_ENV === 'development')
    {
        path = "http://localhost:8080";
    } else
    {
        path = process.env.REACT_APP_API_PATH;
    }

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
    const token = cookies.get('jwt');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();