import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { RootStoreService } from './@core/services/root-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'loyalty';
  isLoading = false;

  constructor(public rootStoreService: RootStoreService, private config: NgSelectConfig)
  {

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
