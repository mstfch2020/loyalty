import { ApplyOnType, DiscountCodeType, DiscountType, DiscountVolumeType } from "./enums.model";
import { Period, periodInit } from "./period.model";

export interface DiscountGrid { }

export interface Discount
{
  id: string;
  periodMin: Period;
  periodMax: Period;
  brandIds: Array<string>;
  groupIds: Array<string>;
  userTypeIds: Array<string>;
  productGroupIds: Array<string>;
  productGroupsExceptedIds: Array<string>;
  productGroupsConditionIds: Array<string>;
  purchanseAmountMin: number;
  purchanseAmountMax: number;
  patternName: string;
  generatedDiscountCodes: Array<string>;
  discountVolumeType: number;
  discountVolumeValue: number;
  discountVolumeThreshold: number;
  numberUsesPerUser: number;
  numberUsesTotal: number;
  applyOnType: number;
  discountType: number;
  discountCodeType: number;
  integrateOtherDiscount: boolean;
  freeSending: boolean;
  randomDiscountCodePrefix: string;
  randomDiscountCodeCount: number;
  discountFixCode: string;
}

export const discountInit: Discount = {
  id: '',
  periodMin: periodInit,
  periodMax: periodInit,
  brandIds: [],
  groupIds: [],
  userTypeIds: [],
  productGroupIds: [],
  productGroupsExceptedIds: [],
  productGroupsConditionIds: [],
  purchanseAmountMin: 0,
  purchanseAmountMax: 0,
  patternName: '',
  generatedDiscountCodes: [],
  discountVolumeType: DiscountVolumeType.Toman,
  discountVolumeValue: 0,
  discountVolumeThreshold: 0,
  numberUsesPerUser: 0,
  numberUsesTotal: 0,
  applyOnType: ApplyOnType.AfrerApplySenario,
  discountType: DiscountType.Product,
  discountCodeType: DiscountCodeType.Random,
  integrateOtherDiscount: false,
  freeSending: false,
  discountFixCode: '',
  randomDiscountCodePrefix: '',
  randomDiscountCodeCount: 0,

};
