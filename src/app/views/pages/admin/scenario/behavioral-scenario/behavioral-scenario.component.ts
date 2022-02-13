import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ScenarioService } from 'src/app/@core/services/loyalty/scenario.service';

@Component({
  selector: 'app-behavioral-scenario',
  templateUrl: './behavioral-scenario.component.html',
  styleUrls: ['./behavioral-scenario.component.scss']
})
export class BehavioralScenarioComponent implements OnInit
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


  constructor(private modalService: NgbModal, private baseInfoService: BaseInfoService, public scenarioService: ScenarioService)
  {

  }

  ngOnInit(): void
  {
    this.scenarioService.form.markAllAsTouched();

    const requests = {
      activity: this.baseInfoService.getActivity(),
      brands: this.baseInfoService.getBrands(),
      userTypes: this.baseInfoService.getUserTypes(),
      customerGroups: this.baseInfoService.getCustomerGroups()
    };

    forkJoin(requests).subscribe(resutl =>
    {
      const resultValue = resutl as any;
      console.log(resultValue.activity);
      console.log(resultValue.brands);
    });
  }

  submit()
  {
    console.log(this.scenarioService.form.value);
  }

}
