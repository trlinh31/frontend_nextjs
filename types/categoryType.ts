export type Category = {
  id: string;
  code: string;
  name: string;
  parentsId: string;
  parentsCategory: Category;
  enable: boolean;
};
