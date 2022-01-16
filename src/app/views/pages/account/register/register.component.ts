import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/@core/data/auth/user.model';
import { BaseResponse } from 'src/app/@core/data/root/base-response.model';
import { AuthService } from 'src/app/@core/services/auth/auth.service';
import { AlertService } from 'src/app/@core/services/ui/alert.service';
import { Utility } from 'src/app/@core/utils/Utility';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit
{

  public registerForm!: FormGroup;
  public user: User;
  public returnUrl: string;
  public result: BaseResponse<User>;
  public loading: boolean;

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
    this.renderer.addClass(document.body, 'register');
  }

  ngOnInit()
  {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      family: new FormControl(null, Validators.required),
      nationalityCode: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      personType: new FormControl(null, Validators.required),
      unit: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  /**
   * Register users
   */
  public onSubmit(): void
  {
    this.alertService.clearAllMessages();

    if (this.registerForm.get('name')?.value === undefined ||
      this.registerForm.get('name')?.value === null ||
      this.registerForm.get('name')?.value === '')
    {
      this.alertService.error(`نام الزامی است!`);
      return;
    }

    if (this.registerForm.get('family')?.value === undefined ||
      this.registerForm.get('family')?.value === null ||
      this.registerForm.get('family')?.value === '')
    {
      this.alertService.error(`نام خانوادگی الزامی است!`);
      return;
    }

    if (this.registerForm.get('nationalityCode')?.value === undefined ||
      this.registerForm.get('nationalityCode')?.value === null ||
      this.registerForm.get('nationalityCode')?.value === '')
    {
      this.alertService.error(`شماره ملی الزامی است!`);
      return;
    }

    // if(this.registerForm.get('username')?.value===undefined ||
    //   this.registerForm.get('username')?.value===null ||
    //   this.registerForm.get('username')?.value===''){
    //   this.alertService.error(`نام کاربری الزامی است!`);
    //   return;
    // }

    // if(this.registerForm.get('password')?.value===undefined ||
    //   this.registerForm.get('password')?.value===null ||
    //   this.registerForm.get('password')?.value===''){
    //   this.alertService.error(`کلمه کاربری الزامی است!`);
    //   return;
    // }

    this.loading = true;
    this.accountService.register(
      this.registerForm.get('name')?.value,
      this.registerForm.get('family')?.value,
      this.registerForm.get('nationalityCode')?.value,
      this.registerForm.get('personType')?.value,
      this.registerForm.get('unit')?.value,
      this.registerForm.get('phoneNumber')?.value,
      this.registerForm.get('username')?.value,
      this.registerForm.get('password')?.value,
    ).subscribe(
      result =>
      {

        this.loading = false;

        this.result = result;

        if (!this.result.isSuccess)
        {
          //this.router.navigate(['/']);
        }

        this.alertService.alerts(this.result);
      },
      error =>
      {
        this.loading = false;
        this.alertService.exception(error);
      }
    );
  }

  /**
   * Restrict number
   * @param event
   */
  public checkDigit(event: any): boolean
  {
    return Utility.CheckDigit(event);
  }
}
