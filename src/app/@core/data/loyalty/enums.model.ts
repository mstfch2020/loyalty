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


export enum DiscountVolumeType
{
  None = 0,
  Toman = 1,
  Percent = 2
}

export enum ApplyOnType
{
  None = 0,
  BeforeDiscount = 1,
  AfterDiscount = 2,
  AfrerApplySenario = 3
}

export enum DiscountType
{
  None = 0,
  ShoppingBasket = 1,
  Product = 2
}

export enum DiscountCodeType
{
  None = 0,
  Static = 1,
  Random = 2
}

export enum FilterType
{
  None = 0,
  Include = 1,
  Equal = 2,
  Except = 3
}
export enum FilterNames
{
  None = 0,
  Customer = 1,
  Date = 2,
  Brand = 3,
  Status = 4,
  Searched = 5,
  UserType = 6,
  Commission = 7,
  Percent = 8,
  Level = 9,
  Groups = 10,
  CustomerGroupTemporary = 11,
  ExpireDate = 12,
  expireDate = 11,
  Title = 12,
}
