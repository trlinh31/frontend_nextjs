import { URL_DASHBOARD, URL_SHOW_CATEGORY, URL_SHOW_CUSTOMER, URL_SHOW_FEEDBACK, URL_SHOW_PRODUCT, URL_SHOW_USER } from '@/constants/url';
import { NavItem } from '@/types';
import { Home, UsersRound, User, Shirt, ShoppingBag, Store, LayoutGrid, MessageSquareMore, KeyRound } from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: URL_DASHBOARD,
    icon: Home,
  },
  {
    title: 'Danh mục sản phẩm',
    href: URL_SHOW_CATEGORY,
    icon: LayoutGrid,
  },
  {
    title: 'Sản phẩm',
    href: URL_SHOW_PRODUCT,
    icon: Shirt,
  },
  {
    title: 'Đánh giá sản phẩm',
    href: URL_SHOW_FEEDBACK,
    icon: MessageSquareMore,
  },
  {
    title: 'Khách hàng',
    href: URL_SHOW_CUSTOMER,
    icon: UsersRound,
    disabled: true,
  },
  {
    title: 'Đơn hàng',
    href: '/admin/don-hang',
    icon: ShoppingBag,
    disabled: true,
  },
  {
    title: 'Kho hàng',
    href: '/admin/kho-hang',
    icon: Store,
    disabled: true,
  },
  {
    title: 'Tài khoản',
    href: URL_SHOW_USER,
    icon: User,
  },
];
