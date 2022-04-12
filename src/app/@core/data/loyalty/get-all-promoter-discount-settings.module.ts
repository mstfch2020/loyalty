export interface GetAllPromoterDiscountSettings
{
  pageSize: number;
  pageIndex: number;
  userTypeFilter: UserTypeFilter;
  brandFilter: BrandFilter;
  customerDiscountFilter: CustomerDiscountFilter;
  commissionBasisFilter: CommissionBasisFilter;
}

export class BrandFilter
{
  brandIds = new Array<string>();
  filterType = 0;
}

export class UserTypeFilter
{
  userTypeIds = new Array<string>();
  filterType = 0;
}

export class CommissionBasisFilter
{
  commissionBasisPeriod = new Array<number>();
}

export class CustomerDiscountFilter
{
  customerDiscountPeriod = new Array<number>();
}
