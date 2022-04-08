import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AmountTitle, GetSenarios, IdTitle} from "src/app/@core/data/loyalty/get-senarios-grid.model";
import {AuthService} from 'src/app/@core/services/auth/auth.service';
import {ScenarioService} from "src/app/@core/services/loyalty/scenario.service";
import {BaseInfoService} from "src/app/@core/services/loyalty/base-info.service";

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss']
})
export class ScenarioListComponent implements OnInit {

  public theViewList = new Array<GetSenarios>();
  pageIndex = 1;
  pageSize = 99999;

  filterCustomer: boolean;
  filterBrands: boolean;
  filterDate: boolean;
  filterStatus: boolean;

  filterCustomerList: any[];
  filterBrandsList: any[];
  filterDateList: any[];
  filterStatusList: any[];

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

    this.filterCustomerList =[];

    this.filterBrandsList =
      [
        {
          'Id':1,
          'Title':'همه',
          'Checked':false,
        },
        {
          'Id':2,
          'Title':'خیلی سبز',
          'Checked':true,
        },
        {
          'Id':3,
          'Title':'زینجا',
          'Checked':false,
        },
        {
          'Id':4,
          'Title':'پرتقال',
          'Checked':false,
        },
      ];

    this.filterDateList =
      [
        {
          'Id':1,
          'Title':'همه',
          'Checked':false,
        },
      ];

    this.filterStatusList =
      [
        {
          'Id':1,
          'Title':'همه',
          'Checked':false,
        },
        {
          'Id':2,
          'Title':'فعال',
          'Checked':false,
        },
        {
          'Id':3,
          'Title':'غیرفعال',
          'Checked':false,
        },
      ];

  }

  ngOnInit(): void {
    //this.router.navigate(['/admin/main/scenario/list']);
    this.scenarioService.getScenarios(this.pageSize, this.pageIndex);
  }

  goToEdit(id: string = '') {
    if (id) {
      this.router.navigate(['/admin/main/scenario/edit'], {queryParams: {id: id}});
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
