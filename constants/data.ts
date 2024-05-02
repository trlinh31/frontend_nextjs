import { ROLE_ADMIN, ROLE_CASHIER } from '@/constants/roles';
import {
  URL_DASHBOARD,
  URL_SHOW_CATEGORY,
  URL_SHOW_CUSTOMER,
  URL_SHOW_GROUP,
  URL_SHOW_PRODUCT,
  URL_SHOW_ROLE,
  URL_SHOW_STOCK,
  URL_SHOW_TRANSACTION,
  URL_SHOW_USER,
} from '@/constants/url';
import { NavItem } from '@/types';
import { Home, UsersRound, User, Users, Shirt, ShoppingBag, Store, LayoutGrid, MessageSquareMore, KeyRound, Key } from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: 'Danh mục sản phẩm',
    href: URL_SHOW_CATEGORY,
    icon: LayoutGrid,
    role: [ROLE_ADMIN],
  },
  {
    title: 'Sản phẩm',
    href: URL_SHOW_PRODUCT,
    icon: Shirt,
    role: [ROLE_CASHIER],
  },
  {
    title: 'Khách hàng',
    href: URL_SHOW_CUSTOMER,
    icon: UsersRound,
    role: [ROLE_ADMIN],
  },
  {
    title: 'Đơn hàng',
    href: URL_SHOW_TRANSACTION,
    icon: ShoppingBag,
    role: [ROLE_CASHIER],
  },
  {
    title: 'Kho hàng',
    href: URL_SHOW_STOCK,
    icon: Store,
    role: [ROLE_ADMIN],
  },
  {
    title: 'Tài khoản',
    href: URL_SHOW_USER,
    icon: User,
    role: [ROLE_ADMIN],
  },
  {
    title: 'Vai trò',
    href: URL_SHOW_ROLE,
    icon: KeyRound,
    role: [ROLE_ADMIN],
  },
  {
    title: 'Nhóm tài khoản',
    href: URL_SHOW_GROUP,
    icon: Users,
    role: [ROLE_ADMIN],
  },
];
