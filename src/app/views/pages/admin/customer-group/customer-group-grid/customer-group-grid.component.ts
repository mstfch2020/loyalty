import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerGroupDetail } from 'src/app/@core/data/loyalty/customer-group.model';
import { CustomerGroupService } from 'src/app/@core/services/loyalty/customer-group.service';

@Component({
  selector: 'app-customer-group-grid',
  templateUrl: './customer-group-grid.component.html',
  styleUrls: ['./customer-group-grid.component.scss']
})
export class CustomerGroupGridComponent implements OnInit
{

  theViewList = new Array<CustomerGroupDetail>();
  pageSize = 9999;
  pageIndex = 1;

  constructor(private router: Router, public customerGroupService: CustomerGroupService)
  {
    customerGroupService.customerGroups$.subscribe(value => this.theViewList = value);
  }

  ngOnInit(): void
  {
    this.customerGroupService.getCustomerGroups(this.pageSize, this.pageIndex);
  }

  goToDetail(id: string)
  {
    if (id)
    {
      this.router.navigate(['/admin/main/customergroup/customergroup-edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/customergroup/customergroup-edit']);
  }
}
