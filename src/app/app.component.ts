import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { RootStoreService } from './@core/services/root-store.service';
import { AlertService } from './@core/services/ui/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit
{
  title = 'loyalty';
  _isLoading = false;
  get isLoading(): boolean { return this._isLoading; }
  set isLoading(value: boolean) { this._isLoading = value; }
  constructor(public rootStoreService: RootStoreService, private cdref: ChangeDetectorRef, private router: Router, private alertService: AlertService, private config: NgSelectConfig)
  {
    router.events.subscribe((val) => this.alertService.clearAllMessages());
    config.notFoundText = 'موردی یافت نشد.';
  }

  ngAfterViewInit(): void
  {
    this.rootStoreService.isLoading().subscribe(value =>
    {
      if (value)
      {
        this.isLoading = true;
        this.cdref?.detectChanges();
        return;
      }
      this.isLoading = false;
      this.cdref?.detectChanges();
    });
    if (window.location.origin + '/' === window.location.href)
      this.router.navigate(['/admin/main']);
  }
}
