import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { CampaignService } from "src/app/@core/services/loyalty/campaign.service";
import { BaseSearch } from 'src/app/@core/services/ui/base-search.components';

@Component({
  selector: 'app-customer-group-temporary-list',
  templateUrl: './customer-group-temporary-list.component.html',
  styleUrls: ['./customer-group-temporary-list.component.scss']
})
export class CustomerGroupTemporaryListComponent extends BaseSearch implements OnInit
{

  public theViewList = new Array<any>();

  constructor(private router: Router,
    public service: CampaignService,
    public override baseInfoService: BaseInfoService)
  {
    super(baseInfoService);
  }

  override ngOnInit(): void
  {
    super.ngOnInit();
    this.service.Campaigns$.subscribe(value => this.theViewList = value);
  }

  override search(request: any)
  {
    request.pageSize = 20;
    this.service.getCampaign(request);
  }

  goToEdit(id: string)
  {
    if (id)
    {
      this.router.navigate(['/admin/main/customergrouptemporary/edit'], { queryParams: { id: id } });
      return;
    }
    this.router.navigate(['/admin/main/customergrouptemporary/edit']);
  }

  deleteItem($event: Event, id: string): void
  {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
