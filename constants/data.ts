import {
  URL_DASHBOARD,
  URL_SHOW_CATEGORY,
  URL_SHOW_CUSTOMER,
  URL_SHOW_FEEDBACK,
  URL_SHOW_GROUP,
  URL_SHOW_PRODUCT,
  URL_SHOW_ROLE,
  URL_SHOW_USER,
} from '@/constants/url';
import { NavItem } from '@/types';
import { Home, UsersRound, User, Users, Shirt, ShoppingBag, Store, LayoutGrid, MessageSquareMore, KeyRound, Key } from 'lucide-react';

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
  },
  {
    title: 'Đơn hàng',
    href: '/admin/transaction',
    icon: ShoppingBag,
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
    disabled: true,
  },
  {
    title: 'Vai trò',
    href: URL_SHOW_ROLE,
    icon: KeyRound,
  },
  {
    title: 'Nhóm tài khoản',
    href: URL_SHOW_GROUP,
    icon: Users,
  },
];
