import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad
{
  constructor(private authService: AuthService, private router: Router)
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
    return true;
    if (this.authService.isLoggedIn())
    {
      return true;
    }

    this.authService.startAuthentication();
    return false;
  }

}
