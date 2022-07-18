import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Contract } from "../../data/loyalty/contract/Contract";
import { ActiveContract, contractInit, createDistributor, createShopContract, createTeacher, PromoterContracts, RequestContract } from "../../data/loyalty/contract/contract.model";
import { ContractConfirm } from "../../data/loyalty/contract/ContractConfirm";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService, isValidPhonenumber } from "./BaseService";
import { ContractBaseInfoService } from "./contract-base-info.service";

@Injectable({ providedIn: 'root' })
export class ContractService extends BaseService<Contract>
{
  activeContracts$ = new BehaviorSubject<Array<ActiveContract>>([]);
  requestContracts$ = new BehaviorSubject<Array<RequestContract>>([]);
  promoterContracts$ = new BehaviorSubject<Array<PromoterContracts>>([]);

  constructor(public override formBuilder: FormBuilder,
    public override  baseInfoService: BaseInfoService,
    public contractBaseInfoService: ContractBaseInfoService,
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
      stateId: [contract.stateId, [Validators.required]],
      cityId: [contract.cityId, [Validators.required]],
      type: [contract.type, [Validators.required]],
      brandId: [contract.brandId, [Validators.required]],
      distributor: createDistributor(contract.distributor, this.formBuilder),
      shopContract: createShopContract(contract.shopContract, this.formBuilder),
      teachers: this.formBuilder.array(contract.teachers.map(teacher => createTeacher(teacher, this.formBuilder)))

    });

    // this.editMode = group.groups.some(p => !Utility.isNullOrEmpty(p.id));

    this.form.get('stateId')?.valueChanges.subscribe((value: string) =>
    {
      this.contractBaseInfoService.loadCities(value);
    });

    this.form.get('cityId')?.valueChanges.subscribe((value: string) =>
    {
      this.contractBaseInfoService.loadAreas(value);
    });
  }

  get teachers()
  {
    // return this.form.get('groups') as FormArray;
    return this.form.controls['teachers'] as FormArray;
  }

  getFormGroupOfArray(formGroup: any): FormGroup { return (formGroup as FormGroup); }

  addTeacher()
  {
    this.teachers.push(createTeacher(null, this.formBuilder));
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
      this.requestContracts$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.requestContracts$.next(value?.data);
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      }
    });
  }

  GetPromoterContractsGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'Contract/GetPromoterContractsGrid';
    return callPostPagingService<Array<PromoterContracts>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.promoterContracts$.next([]);
      if (value?.data)
      {
        this.promoterContracts$.next(value?.data);
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
    this.uiService.alertService.clearAllMessages();
    console.log(this.form.value);
    const option = Utility.isNullOrEmpty(this.getValue('contractId')) ? 'CreateInfo' : 'EditInfo';
    const url = this.settingService.settings?.baseUrl + `Contract/${ option }`;

    const value = this.form.value;

    if (!isValidPhonenumber(value.mobile))
    {
      this.uiService.alert('شماره مبایل نادرست است.');
    }

    /////////////////////////////////////

    if (this.uiService.alertService.getErrorMessages().length !== 0)
    {
      return;
    }

    if (Utility.isNullOrEmpty(value.contractId)) { delete value.contractId; }
    if (value.type === 1)
    {
      delete value.distributor;
      delete value.shopContract;
    }
    if (value.type === 2)
    {
      delete value.teachers;
      delete value.shopContract;
    }
    if (value.type === 3)
    {
      delete value.distributor;
      delete value.teachers;
    }
    callPostService<Contract>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['contractId'].setValue(value?.contractId);
      if (value?.contractId) { this.uiService.success('با موفقیت ثبت شد.'); }
    });

  }
}
