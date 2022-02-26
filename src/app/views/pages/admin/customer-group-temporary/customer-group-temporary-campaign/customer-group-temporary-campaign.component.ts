import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/@core/services/loyalty/campaign.service';

@Component({
  selector: 'app-customer-group-temporary-campaign',
  templateUrl: './customer-group-temporary-campaign.component.html',
  styleUrls: ['./customer-group-temporary-campaign.component.scss']
})
export class CustomerGroupTemporaryCampaignComponent implements OnInit
{

  selectedCar = 1;

  cars = [
    { id: 1, name: 'زینجا' },
    { id: 2, name: 'مون' },
    { id: 3, name: 'قهر کرده' },
    { id: 4, name: '09192935850' },
  ];

  config: any = {
    date: {
      value: new Date().valueOf(),
      onSelect: (shamsiDate: string, gregorianDate: string, timestamp: number) =>
      {
        console.log(shamsiDate, gregorianDate, timestamp);
      }
    },
    ui: {
      theme: 'default',
      isVisible: false,
      hideAfterSelectDate: true,
      hideOnOutsideClick: true,
      yearView: true,
      monthView: true,
    },
    time: {
      enable: false,
      showSecond: false,
      meridian: false
    }
  };

  selectedFiles = new Array();
  selFiles: FileList | null = null;
  formData = new FormData();

  constructor(private router: Router, public campaignService: CampaignService) { }

  ngOnInit(): void
  {
  }

  backToList()
  {
    this.router.navigate(['/admin/main/customergrouptemporary']);
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

      this.campaignService.fileUpload(this.formData);
    }
  }
}
