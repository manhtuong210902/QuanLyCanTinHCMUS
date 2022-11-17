import { HeaderOnly } from '../layouts';
import Home from '../pages/Home';
import Sales from '../pages/Sales';
import Sign from '../pages/Sign';
import Storage from '../components/Storage';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sales', component: Sales },
    { path: '/storage', component: Storage },
    { path: '/sign', component: Sign, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
