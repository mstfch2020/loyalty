import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IMenuItem} from "src/app/@core/data/Interfaces/Interfaces";
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  paramsSubscription: Subscription | undefined;

  public isToggle: boolean;
  public menuItems: IMenuItem[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.isToggle = false;
    this.menuItems = [
      {
        title: 'سناریوها',
        url: '/admin/main/scenario',
        visible: true
      },
      {
        title: 'گروه مشتری',
        url: '/admin/main/customergroup',
        visible: true
      },
      {
        title: 'گروه مشتری موقت',
        url: '/admin/main/customergrouptemporary',
        visible: true
      },
      {
        title: 'مشتریان',
        url: '/admin/main/customer',
        visible: true
      },
      {
        title: 'کاربران پنل',
        url: '/admin/main/users',
        visible: true
      },
      {
        title: 'ارسال پیامک',
        url: '/admin/main/sms',
        visible: true
      },
      {
        title: 'گزارش ها',
        url: '/admin/main/reports',
        visible: true
      },
      {
        title: 'تنظیمات سیستمی',
        url: '/admin/main/settings',
        visible: true
      }
    ]
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        //this.router.navigate(['/admin/profile']);
      });
  }

  OnDestroy() {
    this.paramsSubscription?.unsubscribe();
  }

}
