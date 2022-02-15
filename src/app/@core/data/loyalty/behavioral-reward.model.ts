import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehavioralRewardType, RewardDiscountCodeValidationType } from "./enums.model";
import { createPeriodFormGroup, Period, periodInit } from "./period.model";

export interface BehavioralReward
{
  id: string;
  behavioralRewardType: BehavioralRewardType;
  increaseScorePercent: number;
  increaseScoreThreshold: number;
  refundToWalletPercent: number;
  refundToWalletThreshold: number;
  discountCodePercent: number;
  discountCodeThreshold: number;
  discountCodeValidationType: RewardDiscountCodeValidationType;
  discountCodeDate: Period;
  discountCodeDaysAfterIssuedCode: number;
  refundReward: boolean;
  increasScoreReward: boolean;
  discountCodeReward: boolean;
}

export const behavioralRewardInit: BehavioralReward = {
  id: '',
  behavioralRewardType: 0,
  increaseScorePercent: 0,
  increaseScoreThreshold: 0,
  refundToWalletPercent: 0,
  refundToWalletThreshold: 0,
  discountCodePercent: 0,
  discountCodeThreshold: 0,
  discountCodeValidationType: 0,
  discountCodeDate: periodInit,
  discountCodeDaysAfterIssuedCode: 0,
  refundReward: true,
  increasScoreReward: true,
  discountCodeReward: true
};

export const createBehavioralRewardFormGroup = (behavioralReward: BehavioralReward, formBuilder: FormBuilder): FormGroup =>
{
  return formBuilder.group({
    behavioralRewardType: [behavioralReward.behavioralRewardType, [Validators.required]],
    increaseScorePercent: [behavioralReward.increaseScorePercent, [Validators.required]],
    increaseScoreThreshold: [behavioralReward.increaseScoreThreshold, [Validators.required]],
    refundToWalletPercent: [behavioralReward.refundToWalletPercent, [Validators.required]],
    refundToWalletThreshold: [behavioralReward.refundToWalletThreshold, [Validators.required]],
    discountCodePercent: [behavioralReward.discountCodePercent, [Validators.required]],
    discountCodeThreshold: [behavioralReward.discountCodeThreshold, [Validators.required]],
    discountCodeValidationType: [behavioralReward.discountCodeValidationType, [Validators.required]],
    discountCodeDate: createPeriodFormGroup(behavioralReward.discountCodeDate, formBuilder),
    discountCodeDaysAfterIssuedCode: [behavioralReward.discountCodeDaysAfterIssuedCode, [Validators.required]],
  });
};
