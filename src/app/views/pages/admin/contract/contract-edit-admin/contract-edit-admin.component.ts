import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ContractBaseInfoService } from 'src/app/@core/services/loyalty/contract-base-info.service';
import { ContractService } from 'src/app/@core/services/loyalty/contract.service';
import { ContractEditComponent } from '../contract-edit/contract-edit.component';

@Component({
  selector: 'app-contract-edit-admin',
  templateUrl: './contract-edit-admin.component.html',
  styleUrls: ['./contract-edit-admin.component.scss']
})
export class ContractEditAdminComponent extends ContractEditComponent implements OnInit
{

  constructor(public override router: Router,
    public override baseInfoService: BaseInfoService,
    public override contractBaseInfoService: ContractBaseInfoService,
    public override service: ContractService,
    public override route: ActivatedRoute)
  {
    super(router, baseInfoService, contractBaseInfoService, service, route);
  }

}
