import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { PromoterDiscountSettingService } from 'src/app/@core/services/loyalty/promoter-discount-setting.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-system-settings-discount-list',
  templateUrl: './system-settings-discount-list.component.html',
  styleUrls: ['./system-settings-discount-list.component.scss']
})
export class SystemSettingsDiscountListComponent extends BaseSearch implements OnInit
{

  theViewList = new Array<any>();
  headerItems = [FilterNames.UserType, FilterNames.Brand, FilterNames.Commission, FilterNames.Percent];
  closeResult: string = '';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public service: PromoterDiscountSettingService,
    public override baseInfoService: BaseInfoService,
    public override baseSearchService: BaseSearchService)
  {
    super(baseInfoService, baseSearchService);
    service.promoterDiscountSettings$.subscribe(value =>
    {
      this.theViewList = value;
    });

  }

  override ngOnInit(): void
  {
    super.ngOnInit();
    this.baseInfoService.loadCommissions();
    this.service.promoterDiscountSettings$.subscribe(value => this.theViewList = value);
  }

  override search(request: any)
  {
    request.pageSize = 20;
    this.service.getPromoterDiscountSettingGrid(request);
  }


  /**
   * Write code on Method
   * @return response()
   */
  open(content: any)
  {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title' }).result.then((result) =>
    {
      this.closeResult = `Closed with: ${ result }`;
    }, (reason) =>
    {
      this.closeResult = `Dismissed ${ this.getDismissReason(reason) }`;
    });
  }

  /**
   * Close all displayed modal
   */
  close()
  {
    this.modalService.dismissAll();
  }

  /**
   * Write code on Method
   * @return response()
   */
  private getDismissReason(reason: any): string
  {
    if (reason === ModalDismissReasons.ESC)
    {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK)
    {
      return 'by clicking on a backdrop';
    } else
    {
      return `with: ${ reason }`;
    }
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/settings/discount/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/settings/discount/edit']);
  }
}
