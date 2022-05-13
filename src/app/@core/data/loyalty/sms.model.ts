import { SMSSendingType } from "./enums.model";
import { IdTitle } from "./get-senarios-grid.model";
import { Period, periodInit } from "./period.model";

export interface SMS
{
  id: string,
  text: string,
  smsSendingType: SMSSendingType,
  date: Period,
  brandId: string,
  userTypeIds: Array<string>,
  customerGroupId: string,
  sernarioIds: Array<IdTitle>;
}

export interface SmsPatternGrid { }

export const smsInit: SMS = {
  id: '',
  text: '',
  smsSendingType: SMSSendingType.Instant,
  date: periodInit,
  brandId: '',
  userTypeIds: [],
  customerGroupId: '',
  sernarioIds: [],
};
