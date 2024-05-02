import { LucideIcon } from 'lucide-react';

export type IconType = LucideIcon;

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  icon: IconType;
  role?: string[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
