export interface PromoterDiscountSettingGrid { }

export interface PromoterDiscountSetting
{
  brandId: string;
  commissionBasis: number;
  commissionBasisProposed?: number | null;
  customerDiscountMin: number;
  customerDiscountMinProposed?: number | null;
  customerDiscountMax: number;
  customerDiscountMaxProposed?: number | null;
  id: string | null;
  userTypeId: string;
}

export const promoterDiscountSettingInit: PromoterDiscountSetting = {
  brandId: '',
  commissionBasis: 0,
  customerDiscountMin: 0,
  customerDiscountMax: 0,
  id: '',
  userTypeId: '',
  commissionBasisProposed: null,
  customerDiscountMinProposed: null,
  customerDiscountMaxProposed: null,
};



