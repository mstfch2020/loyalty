import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerMainGrid } from 'src/app/@core/data/loyalty/customer.model';
import { CustomerService } from 'src/app/@core/services/loyalty/customer.service';

@Component({
  selector: 'app-customer-grid',
  templateUrl: './customer-grid.component.html',
  styleUrls: ['./customer-grid.component.scss']
})
export class CustomerGridComponent implements OnInit
{

  public theViewList = new Array<CustomerMainGrid>();

  constructor(private router: Router, public customerService: CustomerService)
  {
  }
  pageIndex = 1;
  pageSize = 9999;

  ngOnInit(): void
  {
    this.customerService.getCustomerMainGrid(this.pageSize, this.pageIndex);
    this.customerService.customerMainGrid$.subscribe(value => this.theViewList = value);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/customer/customer-detail'], { queryParams: { id: id } });
    }
  }

}
