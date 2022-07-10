import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Contract } from "../../data/loyalty/contract/Contract";
import { ActiveContract, contractInit, createDistributor, createShopContract, createTeacher, RequestContract } from "../../data/loyalty/contract/contract.model";
import { ContractConfirm } from "../../data/loyalty/contract/ContractConfirm";
import { SMS } from "../../data/loyalty/sms.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class ContractService extends BaseService<Contract>
{
  activeContracts$ = new BehaviorSubject<Array<ActiveContract>>([]);
  requestContracts$ = new BehaviorSubject<Array<RequestContract>>([]);

  constructor(public override formBuilder: FormBuilder,
    public override  baseInfoService: BaseInfoService,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService)
  {
    super(formBuilder, uiService, baseInfoService, contractInit);
  }

  createForm(contract: Contract): void
  {
    this.form = this.formBuilder.group({
      contractId: [contract.contractId, [Validators.required]],
      mobile: [contract.mobile, [Validators.required]],
      phone: [contract.phone, [Validators.required]],
      firstName: [contract.firstName, [Validators.required]],
      lastName: [contract.lastName, [Validators.required]],
      nationalCode: [contract.nationalCode, [Validators.required]],
      personnelCode: [contract.personnelCode, [Validators.required]],
      postalCode: [contract.postalCode, [Validators.required]],
      address: [contract.address, [Validators.required]],
      state: [contract.state, [Validators.required]],
      city: [contract.city, [Validators.required]],
      type: [contract.type, [Validators.required]],
      brandId: [contract.brandId, [Validators.required]],
      distributor: createDistributor(contract.distributor, this.formBuilder),
      shopContract: createShopContract(contract.shopContract, this.formBuilder),
      teachers: this.formBuilder.array(contract.teachers.map(teacher => createTeacher(teacher, this.formBuilder)))
    });
  }

  GetActiveContractGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Contract/GetActiveContractGrid';

    return callPostPagingService<Array<ActiveContract>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.activeContracts$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.activeContracts$.next(value?.data);
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      }
    });
  }

  GetRequestContractGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Contract/GetRequestContractGrid';

    return callPostPagingService<Array<RequestContract>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.activeContracts$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.activeContracts$.next(value?.data);
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      }
    });
  }

  GetPromoterContractsGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Contract/GetPromoterContractsGrid';
    return callPostPagingService<Array<RequestContract>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.activeContracts$.next([]);
      if (value?.data)
      {
        this.activeContracts$.next(value?.data);
      }
    });
  }

  ContractConfirm(contractConfirm: ContractConfirm): void
  {
    const url = this.settingService.settings?.baseUrl + `Contract/Confirm'`;
    callPostService<Contract>(url, this.http, this.uiService, contractConfirm).subscribe(value =>
    {
      this.form.controls['contractId'].setValue(value?.contractId);
      if (value?.contractId) { this.uiService.success('با موفقیت ثبت شد.'); }
    });
  }

  EditContract(contractConfirm: ContractConfirm)
  {
    const url = this.settingService.settings?.baseUrl + `Contract/EditContract'`;
    callPostService<Contract>(url, this.http, this.uiService, contractConfirm).subscribe(value =>
    {
      this.form.controls['contractId'].setValue(value?.contractId);
      if (value?.contractId) { this.uiService.success('با موفقیت ثبت شد.'); }
    });
  }

  GetContractById(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'Contract/GetContractById';
    return callGetService<Contract>(url, this.http, this.uiService, {
      id: id
    });
  }

  RejectContractById(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'Contract/Reject';
    return callPostService<Contract>(url, this.http, this.uiService, {
      contractId: id
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    const option = Utility.isNullOrEmpty(this.getValue('contractId')) ? 'CreateInfo' : 'EditInfo';
    const url = this.settingService.settings?.baseUrl + `Contract/${ option }`;

    const value = this.form.value;

    if (Utility.isNullOrEmpty(value.contractId)) { delete value.contractId; }

    callPostService<Contract>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['contractId'].setValue(value?.contractId);
      if (value?.contractId) { this.uiService.success('با موفقیت ثبت شد.'); }
    });

  }
}
