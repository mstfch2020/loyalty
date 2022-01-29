import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-customer-group-temporary-root',
  templateUrl: './customer-group-temporary-root.component.html',
  styleUrls: ['./customer-group-temporary-root.component.scss']
})
export class CustomerGroupTemporaryRootComponent implements OnInit
{

  selectedCar = 1;
  cars = [
    { id: 1, name: 'زینجا' },
    { id: 2, name: 'مون' },
    { id: 3, name: 'قهر کرده' },
    { id: 4, name: '09192935850' },
  ];

  selectedPrice = 1;
  prices = [
    { id: 1, name: 'قیمت قبل از تخفیف کالا' },
    { id: 2, name: 'قیمت بعد از تخفیف کالا' },
  ];

  closeResult: string = '';

  config: any = {
    date: {
      value: new Date().valueOf(),
      onSelect: (shamsiDate: string, gregorianDate: string, timestamp: number) =>
      {
        console.log(shamsiDate, gregorianDate, timestamp);
      }
    },
    ui: {
      theme: 'default',
      isVisible: false,
      hideAfterSelectDate: true,
      hideOnOutsideClick: true,
      yearView: true,
      monthView: true,
    },
    time: {
      enable: false,
      showSecond: false,
      meridian: false
    }
  };

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal)
  {
    this.form = this.formBuilder.group({
      selectedCar1: [null, [Validators.required]],
      selectedCar2: [null, [Validators.required]],
      selectedCar3: [null, [Validators.required]],
      selectedCar4: [null, [Validators.required]],
      selectedCar5: [null, [Validators.required]],
    });
  }

  ngOnInit(): void
  {
    this.form.markAllAsTouched();
  }

  /**
   * Write code on Method
   * @return response()
   */
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
