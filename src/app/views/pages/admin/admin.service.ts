import { Injectable } from '@angular/core';
import { User } from 'src/app/@core/data/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService
{

  public currentUser: User;

  constructor()
  {
    this.currentUser = new User();
  }

}
