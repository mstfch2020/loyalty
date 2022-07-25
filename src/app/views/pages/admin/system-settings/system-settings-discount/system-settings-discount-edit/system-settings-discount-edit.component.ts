import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { promoterDiscountSettingInit } from 'src/app/@core/data/loyalty/promoter-discount-setting.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { PromoterDiscountSettingService } from 'src/app/@core/services/loyalty/promoter-discount-setting.service';

@Component({
  selector: 'app-system-settings-discount-edit',
  templateUrl: './system-settings-discount-edit.component.html',
  styleUrls: ['./system-settings-discount-edit.component.scss']
})
export class SystemSettingsDiscountEditComponent implements OnInit
{

  public percent: number;
  public percentFrom: number;
  public percentTo: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    public service: PromoterDiscountSettingService,
    public baseInfoService: BaseInfoService)
  {

    this.percent = 0;
    this.percentFrom = 0;
    this.percentTo = 0;
  }

  private updateSystemSettingsDiscountFromServer(id: any)
  {
    if (id)
    {
      this.service.getPromoterDiscountSettingById(id).subscribe((value) =>
      {
        this.baseInfoService.loadBaseInfo(() =>
        {
          if (!value)
          {
            value = promoterDiscountSettingInit;
          }
          this.service.createForm(value);
        });
      });
    }
    else
    {
      this.baseInfoService.loadBaseInfo(() => { this.service.createForm(promoterDiscountSettingInit); });
    }
  }

  ngOnDestroy(): void
  {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void
  {
    this.service.createForm(promoterDiscountSettingInit);
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      this.updateSystemSettingsDiscountFromServer(id);
    });

    this.route.params.subscribe(params =>
    {
      const id = params['id'];
      this.updateSystemSettingsDiscountFromServer(id);
    });
    this.service.form.markAllAsTouched();
  }

  get isDisabled(): boolean
  {
    return this.service.isDisabled;
  };

  backToList()
  {
    this.router.navigate(['/admin/main/settings/discount/list']);
  }

}
