import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/dashboard',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: '/orders',
        title: 'Orders',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/products',
        title: 'Store',
    },
    {
        id: 4,
        icon: UserIcon,
        path: '/profile',
        title: 'My account',
    },
    {
        id: 5,
        icon: UserIcon,
        path: '/login',
        title: 'Login',
    }
]

export default sidebar_menu;