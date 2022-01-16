import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Order, OrderDetails } from '../../data/mall/order.model';
import { BaseResponse, BaseResult } from '../../data/root/base-response.model';
import { RootStoreService } from '../root-store.service';
import { SettingsService } from '../settings-service';
import { UiService } from "../ui/ui.service";

@Injectable({ providedIn: 'root' })
export class OrderService
{
  CreateNewOrder(newData: any)
  {
    return of({} as BaseResponse<any>);
  }
  UpdateOrder(newData: any)
  {
    return of({} as BaseResponse<any>);
  }
  RemoveOrder(newData: any)
  {
    return of({} as BaseResponse<any>);
  }
  constructor(
    private router: Router,
    private rootStoreService: RootStoreService,
    private http: HttpClient,
    private settingService: SettingsService,
    private uiService: UiService) { }

  loadOrders(): Observable<BaseResponse<Array<Order>> | null>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/GetOrders';
    return this.http.post<BaseResponse<Array<Order>>>(url, null).pipe(finalize(() =>
    {
      this.rootStoreService.removeLoadingRequest();
    }));
  }

  loadOrdersAndCast(pageSize: number, pageIndex: number): Observable<BaseResponse<BaseResult<Order>>>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/GetOrders';

    return this.http.post<BaseResponse<BaseResult<Order>>>(url, { take: pageSize, skip: pageSize * pageIndex })
      .pipe(map(value =>
      {
        if (!value.isSuccess)
        {
          this.uiService.showSnackBar(value.errorMessage, '', 3000);
          return (value);
        }
        return (value);
      }), catchError(err =>
      {
        const res = <BaseResponse<any>>err.error;
        this.uiService.showSnackBar(res.errorMessage, '', 3000);
        console.log(res);
        return of(res);
      }));
  }

  getOrdersDetails(pageSize: number, pageIndex: number, orderId: number): Observable<BaseResponse<OrderDetails>>
  {
    this.rootStoreService.addLoadingRequest();
    const url = this.settingService.settings?.baseUrl + 'Mall/GetOrderDetails';

    return this.http.post<BaseResponse<OrderDetails>>(url,
      { take: pageSize, skip: pageSize * pageIndex, OrderID: orderId })
      .pipe(map(value =>
      {
        if (!value.isSuccess)
        {
          this.uiService.showSnackBar(value.errorMessage, '', 3000);
          return (value);
        }
        return (value);
      }), catchError(err =>
      {
        const res = <BaseResponse<any>>err.error;
        this.uiService.showSnackBar(res.errorMessage, '', 3000);
        console.log(res);
        return of(res);
      }));
  }


}
