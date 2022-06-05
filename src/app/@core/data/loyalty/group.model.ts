import { RestPeriodType } from "./enums.model";
import { IdTitle } from "./get-senarios-grid.model";

export interface GroupGrid
{
  brandId: string;
  brandName: string;
  restPeriodType: RestPeriodType;
  groupsCount: 0;
}

export interface GroupModel
{
  brandId: string;
  restPeriodType: RestPeriodType;
  groups: Array<IdTitle>;
}

export const groupModelInit: GroupModel = {
  brandId: '',
  groups: [],
  restPeriodType: RestPeriodType.OneMonth
};
