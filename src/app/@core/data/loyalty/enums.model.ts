export enum BehavioralRewardType
{
  none = 0,
  UserHimself = 1,
  ThirdParty = 2
}

export enum RewardDiscountCodeValidationType
{
  none = 0, Date = 1, DaysAfterIssuedCode = 2
}

export enum GroupUserLevelEnum
{
  X1 = 1,
  X2 = 2,
  X3 = 3
}

export enum SenarioStatusType
{
  none = 0, Enable = 1, Disable = 2, Watting = 3, Reject = 4
}

export enum SenarioType
{
  none = 0, Purchase = 1, Behavioral = 2
}

export enum PurchaseRoundType
{
  IndependentOfSenario = 1,
  InRangeOfSenario = 2,
  IndependentOfPurchaseRound = 3
}

export enum SMSSendingType { Instant = 1, Scheduled = 2 }
export enum OperationType
{
  None = 0,
  Earn = 1,
  Expend = 2
}
