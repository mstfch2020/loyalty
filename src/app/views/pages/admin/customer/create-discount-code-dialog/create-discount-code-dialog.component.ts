import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { newDiscountDialogModelInit } from 'src/app/@core/data/loyalty/discount-code-dialog.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { NewDiscountDialogService } from 'src/app/@core/services/loyalty/new-discount-dialog.service';
import { UiService } from 'src/app/@core/services/ui/ui.service';

@Component({
  selector: 'app-create-discount-code-dialog',
  templateUrl: './create-discount-code-dialog.component.html',
  styleUrls: ['./create-discount-code-dialog.component.scss']
})
export class CreateDiscountCodeDialogComponent implements OnInit
{

  isDisabled = false;
  customerId = '';
  constructor(public service: NewDiscountDialogService,
    public formBuilder: FormBuilder,
    public baseInfoService: BaseInfoService,
    public uiService: UiService,
    public modal: NgbActiveModal) { }

  ngOnInit(): void
  {

    this.service.createForm(newDiscountDialogModelInit);
    this.service.form.get('promoterId')?.setValue(this.customerId);
    this.baseInfoService.GetAllPromoterContractedBrands(this.customerId).subscribe(
      result => this.service.brands$.next(result)
    );
  }

}
