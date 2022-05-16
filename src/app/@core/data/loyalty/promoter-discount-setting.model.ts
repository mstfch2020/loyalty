export interface PromoterDiscountSettingGrid { }

export interface PromoterDiscountSetting
{
  brandId: string;
  commissionBasis: number;
  customerDiscountMin: number;
  customerDiscountMax: number;
  id: string | null;
  userTypeId: string;
}

export const promoterDiscountSettingInit: PromoterDiscountSetting = {
  brandId: '',
  commissionBasis: 0,
  customerDiscountMin: 0,
  customerDiscountMax: 100,
  id: '',
  userTypeId: '',
};



