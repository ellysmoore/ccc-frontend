import { FaArrowLeft, FaImage, FaMoneyBillAlt, FaPodcast, FaTachometerAlt, FaTicketAlt, FaUsers, FaYoutube } from "react-icons/fa";

export const ADMIN_MENU_ITEMS = [
  {
    name: 'Dashboard',
    icon: <FaTachometerAlt />,
    link: '/admin/dashboard',
    key: 'dashboard',
  },
  {
    name: 'Messages',
    icon: <FaPodcast />,
    management: 'Content Management',
    key: 'messages',
    children: [
      { label: 'Upload Message', href: '/admin/messages/add_message' },
      { label: 'Manage Messages', href: '/admin/messages' },
    ],
  },
  {
    name: 'Category',
    icon: <FaPodcast />,
    management: 'Category Management',
    key: 'categories',
    children: [
      { label: 'Categories', href: '/admin/categories' },
      { label: 'New Category', href: '/admin/categories/new_category' },
    ],
  },
  {
    name: 'Centre',
    icon: <FaPodcast />,
    management: 'Centre Management',
    key: 'centres',
    children: [
      { label: 'Centres', href: '/admin/centres' },
      { label: 'New Centre', href: '/admin/centres/new_centre' },
    ],
  },
  {
    name: 'Speaker',
    management: 'Speaker Management',
    icon: <FaPodcast />,
    key: 'speakers',
    children: [
      { label: 'Speakers', href: '/admin/speakers' },
      { label: 'New Speaker', href: '/admin/speakers/new_speaker' },
    ],
  },
  {
    name: 'Service',
    icon: <FaPodcast />,
    management: 'Service Management',
    key: 'services',
    children: [
      { label: 'Services', href: '/admin/services' },
      { label: 'New Service', href: '/admin/services/new_service' },
    ],
  },
  {
    name: 'Users',
    icon: <FaUsers />,
    management: 'User Management',
    key: 'users',
    children: [
      { label: 'Users', href: '/admin/users' },
      { label: 'New User', href: '/admin/users/new_user' },
    ],
  },
  {
    name: 'Tickets',
    icon: <FaTicketAlt />,
    management: 'Ticket Management',
    key: 'batches',
    children: [
      { label: 'Ticket Batches', href: '/admin/batches' },
      { label: 'New Ticket Batch', href: '/admin/batches/new_batch' },
    ],
  },
  {
    name: 'Payments',
    icon: <FaMoneyBillAlt />,
    link: '/admin/payments',
    key: 'payments',
  },
  {
    name: 'Banners',
    icon: <FaImage />,
    link: '/admin/banners',
    key: 'banners',
  },
  {
    name: 'Youtube',
    icon: <FaYoutube />,
    link: '#',
    key: 'youtube',
  },
  {
    name: 'Main Site',
    icon: <FaArrowLeft />,
    link: '/',
    key: 'main',
  },
];