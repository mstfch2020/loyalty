import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { FilterTitle, IdTitle } from 'src/app/@core/data/loyalty/get-senarios-grid.model';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { PromoterDiscountSettingService } from 'src/app/@core/services/loyalty/promoter-discount-setting.service';

@Component({
  selector: 'app-system-settings-period-list',
  templateUrl: './system-settings-period-list.component.html',
  styleUrls: ['./system-settings-period-list.component.scss']
})
export class SystemSettingsPeriodListComponent implements OnInit
{

  closeResult: string = '';

  theViewList = new Array<any>();

  theFilterActivityList = new Array<FilterTitle>();
  theFilterActivitySelectedList = new Array<IdTitle>();

  theFilterKeyList = new Array<FilterTitle>();
  theFilterKeySelectedList = new Array<IdTitle>();

  theFilterScenarioList = new Array<FilterTitle>();
  theFilterScenarioSelectedList = new Array<IdTitle>();

  pageIndex = 1;
  pageSize = 99999;

  activeFilterName = FilterNames.None;
  theFilterActivitySelectedCondition = 0;
  theFilterKeySelectedCondition = 0;
  theFilterScenarioSelectedCondition = 0;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public promoterDiscountSettingService: PromoterDiscountSettingService,
    public baseInfoService: BaseInfoService,
    private authService: AuthService, /*private oidcSecurityService: OidcSecurityService*/)
  {

    promoterDiscountSettingService.promoterDiscountSettings$.subscribe(value =>
    {
      this.theViewList = value;
    });

    this.activeFilterName = FilterNames.None;
  }

  ngOnInit(): void
  {
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
      this.router.navigate(['/admin/main/settings/period/edit'], { queryParams: { id: id } });
      return;
    }
  }

  openFilterForm(filterType: number)
  {

    switch (filterType)
    {
      case 6:
        this.activeFilterName = FilterNames.UserType;
        break;
      case 3:
        this.activeFilterName = FilterNames.Brand;
        break;
      case 7:
        this.activeFilterName = FilterNames.Commission;
        break;
      case 8:
        this.activeFilterName = FilterNames.Percent;
        break;
    }
  }

  applyFilterForm(event: any, filterType: number)
  {
    switch (filterType)
    {
      case 1:
        this.theFilterActivityList = event.value;
        break;
      case 2:
        this.theFilterKeyList = event.value;
        break;
      case 3:
        this.theFilterScenarioList = event.value;
        break;
    }

    const request: any = {};
    request.pageIndex = 1;
    request.pageSize = 999999;

    // if (this.theFilterActivitySelectedList && this.theFilterActivitySelectedList.length > 0) {
    //   request.brandFilter = new BrandFilter();
    //   request.brandFilter.brandIds = this.theFilterBrandsSelectedList.map(p => p.id);
    //   request.brandFilter.filterType = 0;
    //   if (this.theFilterBrandsSelectedCondition != 0) {
    //     request.brandFilter.filterType = this.theFilterBrandsSelectedCondition;
    //   }
    // }

    this.promoterDiscountSettingService.getPromoterDiscountSettingGrid(request);
  }

  closeFilterForm(event: boolean, filterType: number)
  {
    this.activeFilterName = FilterNames.Searched;
  }


}
