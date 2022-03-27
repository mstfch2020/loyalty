import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { RootStoreService } from './@core/services/root-store.service';
import { AlertService } from './@core/services/ui/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'loyalty';
  isLoading = false;

  constructor(public rootStoreService: RootStoreService, private router: Router, private alertService: AlertService, private config: NgSelectConfig)
  {
    router.events.subscribe((val) => this.alertService.clearAllMessages());
    config.notFoundText = 'موردی یافت نشد.';
    rootStoreService.isLoading().subscribe(value =>
    {
      if (value)
      {
        this.isLoading = true;
        return;
      }
      this.isLoading = false;
    });
  }
}
