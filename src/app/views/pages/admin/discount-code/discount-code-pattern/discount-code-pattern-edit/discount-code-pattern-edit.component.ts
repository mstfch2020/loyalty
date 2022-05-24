import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { discountInit } from "src/app/@core/data/loyalty/discount.model";
import { DiscountCodeType } from "src/app/@core/data/loyalty/enums.model";
import { BaseInfoService } from "src/app/@core/services/loyalty/base-info.service";
import { DiscountService } from "src/app/@core/services/loyalty/discount.service";
import { DiscountVolumeType } from 'src/app/@core/data/loyalty/enums.model';

@Component({
  selector: 'app-discount-code-pattern-edit',
  templateUrl: './discount-code-pattern-edit.component.html',
  styleUrls: ['./discount-code-pattern-edit.component.scss']
})
export class DiscountCodePatternEditComponent implements OnInit {

  closeResult = '';
  discountVolumeType = DiscountVolumeType.Toman;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public service: DiscountService,
    public baseInfoService: BaseInfoService,
    private modalService: NgbModal) {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.service.getDiscountById(id).subscribe((value) => {

          this.baseInfoService.loadBaseInfo(() => {
            if (!value) {
              value = discountInit;
            }
            this.service.createForm(value);
          }, value?.brandIds);
        });
      } else {

        this.baseInfoService.loadBaseInfo(() => { this.service.createForm(discountInit); });
      }
    });

  }

  ngOnInit(): void {
    this.service.form.markAllAsTouched();
  }

  open(content: any, generateCodes = false) {
    if (generateCodes) {
      this.service.setValue('generatedDiscountCodes', null);
      if (this.service.getValue('discountCodeType') === DiscountCodeType.Random) {
        const randomDiscountCodePrefix = this.service.getValue('randomDiscountCodePrefix');
        const randomDiscountCodeCount = this.service.getValue('randomDiscountCodeCount');
        const discountCodes = new Array<string>();
        for (let i = 0; i < randomDiscountCodeCount; i++) {
          discountCodes.push(`${randomDiscountCodePrefix}-${i}`);
        }
        this.service.setValue('generatedDiscountCodes', discountCodes);

      } else {
        const discountFixCode = this.service.getValue('discountFixCode');

        if (discountFixCode)
          this.service.setValue('generatedDiscountCodes', [discountFixCode]);
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
    this.service.submit();
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

  checkDiscountVolumeType(event: boolean) {
    if (event) {
      this.discountVolumeType = DiscountVolumeType.Toman;
      return;
    }
    this.discountVolumeType = DiscountVolumeType.Percent;
  }

}
