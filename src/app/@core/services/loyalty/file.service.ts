import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { callPostService } from "./BaseService";

@Injectable({ providedIn: 'root' })
export class FileService
{
  constructor(
    public http: HttpClient,
    public settingService: SettingsService,
    public uiService: UiService)
  {
  }

  fileUpload(files: FormData): Observable<any>
  {
    const url = this.settingService.settings?.baseUrl + `File/Upload`;
    return callPostService<any>(url, this.http, this.uiService, files);
  }
}
