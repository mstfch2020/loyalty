import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {

  public theViewList: any[];

  constructor(private router: Router) {
    this.theViewList = [{'test':1}];
  }

  ngOnInit(): void {
    this.router.navigate(['/admin/main/scenario/list']);
  }

  routToBehavioral(item:any) {
    this.router.navigate(['/admin/main/scenario/root']);
  }

}
