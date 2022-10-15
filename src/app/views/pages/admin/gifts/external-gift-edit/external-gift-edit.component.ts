import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExternalPointAward, externalPointAwardInit } from 'src/app/@core/data/loyalty/external-point-award.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { ExternalPointAwardService } from 'src/app/@core/services/loyalty/external-points-award.service';

@Component({
  selector: 'app-external-gift-edit',
  templateUrl: './external-gift-edit.component.html',
  styleUrls: ['./external-gift-edit.component.scss']
})
export class ExternalGiftEditComponent implements OnInit
{//^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
  public customPatterns = { '0': { pattern: new RegExp('\[0-9a-fA-F\]') } };
  giftType = 1;
  id = '';
  isDisabled = false;
  constructor(public route: ActivatedRoute, public service: ExternalPointAwardService,
    private cdref: ChangeDetectorRef, public router: Router,
    public baseInfoService: BaseInfoService) { }

  ngOnInit(): void
  {
    this.service.createForm(externalPointAwardInit);
    this.route.queryParams.subscribe(params =>
    {
      this.id = params['id'];
      if (this.id)
      {
        this.service.GetExternalPointsAwardById(this.id).subscribe((value) =>
        {

          if (!value)
          {
            value = externalPointAwardInit;
          }

          this.loadBaseInfo(value);
        });
      } else
      {
        this.loadBaseInfo(externalPointAwardInit);
      }
    });
    this.service.form.markAllAsTouched();
  }

  loadBaseInfo(value: ExternalPointAward)
  {
    this.service.createForm(value);
    this.cdref.detectChanges();
    this.baseInfoService.loadBaseInfo();
    this.service.form.get('providerBrandId')?.valueChanges.subscribe(brandId =>
    {
      this.service.form.get('groupId')?.setValue(null);
      this.service.form.get('patternId')?.setValue(null);
      this.service.loadBrandDependency([brandId]);
    });
  }

  backToList()
  {
    this.router.navigate(['/admin/main/gifts/external-list']);
  }

}
