// routes.js
import Home from './pages/Home';
import Post from './pages/Post';
import HooksTest from './pages/HooksTest';
import fetchData from './helpers/fetchData';

export default [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/post',
        exact: true,
        component: Post,
        fetchData: fetchData
    },
    {
        path: '/hooktest',
        exact: true,
        component: HooksTest,
        // fetchData: fetchData
    }
];

