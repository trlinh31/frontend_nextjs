import { LucideIcon } from 'lucide-react';

export type IconType = LucideIcon;

// export type Customer = {
//   id: string;
//   name: string;
//   avatar: string;
//   email: string;
//   phone: string;
//   address: string;
// };

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  icon: IconType;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
