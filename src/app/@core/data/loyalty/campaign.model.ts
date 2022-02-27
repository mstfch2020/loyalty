import { Period, periodInit } from './period.model';

export interface Campaign
{

  title: string;
  fileId: string;
  expireDate: Period;
  id: string;
}
export const campaignInit: Campaign = {
  title: '',
  fileId: '',
  expireDate: periodInit,
  id: ''
};

export interface CampaignGrid
{

  title: string;
  fileId: string;
  expireDate: Period;
  id: string;
}
