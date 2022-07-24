import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from '../data/root/settings';
import { SettingsService } from './settings-service';

@Injectable({
  providedIn: 'root',
})
export class SettingsInitializerService
{
  constructor(private http: HttpClient, private settings: SettingsService)
  {
  }

  initializeSettings(): Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
      this.http.get('assets/settings.json').subscribe({
        next: (response) =>
        {
          this.settings.settings = response as Settings;
          console.log(this.settings.settings);
          // GlobalData.API_URL = this.settings.settings.baseUrl;
          resolve(response);
        },
        error: (error) =>
        {
          reject(error);
          console.log(error);
        }
      });
    });
  }
}
