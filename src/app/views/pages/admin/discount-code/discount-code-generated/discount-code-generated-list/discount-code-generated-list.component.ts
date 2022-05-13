import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FilterNames } from 'src/app/@core/data/loyalty/enums.model';
import { FilterTitle, IdTitle, IdTitleTypeBrandId } from 'src/app/@core/data/loyalty/get-senarios-grid.model';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { DiscountService } from "src/app/@core/services/loyalty/discount.service";

@Component({
  selector: 'app-discount-code-generated-list',
  templateUrl: './discount-code-generated-list.component.html',
  styleUrls: ['./discount-code-generated-list.component.scss']
})
export class DiscountCodeGeneratedListComponent implements OnInit
{

  theViewList = new Array<any>();

  theFilterCustomerList = new Array<FilterTitle>();
  theFilterCustomerSelectedList = new Array<IdTitleTypeBrandId>();

  theFilterBrandsList = new Array<FilterTitle>();
  theFilterBrandsSelectedList = new Array<IdTitle>();

  theFilterDateList = new Array<FilterTitle>();
  theFilterDateFromSelected = "";
  theFilterDateToSelected = "";
  theFilterStatusSelected = 0;

  pageIndex = 1;
  pageSize = 10;

  activeFilterName = FilterNames.None;
  theFilterCustomerSelectedCondition = 0;
  theFilterBrandsSelectedCondition = 0;
  theFilterStatusSelectedCondition = 0;
  theFilterStatusList: Array<FilterTitle> = [
    {
      id: '1',
      title: 'فعال', type: 0,
      checked: false,
    },
    {
      id: '2',
      title: 'غیرفعال', type: 0,
      checked: false,
    },
  ];

  constructor(
    private router: Router,
    public discountService: DiscountService,
    public baseInfoService: BaseInfoService,
    private authService: AuthService, /*private oidcSecurityService: OidcSecurityService*/)
  {

    this.activeFilterName = FilterNames.None;

    this.theViewList = [
      {
        Index: '1',
        Code: '100',
        Discount: '10%',
        Brands: 'تستی',
        DateTime: '1400/10/10 - 1400/11/12',
        Pattern: '',
      },
      {
        Index: '2',
        Code: '200',
        Discount: '20,000 تومان',
        Brands: 'تستی',
        DateTime: '1400/10/10 - 1400/11/12',
        Pattern: '',
      },
      {
        Index: '3',
        Code: '300',
        Discount: '15%',
        Brands: 'تستی',
        DateTime: '1400/10/10 - 1400/11/12',
        Pattern: '',
      },
      {
        Index: '4',
        Code: '400',
        Discount: '25,000 تومان',
        Brands: 'تستی',
        DateTime: '1400/10/25 - 1400/11/25',
        Pattern: '',
      },
    ];
  }

  ngOnInit(): void
  {
  }

  goToEdit(code: string = '')
  {
    if (code)
    {
      this.router.navigate(['/admin/main/discountcode/generated/edit'], { queryParams: { id: code } });
      return;
    }
    this.router.navigate(['/admin/main/discountcode/generated/list']);
  }

  openFilterForm(filterType: number)
  {

    switch (filterType)
    {
      case 1:
        this.activeFilterName = FilterNames.Customer;
        break;
      case 2:
        this.activeFilterName = FilterNames.Date;
        break;
      case 3:
        this.activeFilterName = FilterNames.Brand;
        break;
      case 4:
        this.activeFilterName = FilterNames.Status;
        break;
    }
  }

  applyFilterForm(event: any, filterType: number)
  {
    switch (filterType)
    {
      case 1:
        this.theFilterCustomerSelectedList = event.value;
        this.theFilterCustomerSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case 2:
        this.theFilterDateFromSelected = event?.dateFrom;
        this.theFilterDateToSelected = event?.dateTo;
        break;
      case 3:
        this.theFilterBrandsSelectedList = event.value;
        this.theFilterBrandsSelectedCondition = parseInt(event.conditionType, 0);
        break;
      case 4:
        this.theFilterStatusSelected = parseInt(event.value[0].id, 0);
        break;
    }

  }

  closeFilterForm(event: boolean, filterType: number)
  {
    this.activeFilterName = FilterNames.Searched;
  }

  selectedPageIndex(event: number)
  {
    this.pageIndex = event;
  }
}
