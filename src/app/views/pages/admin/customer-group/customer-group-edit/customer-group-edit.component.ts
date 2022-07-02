import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerGroup, customerGroupInit } from "src/app/@core/data/loyalty/customer-group.model";
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { CustomerGroupService } from "src/app/@core/services/loyalty/customer-group.service";

@Component({
  selector: 'app-customer-group-edit',
  templateUrl: './customer-group-edit.component.html',
  styleUrls: ['./customer-group-edit.component.scss']
})
export class CustomerGroupEditComponent implements OnInit
{

  constructor(private router: Router, public baseInfoService: BaseInfoService, public customerGroupService: CustomerGroupService, private route: ActivatedRoute)
  {

  }

  loadBaseInfo(value: CustomerGroup)
  {
    this.baseInfoService.loadBaseInfo(() => this.customerGroupService.createForm(value));
    this.baseInfoService.loadCustomerLevel();
  }

  ngOnInit(): void
  {
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      if (id)
      {
        this.customerGroupService.getCustomerGroupById(id).subscribe((value) =>
        {
          if (!value)
          {
            value = customerGroupInit;
          }
          this.loadBaseInfo(value);
        });
      } else
      {
        this.loadBaseInfo(customerGroupInit);
      }
    });
    this.customerGroupService.form.markAllAsTouched();
  }

  backToList()
  {
    this.router.navigate(['/admin/main/customer-group']);
  }


}
