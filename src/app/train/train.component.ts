import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpserviceService} from '../httpservice.service';
import {HttpErrorResponse} from '@angular/common/http';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {
  @ViewChild('myModal') myModal;
  private modalRef: BsModalRef;
  text = '';
  tokens: any;
  selectedToken: any;
  newNerClass = 'd-none';
  validNer = false;
  invalidNerMessage = 'Only chars allowed';
  iconNewNerClass = 'va-tbottom';

  constructor(private httpservice: HttpserviceService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  changeInputArea(newText: string): void {
    this.text = newText;
  }
  preprocess() {
    this.httpservice.preprocess(this.text).subscribe(
      (data) => {
        if (data.hasOwnProperty('result')) {
          this.tokens = data[`result`];
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }
    );

  }

  openModal(template: TemplateRef<any>, tokenOrder: string) {
    this.selectedToken = this.tokens.filter(t => t.ORDER === tokenOrder)[0];
    const config: ModalOptions = {
      backdrop: 'static',
      class: 'modal-dialog-centered modal-lg',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
    };
    this.modalRef = this.modalService.show(template, config);
  }

  closeModal(){
    this.modalService.hide(1);
  }

  showNewNER() {
    this.newNerClass = '';
    this.iconNewNerClass = 'va-tbottom d-none';
  }

  hideNewNER() {
    this.newNerClass = 'd-none';
  }

  validateNER(newValue: string) {
    const pattern = '^[a-zA-Z]+$';
    this.validNer = false;
    if (newValue.match(pattern).length > 0) {
      if (newValue.length >= 5) {
        if (this.selectedToken.HYPERNYM.filter(t => t.toLowerCase() === newValue.toLowerCase()).length > 0) {
          this.invalidNerMessage = 'Duplicated NER';
        } else {
          this.validNer = true;
          this.invalidNerMessage = 'Invalid NER';
        }
      } else {
        this.invalidNerMessage = 'Min. 5 chars';
      }
    } else {
      this.invalidNerMessage = 'Only chars allowed';
    }
  }
  saveNER(newValue: string) {
    this.validateNER(newValue);
    if (this.validNer) {
      this.hideNewNER();
    }
  }
}
