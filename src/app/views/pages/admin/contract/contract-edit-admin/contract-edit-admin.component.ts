import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/@core/data/loyalty/contract/Contract';
import { contractInit } from 'src/app/@core/data/loyalty/contract/contract.model';
import { ComboTypes } from 'src/app/@core/data/loyalty/enums.model';
import { IdTitle } from 'src/app/@core/data/loyalty/get-senarios-grid.model';
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

  constructor(public router: Router,
    public baseInfoService: BaseInfoService,
    public contractBaseInfoService: ContractBaseInfoService,
    public service: ContractService,
    public route: ActivatedRoute,
    private cdref: ChangeDetectorRef)
  {

  }

  loadBaseInfo(value?: Contract)
  {
    this.contractBaseInfoService.loadBaseInfoData(value);
    this.baseInfoService.loadBaseInfo(null, value?.brandId ? [value?.brandId] : []);
  }

  ngOnInit(): void
  {
    this.service.createForm(contractInit);
    this.service.form.enable();
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
          this.service.createForm(value);
          this.cdref.detectChanges();
          this.disableForm();
          this.loadBaseInfo(value);
        });
      } else
      {
        this.baseInfoService.loadBaseInfo(() => { this.service.createForm(contractInit); this.cdref.detectChanges(); this.disableForm(); });
      }
    });
    this.service.form.markAllAsTouched();
  }

  disableForm()
  {
    this.service.form.disable();
    this.service.form.get('tagIds')?.enable();
    this.service.form.get('startDate')?.enable();
    this.service.form.get('endDate')?.enable();
  }

  backToList()
  {
    this.router.navigate(['/admin/main/contract']);
  }

  comboChanged($event: IdTitle, type: ComboTypes): void
  {
    if (!$event) { return; }
    if ($event.id) { return; }

    switch (type)
    {
      // case ComboTypes.Province: {
      //   this.handleProvince($event);
      //   break;
      // }

      // case ComboTypes.City: {
      //   this.handleCity($event);
      //   break;
      // }

      case ComboTypes.ActivityZone: {
        this.handleActivityZone($event);
        break;
      }

      case ComboTypes.DistributorActivitySection: {
        this.handleDistributorActivitySection($event);
        break;
      }

      case ComboTypes.ShopActivitySection: {
        this.handleShopActivitySection($event);
        break;
      }

    }
  }

  public handleDistributorActivitySection($event: IdTitle)
  {
    const lst = this.contractBaseInfoService.distributorActivitySections$.getValue();
    const findValue = lst.find(p => p.title === $event.title);
    if (findValue && findValue.id)
    {
      this.service.form.get('distributor.activitySectionId')?.setValue($event.id);
    }
    else
    {
      this.contractBaseInfoService.CreateDistributorActivitySection($event.title).subscribe(id =>
      {
        if (id)
        {
          $event.id = id;
          lst.push($event);
          this.contractBaseInfoService.distributorActivitySections$.next(lst);
          this.service.form.get('distributor.activitySectionId')?.setValue($event.id);
        }
      });
    }
  }

  public handleShopActivitySection($event: IdTitle)
  {
    const lst = this.contractBaseInfoService.shopActivitySections$.getValue();
    const findValue = lst.find(p => p.title === $event.title);
    if (findValue && findValue.id)
    {
      this.service.form.get('shopContract.activitySectionId')?.setValue($event.id);
    }
    else
    {
      this.contractBaseInfoService.CreateShopActivitySection($event.title).subscribe(id =>
      {
        if (id)
        {
          $event.id = id;
          lst.push($event);
          this.contractBaseInfoService.shopActivitySections$.next(lst);
          this.service.form.get('shopContract.activitySectionId')?.setValue($event.id);
        }
      });
    }
  }

  public handleActivityZone($event: IdTitle)
  {
    const lst = this.contractBaseInfoService.activityZone$.getValue();
    const findValue = lst.find(p => p.title === $event.title);
    if (findValue && findValue.id)
    {
      this.service.form.get('distributor.activityZoneId')?.setValue($event.id);
    }
    else
    {
      this.contractBaseInfoService.CreateShopActivitySection($event.title).subscribe(id =>
      {
        if (id)
        {
          $event.id = id;
          lst.push($event);
          this.contractBaseInfoService.activityZone$.next(lst);
          this.service.form.get('distributor.activityZoneId')?.setValue($event.id);
        }
      });
    }
  }

  public handleProvince($event: IdTitle)
  {
    this.service.form.get('cityId')?.setValue(null);
    const lst = this.contractBaseInfoService.provinces$.getValue();
    const findValue = lst.find(p => p.title === $event.title);
    if (findValue && findValue.id)
    {
      this.service.form.get('stateId')?.setValue($event.id);
    }
    else
    {
      this.contractBaseInfoService.CreateState($event.title).subscribe(id =>
      {
        if (id)
        {
          $event.id = id;
          lst.push($event);
          this.contractBaseInfoService.provinces$.next(lst);
          this.service.form.get('stateId')?.setValue($event.id);
        }
      });
    }
  }

  public handleCity($event: IdTitle)
  {
    const stateId = this.service.form.get('stateId')?.value;
    if (!stateId)
    {
      this.service.uiService.alert('ابتدا استان را وارد نمایید.');
      return;
    }
    const lst = this.contractBaseInfoService.cities$.getValue();
    const findValue = lst.find(p => p.title === $event.title);
    if (findValue && findValue.id)
    {
      this.service.form.get('cityId')?.setValue($event.id);
    }
    else
    {
      this.contractBaseInfoService.CreateCity($event.title, stateId).subscribe(id =>
      {
        if (id)
        {
          $event.id = id;
          lst.push($event);
          this.contractBaseInfoService.cities$.next(lst);
          this.service.form.get('cityId')?.setValue($event.id);
        }
      });
    }
  }

  addTag(term: string)
  {
    if (term)
    {
      return { id: null, title: term };
    }
    return null;
  }
}
