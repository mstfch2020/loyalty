import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { PromoterDiscountSetting } from "src/app/@core/data/loyalty/promoter-discount-setting.model";
import { Utility } from 'src/app/@core/utils/Utility';
import { CommentModel, NewsGrid, NewsModel, newsModelInit } from "../../data/loyalty/news.model";
import { SettingsService } from "../settings-service";
import { UiService } from "../ui/ui.service";
import { BaseInfoService } from "./base-info.service";
import { BaseService, callGetService, callPostPagingService, callPostService } from "./BaseService";
import { FileService } from "./file.service";

@Injectable({
  providedIn: 'root'
})
export class NewsService extends BaseService<NewsModel>{

  news$ = new BehaviorSubject<Array<NewsGrid>>([]);
  comments$ = new BehaviorSubject<Array<CommentModel>>([]);
  selectedFiles = new Array();
  selFiles: FileList | null = null;
  formData = new FormData();

  constructor(
    public override formBuilder: FormBuilder,
    public override baseInfoService: BaseInfoService,
    public fileService: FileService,
    public http: HttpClient,
    public settingService: SettingsService,
    public override uiService: UiService)
  {
    super(formBuilder, uiService, baseInfoService, newsModelInit);
  }

  createForm(group: NewsModel)
  {
    this.form = this.formBuilder.group({
      id: [group.id, [Validators.required]],
      title: [group.title, [Validators.required]],
      imageId: [group.imageId, [Validators.required]],
      imageName: [group.imageName, [Validators.required]],
      text: [group.text, [Validators.required]],
      commentable: [group.commentable ?? false, [Validators.required]],

    });
  }

  GetNewsGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'News/GetNewsGrid';

    return callPostPagingService<Array<NewsGrid>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.news$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.news$.next(value?.data);
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      } else
      {
        this.totalPages = 9999;
        this.news$.next(this.loadMockNews(request.pageIndex));
      }
    });
  }

  GetCommentsGrid(request: any)
  {
    const url = this.settingService.settings?.baseUrl + 'News/GetNewsGrid';

    return callPostPagingService<Array<CommentModel>>(url, this.http, this.uiService, request).subscribe(value =>
    {
      this.comments$.next([]);
      this.totalPages = 0;
      if (value?.data)
      {
        this.comments$.next(value?.data);
        this.totalPages = Math.ceil(value.pagination.total / request.pageSize);
      } else
      {
        this.totalPages = 9999;
        this.comments$.next(this.loadMockComments(request.pageIndex));
      }
    });
  }

  loadMockNews(index: number): NewsGrid[]
  {
    const list = new Array<NewsGrid>();
    for (let i = index; i < index + 10; i++)
    {
      list.push({ commentsCount: i * 10, date: '1400/09/01', state: 'پیش نویس', title: 'مسابقه ویژه ' + i, id: i + 'news' } as NewsGrid);
    }
    return list;
  }

  loadMockComments(index: number): CommentModel[]
  {
    const list = new Array<CommentModel>();
    for (let i = index; i < index + 10; i++)
    {
      list.push({
        answer: 'sdfsf' + i, id: 'comment' + i,
        comment: 'sdfsfsfsdfsdfklsj;lfjs;lfkj;slsdj;fljf;lfj;aslkfj;aslfkj;asfklj;salfkj;salfkj;aslfkj;aslfkj;aslfkj;lflfj;alsfkj;aslfkj;lf;jalfkj;alskf;slakfj;alsfkj;aslkfj;aslfj;lasfkj;alfkjcommentsdfsfsfsdfsdfklsj;lfjs;lfkj;slsdj;fljf;lfj;aslkfj;aslfkj;asfklj;salfkj;salfkj;aslfkj;aslfkj;aslfkj;lflfj;alsfkj;aslfkj;lf;jalfkj;alskf;slakfj;alsfkj;aslkfj;aslfj;lasfkj;alfkjcommentsdfsfsfsdfsdfklsj;lfjs;lfkj;slsdj;fljf;lfj;aslkfj;aslfkj;asfklj;salfkj;salfkj;aslfkj;aslfkj;aslfkj;lflfj;alsfkj;aslfkj;lf;jalfkj;alskf;slakfj;alsfkj;aslkfj;aslfj;lasfkj;alfkjcomment' + i,
        date: "1400/09/05", editable: false, name: 'name' + i, selected: false, showAnswer: false, userType: 'user'
      } as CommentModel);
    }
    return list;
  }

  GetNewsById(id: string)
  {
    const url = this.settingService.settings?.baseUrl + 'News/GetNewsById';
    return callGetService<NewsModel>(url, this.http, this.uiService, {
      id: id
    });
  }

  submit(): void
  {
    console.log(this.form.value);
    this.uiService.alertService.clearAllMessages();
    const option = Utility.isNullOrEmpty(this.getValue('id')) ? 'CreateNews' : 'EditNews';
    const url = this.settingService.settings?.baseUrl + `News/${ option }`;

    const value: NewsModel = this.form.value as NewsModel;

    let errorMessage = '';

    if (!value.title)
    {
      errorMessage += 'عنوان رویداد را وارد نمایید ';
    }

    if (!value.imageId)
    {
      errorMessage += 'تصویر رویداد را وارد نمایید ';
    }

    if (!value.text)
    {
      errorMessage += 'متن رویداد را وارد نمایید ';
    }

    if (errorMessage)
    {
      this.uiService.alert(errorMessage);
      return;
    }

    callPostService<PromoterDiscountSetting>(url, this.http, this.uiService, value).subscribe(value =>
    {
      if (value)
      {
        this.uiService.success('با موفقیت ثبت شد.');
      }
      setTimeout(() => { this.uiService.alertService.clearAllMessages(); }, 3000);
    });

  }


  fileUpload(formData: FormData, formControlName: string)
  {
    this.fileService.fileUpload(formData).subscribe(value =>
    {
      this.setValue(formControlName, value.fileId.id);
      this.uiService.success('فایل با موفقیت بارگزاری شد.');
    });
  }

  fileSelectionChanged(event: any, formControlName: string)
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

      this.fileUpload(this.formData, formControlName);
    }
  }

}
