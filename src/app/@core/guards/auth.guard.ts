import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad
{
  constructor(private userService: AuthService, private router: Router)
  {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  {
    return this.checkAuth();
  }
  canLoad(route: Route, segments: UrlSegment[]):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  {
    return this.checkAuth();
  }

  private checkAuth()
  {
    debugger;

    if (this.userService.isLoggedIn())
    {
      return true;
    }

    this.userService.startAuthentication();
    return false;
  }
  // return this.userService.getIsAuth().pipe(map(value =>
  // {
  //   if (value) return value;
  //   return this.router.parseUrl('/account/login');
  // }));
}
