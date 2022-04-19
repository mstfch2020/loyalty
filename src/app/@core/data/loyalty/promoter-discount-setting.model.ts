export interface PromoterDiscountSettingGrid { }

export interface PromoterDiscountSetting {
  id: string | null;
  title: string;
  brandIds: Array<string>;// to do brandIds
  brandId: string;
  userTypeIds: Array<string>;// to do userTypeIds
  userTypeId: string;
  commissionBasis: number;
  customerDiscountMin: number;
  customerDiscountMax: number;
}

export const promoterDiscountSettingInit: PromoterDiscountSetting = {
  id: '',
  title:'',
  brandIds: [],
  brandId:'',
  userTypeIds:[],
  userTypeId:'',
  commissionBasis:0,
  customerDiscountMin:0,
  customerDiscountMax:100,
};



