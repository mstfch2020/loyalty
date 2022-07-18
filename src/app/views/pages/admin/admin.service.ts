import { Injectable } from '@angular/core';
import { BackOfficeUser } from 'src/app/@core/data/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService
{

  public currentUser: BackOfficeUser;

  constructor()
  {
    this.currentUser = new BackOfficeUser();
  }

}
