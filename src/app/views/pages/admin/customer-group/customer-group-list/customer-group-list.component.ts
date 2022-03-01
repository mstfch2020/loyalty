import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerGroupDetail} from "src/app/@core/data/loyalty/customer-group.model";
import {CustomerGroupService} from "src/app/@core/services/loyalty/customer-group.service";

@Component({
  selector: 'app-customer-group-list',
  templateUrl: './customer-group-list.component.html',
  styleUrls: ['./customer-group-list.component.scss']
})
export class CustomerGroupListComponent implements OnInit {

  theViewList = new Array<CustomerGroupDetail>();
  pageSize = 9999;
  pageIndex = 1;

  constructor(private router: Router, public customerGroupService: CustomerGroupService) {
    customerGroupService.customerGroups$.subscribe(value => {
      this.theViewList = value;
    });
  }

  ngOnInit(): void {
    this.customerGroupService.getCustomerGroups(this.pageSize, this.pageIndex);
  }

  goToEdit(id: string) {
    if (id) {
      this.router.navigate(['/admin/main/customergroup/edit'], {queryParams: {id: id}});
      return;
    }
    this.router.navigate(['/admin/main/customergroup/edit']);
  }

}
