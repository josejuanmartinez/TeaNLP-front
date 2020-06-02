import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {HttpserviceService} from '../httpservice.service';
import {HttpErrorResponse} from '@angular/common/http';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {corpus} from './corpus';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {
  @ViewChild('content') contentModal;
  @ViewChild('confirmation') confModal;
  @Output() alerts = new EventEmitter<any>();
  @Output() processing = new EventEmitter();
  @Output() processed = new EventEmitter();
  private modalRef: BsModalRef;
  docs = corpus;
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
    this.selectDoc();
  }

  selectDoc(): void {
    const docNames = this.docs.map(x => x.name);
    const max = docNames.length - 1;
    const min = 0;
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    const name = docNames[random];
    this.text = this.docs.filter(x => x.name === name)[0].text;
  }

  changeInputArea(newText: string): void {
    this.text = newText;
  }
  preprocess() {
    this.processing.emit();
    this.httpservice.preprocess(this.text).subscribe(
      (data) => {
        if (data.hasOwnProperty('result')) {
          this.tokens = data[`result`];
          console.log(data[`result`]);
          this.processed.emit();
        }
      },
      (err: HttpErrorResponse) => {
        this.processed.emit();
        if (err.error instanceof Error) {
          this.alerts.emit({level: 'danger', text: err.status + ' ' + err.statusText});
        } else {
          this.alerts.emit({level: 'danger', text: err.status + ' ' +  err.statusText});
        }
      }
    );
  }
  trainable(token: any): boolean {
    return !token.linguistic_features.is_space && !token.linguistic_features.is_punct && !token.linguistic_features.is_stop;
  }

  openModal(template: TemplateRef<any>, tokenOrder: string) {
    this.selectedToken = this.tokens.filter(t => t.linguistic_features.offset.start_merged === tokenOrder)[0];
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
    this.modalRef.hide();
  }

  confirm() {
    this.modalRef.hide();
    this.openModal(this.confModal, this.selectedToken.ORDER);
  }

  closeConfirmation() {
    this.modalRef.hide();
    this.openModal(this.contentModal, this.selectedToken.ORDER);
  }

  save() {
    this.httpservice.save(this.text, this.selectedToken).subscribe(
      (data) => {
        if (data.hasOwnProperty('acknowledged')) {
          if ('acknowledged' in data && data[`acknowledged`]) {
            this.alerts.emit({level: 'success', text: 'Graph correctly fine-tuned!'});
            this.closeModal();
          } else {
            let err = 'Server-side error';
            if ('error' in data) {
              err = data[`error`];
            }
            this.alerts.emit({level: 'danger', text: err});
          }
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.alerts.emit({level: 'danger', text: err.status + ' ' + err.statusText});
        } else {
          this.alerts.emit({level: 'danger', text: err.status + ' ' +  err.statusText});
        }
      }
    );
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

  calculateTokenClass(token: any) {
    if (!this.trainable(token)) {
      return 'disabled_token';
    }
    let custom = 'token';
    if (token.linguistic_features.pos.startsWith('NN')) {
      custom = 'noun';
    } else if (token.linguistic_features.pos.startsWith('VB')) {
      custom = 'verb';
    } else if (token.linguistic_features.pos.startsWith('JJ')) {
      custom = 'adj';
    } else if (token.linguistic_features.pos.startsWith('RB')) {
      custom = 'adv';
    }
    return custom;

  }
}
