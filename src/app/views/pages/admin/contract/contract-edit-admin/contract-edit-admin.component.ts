import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/@core/data/loyalty/contract/Contract';
import { contractInit } from 'src/app/@core/data/loyalty/contract/contract.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ContractBaseInfoService } from 'src/app/@core/services/loyalty/contract-base-info.service';
import { ContractService } from 'src/app/@core/services/loyalty/contract.service';

@Component({
  selector: 'app-contract-edit-admin',
  templateUrl: './contract-edit-admin.component.html',
  styleUrls: ['./contract-edit-admin.component.scss']
})
export class ContractEditAdminComponent implements OnInit
{

  constructor(private router: Router,
    public baseInfoService: BaseInfoService,
    public contractBaseInfoService: ContractBaseInfoService,
    public service: ContractService,
    private route: ActivatedRoute)
  {

  }

  loadBaseInfo(value?: Contract)
  {
    this.contractBaseInfoService.loadBaseInfoData(value);
    this.baseInfoService.loadBaseInfo();
  }

  ngOnInit(): void
  {
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      if (id)
      {
        this.service.GetContractById(id).subscribe((value) =>
        {
          if (!value)
          {
            value = contractInit;
          }
          this.loadBaseInfo(value);
        });
      } else
      {
        this.loadBaseInfo();
      }
    });
    this.service.form.markAllAsTouched();
  }

  backToList()
  {
    this.router.navigate(['/admin/main/contract']);
  }


}
