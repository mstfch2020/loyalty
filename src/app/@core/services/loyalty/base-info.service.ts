import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Activity } from "../../data/loyalty/activity.model";
import { CustomerGroup } from "../../data/loyalty/customer-group.model";
import { FreeProduct } from "../../data/loyalty/free-product.model";
import { ProductGroup } from "../../data/loyalty/product-group.model";
import { Product } from "../../data/loyalty/product.model";
import { UserType } from "../../data/loyalty/user-type.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { callService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class BaseInfoService
{



  constructor(
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
  }

  getActivity(): Observable<Array<Activity>>
  {
    const url = this.settingService.settings?.baseUrl + 'Activity/GetAllActivitys';
    return callService<Array<Activity>>(url, this.http, this.uiService);
  }

  getBrands(): Observable<Array<Activity>>
  {
    const url = this.settingService.settings?.baseUrl + 'Brand/GetAllBrands';
    return callService<Array<Activity>>(url, this.http, this.uiService);
  }

  getUserTypes(): Observable<Array<UserType>>
  {
    const url = this.settingService.settings?.baseUrl + 'UserType/GetUserTypes';
    return callService<Array<UserType>>(url, this.http, this.uiService);
  }

  getCustomerGroups(): Observable<Array<CustomerGroup>>
  {
    const url = this.settingService.settings?.baseUrl + 'CustomerGroup/GetAllCustomerGroups';
    return callService<Array<CustomerGroup>>(url, this.http, this.uiService);
  }

  getProductGroupsByBrandIds(brandIds: Array<string>): Observable<Array<ProductGroup>>
  {
    const url = this.settingService.settings?.baseUrl + 'ProductGroup/GetProductGroupsByBrandIds';
    return callService<Array<ProductGroup>>(url, this.http, this.uiService, { brandIds: brandIds });
  }

  getFreeProducts(productIds: string[]): Observable<Array<FreeProduct>>
  {
    const url = this.settingService.settings?.baseUrl + 'Product/GetFreeProducts';

    return callService<Array<FreeProduct>>(url, this.http, this.uiService, {
      productIds: productIds
    });
  }

  getProducts(): Observable<Array<Product>>
  {
    const url = this.settingService.settings?.baseUrl + 'Product/GetAllProducts';
    return callService<Array<Product>>(url, this.http, this.uiService);
  }
}
