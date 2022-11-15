import { HeaderOnly } from '../layouts';
import Home from '../pages/Home';
import Sales from '../pages/Sales';
import Sign from '../pages/Sign'

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sales', component: Sales }, 
    { path: '/sign', component: Sign, layout: HeaderOnly},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
