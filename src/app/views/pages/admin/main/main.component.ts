import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { IMenuItem } from "src/app/@core/data/Interfaces/Interfaces";
import { AuthService } from 'src/app/@core/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit
{

  paramsSubscription: Subscription | undefined;

  public isToggle: boolean;
  public menuItems: IMenuItem[];

  constructor(
    public authService: AuthService
  )
  {
    this.isToggle = false;
    this.menuItems = [
      {
        title: 'سناریوها',
        url: '/admin/main/scenario',
        visible: true
      },
      {
        title: 'گروه مشتری',
        url: '/admin/main/customer-group',
        visible: true
      },
      {
        title: 'گروه مشتری موقت',
        url: '/admin/main/customer-group-temporary',
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
        visible: false
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
        title: 'کد تخفیف',
        url: '/admin/main/discount-code',
        visible: true
      },
      {
        title: 'ترویج دهندگان',
        url: '/admin/main/contract',
        visible: true
      },
      {
        title: 'جوایز',
        url: '/admin/main/gifts',
        visible: true
      },
      {
        title: 'اخبار و رویدادها',
        url: '/admin/main/news',
        visible: true
      },
      {
        title: 'تنظیمات سیستمی',
        url: '/admin/main/settings',
        visible: true
      }
    ];
  }

  ngOnInit(): void
  {

  }

  singout()
  {
    this.authService.signout();
  }

  singoutpop()
  {
    this.authService.signoutpop();
  }

  singIn()
  {
    this.authService.startAuthentication();
  }


  OnDestroy()
  {
    this.paramsSubscription?.unsubscribe();
  }
}
