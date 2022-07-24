import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Settings } from '../data/root/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService
{
  settings: Settings = { baseUrl: environment.baseUrl, password: environment.password, siteUrl: environment.siteUrl, userName: environment.userName };
}
