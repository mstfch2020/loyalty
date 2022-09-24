import { Period, periodInit } from "./period.model";

export interface NewDiscountDialogModel
{
  id: string;
  promoterId: string;
  brandId: string;
  tagIds: [];
  commissionBasis: number;
  consumerDiscount: number;
  status: number;
  useCount: number;
  code: string;
  periodMin: Period;
  periodMax: Period;
}

export const newDiscountDialogModelInit: NewDiscountDialogModel = {
  id: '',
  promoterId: '',
  brandId: '',
  tagIds: [],
  commissionBasis: 0,
  consumerDiscount: 0,
  status: 0,
  useCount: 200,
  code: '',
  periodMin: periodInit,
  periodMax: periodInit,
};
