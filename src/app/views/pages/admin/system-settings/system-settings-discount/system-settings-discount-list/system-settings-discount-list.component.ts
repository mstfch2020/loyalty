import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from '@angular/router';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { FilterTitle, IdTitle } from 'src/app/@core/data/loyalty/get-senarios-grid.model';
import { BrandFilter } from 'src/app/@core/data/loyalty/scenario/get-all-scenarios.model';
import { ScenarioService } from "../../../../../../@core/services/loyalty/scenario.service";
import { DiscountService } from "../../../../../../@core/services/loyalty/discount.service";
import { PromoterDiscountSettingService } from '../../../../../../@core/services/loyalty/promoter-discount-setting.service';

@Component({
  selector: 'app-system-settings-discount-list',
  templateUrl: './system-settings-discount-list.component.html',
  styleUrls: ['./system-settings-discount-list.component.scss']
})
export class SystemSettingsDiscountListComponent implements OnInit {

  closeResult: string = '';

  theViewList = new Array<any>();

  theFilterTypeList = new Array<FilterTitle>();
  theFilterTypeSelectedList = new Array<IdTitle>();

  theFilterBrandsList = new Array<FilterTitle>();
  theFilterBrandsSelectedList = new Array<IdTitle>();

  theFilterCommissionList = new Array<FilterTitle>();
  theFilterCommissionSelectedList = new Array<IdTitle>();

  theFilterPercentList = new Array<FilterTitle>();
  theFilterPercentSelectedList = new Array<IdTitle>();


  pageIndex = 1;
  pageSize = 99999;

  activeFilterName = FilterNames.None;
  theFilterCustomerSelectedCondition = 0;
  theFilterBrandsSelectedCondition = 0;
  theFilterStatusSelectedCondition = 0;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public promoterDiscountSettingService: PromoterDiscountSettingService,
    public baseInfoService: BaseInfoService,
    private authService: AuthService, /*private oidcSecurityService: OidcSecurityService*/) {

    promoterDiscountSettingService.promoterDiscountSettings$.subscribe(value => {
      this.theViewList = value;
    });

    this.activeFilterName = FilterNames.None;
  }

  ngOnInit(): void {
    this.promoterDiscountSettingService.getPromoterDiscountSetting(this.pageSize, this.pageIndex);
  }

  /**
   * Write code on Method
   * @return response()
   */
  open(content: any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Close all displayed modal
   */
  close() {
    this.modalService.dismissAll();
  }

  /**
   * Write code on Method
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  goToEdit(id: string = '') {
    if (id) {
      this.router.navigate(['/admin/main/discount/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/discount/edit']);
  }

  openFilterForm(filterType: number) {

    switch (filterType) {
      case 6:
        this.activeFilterName = FilterNames.Type;
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

  applyFilterForm(event: any, filterType: number) {
    switch (filterType) {
      case 1:
        this.theFilterTypeSelectedList = event.value;
        break;
      case 2:
        this.theFilterBrandsList = event.value;
        break;
      case 3:
        this.theFilterCommissionList = event.value;
        break;
      case 4:
        this.theFilterPercentList = event.value;
        break;
    }

    const request: any = {};
    request.pageIndex = 1;
    request.pageSize = 999999;
    if (this.theFilterBrandsSelectedList && this.theFilterBrandsSelectedList.length > 0) {
      request.brandFilter = new BrandFilter();
      request.brandFilter.brandIds = this.theFilterBrandsSelectedList.map(p => p.id);
      request.brandFilter.filterType = 0;
      if (this.theFilterBrandsSelectedCondition != 0) {
        request.brandFilter.filterType = this.theFilterBrandsSelectedCondition;
      }
    }

    //this.scenarioService.getSenariosGrid(request);
  }

  closeFilterForm(event: boolean, filterType: number) {
    this.activeFilterName = FilterNames.Searched;
  }

}
