import {Injectable} from '@angular/core';
import { ThemeMode } from '../../data/Enums/theme-mode';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public headerMode: ThemeMode;
  public asideMode: ThemeMode;
  public bgColor: string;

  constructor() {
    this.headerMode = ThemeMode.Light;
    this.asideMode = ThemeMode.Dark;
    this.bgColor = 'bg-info';
  }
}
