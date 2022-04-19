import { Component, OnInit } from '@angular/core';
import { PromoterDiscountSettingService } from 'src/app/@core/services/loyalty/promoter-discount-setting.service';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { Router } from '@angular/router';

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
    public promoterDiscountSettingService: PromoterDiscountSettingService,
    public baseInfoService: BaseInfoService) {

    this.percent = 0;
    this.percentFrom = 0;
    this.percentTo = 0;
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
