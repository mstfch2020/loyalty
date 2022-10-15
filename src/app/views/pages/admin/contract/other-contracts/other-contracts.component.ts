import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromoterContracts } from 'src/app/@core/data/loyalty/contract/contract.model';
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ContractService } from 'src/app/@core/services/loyalty/contract.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';
import { BaseSearchService } from 'src/app/@core/services/ui/base-search.service';

@Component({
  selector: 'app-other-contracts',
  templateUrl: './other-contracts.component.html',
  styleUrls: ['./other-contracts.component.scss']
})
export class OtherContractsComponent extends BaseSearch implements OnInit
{

  theViewList = new Array<PromoterContracts>();
  headerItems = ['ردیف', 'شماره موبایل', FilterNames.UserType, FilterNames.Brand, FilterNames.ProductTag, FilterNames.DateFilter];
  mobile = '';
  constructor(private router: Router,
    public service: ContractService,
    public override baseInfoService: BaseInfoService,
    public override baseSearchService: BaseSearchService)
  {
    super(baseInfoService, baseSearchService);
  }

  override ngOnInit(): void
  {
    this.service.promoterContracts$.subscribe(value =>
    {
      this.theViewList = value;
    });

    this.service.refreshGetPromoterContractsGrid.subscribe(mobile =>
    {
      this.mobile = mobile;
      this.refresh();
    });

    this.mobile = this.service.form.get('mobile')?.value;
    if (this.mobile)
    {
      this.refresh();
    }
  }

  override search(request: any)
  {
    request.pageSize = 20;
    if (this.mobile)
    {
      request.mobileFilter = this.mobile;
      this.service.GetPromoterContractsGrid(request);
    }
  }

  goToEdit(code: string = '')
  {
    if (code)
    {
      this.router.navigate(['/admin/main/contract/edit'], { queryParams: { id: code } });
      return;
    }
    this.router.navigate(['/admin/main/contract/edit']);
  }
}
