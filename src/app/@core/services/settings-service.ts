import { Injectable } from '@angular/core';
import { Settings } from '../data/root/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService
{
  settings: Settings | null = null;
}
