export interface PromoterDiscountSettingGrid { }

export interface PromoterDiscountSetting {
  id: string | null;
  title: string;
  brandIds: Array<string>;// to do brandIds
  brandId: string;
  userTypeId: string;
  commissionBasis: number;
  customerDiscountMin: number;
  customerDiscountMax: number;
}

export const promoterDiscountSettingInit: PromoterDiscountSetting = {
  id: '',
  brandIds: [],
  brandId:'',
  commissionBasis:0,
  customerDiscountMin:0,
  customerDiscountMax:100,
  title:'',
  userTypeId:''
};



