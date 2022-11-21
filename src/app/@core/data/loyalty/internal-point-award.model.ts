import { DiscountValidationDateType } from './enums.model';
import { Period, periodInit } from './period.model';

export interface InternalPointAwardGrid
{
  id: string;
  exporterBrand: string;
  group: string;
  point: string;
  providerBrand: string;
  title: string;
}

export interface InternalPointAward
{
  title: string;
  periodMin: Period;
  periodMax: Period;
  text: string;
  providerBrandId: string;
  userTypeId?: string;
  groupId?: string;
  exporterBrandId: string;
  exporterBrandLogoId: string;
  exporterBrandHexaCode: string;
  pointAmount: number;
  patternId: string;
  discountValidationDateType: DiscountValidationDateType;
  discountCodeDate: Period;
  discountCodeDaysAfterIssuedCode: number;
  id: string;
  categoryId: string;
  exporterBrandLogoName: string;
}

export const InternalPointAwardInit: InternalPointAward =
{
  title: '',
  periodMax: periodInit,
  periodMin: periodInit,
  text: '',
  providerBrandId: '',
  userTypeId: '',
  groupId: '',
  exporterBrandId: '',
  exporterBrandLogoId: '',
  exporterBrandHexaCode: '',
  pointAmount: 0,
  patternId: '',
  discountValidationDateType: 1,
  discountCodeDate: periodInit,
  discountCodeDaysAfterIssuedCode: 0,
  id: '',
  categoryId: '',
  exporterBrandLogoName: '',
};
export interface AwareDiscountCodePattern
{
  title: string;
  id: string;
  discountType: number;
  discountVolume: number;
  discountCeiling: number;
}
