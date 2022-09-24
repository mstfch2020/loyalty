import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";
import { Contract } from "../../data/loyalty/contract/Contract";
import { ActiveContract, contractInit, createDistributor, createShopContract, createTeacher, PromoterContracts, RequestContract } from "../../data/loyalty/contract/contract.model";
import { ContractConfirm } from "../../data/loyalty/contract/ContractConfirm";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { Utility } from "../../utils/Utility";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callPostPagingService, callPostService, isValidPhonenumber } from "./BaseService";
import { ContractBaseInfoService } from "./contract-base-info.service";

@Injectable({ providedIn: 'root' })
export class ContractService extends BaseService<Contract>
{
  activeContracts$ = new BehaviorSubject<Array<ActiveContract>>([]);
  requestContracts$ = new BehaviorSubject<Array<RequestContract>>([]);
  promoterContracts$ = new BehaviorSubject<Array<PromoterContracts>>([]);
  refreshGetPromoterContractsGrid = new Subject<string>();

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
      customerId: [contract.customerId, [Validators.required]],
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
      teachers: !contract.teachers ? [] : this.formBuilder.array(contract.teachers?.map(teacher => createTeacher(teacher, this.formBuilder))),
      tagIds: [contract.tagIds?.length === 0 && contract.contractId ? ['all'] : contract.tagIds, [Validators.required]],
      startDate: [Utility.getFullDateTimeFromPeriodInPersian(contract.from), [Validators.required]],
      endDate: [Utility.getFullDateTimeFromPeriodInPersian(contract.to), [Validators.required]],
      from: createPeriodFormGroup(contract.from, this.formBuilder),
      to: createPeriodFormGroup(contract.to, this.formBuilder),

    });

    // this.editMode = group.groups.some(p => !Utility.isNullOrEmpty(p.id));
    this.form.get('mobile')?.valueChanges.subscribe((value: string) =>
    {
      if (isValidPhonenumber(value)) { this.refreshGetPromoterContractsGrid.next(value); }
    });

    if (this.form.get('mobile')?.value)
    {
      this.refreshGetPromoterContractsGrid.next(this.form.get('mobile')?.value);
    }


    if (!Utility.isNullOrEmpty(this.form.get('contractId')?.value))
    {
      this.form.get('mobile')?.disable();
    }

    this.form.get('stateId')?.valueChanges.subscribe((value: string) =>
    {
      if (this.form.get('stateId')?.disabled)
      {
        return;
      }
      this.form.get('cityId')?.setValue(null);
      this.form.get('distributor.activityZoneId')?.setValue(null);
      this.contractBaseInfoService.loadCities(value);
    });

    this.form.get('cityId')?.valueChanges.subscribe((value: string) =>
    {
      if (this.form.get('stateId')?.disabled)
      {
        return;
      }
      this.contractBaseInfoService.loadAreas(value);
    });
  }

  get contractTypeTitle()
  {
    const type = this.getValue('type');
    return this.baseInfoService.contractType?.find(p => p.id === type)?.title;
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
    return callPostService<any>(url, this.http, this.uiService, {
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

    delete value.tagIds;
    delete value.startDate;
    delete value.endDate;

    value.mobile = this.form.get('mobile')?.value;
    if (!isValidPhonenumber(value.mobile))
    {
      this.uiService.alert('شماره موبایل نادرست است.');
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
    callPostService<any>(url, this.http, this.uiService, value).subscribe(value =>
    {
      this.form.controls['contractId'].setValue(value?.id);
      if (value?.id) { this.uiService.success('با موفقیت ثبت شد.'); }
    });

  }

  public confirm(): void
  {
    if (!this.updatePeriodFormControl(this.getValue('startDate'), 'from') ||
      !this.updatePeriodFormControl(this.getValue('endDate'), 'to'))
    {
      this.uiService.alert('بازه زمانی تاریخ قرارداد را وارد نمایید.');
      return;
    }

    let tagIds = this.getValue('tagIds');
    if (!tagIds || tagIds?.length === 0)
    {
      this.uiService.alert('تگ کالا را مشخص نمایید.');
      return;
    }

    if (tagIds?.some((p: string) => p === 'all'))
    {
      tagIds = [];
    }

    const request: any = {};
    request.tagIds = tagIds;
    request.from = this.getValue('from');
    request.to = this.getValue('to');
    request.contractId = this.getValue('contractId');
    request.customerId = this.getValue('customerId');
    const url = this.settingService.settings?.baseUrl + `Contract/Confirm`;
    callPostService<any>(url, this.http, this.uiService, request).subscribe(value =>
    {
      if (value) { this.uiService.success('با موفقیت ثبت شد.'); }
    });


  }

  public reject(): void
  {

    const url = this.settingService.settings?.baseUrl + `Contract/Reject`;
    callPostService<any>(url, this.http, this.uiService, { contractId: this.getValue('contractId') }).subscribe(value =>
    {
      if (value) { this.uiService.success('با موفقیت ثبت شد.'); }
    });


  }
}
