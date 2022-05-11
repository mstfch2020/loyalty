import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { discountInit } from "src/app/@core/data/loyalty/discount.model";
import { DiscountCodeType } from "src/app/@core/data/loyalty/enums.model";
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { DiscountService } from "src/app/@core/services/loyalty/discount.service";

@Component({
  selector: 'app-discount-code-pattern-edit',
  templateUrl: './discount-code-pattern-edit.component.html',
  styleUrls: ['./discount-code-pattern-edit.component.scss']
})
export class DiscountCodePatternEditComponent implements OnInit {

  closeResult = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    public discountService: DiscountService,
    public baseInfoService: BaseInfoService,
    private modalService: NgbModal) {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.discountService.getDiscountById(id).subscribe((value) => {

          this.baseInfoService.loadBaseInfo(() => {
            if (!value) {
              value = discountInit;
            }
            this.discountService.createForm(value);
          }, value?.brandIds);
        });
      } else {

        this.baseInfoService.loadBaseInfo(() => { this.discountService.createForm(discountInit); });
      }
    });
  }

  ngOnInit(): void {
    this.discountService.form.markAllAsTouched();
  }

  open(content: any, generateCodes = false) {
    if (generateCodes) {
      this.discountService.setValue('generatedDiscountCodes', null);
      if (this.discountService.getValue('discountCodeType') === DiscountCodeType.Random) {
        const randomDiscountCodePrefix = this.discountService.getValue('randomDiscountCodePrefix');
        const randomDiscountCodeCount = this.discountService.getValue('randomDiscountCodeCount');
        const discountCodes = new Array<string>();
        for (let i = 0; i < randomDiscountCodeCount; i++) {
          discountCodes.push(`${randomDiscountCodePrefix}-${i}`);
        }
        this.discountService.setValue('generatedDiscountCodes', discountCodes);

      } else {
        const discountFixCode = this.discountService.getValue('discountFixCode');

        if (discountFixCode)
          this.discountService.setValue('generatedDiscountCodes', [discountFixCode]);
      }
    }
    this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Close all displayed modal
   */
  close() {
    this.modalService.dismissAll();
  }

  saveCode() {
    this.close();
    this.discountService.submit();
  }

  /**
   * Write code on Method
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
