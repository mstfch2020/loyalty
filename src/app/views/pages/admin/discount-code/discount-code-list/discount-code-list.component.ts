import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GetSenarios} from "src/app/@core/data/loyalty/get-senarios-grid.model";
import {DiscountService} from "src/app/@core/services/loyalty/discount.service";

@Component({
  selector: 'app-discount-code-list',
  templateUrl: './discount-code-list.component.html',
  styleUrls: ['./discount-code-list.component.scss']
})
export class DiscountCodeListComponent implements OnInit {

  public theViewList = new Array<any>();
  pageIndex = 1;
  pageSize = 99999;

  constructor(private router: Router, public discountService: DiscountService) {
    this.theViewList = [
      {
        Index:'1',
        Code:'100',
        Discount:'10%',
        DateTime:'1400/10/10 - 1400/11/12',
        Brands:'تستی'
      },
      {
        Index:'2',
        Code:'200',
        Discount:'20%',
        DateTime:'1400/10/10 - 1400/11/12',
        Brands:'تستی'
      },
      {
        Index:'3',
        Code:'300',
        Discount:'15%',
        DateTime:'1400/10/10 - 1400/11/12',
        Brands:'تستی'
      },
    ];
  }

  ngOnInit(): void {
  }

  goToEdit(code: string = '') {
    if (code) {
      this.router.navigate(['/admin/main/discountcode/edit'], {queryParams: {id: code}});
      return;
    }
    this.router.navigate(['/admin/main/discountcode/list']);
  }

}
