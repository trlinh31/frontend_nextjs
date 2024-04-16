import { Group } from '@/types/group.type';
import { Role } from '@/types/role.type';

export type User = {
  id: string;
  fullName: string;
  email: string;
  address: string;
  username: string;
  password: string;
  group: Group;
  roles: Role[];
  enable: boolean;
};
