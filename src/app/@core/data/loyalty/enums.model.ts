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

export enum RestPeriodType
{
  None = 0,
  OneMonth = 1,
  TwoMonths = 2,
  ThreeMonths = 3,
  SixMonths = 4,
  twelveMonths = 5
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
  Paging = 13,
  RestPeriodType = 14,
  volumeFilter = 15,
  DiscountCode = 16,
  Phone = 17,
  CreateAccountDateFilter = 18,
  ActivityCount = 19,
  Campaign = 20,
  Score = 21,
  ActivityCountList = 22,
  Activities = 23,
  ActivitiesKey = 24,
  ProductTag = 25,
  DateFilter = 26,
  ContractStatus = 27,
  ExporterBrandFilter = 28,
  ProviderBrandFilter = 29,
}

export enum StatusType
{
  None = 0,
  ScenarioTypeStatus = 1,
  UsageStateStatus = 2,
  ContractStatus = 3
}

export enum UsageState
{
  None = 0,
  Used = 1, // استفاده شده
  Involving = 2// قابل استفاده
}

export enum ContractType
{
  None = 0,
  Teacher = 1,
  Distributor = 2,
  Shop = 3
}

export enum ContractStatus
{

  None = 0,
  Active = 1,
  Request = 2,
  Edited = 3,
  Reject = 4
}

export enum SchoolType
{
  None = 0,
  Gov = 1,
  Commercial = 2
}

export enum OwnershipType
{
  Melki = 1,
  Stijari = 2
}

export enum ComboTypes
{
  None = 0,
  Province = 1,
  City = 2,
  Area = 3,
  Education = 4,
  Grade = 5,
  Lesson = 6,
  ActivityZone = 7,
  DistributorActivitySection = 8,
  ShopActivitySection = 9,
  SchoolType = 10,
}

export enum PromoterDiscountCodeStatus
{
  None = 0,
  Active = 1,
  InActive = 2
}

export enum DiscountValidationDateType
{
  None = 0,
  Date = 1,
  DaysAfterIssuedCode = 2
}
