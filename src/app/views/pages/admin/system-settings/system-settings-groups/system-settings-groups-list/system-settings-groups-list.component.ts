import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { FilterTitle, IdTitle } from 'src/app/@core/data/loyalty/get-senarios-grid.model';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { PromoterDiscountSettingService } from 'src/app/@core/services/loyalty/promoter-discount-setting.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';

@Component({
  selector: 'app-system-settings-groups-list',
  templateUrl: './system-settings-groups-list.component.html',
  styleUrls: ['./system-settings-groups-list.component.scss']
})
export class SystemSettingsGroupsListComponent extends BaseSearch  implements OnInit {

  closeResult: string = '';

  theViewList = new Array<any>();

  theFilterActivityList = new Array<FilterTitle>();
  theFilterActivitySelectedList = new Array<IdTitle>();

  theFilterKeyList = new Array<FilterTitle>();
  theFilterKeySelectedList = new Array<IdTitle>();

  theFilterScenarioList = new Array<FilterTitle>();
  theFilterScenarioSelectedList = new Array<IdTitle>();

  theFilterActivitySelectedCondition = 0;
  theFilterKeySelectedCondition = 0;
  theFilterScenarioSelectedCondition = 0;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public promoterDiscountSettingService: PromoterDiscountSettingService,
    public override baseInfoService: BaseInfoService,
    private authService: AuthService, /*private oidcSecurityService: OidcSecurityService*/)
  {

    super(baseInfoService);

    promoterDiscountSettingService.promoterDiscountSettings$.subscribe(value =>
    {
      this.theViewList = value;
    });

    this.activeFilterName = FilterNames.None;
  }

  override ngOnInit(): void
  {
    super.ngOnInit();

    this.promoterDiscountSettingService.getPromoterDiscountSettingGrid({});

    this.baseInfoService.activity$.subscribe(value =>
    {
      value.forEach(p =>
      {
        this.theFilterActivityList.push({
          checked: false,
          id: p.id,
          title: p.title, type: 0
        });
      });
    });
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/settings/groups/edit'], { queryParams: { id: id } });
      return;
    }
  }

}
