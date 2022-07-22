import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, map, Observable, Subject, takeUntil } from "rxjs";
import { Contract } from "../../data/loyalty/contract/Contract";
import { IdTitle } from "../../data/loyalty/get-senarios-grid.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { callGetService, callPostService } from "./BaseService";

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
  areas$ = new BehaviorSubject<Array<IdTitle>>([]);
  educationLevel$ = new BehaviorSubject<Array<IdTitle>>([]);
  grades$ = new BehaviorSubject<Array<IdTitle>>([]);
  lessons$ = new BehaviorSubject<Array<IdTitle>>([]);
  activityZone$ = new BehaviorSubject<Array<IdTitle>>([]);
  distributorActivitySections$ = new BehaviorSubject<Array<IdTitle>>([]);
  shopActivitySections$ = new BehaviorSubject<Array<IdTitle>>([]);
  allCities$ = new BehaviorSubject<Array<IdTitle>>([]);
  schoolTypeList = [
    { id: 1, title: 'دولتی' },
    { id: 2, title: 'پولی' },

  ];

  loadBaseInfoData(request?: Contract)
  {
    const requests: any = {
      provinces: this.GetStats(),
      cities: this.GetCitiesByStateId(request?.stateId),
      arias: this.GetAreasByCityId(request?.cityId),
      educationLevel: this.GetEducationLevel(),
      activityZone: this.GetActivityZone(),
      distributorActivitySections: this.GetDistributorActivitySections(),
      shopActivitySections: this.GetShopActivitySections(),
      grades: this.GetGradesByLevelId(null),
      lessons: this.GetLessonsByGradeId(null),
      allCities: this.GetAllCities()
    };

    forkJoin(requests).pipe(takeUntil(this.unsubscribe)).subscribe(result =>
    {
      const resultValue = result as any;
      this.provinces$.next(resultValue?.provinces === null ? [] : resultValue?.provinces);
      this.cities$.next(resultValue?.cities === null ? [] : resultValue?.cities);
      this.areas$.next(resultValue?.arias === null ? [] : resultValue?.arias);
      this.educationLevel$.next(resultValue?.educationLevel === null ? [] : resultValue?.educationLevel);
      this.grades$.next(resultValue?.grades === null ? [] : resultValue?.grades);
      this.lessons$.next(resultValue?.lessons === null ? [] : resultValue?.lessons);
      this.activityZone$.next(resultValue?.activityZone === null ? [] : resultValue?.activityZone);
      this.distributorActivitySections$.next(resultValue?.distributorActivitySections === null ? [] : resultValue?.distributorActivitySections);
      this.shopActivitySections$.next(resultValue?.shopActivitySections === null ? [] : resultValue?.shopActivitySections);
      this.allCities$.next(resultValue?.allCities === null ? [] : resultValue?.allCities);
    });

  }

  loadAreas(value: string)
  {
    this.GetAreasByCityId(value).subscribe(areas => this.areas$.next(areas));
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
    if (cityId && false)
    {
      const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetAreasByCityId';
      return callGetService<any>(url, this.http, this.uiService, { cityId: cityId });
    } else
    {
      const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetAreas';
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
    if (educationId && false)
    {
      const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetGradesByLevelId';
      return callGetService<any>(url, this.http, this.uiService, { educationLevelId: educationId });
    } else
    {
      const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetGrades';
      return callGetService<any>(url, this.http, this.uiService);
    }
  }

  GetLessonsByGradeId(gradeId: any)
  {
    if (gradeId && false)
    {
      const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetLessonsByGradeId';
      return callGetService<any>(url, this.http, this.uiService, { gradeId: gradeId });
    } else
    {
      const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetLessons';
      return callGetService<any>(url, this.http, this.uiService);
    }
  }

  GetActivityZone()
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetShopActivitySections';
    return callGetService<any>(url, this.http, this.uiService);
  }

  GetShopActivitySections()
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetShopActivitySections';
    return callGetService<any>(url, this.http, this.uiService);
  }

  GetDistributorActivitySections()
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetDistributorActivitySections';
    return callGetService<any>(url, this.http, this.uiService);
  }

  GetAllCities()
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/GetAllCities';
    return callGetService<any>(url, this.http, this.uiService);
  }

  CreateArea(name: string): Observable<string>
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/CreateArea';
    return callPostService<any>(url, this.http, this.uiService, { name: name }).pipe(map((value =>
    {
      if (value?.areaId)
      {
        return (value.areaId);
      }
      return (null);
    })));
  }

  CreateEducationLevel(name: string): Observable<string>
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/CreateEducationLevel';
    return callPostService<any>(url, this.http, this.uiService, { name: name }).pipe(map((value =>
    {
      if (value?.id)
      {
        return (value.id);
      }
      return (null);
    })));
  }

  CreateGrade(name: string): Observable<string>
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/CreateGrade';
    return callPostService<any>(url, this.http, this.uiService, { name: name }).pipe(map((value =>
    {
      if (value?.gradeId)
      {
        return (value.gradeId);
      }
      return (null);
    })));
  }

  CreateLesson(name: string): Observable<string>
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/CreateLesson';
    return callPostService<any>(url, this.http, this.uiService, { name: name }).pipe(map((value =>
    {
      if (value?.lessonId)
      {
        return (value.lessonId);
      }
      return (null);
    })));
  }

  CreateCity(name: string, stateId: string, crmId: string = '3fa85f64-5717-4562-b3fc-2c963f66afa6'): Observable<string>
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/CreateCity';
    return callPostService<any>(url, this.http, this.uiService, { name: name, crmId: crmId, stateId: stateId }).pipe(map((value =>
    {
      if (value?.id)
      {
        return (value.id);
      }
      return (null);
    })));
  }

  CreateState(name: string, crmId: string = '3fa85f64-5717-4562-b3fc-2c963f66afa6'): Observable<string>
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/CreateState';
    return callPostService<any>(url, this.http, this.uiService, { name: name, crmId: crmId }).pipe(map((value =>
    {
      if (value?.id)
      {
        return (value.id);
      }
      return (null);
    })));
  }

  CreateDistributorActivitySection(name: string): Observable<string>
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/CreateDistributorActivitySection';
    return callPostService<any>(url, this.http, this.uiService, { name: name }).pipe(map((value =>
    {
      if (value?.id)
      {
        return (value.id);
      }
      return (null);
    })));
  }

  CreateShopActivitySection(name: string): Observable<string>
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/CreateShopActivitySection';
    return callPostService<any>(url, this.http, this.uiService, { name: name }).pipe(map((value =>
    {
      if (value?.id)
      {
        return (value.id);
      }
      return (null);
    })));
  }

  CreateActivityZone(name: string): Observable<string>
  {
    const url = this.settingService.settings?.baseUrl + 'ContractBasciData/CreateShopActivitySection';
    return callPostService<any>(url, this.http, this.uiService, { name: name }).pipe(map((value =>
    {
      if (value?.id)
      {
        return (value.id);
      }
      return (null);
    })));
  }
}
