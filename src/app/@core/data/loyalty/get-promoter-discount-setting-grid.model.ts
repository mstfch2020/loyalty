import { PeriodModel } from "./period.model";

export interface IdTitle { id: string; title: string; }
export interface IdTitleType { id: string; title: string; type: number; }
export interface IdTitleTypeBrandId { id: string; title: string; type: number; brandId: string; }
export interface FilterTitle { id: string; title: string; checked: boolean; type: number; }
export interface EnumTitle { id: number; title: string; }
export interface Amount { min: number; max: number; }
export interface AmountTitle { title: string; values: Array<string>; type: string; }

export interface GetPromoterDiscountSettingGrid
{
  id: string | null;
  title: string;
  brandIds: Array<string>;// to do brandIds
  brandId: string;
  userTypeId: string;
  commissionBasis: number;
  customerDiscountMin: number;
  customerDiscountMax: number;
}

export interface GetPromoterDiscountSetting
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
  freeProduct: [];
  behavioralReward: null;
}

