import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subject, takeUntil } from 'rxjs';
import { AmountTitle, GetSenarios } from "src/app/@core/data/loyalty/get-senarios-grid.model";
import { GetAllSenarios } from 'src/app/@core/data/loyalty/scenario/get-all-scenarios.model';
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { ScenarioService } from "src/app/@core/services/loyalty/scenario.service";
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss']
})
export class ScenarioListComponent extends BaseSearch implements OnInit, OnDestroy
{
  theViewList = new Array<GetSenarios>();
  private unsubscribe = new Subject<void>();
  constructor(
    private router: Router,
    public scenarioService: ScenarioService,
    public override baseInfoService: BaseInfoService,
    // private authService: AuthService, /*private oidcSecurityService: OidcSecurityService*/
  )
  {
    super(baseInfoService);
    scenarioService.scenarios$.pipe(takeUntil(this.unsubscribe)).subscribe(value =>
    {
      this.theViewList = value;
    });
  }
  ngOnDestroy(): void
  {
    // Emit something to stop all Observables
    this.unsubscribe.next();
    // Complete the notifying Observable to remove it
    this.unsubscribe.complete();

    this.baseInfoService.destroy();
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
  }


  override search(request: GetAllSenarios)
  {
    request.pageSize = 10;
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
          values: [reward.sendingDiscount?.toString() ?? '0'],
          type: 'sendingDiscountReward'
        });
      }
      if (reward.basketDiscountReward)
      {
        rewardsTitle.push({
          title: 'تخفیف سبد خرید',
          values: [reward.basketDiscountPercent?.toString() ?? '0', reward.basketDiscountThreshold?.toString() ?? '0'],
          type: 'basketDiscountReward'
        });
      }
      if (reward.productDiscountReward)
      {
        rewardsTitle.push({
          title: 'تخفیف کالا',
          values: [reward.productDiscountPercent?.toString() ?? '0'],
          type: 'productDiscountReward'
        });
      }
      // if (reward.addFreeProductReward) { rewardsTitle.push({ title: 'افزودن کالای رایگان به سبد خرید', values: [reward.sendingDiscount.toString()], type: 'addFreeProductReward' }); }
      if (reward.refundReward)
      {
        rewardsTitle.push({
          title: 'بازگشت وجه',
          values: [reward.refundPercent?.toString() ?? '0', reward.refundThreshold?.toString() ?? '0'],
          type: 'refundReward'
        });
      }
      if (reward.increasScoreReward)
      {
        rewardsTitle.push({
          title: 'افزایش امتیاز',
          values: [reward.increaseScorePercent?.toString() ?? '0', reward.increaseScoreThreshold?.toString() ?? '0'],
          type: 'increasScoreReward'
        });
      }
      if (reward.discountCodeReward)
      {
        rewardsTitle.push({
          title: 'کد تخفیف برای خرید بعدی',
          values: [reward.discountCodePercent?.toString() ?? '0', reward.discountCodeThreshold?.toString() ?? '0'],
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

        rewardsTitle.push(`تخفیف هزینه ارسال ${ reward.sendingDiscount?.toString() ?? '0' } %`);
      }
      if (reward.basketDiscountReward)
      {
        rewardsTitle.push(`تخفیف سبد خرید ${ reward.basketDiscountPercent?.toString() ?? '0' } % تا سقف ${ reward.basketDiscountThreshold?.toString() ?? '0' } تومان`);
      }
      if (reward.productDiscountReward)
      {
        rewardsTitle.push(`تخفیف کالا ${ reward.productDiscountPercent?.toString() ?? '0' } %`);
      }
      // if (reward.addFreeProductReward) { rewardsTitle.push({ title: 'افزودن کالای رایگان به سبد خرید', values: [reward.sendingDiscount.toString()], type: 'addFreeProductReward' }); }
      if (reward.refundReward)
      {
        rewardsTitle.push(`بازگشت وجه ${ reward.refundPercent?.toString() ?? '0' } % تا سقف ${ reward.refundThreshold?.toString() ?? '0' } تومان`);
      }
      if (reward.increasScoreReward)
      {
        rewardsTitle.push(`افزایش امتیاز ${ reward.increaseScorePercent?.toString() ?? '0' } % تا سقف ${ reward.increaseScoreThreshold?.toString() ?? '0' } امتیاز`);
      }
      if (reward.discountCodeReward)
      {
        rewardsTitle.push(`کد تخفیف برای خرید بعدی ${ reward.discountCodePercent?.toString() ?? '0' } % تا سقف ${ reward.discountCodeThreshold?.toString() ?? '0' } تومان`);
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
