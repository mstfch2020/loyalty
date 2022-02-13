import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {

  public theViewList: any[];

  constructor() {

    this.theViewList = [];
  }

  ngOnInit(): void {
  }

  routToBehavioral() {

  }

}
