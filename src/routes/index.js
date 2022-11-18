import { HeaderOnly } from '../layouts';
import Home from '../pages/Home';
import Sales from '../pages/Sales';
import Sign from '../pages/Sign';
import Report from '../pages/Report';
import Storage from '../components/Storage';
import Statistical from '../pages/Statistical';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sign', component: Sign, layout: HeaderOnly },
];

const privateRoutes = [
    { path: '/sales', component: Sales },
    { path: '/storage', component: Storage },
    { path: '/Report', component: Report },
    { path: '/statistical', component: Statistical },
];

export { publicRoutes, privateRoutes };
