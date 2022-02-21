import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-grid',
  templateUrl: './customer-grid.component.html',
  styleUrls: ['./customer-grid.component.scss']
})
export class CustomerGridComponent implements OnInit {

  public theViewList = [
    {
      Index:1,
      Mobile:'09192524598',
      Brands:'خیلی سبز-مشتریان',
      UsesType:'دبیر',
      CustomerGroup:'طالبی',
      CurrentScore:'6,320',
      CreateDate:' 19 دی 1400'
    },
    {
      Index:2,
      Mobile:'09127584502',
      Brands:'خیلی سبز-مشتریان',
      UsesType:'دبیر',
      CustomerGroup:'طالبی',
      CurrentScore:'6,320',
      CreateDate:' 19 دی 1400'
    },
    {
      Index:3,
      Mobile:'09352105532',
      Brands:'خیلی سبز-مشتریان',
      UsesType:'دبیر',
      CustomerGroup:'طالبی',
      CurrentScore:'6,320',
      CreateDate:' 19 دی 1400'
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  routToDetail(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['/admin/main/customer/customer-detail'], { queryParams: { id: id } });
      return;
    }
  }

}
