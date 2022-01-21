import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-system-settings-discount-grid',
  templateUrl: './system-settings-discount-grid.component.html',
  styleUrls: ['./system-settings-discount-grid.component.scss']
})
export class SystemSettingsDiscountGridComponent implements OnInit {

  closeResult: string = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  /**
   * Write code on Method
   * @return response()
   */
  open(content: any) {
    this.modalService.open(content, {size: 'lg', backdrop: 'static',ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Close all displayed modal
   */
  close(){
    this.modalService.dismissAll();
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
