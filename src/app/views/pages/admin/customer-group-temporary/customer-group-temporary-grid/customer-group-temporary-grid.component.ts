import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-group-temporary-grid',
  templateUrl: './customer-group-temporary-grid.component.html',
  styleUrls: ['./customer-group-temporary-grid.component.scss']
})
export class CustomerGroupTemporaryGridComponent implements OnInit
{


  public theViewList = new Array<any>();
  pageIndex = 1;
  pageSize = 99999;

  constructor(private router: Router) { }

  ngOnInit(): void
  {
  }

  goToEdit(id: string)
  {
    if (id)
    {
      this.router.navigate(['/admin/main/customergrouptemporary/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/customergrouptemporary/edit']);
  }
}
