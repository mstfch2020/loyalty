import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { discountInit } from 'src/app/@core/data/loyalty/discount.model';
import { BaseInfoService } from 'src/app/@core/services/loyalty/base-info.service';
import { DiscountService } from 'src/app/@core/services/loyalty/discount.service';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.scss']
})
export class DiscountCodeComponent implements OnInit
{
  closeResult = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    public discountService: DiscountService,
    public baseInfoService: BaseInfoService,
    private modalService: NgbModal)
  {
    this.route.queryParams.subscribe(params =>
    {
      const id = params['id'];
      if (id)
      {
        this.discountService.getDiscountById(id).subscribe((value) =>
        {
          if (!value) { value = discountInit; }
          this.discountService.createForm(value);
          this.baseInfoService.loadBaseInfo(value?.brandIds);
        });
      } else
      {
        this.discountService.createForm(discountInit);
        this.baseInfoService.loadBaseInfo();
      }
    });
  }

  ngOnInit(): void
  {
    this.discountService.form.markAllAsTouched();
  }

  open(content: any)
  {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title' }).result.then((result) =>
    {
      this.closeResult = `Closed with: ${ result }`;
    }, (reason) =>
    {
      this.closeResult = `Dismissed ${ this.getDismissReason(reason) }`;
    });
  }

  /**
   * Close all displayed modal
   */
  close()
  {
    this.modalService.dismissAll();
  }

  saveCode()
  {
    this.close();
    this.discountService.submit();
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
}
