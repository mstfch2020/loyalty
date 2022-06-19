import { ApplyOnType, DiscountCodeType, DiscountType, DiscountVolumeType } from "./enums.model";
import { Period, periodInit } from "./period.model";

export interface DiscountGrid
{
  id: string;
  brands: Array<string>;
  patternName: string;
  periodMax: Period;
  periodMin: Period;
  volume: number;
  volumeType: DiscountVolumeType;

}
export interface DiscountCodesGeneratedGrid { }

export interface Discount
{
  staticCode: string;
  id: string;
  periodMin: Period;
  periodMax: Period;
  brandIds: Array<string>;
  groupIds: Array<string>;
  phones: Array<string>;
  campaignIds: Array<string>;
  userTypeIds: Array<string>;
  productGroupIds: Array<string>;
  productCodes: Array<string>;
  productExceptedCodes: Array<string>;
  productGroupsExceptedIds: Array<string>;
  productGroupsConditionIds: Array<string>;
  productConditionCodes: Array<string>;
  purchanseAmountMin?: number | null;
  purchanseAmountMax?: number | null;
  patternName: string;
  usePatternName: boolean,
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
  isProducable: boolean;
}

export const discountInit: Discount = {
  id: '',
  periodMin: periodInit,
  periodMax: periodInit,
  brandIds: [],
  groupIds: [],
  userTypeIds: [],
  productGroupIds: [],
  productExceptedCodes: [],
  productGroupsConditionIds: [],
  purchanseAmountMin: null,
  purchanseAmountMax: null,
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
  staticCode: '',
  phones: [],
  campaignIds: [],
  productCodes: [],
  productGroupsExceptedIds: [],
  productConditionCodes: [],
  isProducable: true,
  usePatternName: true
};
