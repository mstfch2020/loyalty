import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerMainGrid} from "src/app/@core/data/loyalty/customer.model";
import {CustomerService} from "src/app/@core/services/loyalty/customer.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public theViewList = new Array<CustomerMainGrid>();
  pageIndex = 1;
  pageSize = 9999;

  constructor(private router: Router, public customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getCustomerMainGrid(this.pageSize, this.pageIndex);
    this.customerService.customerMainGrid$.subscribe(value => this.theViewList = value);
  }

  goToEdit(id: string = '') {
    if (id) {
      this.router.navigate(['/admin/main/customer/edit'], {queryParams: {id: id}});
    }
  }


}
