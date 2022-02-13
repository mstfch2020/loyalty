import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseResponse } from "../../data/root/base-response.model";
import { UiService } from "../ui/ui.service";


export function callService<T>(url: string, http: HttpClient, uiService: UiService): Observable<T>
{
  return http.get<BaseResponse<T>>(url).pipe(map(value =>
  {
    if (value.meta.code !== 200 || value.meta.errorMessage)
    {
      uiService.showSnackBar(value.meta.errorMessage, '', 3000);
      return ({} as T);
    }
    return (value.data);
  }), catchError(err =>
  {
    console.log(err);
    const res = <BaseResponse<any>>err.error;
    if (res?.meta?.errorMessage)
    {
      uiService.showSnackBar(res?.meta?.errorMessage, '', 3000);
    }
    return of(({} as T));
  }));
}


// @Injectable({ providedIn: 'root' })
// export class BaseService<T> {
//   constructor(
//     public http: HttpClient,
//     public uiService: UiService) { }

//   callService(url: string): Observable<T>
//   {
//     return this.http.get<BaseResponse<T>>(url).pipe(map(value =>
//     {
//       if (value.meta.code !== 200 || value.meta.errorMessage)
//       {
//         this.uiService.showSnackBar(value.meta.errorMessage, '', 3000);
//         return ({} as T);
//       }
//       return (value.data);
//     }), catchError(err =>
//     {
//       console.log(err);
//       const res = <BaseResponse<any>>err.error;
//       if (res?.meta?.errorMessage)
//       {
//         this.uiService.showSnackBar(res?.meta?.errorMessage, '', 3000);
//       }
//       return of(({} as T));
//     }));
//   }
// }
