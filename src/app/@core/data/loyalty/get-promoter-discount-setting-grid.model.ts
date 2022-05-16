import { Amount, IdTitle, IdTitleType } from "./get-senarios-grid.model";
import { PeriodModel } from "./period.model";

export interface GetPromoterDiscountSettingGrid
{
  brand: string;
  commissionBasis: number;
  customerDiscountRange: string;
  userType: string;
  id: string;
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

