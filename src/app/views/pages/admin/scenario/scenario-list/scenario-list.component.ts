import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AmountTitle, FilterTitle, GetSenarios, IdTitle } from "src/app/@core/data/loyalty/get-senarios-grid.model";
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { ScenarioService } from "src/app/@core/services/loyalty/scenario.service";
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { GetSenariosGrid } from '../../../../../@core/data/loyalty/get-senarios-grid.model';
import { SenarioStatusType } from '../../../../../@core/data/loyalty/enums.model';

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss']
})
export class ScenarioListComponent implements OnInit {

  public theViewList = new Array<GetSenarios>();

  public theFilterCustomerList = new Array<FilterTitle>();
  public theFilterCustomerSelectedList = new Array<IdTitle>();

  public theFilterBrandsList = new Array<FilterTitle>();
  public theFilterBrandsSelectedList = new Array<IdTitle>();

  public theFilterDateList = new Array<FilterTitle>();
  public theFilterDateSelectedList = new Array<IdTitle>();

  public theFilterStatusList = new Array<FilterTitle>();
  public theFilterStatusSelectedList = new Array<IdTitle>();

  pageIndex = 1;
  pageSize = 99999;

  filterCustomer: boolean;
  filterBrands: boolean;
  filterDate: boolean;
  filterStatus: boolean;


  constructor(
    private router: Router,
    public scenarioService: ScenarioService,
    public baseInfoService: BaseInfoService,
    private authService: AuthService) {

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

    this.theFilterStatusList = [
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
      {
        id: '3',
        title: 'در انتظار',
        checked: false,
      },
      {
        id: '4',
        title: 'رد شده',
        checked: false,
      }

    ]

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
    this.authService.retrieveToken();
  }

  applyFilterForm(event: Array<IdTitle>, filterType: number) {
    switch (filterType) {
      case 1:
        this.theFilterCustomerSelectedList = event;
        break;
      case 2:
        this.theFilterDateSelectedList = event;
        break;
      case 3:
        this.theFilterBrandsSelectedList = event;
        break;
      case 4:
        this.theFilterStatusSelectedList = event;
        break;
    }

    let brandIds = Array<string>();
    let groupIds = Array<string>();
    let campaignIds = Array<string>();
    let phones = Array<string>();
    let fromDate = this.theFilterDateSelectedList[0].title;
    let toDate = this.theFilterDateSelectedList[1].title;
    let status: SenarioStatusType = SenarioStatusType.Enable;

    this.theFilterBrandsSelectedList.forEach((item: IdTitle, key: number) => {
      brandIds.push(item.id);
    });

    this.theFilterCustomerSelectedList.forEach((item: IdTitle, key: number) => {
      groupIds.push(item.id);
    });

    this.scenarioService.getSenariosGrid(this.pageSize, this.pageIndex, brandIds, groupIds, campaignIds, phones, fromDate, toDate, status);
    this.scenarioService.scenarios$.subscribe(value => {
      this.theViewList = value;
    });

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
