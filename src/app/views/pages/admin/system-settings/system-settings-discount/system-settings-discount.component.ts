import { Component, OnInit } from '@angular/core';
import { PromoterDiscountSettingService } from 'src/app/@core/services/loyalty/promoter-discount-setting.service';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';

@Component({
  selector: 'app-system-settings-discount',
  templateUrl: './system-settings-discount.component.html',
  styleUrls: ['./system-settings-discount.component.scss']
})
export class SystemSettingsDiscountComponent implements OnInit {


  constructor(
    public promoterDiscountSettingService: PromoterDiscountSettingService, 
    private baseInfoService: BaseInfoService)
  {
  }

  ngOnInit(): void
  {
    this.baseInfoService.loadBaseInfo(() => { });
  }

}
