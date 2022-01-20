import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-group-temporary-campaign',
  templateUrl: './customer-group-temporary-campaign.component.html',
  styleUrls: ['./customer-group-temporary-campaign.component.scss']
})
export class CustomerGroupTemporaryCampaignComponent implements OnInit {

  selectedCar = 1;

  cars = [
    { id: 1, name: 'زینجا' },
    { id: 2, name: 'مون' },
    { id: 3, name: 'قهر کرده' },
    { id: 4, name: '09192935850' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
