import { Role } from '@/types/role.type';

export type Group = {
  id: string;
  code: string;
  name: string;
  roles: Role[];
};
