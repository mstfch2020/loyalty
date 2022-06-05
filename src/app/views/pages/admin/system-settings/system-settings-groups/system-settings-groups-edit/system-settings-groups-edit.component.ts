import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { groupModelInit } from 'src/app/@core/data/loyalty/group.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { GroupService } from 'src/app/@core/services/loyalty/group.service';

@Component({
  selector: 'app-system-settings-groups-edit',
  templateUrl: './system-settings-groups-edit.component.html',
  styleUrls: ['./system-settings-groups-edit.component.scss']
})
export class SystemSettingsGroupsEditComponent implements OnInit
{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    public service: GroupService,
    public baseInfoService: BaseInfoService)
  {

    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      this.updateFromServer(id);
    });

    this.route.params.subscribe(params =>
    {
      const id = params['id'];
      this.updateFromServer(id);
    });
  }

  private updateFromServer(id: any)
  {
    if (id)
    {
      this.service.GetGroupSettingByBrandId(id).subscribe((value) =>
      {
        this.baseInfoService.loadBaseInfo(() =>
        {
          if (!value)
          {
            value = groupModelInit;
          }
          this.service.createForm(value);
        });
      });
    }
    else
    {
      this.baseInfoService.loadBaseInfo(() => { this.service.createForm(groupModelInit); });
    }
  }

  ngOnDestroy(): void
  {
    this.elementRef.nativeElement.remove();
  }

  ngOnInit(): void
  {
    this.service.form.markAllAsTouched();
  }

  get isDisabled(): boolean
  {
    return this.service.isDisabled;
  };


  backToList()
  {
    this.router.navigate(['/admin/main/settings/groups/list']);
  }


}
