import Home from '../pages/Home';
import Sales from '../pages/Sales';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sales', component: Sales },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
