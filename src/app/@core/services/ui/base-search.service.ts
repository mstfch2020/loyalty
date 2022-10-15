import { Injectable } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { FilterNames } from "../../data/loyalty/enums.model";
import { FilterTitle, IdTitle, IdTitleTypeBrandId } from "../../data/loyalty/get-senarios-grid.model";
import { ProductGroup } from "../../data/loyalty/product-group.model";
import { BrandFilter, CustomersFilter, StatusFilter } from "../../data/loyalty/scenario/get-all-scenarios.model";
import { Utility } from "../../utils/Utility";
import { BaseInfoService } from "../loyalty/base-info.service";
import { FilterOption } from "./filter-option.model";

@Injectable({
  providedIn: 'root'
})
export class BaseSearchService
{
  constructor(public baseInfoService: BaseInfoService)
  {

  }
  public unsubscribe = new Subject<void>();
  theActivityList = new Array<FilterTitle>();
  theActivitySelectedList = new Array<IdTitleTypeBrandId>();
  theActivitySelectedCondition = 0;

  theActivityKeySelected = '';
  theActivityKeySelectedCondition = 0;

  theCampaignList = new Array<FilterTitle>();
  theCampaignSelectedList = new Array<IdTitleTypeBrandId>();
  theCampaignSelectedCondition = 0;

  theScoreList = new Array<FilterTitle>();
  theScoreSelectedList = new Array<IdTitleTypeBrandId>();
  theScoreSelectedCondition = 0;

  theActivityCountList = new Array<FilterTitle>();
  theActivityCountListSelectedList = new Array<IdTitleTypeBrandId>();
  theActivityCountListSelectedCondition = 0;

  theFilterCustomerList = new Array<FilterTitle>();
  theFilterCustomerSelectedList = new Array<IdTitleTypeBrandId>();
  theFilterCustomerSelectedCondition = 0;

  theFilterTitleFilterSelectedList = new Array<IdTitleTypeBrandId>();
  theFilterTitleFilterSelectedCondition = 0;

  theFilterGroupList = new Array<FilterTitle>();
  theFilterGroupSelectedList = new Array<IdTitleTypeBrandId>();
  theFilterGroupSelectedCondition = 0;

  theFilterBrandsList = new Array<FilterTitle>();
  theFilterBrandsSelectedList = new Array<IdTitle>();
  theFilterBrandsSelectedCondition = 0;

  theFilterExporterBrandsList = new Array<FilterTitle>();
  theFilterExporterBrandsSelectedList = new Array<IdTitle>();
  theFilterExporterBrandsSelectedCondition = 0;

  theFilterProviderBrandsList = new Array<FilterTitle>();
  theFilterProviderBrandsSelectedList = new Array<IdTitle>();
  theFilterProviderBrandsSelectedCondition = 0;

  theFilterLevelsList = new Array<FilterTitle>();
  theFilterLevelsSelectedList = new Array<IdTitle>();
  theFilterLevelsSelectedCondition = 0;

  theFilterUserTypeList = new Array<FilterTitle>();
  theFilterUserTypeSelectedList = new Array<IdTitle>();
  theFilterUserTypeSelectedCondition = 0;

  theFilterCommissionList = new Array<FilterTitle>();
  theFilterCommissionSelectedList = new Array<IdTitle>();
  theFilterCommissionSelectedCondition = 0;

  theFilterCommissionRadioSelectedList = new Array<IdTitle>();
  theFilterCommissionRadioSelectedCondition = 0;

  theFilterPercentList: Array<FilterTitle> = [];
  theFilterPercentSelectedList = new Array<IdTitle>();
  theFilterPercentSelectedCondition = 0;

  theFilterPercentRadioSelectedList = new Array<IdTitle>();
  theFilterPercentRadioSelectedCondition = 0;

  theProductGroupList = new Array<FilterTitle>();
  theProductGroupListSelectedList = new Array<ProductGroup>();
  theProductGroupListSelectedCondition = 0;

  theFilterDateList = new Array<FilterTitle>();
  theFilterDateFromSelected = "";
  theDateFilterSelected = "";
  theFilterDateToSelected = "";
  theCreateAccountDateSelected = "";

