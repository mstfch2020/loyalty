import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit
{
  constructor(private authService: AuthService) { }

  ngOnInit()
  {
    alert('register');
    this.authService.completeSignout();
  }
}
