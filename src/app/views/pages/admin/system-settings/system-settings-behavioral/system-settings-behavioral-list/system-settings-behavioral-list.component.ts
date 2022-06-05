import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/@core/services/loyalty/activity.service';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';


@Component({
  selector: 'app-system-settings-behavioral-list',
  templateUrl: './system-settings-behavioral-list.component.html',
  styleUrls: ['./system-settings-behavioral-list.component.scss']
})
export class SystemSettingsBehavioralListComponent extends BaseSearch implements OnInit
{
  theViewList = new Array<any>();

  constructor(
    private router: Router,
    public service: ActivityService,
    public override baseInfoService: BaseInfoService,
    // private authService: AuthService, /*private oidcSecurityService: OidcSecurityService*/
  )
  {
    super(baseInfoService);
    service.activitys$.subscribe(value =>
    {
      this.theViewList = value;
    });
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
  }


  override search(request: any)
  {
    request.pageSize = 20;
    this.service.GetActivitiesGrid(request);
  }

  goToEdit(id: string = '')
  {
    if (id)
    {
      this.router.navigate(['admin/main/settings/behavioral/edit', id]);
      return;
    }
    this.router.navigate(['admin/main/settings/behavioral/edit']);
  }
}
