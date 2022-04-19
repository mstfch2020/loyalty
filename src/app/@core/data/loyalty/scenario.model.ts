import { BehavioralReward, behavioralRewardInit } from "./behavioral-reward.model";
import { PurchaseRoundType, SenarioType } from "./enums.model";
import { Period, periodInit } from "./period.model";
import { PurchaseReward, purchaseRewardInit } from "./purchase-reward.model";

export interface Scenario
{
  purchaseRound2: number;
  senarioType: SenarioType;
  title: string;
  brandIds: Array<string>;// to do brandIds
  productGroupIds: Array<string>;// to do productGroupIds
  customerGroupIds: Array<string>;// to do customerGroupIds
  campaignIds: Array<string>;
  phones: Array<string>;
  userTypeIds: Array<string>;// to do userTypeIds
  periodMin: Period;
  periodMax: Period;
  purchaseAmountMin: number;
  purchaseAmountMax: number;
  purchaseRoundType: PurchaseRoundType;
  purchaseRound: number;
  activityId: string;
  purchaseReward: PurchaseReward,
  discountedProductGroupIds: Array<string>;// to do  discountedProductGroupIds
  discountedProductCodes: Array<number>;
  freeProductCodes: Array<number>;// to do freeProductId
  behavioralReward: BehavioralReward;
  id: string | null;
}

export const scenarioInit: Scenario = {
  senarioType: SenarioType.Purchase,
  title: '',
  brandIds: [],
  productGroupIds: [],
  customerGroupIds: [],
  campaignIds: [],
  phones: [],
  userTypeIds: [],
  periodMin: periodInit,
  periodMax: periodInit,
  purchaseAmountMin: 0,
  purchaseAmountMax: 0,
  purchaseRoundType: 1,
  purchaseRound: 0,
  purchaseRound2: 0,
  activityId: '',
  purchaseReward: purchaseRewardInit,
  discountedProductGroupIds: [],
  discountedProductCodes: [],
  freeProductCodes: [],
  behavioralReward: behavioralRewardInit,
  id: ''
};


