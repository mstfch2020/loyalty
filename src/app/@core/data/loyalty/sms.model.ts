import { SMSSendingType } from "./enums.model";
import { IdTitle } from "./get-senarios-grid.model";
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
  sernarioIds: Array<IdTitle>;
}


export const smsInit: SMS = {
  id: '',
  text: '',
  smsSendingType: SMSSendingType.Instant,
  date: periodInit,
  brandIds: [],
  userTypeIds: [],
  groupIds: [],
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
