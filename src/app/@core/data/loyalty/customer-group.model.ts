import { IdTitle } from "./get-senarios-grid.model";

export interface CustomerGroupDetail
{
  id: string;
  brand: IdTitle;
  customerGroup: IdTitle;
  currentLevel: IdTitle;
  nexLevel: IdTitle;
  scoreThreshold: number;
  activityCount: number;
  userTypes: Array<IdTitle>;

}
export interface CustomerGroup
{
  id: string;
  brandId: string;
  customGroupId: string;
  scoreThreshold: number;
  currentLevelId: string;
  newLevelId: string;
  activityCount: number;
  userTypeIds: Array<string>;
}

export const customerGroupInit: CustomerGroup = {
  id: '',
  brandId: '',
  customGroupId: '',
  scoreThreshold: 0,
  currentLevelId: '',
  newLevelId: '',
  activityCount: 0,
  userTypeIds: []
};
