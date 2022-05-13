import { Component, OnInit } from "@angular/core";
import { FilterNames } from "../../data/loyalty/enums.model";
import { FilterTitle, IdTitle, IdTitleTypeBrandId } from "../../data/loyalty/get-senarios-grid.model";
import { BrandFilter, CustomersFilter, StatusFilter } from "../../data/loyalty/scenario/get-all-scenarios.model";
import { Utility } from "../../utils/Utility";
import { BaseInfoService } from "../loyalty/base-info.service";

@Component({
  selector: 'base-search',
  template: '',
})
export class BaseSearch implements OnInit
{
  theFilterCustomerList = new Array<FilterTitle>();
  theFilterCustomerSelectedList = new Array<IdTitleTypeBrandId>();
  theFilterCustomerSelectedCondition = 0;

  theFilterTitleFilterSelectedList = new Array<IdTitleTypeBrandId>();
  theFilterTitleFilterSelectedCondition = 0;

  theFilterGroupSelectedList = new Array<IdTitleTypeBrandId>();
  theFilterGroupSelectedCondition = 0;

  theFilterBrandsList = new Array<FilterTitle>();
  theFilterBrandsSelectedList = new Array<IdTitle>();
  theFilterBrandsSelectedCondition = 0;

  theFilterLevelsList = new Array<FilterTitle>();
  theFilterLevelsSelectedList = new Array<IdTitle>();
  theFilterLevelsSelectedCondition = 0;


  theFilterUserTypeList = new Array<FilterTitle>();
  theFilterUserTypeSelectedList = new Array<IdTitle>();
  theFilterUserTypeSelectedCondition = 0;

  theFilterCommissionList = new Array<FilterTitle>();
  theFilterCommissionSelectedList = new Array<IdTitle>();
  theFilterCommissionSelectedCondition = 0;

  theFilterPercentList = new Array<FilterTitle>();
  theFilterPercentSelectedList = new Array<IdTitle>();
  theFilterPercentSelectedCondition = 0;

  theFilterDateList = new Array<FilterTitle>();
  theFilterDateFromSelected = "";
  theFilterDateToSelected = "";
  theFilterStatusSelected = 0;

  theExpireDateSelected = "";

  pageIndex = 1;
  pageSize = 20;

  activeFilterName = FilterNames.None;

  theFilterStatusSelectedCondition = 0;
  theFilterStatusList: Array<FilterTitle> = [
    {
      id: '1',
      title: 'فعال', type: 0,
      checked: false,
    },
    {
      id: '2',
      title: 'غیرفعال', type: 0,
      checked: false,
    },
  ];

  constructor(public baseInfoService: BaseInfoService)
  {

  }

  ngOnInit(): void
  {
    this.baseInfoService.loadBaseInfo(() => { });
    this.baseInfoService.generalCustomers$.subscribe(value =>
    {
      value.forEach(p =>
      {
        this.theFilterCustomerList.push({
          checked: false,
          id: p.id,
          title: p.title,
          type: p.type,
        });
      });
    });

    this.baseInfoService.brands$.subscribe(value =>
    {
      value.forEach(p =>
      {
        this.theFilterBrandsList.push({
          checked: false,
          id: p.id,
          title: p.title, type: 0
        });
      });
    });

    this.baseInfoService.customerLevel$.subscribe(value =>
    {
      value.forEach(p =>
      {
        this.theFilterLevelsList.push({
          checked: false,
          id: p.id,
          title: p.title, type: 0
        });
      });
    });

    this.baseInfoService.userTypes$.subscribe(value =>
    {
      value.forEach(p =>
      {
        this.theFilterUserTypeList.push({
          checked: false,
          id: p.id,
          title: p.title, type: 0
        });
      });
    });

    this.search({ pageSize: this.pageSize, pageIndex: this.pageIndex });
  }

  openFilterForm(filterType: FilterNames)
  {
    this.activeFilterName = filterType;

  }

