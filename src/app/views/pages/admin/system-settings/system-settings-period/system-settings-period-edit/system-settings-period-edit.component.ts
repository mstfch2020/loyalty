import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PromoterDiscountSettingService } from 'src/app/@core/services/loyalty/promoter-discount-setting.service';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';

@Component({
  selector: 'app-system-settings-period-edit',
  templateUrl: './system-settings-period-edit.component.html',
  styleUrls: ['./system-settings-period-edit.component.scss']
})
export class SystemSettingsPeriodEditComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    public promoterDiscountSettingService: PromoterDiscountSettingService,
    public baseInfoService: BaseInfoService) {

  }

  ngOnInit(): void {
  }

}
