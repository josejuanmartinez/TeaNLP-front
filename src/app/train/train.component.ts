import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {HttpserviceService} from '../httpservice.service';
import {HttpErrorResponse} from '@angular/common/http';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {corpus} from './corpus';
import {toInt} from 'ngx-bootstrap/chronos/utils/type-checks';
import {DomSanitizer} from '@angular/platform-browser';

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
  MULTIENT = 'MULTIENT';
  private modalRef: BsModalRef;
  private sanitizer: DomSanitizer;
  modalOpen = false;
  docs = corpus;
  text = '';
  tokens: any;
  selectedToken: any;
  nerStyles = [];
  isNers = [];

  constructor(private httpservice: HttpserviceService,
              private modalService: BsModalService,
              private sanitize: DomSanitizer) {
    this.sanitizer = sanitize;
  }

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
    this.modalOpen = true;
  }

  closeModal(){
    this.modalRef.hide();
    this.modalOpen = false;
  }

  confirm() {
    this.modalRef.hide();
    this.openModal(this.confModal, this.selectedToken.ORDER);
  }

  save(token: any) {
    this.httpservice.save(token).subscribe(
      (data) => {
        if (data.hasOwnProperty('acknowledged')) {
          if ('result' in data && data[`result`] === 'acknowledged') {
            this.alerts.emit({level: 'success', text: 'Graph correctly supervised!'});
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


  calculateTokenClass(token: any) {
    if (this.getNer(token)) {
      let classStyle = 'ner';
      if (this.getNer(token) ===  this.MULTIENT) {
        classStyle += ' multient';
      }
      return classStyle;
    } else if (!this.trainable(token)) {
      return 'disabled_token';
    } else {
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
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  getNer(token: any) {
    const nerTags = token.statistical_features.bert_subwords_original.ner;
    if (nerTags === undefined || nerTags.length < 1)    {
      return null;
    }
    if (nerTags.length === 1 && nerTags[0].indexOf('NOENT') > -1) {
      return null;
    }
    if (nerTags.length > 1) {
      return this.MULTIENT;
    } else {
      return nerTags[0].toUpperCase().split('-')[1];
    }
  }
  isNerEnd(token: any) {
    if (this.isNers.length > parseInt(token.linguistic_features.offset.start_merged, 10)) {
      return this.isNers[token.linguistic_features.offset.start_merged];
    }
    let result = false;
    if (this.getNer(token) == null) {
      this.isNers.push(result);
      return result;
    }
    const position = token.linguistic_features.offset.start_merged;
    if (this.tokens.length <= position) {
      this.isNers.push(result);
      return result;
    }
    //  !== JSON.stringify(token.statistical_features.bert_subwords_original.ner[0]));
    result = this.tokens[position + 1].statistical_features.bert_subwords_original.ner[0]
      !== token.statistical_features.bert_subwords_original.ner[0];
    this.isNers.push(result);
    return result;
  }
  calculateTokenStyle(token: any) {
    const ner = this.getNer(token);
    if (ner === null) {
      return '';
    } else if (!this.getNer(token)) {
      return '';
    } else if (ner === this.MULTIENT) {
      return '';
    } else if (this.nerStyles.hasOwnProperty(ner)) {
      return this.nerStyles[ner];
    } else {
        this.nerStyles[ner] = this.getRandomColor();
        return this.nerStyles[ner];
      }
    }
}
