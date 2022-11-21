import { SMSSendingType } from "./enums.model";
import { Period, periodInit } from "./period.model";

export interface SMS
{
  id: string,
  text: string,
  smsSendingType: SMSSendingType,
  date: Period,
  brandIds: Array<string>;
  userTypeIds: Array<string>,
  groupIds: Array<string>,
  campaignIds: Array<string>,
  phones: Array<string>;
  sernarioIds: Array<string>;
}


export const smsInit: SMS = {
  id: '',
  text: '',
  smsSendingType: SMSSendingType.Instant,
  date: periodInit,
  brandIds: [],
  userTypeIds: [],
  groupIds: [],
  campaignIds: [],
  phones: [],
  sernarioIds: [],
};

export interface SendedSMSGrid
{
  id: string;
  brands: Array<string>;
  userTypes: Array<string>;
  groups: Array<string>;
  senario: Array<string>;
  sendingDate: Period;
}

export interface SMSDefinitionsGrid
{
  id: string;
  brands: Array<string>;
  userTypes: Array<string>;
  groups: Array<string>;
  senario: Array<string>;
  sendingDate: Period;
}
