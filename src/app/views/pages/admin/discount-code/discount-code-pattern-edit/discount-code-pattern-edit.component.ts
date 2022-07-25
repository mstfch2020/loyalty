import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { discountInit } from "src/app/@core/data/loyalty/discount.model";
import { DiscountCodeType, DiscountVolumeType } from "src/app/@core/data/loyalty/enums.model";
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { DiscountService } from "src/app/@core/services/loyalty/discount.service";

@Component({
  selector: 'app-discount-code-pattern-edit',
  templateUrl: './discount-code-pattern-edit.component.html',
  styleUrls: ['./discount-code-pattern-edit.component.scss']
})
export class DiscountCodePatternEditComponent implements OnInit
{

  closeResult = '';
  discountVolumeType = DiscountVolumeType.Toman;

  constructor(
    private route: ActivatedRoute,
    public service: DiscountService,
    public baseInfoService: BaseInfoService,
    private cdref: ChangeDetectorRef)
  {
  }

  ngOnInit(): void
  {
    this.service.createForm(discountInit);
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      if (id)
      {
        this.service.getDiscountById(id).subscribe((value) =>
        {

          this.baseInfoService.loadBaseInfo(() =>
          {
            if (!value)
            {
              value = discountInit;
            }
            this.service.createForm(value);
            this.cdref.detectChanges();

          }, value?.brandIds);
        });
      } else
      {

        this.baseInfoService.loadBaseInfo(() => { this.service.createForm(discountInit); this.cdref.detectChanges(); });
      }
    });
    this.service.form.markAllAsTouched();


  }

  open(content: any, generateCodes = false)
  {
    if (generateCodes)
    {
      this.service.setValue('generatedDiscountCodes', null);
      if (this.service.getValue('discountCodeType') === DiscountCodeType.Random)
      {
        const randomDiscountCodePrefix = this.service.getValue('randomDiscountCodePrefix');
        const randomDiscountCodeCount = this.service.getValue('randomDiscountCodeCount');
        const discountCodes = new Array<string>();
        for (let i = 0; i < randomDiscountCodeCount; i++)
        {
          discountCodes.push(`${ randomDiscountCodePrefix }-${ i }`);
        }
        this.service.setValue('generatedDiscountCodes', discountCodes);

      } else
      {
        const discountFixCode = this.service.getValue('discountFixCode');

        if (discountFixCode)
          this.service.setValue('generatedDiscountCodes', [discountFixCode]);
      }
    }
    // this.modalService.open(content, {
    //   size: 'lg',
    //   backdrop: 'static',
    //   ariaLabelledBy: 'modal-basic-title'
    // }).result.then((result) =>
    // {
    //   this.closeResult = `Closed with: ${ result }`;
    // }, (reason) =>
    // {
    //   this.closeResult = `Dismissed ${ this.getDismissReason(reason) }`;
    // });
  }

  /**
   * Close all displayed modal
   */
  close()
  {
    // this.modalService.dismissAll();
  }

  saveCode()
  {
    this.close();
    this.service.submit();
  }

  /**
   * Write code on Method
   * @return response()
   */
  private getDismissReason(reason: any): string
  {
    if (reason === ModalDismissReasons.ESC)
    {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK)
    {
      return 'by clicking on a backdrop';
    } else
    {
      return `with: ${ reason }`;
    }
  }

  checkDiscountVolumeType(event: boolean)
  {
    if (event)
    {
      this.discountVolumeType = DiscountVolumeType.Toman;
      return;
    }
    this.discountVolumeType = DiscountVolumeType.Percent;
  }

  onKeyPress(e: any)
  {
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str))
    {
      return true;
    }

    e.preventDefault();
    return false;

  }

}
