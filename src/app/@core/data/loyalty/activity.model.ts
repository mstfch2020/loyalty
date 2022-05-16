export interface Activity
{
  id: string;
  title: string;
}

export interface ActivityEditable
{
  title: string;
  id: string;
  key: string;
}

export interface ActivityGrid
{
  title: string;
  id: string;
  key: string;
}

export const activityInit: ActivityEditable = {
  title: '',
  id: '',
  key: ''
};
