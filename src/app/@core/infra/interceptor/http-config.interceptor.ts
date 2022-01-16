import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor
{
  private refreshTokenInProgress = false;

  constructor(public authenticateService: AuthService)
  {
  }

  private getAuthRequest(req: HttpRequest<any>): HttpRequest<any>
  {
    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.authenticateService.getTocken()
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    request = this.getAuthRequest(request);
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) =>
    {
      // if (error.status === 403 || error.status === 401)
      // {
      //   if (!error.url?.toLowerCase().includes('login'))
      //   {
      //     return this.refreshTokenAndReload(request, next);
      //   }
      // }
      return next.handle(request);
    }));
  }

  // private refreshTokenAndReload(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  // {
  //   return this.authenticateService.refreshToken().pipe(
  //     switchMap(source =>
  //     {
  //       request = this.getAuthRequest(request);
  //       return next.handle(request);
  //     })
  //   );
  // }


}
