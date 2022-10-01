export interface CategoryGrid
{
  id: string;
  title: string;
  isActive: boolean;
  isEdit: boolean;
}

export interface Category
{
  id: string;
  title: string;
  isActive: boolean;
}

export const categoryInit: Category = {
  id: '',
  title: '',
  isActive: true
};
