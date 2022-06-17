import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Utility } from "../../utils/Utility";
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
  discountCodePattern: string;
}

export const behavioralRewardInit: BehavioralReward = {
  id: '',
  behavioralRewardType: 1,
  increaseScorePercent: 0,
  increaseScoreThreshold: 0,
  refundToWalletPercent: 0,
  refundToWalletThreshold: 0,
  discountCodePattern: '',
  discountCodePercent: 0,
  discountCodeThreshold: 0,
  discountCodeValidationType: 0,
  discountCodeDate: periodInit,
  discountCodeDaysAfterIssuedCode: 0,
  refundReward: false,
  increasScoreReward: false,
  discountCodeReward: false
};

export const createBehavioralRewardFormGroup = (behavioralReward: BehavioralReward, formBuilder: FormBuilder): FormGroup =>
{
  if (!behavioralReward)
  {
    behavioralReward = behavioralRewardInit;
  }
  return formBuilder.group({
    behavioralRewardType: [behavioralReward.behavioralRewardType, [Validators.required]],
    increaseScorePercent: [behavioralReward.increaseScorePercent, [Validators.required]],
    increaseScoreThreshold: [behavioralReward.increaseScoreThreshold, [Validators.required]],
    refundToWalletPercent: [behavioralReward.refundToWalletPercent, [Validators.required, Validators.max(100), Validators.min(0)]],
    refundToWalletThreshold: [behavioralReward.refundToWalletThreshold, [Validators.required]],
    discountCodePercent: [behavioralReward.discountCodePercent, [Validators.required, Validators.max(100), Validators.min(0)]],
    discountCodeThreshold: [behavioralReward.discountCodeThreshold, [Validators.required]],
    discountCodeValidationType: [behavioralReward.discountCodeValidationType, [Validators.required]],
    discountCodeDate: createPeriodFormGroup(behavioralReward.discountCodeDate, formBuilder),
    expierDate: [Utility.getFullDateTimeFromPeriodInPersion(behavioralReward.discountCodeDate), [Validators.required]],
    discountCodeDaysAfterIssuedCode: [behavioralReward.discountCodeDaysAfterIssuedCode, [Validators.required]],
    refundReward: [behavioralReward.refundReward, [Validators.required]],
    increasScoreReward: [behavioralReward.increasScoreReward, [Validators.required]],
    discountCodeReward: [behavioralReward.discountCodeReward, [Validators.required]],
    discountCodePattern: [behavioralReward.discountCodePattern, []],
  });
};
