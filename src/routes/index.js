import { HeaderOnly } from '../layouts';
import Home from '../pages/Home';
import Sales from '../pages/Sales';
import Sign from '../pages/Sign';
import Report from '../pages/Report';
import Storage from '../components/Storage';
import Statistical from '../pages/Statistical';
import Profile from '../pages/Profile';
import Table from '../pages/Table/Table';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/sign', component: Sign, layout: HeaderOnly },
    { path: '/table', component: Table},
];

const privateRoutes = [
    { path: '/sales', component: Sales },
    { path: '/storage', component: Storage },
    { path: '/Report', component: Report },
    { path: '/statistical', component: Statistical },
    { path: '/profile', component: Profile },
];

export { publicRoutes, privateRoutes };
