import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AmountTitle, FilterTitle, GetSenarios, IdTitle } from "src/app/@core/data/loyalty/get-senarios-grid.model";
import { BrandFilter, CustomersFilter, StatusFilter } from 'src/app/@core/data/loyalty/scenario/get-all-scenarios.model';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { ScenarioService } from "src/app/@core/services/loyalty/scenario.service";

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss']
})
export class ScenarioListComponent implements OnInit {

  theViewList = new Array<GetSenarios>();

  theFilterCustomerList = new Array<FilterTitle>();
  theFilterCustomerSelectedList = new Array<IdTitle>();

  theFilterBrandsList = new Array<FilterTitle>();
  theFilterBrandsSelectedList = new Array<IdTitle>();

  theFilterDateList = new Array<FilterTitle>();
  theFilterDateFromSelected = "";
  theFilterDateToSelected = "";
  theFilterStatusSelected = 0;

  pageIndex = 1;
  pageSize = 99999;

  filterCustomer: boolean;
  filterBrands: boolean;
  filterDate: boolean;
  filterStatus: boolean;
  theFilterCustomerSelectedCondition = 0;
  theFilterBrandsSelectedCondition = 0;
  theFilterStatusSelectedCondition = 0;
  theFilterStatusList: Array<FilterTitle> = [
    {
      id: '1',
      title: 'فعال',
      checked: false,
    },
    {
      id: '2',
      title: 'غیرفعال',
      checked: false,
    },
    // {
    //   id: '3',
    //   title: 'در انتظار',
    //   checked: false,
    // },
    // {
    //   id: '4',
    //   title: 'رد شده',
    //   checked: false,
    // }

  ];

  constructor(
    private router: Router,
    public scenarioService: ScenarioService,
    public baseInfoService: BaseInfoService,
    private authService: AuthService, /*private oidcSecurityService: OidcSecurityService*/) {

    scenarioService.scenarios$.subscribe(value => {
      this.theViewList = value;
    });

    this.filterCustomer = false;
    this.filterBrands = false;
    this.filterDate = false;
    this.filterStatus = false;

  }

  ngOnInit(): void {
    //this.router.navigate(['/admin/main/scenario/list']);
    this.scenarioService.getScenarios(this.pageSize, this.pageIndex);

    this.baseInfoService.generalCustomers$.subscribe(value => {
      value.forEach((value: IdTitle, key: number) => {
        this.theFilterCustomerList.push({
          checked: false,
          id: value.id,
          title: value.title
        });
      });
    });

    this.baseInfoService.brands$.subscribe(value => {
      value.forEach((value: IdTitle, key: number) => {
        this.theFilterBrandsList.push({
          checked: false,
          id: value.id,
          title: value.title
        });
      });
    });
  }

