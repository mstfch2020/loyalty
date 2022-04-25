import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PromoterDiscountSettingService } from 'src/app/@core/services/loyalty/promoter-discount-setting.service';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { promoterDiscountSettingInit } from '../../../../../../@core/data/loyalty/promoter-discount-setting.model';

@Component({
  selector: 'app-system-settings-discount-edit',
  templateUrl: './system-settings-discount-edit.component.html',
  styleUrls: ['./system-settings-discount-edit.component.scss']
})
export class SystemSettingsDiscountEditComponent implements OnInit {

  public percent: number;
  public percentFrom: number;
  public percentTo: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    public promoterDiscountSettingService: PromoterDiscountSettingService,
    public baseInfoService: BaseInfoService) {

    this.percent = 0;
    this.percentFrom = 0;
    this.percentTo = 0;
    
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
  }

  private updateSystemSettingsDiscountFromServer(id: any)
  {
    if (id)
    {
      this.promoterDiscountSettingService.getPromoterDiscountSettingById(id).subscribe((value) =>
      {
        this.baseInfoService.loadBaseInfo(() =>
        {
          if (!value)
          {
            value = promoterDiscountSettingInit;
          }
          this.promoterDiscountSettingService.createForm(value);
        }, value?.brandIds);
      });
    }
    else
    {
      this.baseInfoService.loadBaseInfo(() => { this.promoterDiscountSettingService.createForm(promoterDiscountSettingInit); });
    }
  }

  ngOnDestroy(): void
  {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void {
    this.promoterDiscountSettingService.form.markAllAsTouched();
  }

  get isDisabled(): boolean {
    return this.promoterDiscountSettingService.isDisabled;
  };

  backToList() {
    this.router.navigate(['/admin/main/settings/discount/list']);
  }

}