  theExpireDateSelected = "";

  volumeFilterSelected?: number | null = null;
  volumeFilterSelectedCondition = 0;

  minimumVolumeFilterSelected?: number | null = null;
  minimumVolumeFilterSelectedCondition = 0;

  maximumVolumeFilterSelected?: number | null = null;
  maximumVolumeFilterSelectedCondition = 0;

  activityCountFilterSelected?: number | null = null;
  activityCountFilterSelectedCondition = 0;

  discountCodeSelected?: number | null = null;
  discountCodeSelectedCondition = 0;

  phoneSelected?: number | null = null;
  phoneSelectedCondition = 0;

  theFilterStatusSelected = 0;
  theFilterStatusSelectedCondition = 0;
  theFilterStatusList: Array<FilterTitle> = [
    {
      id: '1',
      title: 'فعال',
      type: 0,
      checked: false,
    },
    {
      id: '2',
      title: 'غیرفعال',
      type: 0,
      checked: false,
    },
  ];

  theContractFilterStatusSelected: Array<FilterTitle>;
  theContractFilterStatusSelectedCondition = 0;
  theContractFilterStatusList: Array<FilterTitle> = [
    {
      id: '1',
      title: 'جدید',
      type: 0,
      checked: false,
    },
    {
      id: '2',
      title: 'بسته شده',
      type: 0,
      checked: false,
    },
    {
      id: '3',
      title: 'رد شده',
      type: 0,
      checked: false,
    },
    {
      id: '4',
      title: 'ویرایش شده',
      type: 0,
      checked: false,
    }
  ];

  theFilterUsageStatusList: Array<FilterTitle> = [
    {
      id: '1',
      title: 'استفاده شده',
      type: 0,
      checked: false,
    },
    {
      id: '2',
      title: 'قابل استفاده',
      type: 0,
      checked: false,
    },
  ];

  theFilterRestPeriodTypeSelected = new Array<IdTitle>();
  theFilterRestPeriodTypeSelectedCondition = 0;
  theFilterRestPeriodTypeList: Array<FilterTitle> = [
    {
      id: '1',
      title: 'یک ماهه',
      type: 0,
      checked: false,
    },
    {
      id: '2',
      title: 'دو ماهه',
      type: 0,
      checked: false,
    },
    {
      id: '3',
      title: 'سه ماهه',
      type: 0,
      checked: false,
    },
    {
      id: '4',
      title: 'شش ماهه',
      type: 0,
      checked: false,
    },
    {
      id: '5',
      title: 'دوازده ماهه',
      type: 0,
      checked: false,
    }
  ];

  loadData(): void
  {
    this.reset();
    this.baseInfoService.loadBaseInfo();

    this.theFilterPercentList = [];
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].forEach(p =>
    {
      this.theFilterPercentList.push({
        id: p.toString(),
        title: p.toString() + '%',
        type: 0,
        checked: false,
      });
    });

