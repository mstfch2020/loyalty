import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AmountTitle, GetSenarios } from "src/app/@core/data/loyalty/get-senarios-grid.model";
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { ScenarioService } from "src/app/@core/services/loyalty/scenario.service";
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss']
})
export class ScenarioListComponent extends BaseSearch implements OnInit
{
  theViewList = new Array<GetSenarios>();

  constructor(
    private router: Router,
    public scenarioService: ScenarioService,
    public override baseInfoService: BaseInfoService,
    // private authService: AuthService, /*private oidcSecurityService: OidcSecurityService*/
  )
  {
    super(baseInfoService);
    scenarioService.scenarios$.subscribe(value =>
    {
      this.theViewList = value;
    });
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
    this.search({ pageSize: this.pageSize, pageIndex: this.pageIndex });
  }


  override search(request: any)
  {
    this.scenarioService.getSenariosGrid(request);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/scenario/edit', id]);
      return;
    }
    this.router.navigate(['/admin/main/scenario/create']);
  }

  getRewardsTitle(scenario: GetSenarios)
  {
    const rewardsTitle = new Array<AmountTitle>();
    if (scenario?.senarioType?.id.toString() === '1')//purchase
    {
      const reward = scenario?.purchaseReward;
      if (!reward)
      {
        return;
      }
      if (reward.sendingDiscountReward)
      {

        rewardsTitle.push({
          title: 'تخفیف هزینه ارسال',
          values: [reward.sendingDiscount.toString()],
          type: 'sendingDiscountReward'
        });
      }
      if (reward.basketDiscountReward)
      {
        rewardsTitle.push({
          title: 'تخفیف سبد خرید',
          values: [reward.basketDiscountPercent.toString(), reward.basketDiscountThreshold.toString()],
          type: 'basketDiscountReward'
        });
      }
      if (reward.productDiscountReward)
      {
        rewardsTitle.push({
          title: 'تخفیف کالا',
          values: [reward.productDiscountPercent.toString()],
          type: 'productDiscountReward'
        });
      }
      // if (reward.addFreeProductReward) { rewardsTitle.push({ title: 'افزودن کالای رایگان به سبد خرید', values: [reward.sendingDiscount.toString()], type: 'addFreeProductReward' }); }
      if (reward.refundReward)
      {
        rewardsTitle.push({
          title: 'بازگشت وجه',
          values: [reward.refundPercent.toString(), reward.refundThreshold.toString()],
          type: 'refundReward'
        });
      }
      if (reward.increasScoreReward)
      {
        rewardsTitle.push({
          title: 'افزایش امتیاز',
          values: [reward.increaseScorePercent.toString(), reward.increaseScoreThreshold.toString()],
          type: 'increasScoreReward'
        });
      }
      if (reward.discountCodeReward)
      {
        rewardsTitle.push({
          title: 'کد تخفیف برای خرید بعدی',
          values: [reward.discountCodePercent.toString(), reward.discountCodeThreshold.toString()],
          type: 'discountCodeReward'
        });
      }
    }
    return rewardsTitle;
  }

  getRewardsDetail(scenario: GetSenarios)
  {
    const rewardsTitle = new Array<string>();
    if (scenario?.senarioType?.id.toString() === '1')//purchase
    {
      const reward = scenario?.purchaseReward;
      if (!reward)
      {
        return;
      }
      if (reward.sendingDiscountReward)
      {

        rewardsTitle.push(`تخفیف هزینه ارسال ${ reward.sendingDiscount.toString() } %`);
      }
      if (reward.basketDiscountReward)
      {
        rewardsTitle.push(`تخفیف سبد خرید ${ reward.basketDiscountPercent.toString() } % تا سقف ${ reward.basketDiscountThreshold.toString() } تومان`);
      }
      if (reward.productDiscountReward)
      {
        rewardsTitle.push(`تخفیف کالا ${ reward.productDiscountPercent.toString() } %`);
      }
      // if (reward.addFreeProductReward) { rewardsTitle.push({ title: 'افزودن کالای رایگان به سبد خرید', values: [reward.sendingDiscount.toString()], type: 'addFreeProductReward' }); }
      if (reward.refundReward)
      {
        rewardsTitle.push(`بازگشت وجه ${ reward.refundPercent.toString() } % تا سقف ${ reward.refundThreshold.toString() } تومان`);
      }
      if (reward.increasScoreReward)
      {
        rewardsTitle.push(`افزایش امتیاز ${ reward.increaseScorePercent.toString() } % تا سقف ${ reward.increaseScoreThreshold.toString() } امتیاز`);
      }
      if (reward.discountCodeReward)
      {
        rewardsTitle.push(`کد تخفیف برای خرید بعدی ${ reward.discountCodePercent.toString() } % تا سقف ${ reward.discountCodeThreshold.toString() } تومان`);
      }

    }
    return rewardsTitle;
  }

  login()
  {
    // this.authService.retrieveToken();

    // const token = this.oidcSecurityService.authorize();
    // this.oidcSecurityService.revokeAccessToken().subscribe(console.log);

  }



}
