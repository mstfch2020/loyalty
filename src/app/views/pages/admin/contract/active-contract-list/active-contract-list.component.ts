import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveContract } from 'src/app/@core/data/loyalty/contract/contract.model';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ContractService } from 'src/app/@core/services/loyalty/contract.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-active-contract-list',
  templateUrl: './active-contract-list.component.html',
  styleUrls: ['./active-contract-list.component.scss']
})
export class ActiveContractListComponent extends BaseSearch implements OnInit
{

  theViewList = new Array<ActiveContract>();
  headerItems = ['ردیف', FilterNames.Phone, FilterNames.UserType, FilterNames.Brand, FilterNames.ProductTag, FilterNames.DateFilter];
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
    this.service.activeContracts$.subscribe(value =>
    {
      this.theViewList = value;
    });
  }

  override search(request: any)
  {
    request.pageSize = 20;
    this.service.GetActiveContractGrid(request);
  }

  goToEdit(code: string = '')
  {
    if (code)
    {
      this.router.navigate(['/admin/main/contract/edit'], { queryParams: { id: code, } });
      return;
    }
    this.router.navigate(['/admin/main/contract/edit']);
  }
}
