import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent implements OnInit {

  public routerLinkUrl: string;

  constructor(private router: Router) {

    this.routerLinkUrl = '/admin/main/settings/discount/list';
  }

  ngOnInit(): void {

    if (this.router.url == '/admin/main/settings/discount/edit') {
      this.routerLinkUrl = '/admin/main/settings/discount/edit';
    } else if (this.router.url == '/admin/main/settings/discount/list') {
      this.routerLinkUrl = '/admin/main/settings/discount/list';
    }

  }

}
