import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InternalPointAward, InternalPointAwardInit } from 'src/app/@core/data/loyalty/internal-point-award.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { InternalPointAwardService } from 'src/app/@core/services/loyalty/internal-points-award.service';

@Component({
  selector: 'app-internal-gift-edit',
  templateUrl: './internal-gift-edit.component.html',
  styleUrls: ['./internal-gift-edit.component.scss']
})
export class InternalGiftEditComponent implements OnInit
{//^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
  public customPatterns = { '0': { pattern: new RegExp('\[0-9a-fA-F\]') } };
  giftType = 1;
  id = '';
  isDisabled = false;
  constructor(public route: ActivatedRoute, public service: InternalPointAwardService,
    private cdref: ChangeDetectorRef, public router: Router,
    public baseInfoService: BaseInfoService) { }

  ngOnInit(): void
  {
    this.service.createForm(InternalPointAwardInit);
    this.route.queryParams.subscribe(params =>
    {
      this.id = params['id'];
      if (this.id)
      {
        this.service.GetLocalPointsAwardById(this.id).subscribe((value) =>
        {

          if (!value)
          {
            value = InternalPointAwardInit;
          }

          this.loadBaseInfo(value);
        });
      } else
      {
        this.loadBaseInfo(InternalPointAwardInit);
      }
    });
    this.service.form.markAllAsTouched();
  }

  loadBaseInfo(value: InternalPointAward)
  {
    this.service.createForm(value);
    this.cdref.detectChanges();
    this.baseInfoService.loadBaseInfo(null, value.providerBrandId ? [value.providerBrandId] : []);

    this.service.form.get('providerBrandId')?.valueChanges.subscribe(brandId =>
    {
      this.service.form.get('groupId')?.setValue(null);
      const generalCustomers = this.service.getCustomerByBrandId(brandId);
      this.baseInfoService?.generalCustomersByBrandId$?.next(generalCustomers);
    });

    this.service.form.get('exporterBrandId')?.valueChanges.subscribe(brandId =>
    {
      this.service.form.get('patternId')?.setValue(null);
      this.baseInfoService.GetDiscountCodePatterns(brandId).subscribe(value =>
      {
        this.service.awareDiscountCodePatterns$.next(value ?? []);
      });
    });

  }

  backToList()
  {
    this.router.navigate(['/admin/main/gifts/internal-list']);
  }

}
