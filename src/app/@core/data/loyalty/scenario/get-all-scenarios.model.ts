import { Period } from "../period.model";

export interface GetAllSenarios
{
  pageSize: number;
  pageIndex: number;
  brandFilter: BrandFilter;
  periodFilter: ScenarioDate;
  statusFilter: StatusFilter;
  customersFilter: CustomersFilter;
}

export class BrandFilter
{
  brandIds = new Array<string>();
  filterType = 0;
}
export class CustomersFilter
{
  groupIds = new Array<string>();
  campaignIds = new Array<string>();
  phones = new Array<string>();
  filterType = 0;
}
export class StatusFilter
{
  status = 0;
}
export interface ScenarioDate
{
  date: Period;
}
