import { Amount, IdTitle, IdTitleType } from "./get-senarios-grid.model";
import { PeriodModel } from "./period.model";

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
  senarioType: IdTitleType;
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

