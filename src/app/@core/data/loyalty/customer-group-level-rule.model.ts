import { GroupUserLevelEnum } from "./enums.model";

export interface CustomerGroupAndLevelRule
{
  brandId: string;
  customGroupId: string;
  scoreThreshold: number;
  currentLevelType: CustomerLevel;
  newLevelType: CustomerLevel;
  activityCount: 0;
  userTypeIds: Array<string>;
}

export interface CustomerLevel
{
  type: GroupUserLevelEnum;
}
