import { SMSSendingType } from "./enums.model";
import { Period } from "./period.model";

// to do no get api
export interface SmsDefinition
{
  id: string;
  text: string;
  smsSendingType: SMSSendingType;
  date: Period;
  brandId: string;
  userTypeIds: Array<string>;
  customerGroupId: string;
  targetId: string;
}