    this.baseInfoService.commissionsBasis$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theFilterCommissionList = [];
      value.forEach(p =>
      {
        this.theFilterCommissionList.push({
          checked: false,
          id: p.toString(),
          title: p.toString(),
          type: 0,
        });
      });
    });

    this.baseInfoService.productGroups$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theProductGroupList = [];
      value.forEach(p =>
      {
        this.theProductGroupList.push({
          checked: false,
          id: p.id,
          title: p.title,
          type: 0,
        });
      });
    });


    this.baseInfoService.activity$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theActivityList = [];
      value.forEach(p =>
      {
        this.theActivityList.push({
          checked: false,
          id: p.id,
          title: p.title,
          type: 0,
        });
      });
    });

    this.baseInfoService.allCampaigns$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theCampaignList = [];
      value.forEach(p =>
      {
        this.theCampaignList.push({
          checked: false,
          id: p.id,
          title: p.title,
          type: 0,
        });
      });
    });

    this.baseInfoService.scoresVolumes$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theScoreList = [];
      value.forEach(p =>
      {
        this.theScoreList.push({
          checked: false,
          id: p.toString(),
          title: p.toString(),
          type: 0,
        });
      });
    });

    this.baseInfoService.activitiesCount$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theActivityCountList = [];
      value.forEach(p =>
      {
        this.theActivityCountList.push({
          checked: false,
          id: p.toString(),
          title: p.toString(),
          type: 0,
        });
      });
    });

    this.baseInfoService.commissionsBasis$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theFilterCommissionList = [];
      value.forEach(p =>
      {
        this.theFilterCommissionList.push({
          checked: false,
          id: p.toString(),
          title: p.toString(),
          type: 0,
        });
      });
    });



    this.baseInfoService.generalCustomers$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theFilterCustomerList = [];
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

    this.baseInfoService.brands$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theFilterBrandsList = [];
      this.theFilterExporterBrandsList = [];
      this.theFilterProviderBrandsList = [];
      value.forEach(p =>
      {
        const data = {
          checked: false,
          id: p.id,
          title: p.title, type: 0
        };
        this.theFilterBrandsList.push({ ...data });
        this.theFilterExporterBrandsList.push({ ...data });
        this.theFilterProviderBrandsList.push({ ...data });
      });
    });

    this.baseInfoService.customerLevel$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theFilterLevelsList = [];
      value.forEach(p =>
      {
        this.theFilterLevelsList.push({
          checked: false,
          id: p.id,
          title: p.title, type: 0
        });
      });
    });

    this.baseInfoService.userTypes$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theFilterUserTypeList = [];
      value.forEach(p =>
      {
        this.theFilterUserTypeList.push({
          checked: false,
          id: p.id,
          title: p.title, type: 0
        });
      });
    });

    this.baseInfoService.userTypes$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theFilterGroupList = [];
      value.forEach(p =>
      {
        this.theFilterGroupList.push({
          checked: false,
          id: p.id,
          title: p.title, type: 0
        });
      });
    });


  }
  reset()
  {
    this.theActivitySelectedList = [];
    this.theActivityKeySelected = '';
    this.theCampaignSelectedList = [];
    this.theScoreSelectedList = [];
    this.theActivityCountListSelectedList = [];
    this.theFilterCustomerSelectedList = [];
    this.theFilterTitleFilterSelectedList = [];
    this.theFilterGroupSelectedList = [];
    this.theFilterBrandsSelectedList = [];
    this.theFilterExporterBrandsSelectedList = [];
    this.theFilterProviderBrandsSelectedList = [];
    this.theFilterLevelsSelectedList = [];
    this.theFilterUserTypeSelectedList = [];
    this.theFilterCommissionSelectedList = [];
    this.theFilterCommissionRadioSelectedList = [];
    this.theFilterPercentSelectedList = [];
    this.theFilterPercentRadioSelectedList = [];
    this.theProductGroupListSelectedList = [];
    this.theFilterDateFromSelected = '';
    this.theDateFilterSelected = '';
    this.theFilterDateToSelected = '';
    this.theCreateAccountDateSelected = '';
    this.theExpireDateSelected = '';
    this.volumeFilterSelected = null;
    this.minimumVolumeFilterSelected = null;
    this.maximumVolumeFilterSelected = null;
    this.activityCountFilterSelected = null;
    this.discountCodeSelected = null;
    this.phoneSelected = null;
    this.theFilterStatusSelected = 0;
    this.theContractFilterStatusSelected = [];
    this.theFilterRestPeriodTypeSelected = [];

    this.resetChecks(this.theFilterStatusList);
    this.resetChecks(this.theContractFilterStatusList);
    this.resetChecks(this.theFilterUsageStatusList);
    this.resetChecks(this.theFilterRestPeriodTypeList);
  }

  resetChecks(theFilterStatusList: FilterTitle[])
  {
    theFilterStatusList.forEach(p => p.checked = false);
  }

  applyFilterForm(event: any, filterType: FilterNames, expression: string): any
  {
    switch (filterType)
    {
      case FilterNames.Customer:
        this.theFilterCustomerSelectedList = event.value;
        this.theFilterCustomerSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.Date:
        this.theFilterDateFromSelected = event.value;
        this.theFilterDateToSelected = event.value;
        break;
      case FilterNames.ExpireDate:
        this.theExpireDateSelected = event?.value;
        break;
      case FilterNames.CreateAccountDateFilter:
        this.theCreateAccountDateSelected = event.value;
        break;
      case FilterNames.volumeFilter:
        this.volumeFilterSelected = event.value;
        this.volumeFilterSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.MinimumVolumeFilter:
        this.minimumVolumeFilterSelected = event.value;
        this.minimumVolumeFilterSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.MaximumVolumeFilter:
        this.maximumVolumeFilterSelected = event.value;
        this.maximumVolumeFilterSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.ActivityCount:
        this.activityCountFilterSelected = event.value;
        this.activityCountFilterSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.DiscountCode:
        this.discountCodeSelected = event.value;
        this.discountCodeSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.Phone:
        this.phoneSelected = event.value;
        this.phoneSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.Brand:
        this.theFilterBrandsSelectedList = event.value;
        this.theFilterBrandsSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.ProviderBrandFilter:
        this.theFilterProviderBrandsSelectedList = event.value;
        this.theFilterProviderBrandsSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.ExporterBrandFilter:
        this.theFilterExporterBrandsSelectedList = event.value;
        this.theFilterExporterBrandsSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.Status:
        this.theFilterStatusSelected = parseInt(event.value[0].id, 0);
        break;
      case FilterNames.ContractStatus:
        this.theContractFilterStatusSelected = event.value;
        this.theContractFilterStatusSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.RestPeriodType:
        this.theFilterRestPeriodTypeSelected = event.value;
        this.theFilterRestPeriodTypeSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.UserType:
        this.theFilterUserTypeSelectedList = event.value;
        this.theFilterUserTypeSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.Commission:
        this.theFilterCommissionSelectedList = event.value;
        this.theFilterCommissionSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.Commission:
        this.theFilterCommissionRadioSelectedList = event.value;
        this.theFilterCommissionRadioSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.Percent:
        this.theFilterPercentSelectedList = event.value;
        this.theFilterPercentSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.PercentRadioBox:
        this.theFilterPercentRadioSelectedList = event.value;
        this.theFilterPercentRadioSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.Level:
        this.theFilterLevelsSelectedList = event.value;
        this.theFilterLevelsSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.Groups:
        this.theFilterGroupSelectedList = event.value;
        this.theFilterGroupSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.Title:
        this.theFilterTitleFilterSelectedList = event.value;
        this.theFilterTitleFilterSelectedCondition = parseInt(event.conditionType, 0);
        break;

      case FilterNames.Campaign:
        this.theCampaignSelectedList = event.value;
        this.theCampaignSelectedCondition = parseInt(event.conditionType, 0);
        break;

      case FilterNames.Activities:
        this.theActivitySelectedList = event.value;
        this.theActivitySelectedCondition = parseInt(event.conditionType, 0);
        break;

      case FilterNames.ActivitiesKey:
        this.theActivityKeySelected = event.value;
        this.theActivityKeySelectedCondition = parseInt(event.conditionType, 0);
        break;

      case FilterNames.Score:
        this.theScoreSelectedList = event.value;
        this.theScoreSelectedCondition = parseInt(event.conditionType, 0);
        break;

      case FilterNames.ActivityCountList:
        this.theActivityCountListSelectedList = event.value;
        this.theActivityCountListSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.ProductTag:
        this.theProductGroupListSelectedList = event.value;
        this.theProductGroupListSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case FilterNames.DateFilter:
        this.theDateFilterSelected = event.value;
        break;

    }

    const request: any = {};

    if (this.theProductGroupListSelectedList && this.theProductGroupListSelectedList.length > 0)
    {
      request.tagFilter = {} as any;
      request.tagFilter.tagIds = this.theProductGroupListSelectedList.map(p => p.id);
      if (this.theProductGroupListSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.tagFilter.tagIds = [];
      }
      request.tagFilter.filterType = 0;
      if (this.theProductGroupListSelectedCondition != 0)
      {
        request.tagFilter.filterType = this.theProductGroupListSelectedCondition;
      }
    }

    if (this.theFilterPercentSelectedList && this.theFilterPercentSelectedList.length > 0)
    {
      request.customerDiscountFilter = {} as any;
      request.customerDiscountFilter.customerDiscounts = this.theFilterPercentSelectedList.map(p => parseInt(p.id, 0));
      if (this.theFilterPercentSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.customerDiscountFilter.customerDiscounts = [];
      }
      request.customerDiscountFilter.filterType = 0;
      if (this.theFilterPercentSelectedCondition != 0)
      {
        request.customerDiscountFilter.filterType = this.theFilterPercentSelectedCondition;
      }
    }

    if (this.theFilterPercentRadioSelectedList && this.theFilterPercentRadioSelectedList.length > 0)
    {
      request.consumerDiscountFilter = this.theFilterPercentRadioSelectedList.map(p => parseInt(p.id, 0))[0];
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

    if (this.theFilterCommissionRadioSelectedList && this.theFilterCommissionRadioSelectedList.length > 0)
    {
      request.promoterCommissionFilter = this.theFilterCommissionRadioSelectedList.map(p => p.id)[0];
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

    if (this.theFilterProviderBrandsSelectedList && this.theFilterProviderBrandsSelectedList.length > 0)
    {
      request.providerBrandFilter = {};
      request.providerBrandFilter.brandIds = this.theFilterProviderBrandsSelectedList.map(p => p.id);
      if (this.theFilterProviderBrandsSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.providerBrandFilter.brandIds = [];
      }
      request.providerBrandFilter.filterType = 0;
      if (this.theFilterProviderBrandsSelectedCondition != 0)
      {
        request.providerBrandFilter.filterType = this.theFilterProviderBrandsSelectedCondition;
      }
    }

    if (this.theFilterExporterBrandsSelectedList && this.theFilterExporterBrandsSelectedList.length > 0)
    {
      request.exporterBrandFilter = {};
      request.exporterBrandFilter.brandIds = this.theFilterExporterBrandsSelectedList.map(p => p.id);
      if (this.theFilterExporterBrandsSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.exporterBrandFilter.brandIds = [];
      }
      request.exporterBrandFilter.filterType = 0;
      if (this.theFilterExporterBrandsSelectedCondition != 0)
      {
        request.exporterBrandFilter.filterType = this.theFilterExporterBrandsSelectedCondition;
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
      request.groupFilter.groupIds = this.theFilterGroupSelectedList.map(p => p.id);
      if (this.theFilterGroupSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.groupFilter.groupIds = [];
      }
      request.groupFilter.filterType = 0;
      if (this.theFilterGroupSelectedCondition != 0)
      {
        request.groupFilter.filterType = this.theFilterGroupSelectedCondition;
      }
    }

    if (this.theCampaignSelectedList && this.theCampaignSelectedList.length > 0)
    {
      request.campaignIdFilter = {} as any;
      request.campaignIdFilter.Ids = this.theCampaignSelectedList.map(p => p.id);
      if (this.theCampaignSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.campaignIdFilter.Ids = [];
      }
      request.campaignIdFilter.filterType = 0;
      if (this.theCampaignSelectedCondition != 0)
      {
        request.campaignIdFilter.filterType = this.theCampaignSelectedCondition;
      }
    }

    if (this.theActivitySelectedList && this.theActivitySelectedList.length > 0)
    {
      request.titleFilter = {} as any;
      // request.titleFilter.titles = this.theActivitySelectedList.map(p => parseInt(p.id, 0));
      request.titleFilter.titles = this.theActivitySelectedList.map(p => p.title);
      if (this.theActivitySelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.titleFilter.titles = [];
      }
      request.titleFilter.filterType = 0;
      if (this.theActivitySelectedCondition != 0)
      {
        request.titleFilter.filterType = this.theActivitySelectedCondition;
      }
    }

    if (this.theActivityKeySelected)
    {
      request.keyFilter = {} as any;
      request.keyFilter.keys = [this.theActivityKeySelected];
      request.keyFilter.filterType = 0;
      if (this.theActivityKeySelectedCondition != 0)
      {
        request.keyFilter.filterType = this.theActivityKeySelectedCondition;
      }
    }

    if (this.theActivityCountListSelectedList && this.theActivityCountListSelectedList.length > 0)
    {
      request.activityCountsFilter = {} as any;
      request.activityCountsFilter.activitiesCount = this.theActivityCountListSelectedList.map(p => p.id);
      if (this.theActivityCountListSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.activityCountsFilter.activitiesCount = [];
      }
      request.activityCountsFilter.filterType = 0;
      if (this.theActivityCountListSelectedCondition != 0)
      {
        request.activityCountsFilter.filterType = this.theActivityCountListSelectedCondition;
      }
    }

    if (this.theScoreSelectedList && this.theScoreSelectedList.length > 0)
    {
      request.scoreFilter = {} as any;
      request.scoreFilter.scores = this.theScoreSelectedList.map(p => p.id);
      if (this.theScoreSelectedList.findIndex(p => p.id === 'all') !== -1)
      {
        request.scoreFilter.scores = [];
      }
      request.scoreFilter.filterType = 0;
      if (this.theScoreSelectedCondition != 0)
      {
        request.scoreFilter.filterType = this.theScoreSelectedCondition;
      }
    }


    if (this.theFilterRestPeriodTypeSelected && this.theFilterRestPeriodTypeSelected.length > 0)
    {
      request.ResetPeriodFilter = {} as any;
      request.ResetPeriodFilter.Periods = this.theFilterRestPeriodTypeSelected.map(p => parseInt(p.id, 0));
      if (this.theFilterRestPeriodTypeSelected.findIndex(p => p.id === 'all') !== -1)
      {
        request.ResetPeriodFilter.Periods = [];
      }
      request.ResetPeriodFilter.filterType = 0;
      if (this.theFilterRestPeriodTypeSelectedCondition != 0)
      {
        request.ResetPeriodFilter.filterType = this.theFilterRestPeriodTypeSelectedCondition;
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

    if (this.theContractFilterStatusSelected && this.theContractFilterStatusSelected?.length !== 0)
    {
      request.statusFilter = new StatusFilter();
      request.statusFilter.status = this.theContractFilterStatusSelected.map(p => parseInt(p.id, 0));
    }

    if (this.theFilterDateFromSelected)
    {
      request.periodFilter = { date: Utility.getPeriodOfString(this.theFilterDateFromSelected) };
    }

    if (this.theDateFilterSelected)
    {
      request.dateFilter = { date: Utility.getPeriodOfString(this.theDateFilterSelected) };
    }

    if (this.theExpireDateSelected)
    {
      request.expireFilter = { date: Utility.getPeriodOfString(this.theExpireDateSelected) };
    }

    if (this.theCreateAccountDateSelected)
    {
      request.createAcountDateFilter = Utility.getPeriodOfString(this.theCreateAccountDateSelected);
    }

    if (this.volumeFilterSelected)
    {
      request.volumeFilter = parseInt(this.volumeFilterSelected?.toString(), 0);
    }

    if (this.minimumVolumeFilterSelected)
    {
      request.minimumVolumeFilter = parseInt(this.minimumVolumeFilterSelected?.toString(), 0);
    }

    if (this.maximumVolumeFilterSelected)
    {
      request.maximumVolumeFilter = parseInt(this.maximumVolumeFilterSelected?.toString(), 0);
    }

    //todo need to fix later
    if (this.activityCountFilterSelected)
    {
      request.activityCount = parseInt(this.activityCountFilterSelected?.toString(), 0);
    }

    if (this.discountCodeSelected)
    {
      request.codeFilter = {};
      request.codeFilter.code = this.discountCodeSelected;
      request.codeFilter.filterType = 0;
      if (this.discountCodeSelectedCondition)
      {
        request.codeFilter.filterType = this.discountCodeSelectedCondition;
      }
    }

    if (this.phoneSelected)
    {
      request.mobileFilter = this.phoneSelected;
    }

    if (expression)
    {
      request[expression] = { event: event, filterType: filterType, expression: expression } as FilterOption;
    }

    return request;
  }



  public ngOnDestroy(): void
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.baseInfoService.destroy();
  }
}
