import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDetail, CustomerInfo, CustomerScenario, CustomerSubGrid } from "src/app/@core/data/loyalty/customer.model";
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { CustomerService } from "src/app/@core/services/loyalty/customer.service";
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';
import { Utility } from 'src/app/@core/utils/Utility';
import { CreateDiscountCodeDialogComponent } from '../create-discount-code-dialog/create-discount-code-dialog.component';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent extends BaseSearch implements OnInit
{

  customerInfoList = new Array<CustomerInfo>();
  showHistory: boolean;
  customer = {} as CustomerDetail;
  subCustomerDetailList = new Array<CustomerSubGrid>();
  customerScenarioList = new Array<CustomerScenario>();
  id = '';
  theViewList = new Array<any>();

  headerItems = ['عنوان', FilterNames.Date, FilterNames.Brand, FilterNames.Status];
  constructor(
    private router: Router,
    public service: CustomerService,
    private route: ActivatedRoute,
    public override baseInfoService: BaseInfoService,
    public override baseSearchService: BaseSearchService,
    private modalService: NgbModal
  )
  {
    super(baseInfoService, baseSearchService);
    this.showHistory = false;

    service.customer$.subscribe(value =>
    {
      this.customer = value;
    });

    this.service.customerSubGrid$.subscribe(value => this.subCustomerDetailList = value);
    this.service.scenarioCustomer$.subscribe(value => this.customerScenarioList = value);
    this.baseInfoService.loadCommissions();
  }

  override search(request: any)
  {
    if (Utility.isNullOrEmpty(this.id)) { return; }
    request.id = this.id;
    this.service.getCustomerScenarioGrid(request);
  }

  override ngOnInit(): void
  {

    super.ngOnInit();

    this.route.queryParams.subscribe(params =>
    {
      this.id = params['id'];
      if (this.id)
      {
        this.service.getCustomerById(this.id);
        this.service.getCustomerScenarioGrid({ id: this.id });
        this.service.GetPromoterDiscountCodesGeneralInfo(this.id).subscribe(result =>
        {
          this.customerInfoList = !result || result.length === 0 ? this.getCustomreInfoMock() : result;
        });
        return;
      }
      this.router.navigate(['/admin/main/customer/']);
    });



  }
  getCustomreInfoMock(): CustomerInfo[]
  {
    return [
      { brandId: '123', brandName: 'خیلی سبز', commission: 100, activeCodeCount: 200, showCommissionHistory: false, showDiscountHistory: false },
      { brandId: '123', brandName: 'خیلی سبز', commission: 100, activeCodeCount: 200, showCommissionHistory: false, showDiscountHistory: false },
      { brandId: '123', brandName: 'خیلی سبز', commission: 100, activeCodeCount: 200, showCommissionHistory: false, showDiscountHistory: false },
      { brandId: '123', brandName: 'خیلی سبز', commission: 100, activeCodeCount: 200, showCommissionHistory: false, showDiscountHistory: false },

    ];
  }

  showHistoryToggle()
  {
    this.showHistory = !this.showHistory;
    if (this.showHistory)
    {
      this.service.getCustomerSubGrid(this.pageSize, this.pageIndex, this.id);
    }
  }

  createNewDiscountCode()
  {
    if (!this.id)
    {
      return;
    }

    const modalRef = this.modalService.open(CreateDiscountCodeDialogComponent, { size: 'lg' });
    modalRef.componentInstance.customerId = this.id;
  }
}
