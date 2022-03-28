import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from './alert.service';


@Injectable()
export class UiService
{
  constructor(private snackbar: MatSnackBar, private translateService: TranslateService, public alertService: AlertService)
  {
  }

  alert(message: string): void
  {
    this.alertService.error(message);
  }

  success(message: string): void
  {
    this.alertService.success(message);
  }

  showSnackBar(message: string, action: string, duration: number, horizontalPosition: MatSnackBarHorizontalPosition = 'center', verticalPosition: MatSnackBarVerticalPosition = 'bottom'): void
  {
    this.snackbar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    });
  }

  showSnackBarTranslateMessage(message: string, action: string, duration: number, horizontalPosition: MatSnackBarHorizontalPosition = 'center', verticalPosition: MatSnackBarVerticalPosition = 'bottom'): void
  {
    this.translateService.get(message).subscribe(value =>
      this.snackbar.open(value, action, {
        duration: duration,
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition
      })
    );

  }


}
