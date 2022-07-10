import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/@core/data/auth/user.model';
import { BaseResponse } from 'src/app/@core/data/root/base-response.model';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { AlertService } from 'src/app/@core/services/ui/alert.service';
import { Utility } from 'src/app/@core/utils/Utility';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{

  public loginForm!: FormGroup;
  public user: User;
  public returnUrl: string;
  public result: BaseResponse<User>;
  public loading: boolean;

  public blockUsernames = ['2020', '123'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AuthService,
    private alertService: AlertService,
    private renderer: Renderer2
  )
  {

    this.returnUrl = '';
    this.loading = false;
    this.result = new BaseResponse<User>();
    this.user = new User();
    this.renderer.addClass(document.body, 'login');
  }

  ngOnInit()
  {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, this.blockUsername.bind(this)]),
      password: new FormControl(null, Validators.required)
    });
  }

  /**
   * Login in panel
   */
  public onSubmit(): void
  {
    console.log(this.accountService.userName);
    console.log(this.accountService.idToken);
    console.log(this.accountService.accessToken);
    console.log(this.accountService);
    console.log('login');
    this.accountService.refresh();
  }

  /**
   * Restrict number
   * @param event
   */
  public checkDigit(event: any): boolean
  {
    return Utility.CheckDigit(event);
  }

  /**
   * Custom validator for username
   * @param control
   */
  public blockUsername(control: FormControl): { [s: string]: boolean; } | null
  {
    if (this.blockUsernames.indexOf(control.value) > -1)
    {
      return { nameIsBlocked: true };
    }
    return null;
  }
}
