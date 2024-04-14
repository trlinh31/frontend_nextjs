import { Group } from '@/types/group.type';

export type User = {
  id: string;
  username: string;
  password: string;
  fullname: string;
  address: string;
  phone: string;
  email: string;
  groupDTO: Group;
  roles: string;
};
