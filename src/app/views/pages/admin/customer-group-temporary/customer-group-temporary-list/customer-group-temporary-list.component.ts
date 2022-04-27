import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CampaignService } from "src/app/@core/services/loyalty/campaign.service";

@Component({
  selector: 'app-customer-group-temporary-list',
  templateUrl: './customer-group-temporary-list.component.html',
  styleUrls: ['./customer-group-temporary-list.component.scss']
})
export class CustomerGroupTemporaryListComponent implements OnInit
{

  public theViewList = new Array<any>();
  pageIndex = 1;
  pageSize = 40;

  constructor(private router: Router, public campaignService: CampaignService) { }

  ngOnInit(): void
  {
    this.campaignService.Campaigns$.subscribe(value => this.theViewList = value);
    this.campaignService.getCampaign({ pageSize: this.pageSize, pageIndex: this.pageIndex });
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

  selectedPageIndex(event: number) {
    this.pageIndex = event;
    this.campaignService.getCampaign({ pageSize: this.pageSize, pageIndex: this.pageIndex });
  }

}
