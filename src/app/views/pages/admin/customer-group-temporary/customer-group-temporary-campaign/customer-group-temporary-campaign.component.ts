import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { campaignInit } from 'src/app/@core/data/loyalty/campaign.model';
import { CampaignService } from 'src/app/@core/services/loyalty/campaign.service';

@Component({
  selector: 'app-customer-group-temporary-campaign',
  templateUrl: './customer-group-temporary-campaign.component.html',
  styleUrls: ['./customer-group-temporary-campaign.component.scss']
})
export class CustomerGroupTemporaryCampaignComponent implements OnInit
{
  selectedFiles = new Array();
  selFiles: FileList | null = null;
  formData = new FormData();

  constructor(private router: Router, public service: CampaignService, private route: ActivatedRoute)
  {


  }

  ngOnInit(): void
  {
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      if (id)
      {
        this.service.getCampaignById(id).subscribe((value) =>
        {
          if (!value) { value = campaignInit; }
          this.service.createForm(value);
        });
      } else
      {
        this.service.createForm(campaignInit);

      }
    });
  }

  backToList()
  {
    this.router.navigate(['/admin/main/customer-group-temporary']);
  }

  fileSelectionChanged(event: any)
  {
    this.selectedFiles = new Array();

    const element = event.currentTarget as HTMLInputElement;
    this.selFiles = element.files;

    let fileList: FileList | null = element.files;
    if (fileList)
    {
      for (let itm in fileList)
      {
        let item: File = fileList[itm];
        if ((itm.match(/\d+/g) != null) && (!this.selectedFiles.includes(item['name'])))
          this.selectedFiles.push(item['name']);
      }
    }

    this.formData = new FormData();

    if (this.selectedFiles.length && this.selFiles && this.selFiles.length > 0)
    {
      for (let i = 0; i < this.selectedFiles.length; i++)
      {
        if (!this.selFiles[i]) { continue; }
        this.formData.append('files', this.selFiles[i],
          this.selFiles[i].name);
      }

      this.service.fileUpload(this.formData);
    }
  }
}
