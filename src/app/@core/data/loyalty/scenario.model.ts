import { BehavioralReward, behavioralRewardInit } from "./behavioral-reward.model";
import { PurchaseRoundType, SenarioType } from "./enums.model";
import { Period, periodInit } from "./period.model";
import { PurchaseReward, purchaseRewardInit } from "./purchase-reward.model";

export interface Scenario
{
  senarioType: SenarioType;
  title: string;
  brandIds: Array<string>;// to do brandIds
  productGroupIds: Array<string>;// to do productGroupIds
  customerGroupIds: Array<string>;// to do customerGroupIds
  userTypeIds: Array<string>;// to do userTypeIds
  periodMin: Period;
  periodMax: Period;
  purchaseAmountMin: number;
  purchaseAmountMax: number;
  purchaseRoundType: PurchaseRoundType;
  purchaseRound: number;
  activityId: string;
  purchaseReward: PurchaseReward,
  productDiscountProductGroupIds: Array<string>;// to do  productDiscountProductGroupIds
  freeProductIds: Array<string>;// to do freeProductId
  behavioralReward: BehavioralReward;
  id: string | null;
}

export const scenarioInit: Scenario = {
  senarioType: SenarioType.Behavioral,
  title: '',
  brandIds: [],
  productGroupIds: [],
  customerGroupIds: [],
  userTypeIds: [],
  periodMin: periodInit,
  periodMax: periodInit,
  purchaseAmountMin: 0,
  purchaseAmountMax: 0,
  purchaseRoundType: 1,
  purchaseRound: 0,
  activityId: '',
  purchaseReward: purchaseRewardInit,
  productDiscountProductGroupIds: [],
  freeProductIds: [],
  behavioralReward: behavioralRewardInit,
  id: ''
};
