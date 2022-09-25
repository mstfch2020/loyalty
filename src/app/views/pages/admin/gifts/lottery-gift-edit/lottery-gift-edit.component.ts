import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LotteryPointAward, lotteryPointAwardInit } from 'src/app/@core/data/loyalty/lottery-point-award.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { LotteryPointAwardService } from 'src/app/@core/services/loyalty/lottery-points-award.service';

@Component({
  selector: 'app-lottery-gift-edit',
  templateUrl: './lottery-gift-edit.component.html',
  styleUrls: ['./lottery-gift-edit.component.scss']
})
export class LotteryGiftEditComponent implements OnInit
{//^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
  public customPatterns = { '0': { pattern: new RegExp('\[0-9a-fA-F\]') } };
  giftType = 1;
  id = '';
  isDisabled = false;
  constructor(public route: ActivatedRoute, public service: LotteryPointAwardService,
    private cdref: ChangeDetectorRef, public router: Router,
    public baseInfoService: BaseInfoService) { }

  ngOnInit(): void
  {
    this.service.createForm(lotteryPointAwardInit);
    this.route.queryParams.subscribe(params =>
    {
      this.id = params['id'];
      if (this.id)
      {
        this.service.GetLotteryPointsAwardById(this.id).subscribe((value) =>
        {

          if (!value)
          {
            value = lotteryPointAwardInit;
          }

          this.loadBaseInfo(value);
        });
      } else
      {
        this.loadBaseInfo(lotteryPointAwardInit);
      }
    });
    this.service.form.markAllAsTouched();
  }

  loadBaseInfo(value: LotteryPointAward)
  {
    this.service.createForm(value);
    this.cdref.detectChanges();
    this.baseInfoService.loadBaseInfo();
  }

  backToList()
  {
    this.router.navigate(['/admin/main/gifts/lottery-list']);
  }

}