  applyFilterForm(event: any, filterType: number)
  {
    this.activeFilterName = FilterNames.Searched;
    switch (filterType)
    {
      case 1:
        this.theFilterCustomerSelectedList = event.value;
        this.theFilterCustomerSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case 2:
        this.theFilterDateFromSelected = event?.dateFrom;
        this.theFilterDateToSelected = event?.dateTo;
        break;
      case 3:
        this.theFilterBrandsSelectedList = event.value;
        this.theFilterBrandsSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case 4:
        this.theFilterStatusSelected = parseInt(event.value[0].id, 0);
        break;
      case 6:
        this.theFilterUserTypeSelectedList = event.value;
        this.theFilterUserTypeSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case 7:
        this.theFilterCommissionSelectedList = event.value;
        this.theFilterCommissionSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case 8:
        this.theFilterPercentSelectedList = event.value;
        this.theFilterPercentSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case 9:
        this.theFilterLevelsSelectedList = event.value;
        this.theFilterLevelsSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case 10:
        this.theFilterGroupSelectedList = event.value;
        this.theFilterGroupSelectedCondition = parseInt(event.conditionType, 0);
        break;

      case 11:
        this.theFilterTitleFilterSelectedList = event.value;
        this.theFilterTitleFilterSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case 12:
        this.theExpireDateSelected = event?.dateFrom;
        break;
    }

    const request: any = {};
    request.pageIndex = this.pageIndex;
    request.pageSize = this.pageSize;

    if (this.theFilterPercentSelectedList && this.theFilterPercentSelectedList.length > 0)
    {
      request.CommissionFilter = {} as any;
      request.CommissionFilter.CustomerDiscounts = this.theFilterPercentSelectedList.map(p => p.id);
      if (this.theFilterPercentSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.CommissionFilter.CustomerDiscounts = [];
      }
      request.CommissionFilter.filterType = 0;
      if (this.theFilterPercentSelectedCondition != 0)
      {
        request.CommissionFilter.filterType = this.theFilterPercentSelectedCondition;
      }
    }

    if (this.theFilterCommissionSelectedList && this.theFilterCommissionSelectedList.length > 0)
    {
      request.CommissionFilter = {} as any;
      request.CommissionFilter.CommissionBasises = this.theFilterCommissionSelectedList.map(p => p.id);
      if (this.theFilterCommissionSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.CommissionFilter.CommissionBasises = [];
      }
      request.CommissionFilter.filterType = 0;
      if (this.theFilterCommissionSelectedCondition != 0)
      {
        request.CommissionFilter.filterType = this.theFilterCommissionSelectedCondition;
      }
    }

    if (this.theFilterUserTypeSelectedList && this.theFilterUserTypeSelectedList.length > 0)
    {
      request.UserTypeFilter = {} as any;
      request.UserTypeFilter.UserTypeIds = this.theFilterUserTypeSelectedList.map(p => p.id);
      if (this.theFilterUserTypeSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.UserTypeFilter.UserTypeIds = [];
      }
      request.UserTypeFilter.filterType = 0;
      if (this.theFilterUserTypeSelectedCondition != 0)
      {
        request.UserTypeFilter.filterType = this.theFilterUserTypeSelectedCondition;
      }
    }

    if (this.theFilterTitleFilterSelectedList && this.theFilterTitleFilterSelectedList.length > 0)
    {
      request.titleFilter = {} as any;
      request.titleFilter.titles = this.theFilterTitleFilterSelectedList.map(p => p.id);
      if (this.theFilterTitleFilterSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.titleFilter.titles = [];
      }
      request.titleFilter.filterType = 0;
      if (this.theFilterTitleFilterSelectedCondition != 0)
      {
        request.titleFilter.filterType = this.theFilterTitleFilterSelectedCondition;
      }
    }

    if (this.theFilterBrandsSelectedList && this.theFilterBrandsSelectedList.length > 0)
    {
      request.brandFilter = new BrandFilter();
      request.brandFilter.brandIds = this.theFilterBrandsSelectedList.map(p => p.id);
      if (this.theFilterBrandsSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.brandFilter.brandIds = [];
      }
      request.brandFilter.filterType = 0;
      if (this.theFilterBrandsSelectedCondition != 0)
      {
        request.brandFilter.filterType = this.theFilterBrandsSelectedCondition;
      }
    }


    if (this.theFilterLevelsSelectedList && this.theFilterLevelsSelectedList.length > 0)
    {
      request.levelFilter = {} as any;
      request.levelFilter.levels = this.theFilterLevelsSelectedList.map(p => p.id);
      if (this.theFilterLevelsSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.levelFilter.levels = [];
      }
      request.levelFilter.filterType = 0;
      if (this.theFilterLevelsSelectedCondition != 0)
      {
        request.levelFilter.filterType = this.theFilterLevelsSelectedCondition;
      }
    }

    if (this.theFilterGroupSelectedList && this.theFilterGroupSelectedList.length > 0)
    {
      request.groupFilter = {} as any;
      request.groupFilter.groups = this.theFilterGroupSelectedList.map(p => p.id);
      if (this.theFilterGroupSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.groupFilter.groups = [];
      }
      request.groupFilter.filterType = 0;
      if (this.theFilterGroupSelectedCondition != 0)
      {
        request.groupFilter.filterType = this.theFilterGroupSelectedCondition;
      }
    }


    if (this.theFilterCustomerSelectedList && this.theFilterCustomerSelectedList.length > 0)
    {
      request.customersFilter = new CustomersFilter();
      request.customersFilter.groupIds = this.theFilterCustomerSelectedList.filter(a => a.type === 1).map(p => p.id);
      request.customersFilter.campaignIds = this.theFilterCustomerSelectedList.filter(a => a.type === 2).map(p => p.id);
      request.customersFilter.phones = this.theFilterCustomerSelectedList.filter(a => a.type === 3).map(p => p.id);
      if (this.theFilterCustomerSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.customersFilter.groupIds = [];
        request.customersFilter.campaignIds = [];
        request.customersFilter.phones = [];
      }
      request.customersFilter.filterType = 0;
      if (this.theFilterCustomerSelectedCondition != 0)
      {
        request.customersFilter.filterType = this.theFilterCustomerSelectedCondition;
      }
    }

    if (this.theFilterStatusSelected !== 0)
    {
      request.statusFilter = new StatusFilter();
      request.statusFilter.status = this.theFilterStatusSelected;
    }
    if (this.theFilterDateFromSelected)
    {
      request.periodFilter = { date: Utility.getPeriodOfString(this.theFilterDateFromSelected) };
    }

    this.search(request);
    this.activeFilterName = FilterNames.Searched;
  }

  search(request: any) { }

  closeFilterForm(event: boolean, filterType: number)
  {
    this.activeFilterName = FilterNames.Searched;
  }

  selectedPageIndex(event: number)
  {
    this.pageIndex = event;
    this.applyFilterForm(null, 0);
  }
}
