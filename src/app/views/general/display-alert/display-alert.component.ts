import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/@core/services/ui/alert.service';


@Component({
  selector: 'app-display-alert',
  templateUrl: './display-alert.component.html',
  styleUrls: ['./display-alert.component.scss']
})
export class DisplayAlertComponent implements OnInit {


  constructor(public alertService: AlertService) {
  }

  ngOnInit() {
  }

  public clearErrorMessage(): void {

    this.alertService.clearErrorMessages();
  }

  public clearWarningMessage(): void {

    this.alertService.clearWarningMessages();
  }

  public clearInfoMessage(): void {

    this.alertService.clearInfoMessages();
  }

  public clearSuccessMessage(): void {

    this.alertService.clearSuccessMessages();
  }

}
