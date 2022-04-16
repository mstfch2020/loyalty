import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent implements OnInit {


  constructor(private router: Router,private BaseInfoService: BaseInfoService) {

  }

  ngOnInit(): void {
    // this.BaseInfoService.loadBaseInfo(() => { });
  }

}
