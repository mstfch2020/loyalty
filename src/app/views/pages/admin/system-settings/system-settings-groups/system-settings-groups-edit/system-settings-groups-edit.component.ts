import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { PromoterDiscountSettingService } from 'src/app/@core/services/loyalty/promoter-discount-setting.service';
import { promoterDiscountSettingInit } from 'src/app/@core/data/loyalty/promoter-discount-setting.model';

@Component({
  selector: 'app-system-settings-groups-edit',
  templateUrl: './system-settings-groups-edit.component.html',
  styleUrls: ['./system-settings-groups-edit.component.scss']
})
export class SystemSettingsGroupsEditComponent implements OnInit {

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

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.updateSystemSettingsDiscountFromServer(id);
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.updateSystemSettingsDiscountFromServer(id);
    });
  }

  private updateSystemSettingsDiscountFromServer(id: any) {
    if (id) {
      this.promoterDiscountSettingService.getPromoterDiscountSettingById(id).subscribe((value) => {
        this.baseInfoService.loadBaseInfo(() => {
          if (!value) {
            value = promoterDiscountSettingInit;
          }
          this.promoterDiscountSettingService.createForm(value);
        });
      });
    }
    else {
      this.baseInfoService.loadBaseInfo(() => { this.promoterDiscountSettingService.createForm(promoterDiscountSettingInit); });
    }
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void {
    this.promoterDiscountSettingService.form.markAllAsTouched();
  }

  get isDisabled(): boolean {
    return this.promoterDiscountSettingService.isDisabled;
  };

  backToList() {
    this.router.navigate(['/admin/main/settings/groups/list']);
  }


}
