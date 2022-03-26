import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Utility } from "../../utils/Utility";
import { RewardDiscountCodeValidationType } from "./enums.model";
import { createPeriodFormGroup, Period, periodInit } from "./period.model";

export interface PurchaseReward
{
  id: string;
  sendingDiscount: number;
  productDiscountPercent: number;
  basketDiscountPercent: number;
  basketDiscountThreshold: number;
  refundPercent: number;
  refundThreshold: number;
  increaseScorePercent: number;
  increaseScoreThreshold: number;
  discountCodePercent: number;
  discountCodeThreshold: number;
  discountCodeValidationType: RewardDiscountCodeValidationType;
  discountCodeDate: Period;
  discountCodeDaysAfterIssuedCode: number;

  sendingDiscountReward: boolean,
  basketDiscountReward: boolean,
  productDiscountReward: boolean,
  addFreeProductReward: boolean,

  refundReward: boolean,
  increasScoreReward: boolean,
  discountCodeReward: boolean,
}

export const purchaseRewardInit: PurchaseReward = {
  id: '',
  sendingDiscount: 0,
  productDiscountPercent: 0,
  basketDiscountPercent: 0,
  basketDiscountThreshold: 0,
  refundPercent: 0,
  refundThreshold: 0,
  increaseScorePercent: 0,
  increaseScoreThreshold: 0,
  discountCodePercent: 0,
  discountCodeThreshold: 0,
  discountCodeValidationType: RewardDiscountCodeValidationType.Date,
  discountCodeDate: periodInit,
  discountCodeDaysAfterIssuedCode: 0,
  sendingDiscountReward: false,
  basketDiscountReward: false,
  productDiscountReward: false,
  addFreeProductReward: false,
  refundReward: false,
  increasScoreReward: false,
  discountCodeReward: false
};
export const createPurchaseRewardFormGroup = (purchaseReward: PurchaseReward, formBuilder: FormBuilder): FormGroup =>
{
  if (!purchaseReward)
  {
    purchaseReward = purchaseRewardInit;
  }
  return formBuilder.group({
    id: [purchaseReward.id, [Validators.required]],
    sendingDiscount: [purchaseReward.sendingDiscount, [Validators.required, Validators.max(100), Validators.min(0)]],
    productDiscountPercent: [purchaseReward.productDiscountPercent, [Validators.required, Validators.max(100), Validators.min(0)]],
    basketDiscountPercent: [purchaseReward.basketDiscountPercent, [Validators.required, Validators.max(100), Validators.min(0)]],
    basketDiscountThreshold: [purchaseReward.basketDiscountThreshold, [Validators.required]],
    refundPercent: [purchaseReward.refundPercent, [Validators.required, Validators.max(100), Validators.min(0)]],
    refundThreshold: [purchaseReward.refundThreshold, [Validators.required]],
    increaseScorePercent: [purchaseReward.increaseScorePercent, [Validators.required, Validators.max(100), Validators.min(0)]],
    increaseScoreThreshold: [purchaseReward.increaseScoreThreshold, [Validators.required]],
    discountCodePercent: [purchaseReward.discountCodePercent, [Validators.max(100), Validators.min(0)]],
    discountCodeThreshold: [purchaseReward.discountCodeThreshold, [Validators.required]],
    discountCodeValidationType: [purchaseReward.discountCodeValidationType, [Validators.required]],
    discountCodeDaysAfterIssuedCode: [purchaseReward.discountCodeDaysAfterIssuedCode, [Validators.required]],
    sendingDiscountReward: [purchaseReward.sendingDiscountReward, [Validators.required]],
    basketDiscountReward: [purchaseReward.basketDiscountReward, [Validators.required]],
    productDiscountReward: [purchaseReward.productDiscountReward, [Validators.required]],
    addFreeProductReward: [purchaseReward.addFreeProductReward, [Validators.required]],
    refundReward: [purchaseReward.refundReward, [Validators.required]],
    increasScoreReward: [purchaseReward.increasScoreReward, [Validators.required]],
    discountCodeReward: [purchaseReward.discountCodeReward, [Validators.required]],
    discountCodeDate: createPeriodFormGroup(purchaseReward.discountCodeDate, formBuilder),
    expierDate: [Utility.getFullDateTimeFromPeriodInPersion(purchaseReward.discountCodeDate), [Validators.required]]
  });
};
