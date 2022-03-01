import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  theUserList: any[];

  constructor() {
    this.theUserList = [
      {
        Index:'1',
        Mobile:'09192935850',
        FullName:'مهدی محمودآبادی',
        Permissions:'تایید سناریو در باشگاه مشتریان',
      },
      {
        Index:'2',
        Mobile:'09192935850',
        FullName:'مصطفی چیت سازان',
        Permissions:'تایید مشتریان در باشگاه، تایید سناریو در باشگاه',
      },
      {
        Index:'3',
        Mobile:'09192935850',
        FullName:'حسن هاشمی',
        Permissions:'گزارشگیر کاربران باشگاه',
      },
      {
        Index:'4',
        Mobile:'09192935850',
        FullName:'علی صادق زاده',
        Permissions:'ارسال پیامک در باشگاه',
      }
    ];
  }

  ngOnInit(): void {
  }

}
