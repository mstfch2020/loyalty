import { PeriodModel } from "./period.model";

export interface IdTitle { id: string; title: string; }
export interface IdTitleType { id: string; title: string; type: number; }
export interface IdTitleTypeBrandId { id: string; title: string; type: number; brandId: string; }
export interface FilterTitle { id: string; title: string; checked: boolean; }
export interface EnumTitle { id: number; title: string; }
export interface Amount { min: number; max: number; }
export interface AmountTitle { title: string; values: Array<string>; type: string; }
export interface GetPurchaseRewardModel
{
  sendingDiscount: number;
  productDiscountPercent: number;
  basketDiscountPercent: number;
  basketDiscountThreshold: number;
  refundPercent: number;
  refundThreshold: number;
  increaseScorePercent: number;
  increaseScoreThreshold: number;
  discountCodePercent: number;
  discountCodeThreshold: number;
  discountCodeValidationType: IdTitle;
  discountCodeDate: string;
  discountCodeDaysAfterIssuedCode: number;
  sendingDiscountReward: boolean;
  basketDiscountReward: boolean;
  productDiscountReward: boolean;
  addFreeProductReward: boolean;
  refundReward: boolean;
  increasScoreReward: boolean;
  discountCodeReward: boolean;
}

export interface GetSenariosGrid
{
  id: string,
  title: any;//rewards,name
  customerGroups: string,
  period: string,
  brands: string,
  senarioState: string;
}

export interface GetSenarios
{
  id: string;
  senarioType: IdTitle;
  title: string;
  brands: Array<IdTitle>;
  productGroups: Array<IdTitle>;
  customerGroups: Array<IdTitle>;
  userTypes: Array<IdTitle>;
  period: PeriodModel;
  purchaseAmount: Amount;
  purchaseRoundType: IdTitle;
  purchaseRound: number;
  activity: IdTitle;
  prodcutDiscountProductGroups: [];
  statusType: IdTitle;
  purchaseReward: GetPurchaseRewardModel;
  freeProduct: [];
  behavioralReward: null;
}

