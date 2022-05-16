import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { activityInit } from 'src/app/@core/data/loyalty/activity.model';
import { ActivityService } from 'src/app/@core/services/loyalty/activity.service';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';

@Component({
  selector: 'app-system-settings-behavioral-edit',
  templateUrl: './system-settings-behavioral-edit.component.html',
  styleUrls: ['./system-settings-behavioral-edit.component.scss']
})
export class SystemSettingsBehavioralEditComponent implements OnInit, OnDestroy
{

  constructor(private router: Router, public service: ActivityService, private route: ActivatedRoute, private baseInfoService: BaseInfoService, private elementRef: ElementRef)
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
      this.service.getActivityById(id).subscribe((value) =>
      {
        this.baseInfoService.loadBaseInfo(() =>
        {
          if (!value)
          {
            value = activityInit;
          }
          this.service.createForm(value);
        });
      });
    }
    else
    {
      this.baseInfoService.loadBaseInfo(() => { this.service.createForm(activityInit); });
    }
  }

  ngOnDestroy(): void
  {
    this.elementRef.nativeElement.remove();
  }

  get isDisabled(): boolean
  {
    return this.service.isDisabled;
  };

  ngOnInit(): void
  {
  }

  backToList()
  {
    this.router.navigate(['/admin/main/settings/behavioral/list']);
  }
}
