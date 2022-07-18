import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, Subject, takeUntil } from "rxjs";
import { Contract } from "../../data/loyalty/contract/Contract";
import { IdTitle } from "../../data/loyalty/get-senarios-grid.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { callGetService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class ContractBaseInfoService
{

  private unsubscribe = new Subject<void>();
  constructor(
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {

  }

  provinces$ = new BehaviorSubject<Array<IdTitle>>([]);
  cities$ = new BehaviorSubject<Array<IdTitle>>([]);
  arias$ = new BehaviorSubject<Array<IdTitle>>([]);
  educationLevel$ = new BehaviorSubject<Array<IdTitle>>([]);
  activitySections$ = new BehaviorSubject<Array<IdTitle>>([]);

  schoolTypeList = [
    { id: 1, title: 'دولتی' },
    { id: 1, title: 'پولی' },

  ];

  loadBaseInfoData(request?: Contract)
  {
    const requests: any = {
      provinces: this.GetStats(),
      cities: this.GetCitiesByStateId(request?.stateId),
      arias: this.GetAreasByCityId(request?.cityId),
      educationLevel: this.GetEducationLevel(),
      activitySections: this.GetActivitySections()
    };

    forkJoin(requests).pipe(takeUntil(this.unsubscribe)).subscribe(result =>
    {
      const resultValue = result as any;
      this.provinces$.next(resultValue?.provinces === null ? [] : resultValue?.provinces);
      this.cities$.next(resultValue?.cities === null ? [] : resultValue?.cities);
      this.arias$.next(resultValue?.arias === null ? [] : resultValue?.arias);
      this.educationLevel$.next(resultValue?.educationLevel === null ? [] : resultValue?.educationLevel);
      this.activitySections$.next(resultValue?.activitySections === null ? [] : resultValue?.activitySections);
    });

  }

  loadAreas(value: string)
  {
    this.GetAreasByCityId(value).subscribe(areas => this.arias$.next(areas));
  }

  loadCities(value: string)
  {
    this.GetCitiesByStateId(value).subscribe(cities => this.cities$.next(cities));
  }

  GetStats()
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetStats';
    return callGetService<any>(url, this.http, this.uiService);
  }



  GetCitiesByStateId(StateId?: string)
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetCitiesByStateId';
    if (StateId)
    {
      return callGetService<any>(url, this.http, this.uiService, { StateId: StateId });
    } else
    {
      return callGetService<any>(url, this.http, this.uiService);
    }
  }

  GetAreasByCityId(cityId?: string)
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetAreasByCityId';
    if (cityId)
    {
      return callGetService<any>(url, this.http, this.uiService, { cityId: cityId });
    } else
    {
      return callGetService<any>(url, this.http, this.uiService);
    }
  }

  GetEducationLevel()
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetEducationLevel';
    return callGetService<any>(url, this.http, this.uiService);
  }

  GetGradesByLevelId(educationId: any)
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetGradesByLevelId';
    if (educationId)
    {
      return callGetService<any>(url, this.http, this.uiService, { educationLevelId: educationId });
    } else
    {
      return callGetService<any>(url, this.http, this.uiService);
    }
  }

  GetLessonsByGradeId(gradeId: any)
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetLessonsByGradeId';
    if (gradeId)
    {
      return callGetService<any>(url, this.http, this.uiService, { gradeId: gradeId });
    } else
    {
      return callGetService<any>(url, this.http, this.uiService);
    }
  }

  GetActivitySections()
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetActivitySections';
    return callGetService<any>(url, this.http, this.uiService);
  }
}
