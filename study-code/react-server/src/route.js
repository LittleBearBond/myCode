// routes.js
import Home from './pages/Home';
import Post from './pages/Post';
import fetchData from './helpers/fetchData';

export default [{
    path: '/',
    exact: true,
    component: Home
}, {
    path: '/post',
    exact: true,
    component: Post,
    fetchData: fetchData
}];