  goToEdit(id: string = '') {
    if (id) {
      this.router.navigate(['/admin/main/scenario/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/scenario/edit']);
  }

  getRewardsTitle(scenario: GetSenarios) {
    const rewardsTitle = new Array<AmountTitle>();
    if (scenario?.senarioType?.id.toString() === '1')//purchase
    {
      const reward = scenario?.purchaseReward;
      if (!reward) {
        return;
      }
      if (reward.sendingDiscountReward) {

        rewardsTitle.push({
          title: 'تخفیف هزینه ارسال',
          values: [reward.sendingDiscount.toString()],
          type: 'sendingDiscountReward'
        });
      }
      if (reward.basketDiscountReward) {
        rewardsTitle.push({
          title: 'تخفیف سبد خرید',
          values: [reward.basketDiscountPercent.toString(), reward.basketDiscountThreshold.toString()],
          type: 'basketDiscountReward'
        });
      }
      if (reward.productDiscountReward) {
        rewardsTitle.push({
          title: 'تخفیف کالا',
          values: [reward.productDiscountPercent.toString()],
          type: 'productDiscountReward'
        });
      }
      // if (reward.addFreeProductReward) { rewardsTitle.push({ title: 'افزودن کالای رایگان به سبد خرید', values: [reward.sendingDiscount.toString()], type: 'addFreeProductReward' }); }
      if (reward.refundReward) {
        rewardsTitle.push({
          title: 'بازگشت وجه',
          values: [reward.refundPercent.toString(), reward.refundThreshold.toString()],
          type: 'refundReward'
        });
      }
      if (reward.increasScoreReward) {
        rewardsTitle.push({
          title: 'افزایش امتیاز',
          values: [reward.increaseScorePercent.toString(), reward.increaseScoreThreshold.toString()],
          type: 'increasScoreReward'
        });
      }
      if (reward.discountCodeReward) {
        rewardsTitle.push({
          title: 'کد تخفیف برای خرید بعدی',
          values: [reward.discountCodePercent.toString(), reward.discountCodeThreshold.toString()],
          type: 'discountCodeReward'
        });
      }
    }
    return rewardsTitle;
  }

  getRewardsDetail(scenario: GetSenarios) {
    const rewardsTitle = new Array<string>();
    if (scenario?.senarioType?.id.toString() === '1')//purchase
    {
      const reward = scenario?.purchaseReward;
      if (!reward) {
        return;
      }
      if (reward.sendingDiscountReward) {

        rewardsTitle.push(`تخفیف هزینه ارسال ${reward.sendingDiscount.toString()} %`);
      }
      if (reward.basketDiscountReward) {
        rewardsTitle.push(`تخفیف سبد خرید ${reward.basketDiscountPercent.toString()} % تا سقف ${reward.basketDiscountThreshold.toString()} تومان`);
      }
      if (reward.productDiscountReward) {
        rewardsTitle.push(`تخفیف کالا ${reward.productDiscountPercent.toString()} %`);
      }
      // if (reward.addFreeProductReward) { rewardsTitle.push({ title: 'افزودن کالای رایگان به سبد خرید', values: [reward.sendingDiscount.toString()], type: 'addFreeProductReward' }); }
      if (reward.refundReward) {
        rewardsTitle.push(`بازگشت وجه ${reward.refundPercent.toString()} % تا سقف ${reward.refundThreshold.toString()} تومان`);
      }
      if (reward.increasScoreReward) {
        rewardsTitle.push(`افزایش امتیاز ${reward.increaseScorePercent.toString()} % تا سقف ${reward.increaseScoreThreshold.toString()} امتیاز`);
      }
      if (reward.discountCodeReward) {
        rewardsTitle.push(`کد تخفیف برای خرید بعدی ${reward.discountCodePercent.toString()} % تا سقف ${reward.discountCodeThreshold.toString()} تومان`);
      }

    }
    return rewardsTitle;
  }

  login() {
    // this.authService.retrieveToken();
    debugger;

    // const token = this.oidcSecurityService.authorize();
    // this.oidcSecurityService.revokeAccessToken().subscribe(console.log);

  }

  openFilterForm(filterType: number) {

    switch (filterType) {
      case 1:
        this.filterCustomer =  !this.filterCustomer;
        this.filterDate = false;
        this.filterBrands = false;
        this.filterStatus = false;
        break;
      case 2:
        this.filterDate = !this.filterDate;
        this.filterCustomer =  false;
        this.filterBrands = false;
        this.filterStatus = false;
        break;
      case 3:
        this.filterBrands = !this.filterBrands;
        this.filterDate = false;
        this.filterCustomer =  false;
        this.filterStatus = false;
        break;
      case 4:
        this.filterStatus = !this.filterStatus;
        this.filterBrands = false;
        this.filterDate = false;
        this.filterCustomer =  false;
        break;
    }
  }

  applyFilterForm(event: any, filterType: number) {
    switch (filterType) {
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
    }

    const request: any = {};
    request.pageIndex = 1;
    request.pageSize = 999999;
    if (this.theFilterBrandsSelectedList && this.theFilterBrandsSelectedList.length > 0) {
      request.brandFilter = new BrandFilter();
      request.brandFilter.brandIds = this.theFilterBrandsSelectedList.map(p => p.id);
      request.brandFilter.filterType = 0;
      if (this.theFilterBrandsSelectedCondition != 0) {
        request.brandFilter.filterType = this.theFilterBrandsSelectedCondition;
      }
    }

    if (this.theFilterCustomerSelectedList && this.theFilterCustomerSelectedList.length > 0) {
      request.customersFilter = new CustomersFilter();
      request.customersFilter.groupIds = this.theFilterCustomerSelectedList.map(p => p.id);
      request.customersFilter.filterType = 0;
      if (this.theFilterCustomerSelectedCondition != 0) {
        request.customersFilter.filterType = this.theFilterCustomerSelectedCondition;
      }
    }

    if (this.theFilterStatusSelected !== 0) {
      request.statusFilter = new StatusFilter();
      request.statusFilter.status = this.theFilterStatusSelected;
    }
    if (this.theFilterDateFromSelected) {
      request.periodFilter = this.scenarioService.getPeriodOfString(this.theFilterDateFromSelected);
    }
    this.scenarioService.getSenariosGrid(request);


  }

  closeFilterForm(event: boolean, filterType: number) {
    switch (filterType) {
      case 1:
        this.filterCustomer = event;
        break;
      case 2:
        this.filterDate = event;
        break;
      case 3:
        this.filterBrands = event;
        break;
      case 4:
        this.filterStatus = event;
        break;
    }

  }

}
