import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestContract } from 'src/app/@core/data/loyalty/contract/contract.model';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { HeaderFilter } from 'src/app/@core/data/loyalty/header-filter.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ContractService } from 'src/app/@core/services/loyalty/contract.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-request-contract-list',
  templateUrl: './request-contract-list.component.html',
  styleUrls: ['./request-contract-list.component.scss']
})
export class RequestContractListComponent extends BaseSearch implements OnInit
{

  theViewList = new Array<RequestContract>();
  // headerItems = ['ردیف', FilterNames.Phone, FilterNames.UserType, FilterNames.Brand, FilterNames.DateFilter, FilterNames.ContractStatus];

  headerItems: Array<HeaderFilter> = [
    new HeaderFilter(FilterNames.None, 'ردیف'),
    new HeaderFilter(FilterNames.Phone),
    new HeaderFilter(FilterNames.UserType),
    new HeaderFilter(FilterNames.Brand),
    new HeaderFilter(FilterNames.DateFilter, 'تاریخ درخواست'),
    new HeaderFilter(FilterNames.ContractStatus),
  ];

  constructor(private router: Router,
    public service: ContractService,
    public override baseInfoService: BaseInfoService,
    public override baseSearchService: BaseSearchService)
  {
    super(baseInfoService, baseSearchService);
  }

  override ngOnInit(): void
  {
    super.ngOnInit();

    this.service.requestContracts$.subscribe(value =>
    {
      this.theViewList = value;
    });
  }

  override search(request: any)
  {
    request.pageSize = 20;
    this.service.GetRequestContractGrid(request);
  }

  goToEdit(code: string = '')
  {
    if (code)
    {
      this.router.navigate(['/admin/main/contract/edit'], { queryParams: { id: code, isRequest: true } });
      return;
    }
    this.router.navigate(['/admin/main/contract/edit']);
  }
}
