import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { customerGroupInit } from 'src/app/@core/data/loyalty/customer-group.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { CustomerGroupService } from 'src/app/@core/services/loyalty/customer-group.service';

@Component({
  selector: 'app-customer-group-root',
  templateUrl: './customer-group-root.component.html',
  styleUrls: ['./customer-group-root.component.scss']
})
export class CustomerGroupRootComponent implements OnInit
{
  constructor(private router: Router, public baseInfoService: BaseInfoService, public customerGroupService: CustomerGroupService, private route: ActivatedRoute)
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
          this.customerGroupService.createForm(value);
          this.loadBaseInfo();
        });
      } else
      {
        this.customerGroupService.createForm(customerGroupInit);
        this.loadBaseInfo();
      }
    });
  }

  loadBaseInfo()
  {
    this.baseInfoService.loadBaseInfo();
    this.baseInfoService.loadCustomerLevel();
  }

  ngOnInit(): void
  {
    this.customerGroupService.form.markAllAsTouched();
  }

  backToList()
  {
    this.router.navigate(['/admin/main/customergroup']);
  }

}
