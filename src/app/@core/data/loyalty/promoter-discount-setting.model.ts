export interface PromoterDiscountSettingGrid { }

export interface PromoterDiscountSetting
{
  brandId: string;
  commissionBasis: number;
  acceptedCommissionBasis: number;
  customerDiscountMin: number;
  acceptedCustomerDiscountMin: number;
  customerDiscountMax: number;
  acceptedCustomerDiscountMax: number;
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
  acceptedCommissionBasis: 0,
  acceptedCustomerDiscountMax: 0,
  acceptedCustomerDiscountMin: 0
};



