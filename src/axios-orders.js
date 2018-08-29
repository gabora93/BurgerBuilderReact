import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-myburguer.firebaseio.com/'
});

export default instance;