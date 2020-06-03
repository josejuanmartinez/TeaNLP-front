import {Component, ViewChild} from '@angular/core';
import {AlertService} from 'ngx-alerts';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeaNLP-front';
  message = '';
  messages = [];
  messageIndex = 0;
  tracking = undefined;
  private modalRef: BsModalRef;
  @ViewChild('processing') confModal;
  constructor(private alertService: AlertService, private modalService: BsModalService) {}
  alert(message: any) {
    const level = message.level;
    const text = message.text;
    if (level === 'danger') {
      this.alertService.danger(text);
    } else if (level === 'success') {
      this.alertService.success(text);
    } else if (level === 'warning') {
      this.alertService.warning(text);
    } else {
      this.alertService.info(text);
    }
  }
  process(messages: string[]) {
    const config: ModalOptions = {
      backdrop: 'static',
      class: 'modal-dialog-centered modal-sm',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
    };
    this.modalRef = this.modalService.show(this.confModal, config);
    this.messages = messages;
    this.messageIndex = 0;
    this.setMessage();
    if (this.messages.length > 0 ) {
      this.tracking = setInterval(() => {
        this.setMessage();
      }, 2500);
    }
  }
  setMessage() {
    this.message = this.messages[this.messageIndex];
    this.messageIndex++;
    if (this.messageIndex >= this.messages.length && this.tracking !== undefined) {
      clearInterval(this.tracking);
      this.tracking = undefined;
    }
  }
  stopProcess() {
    this.modalRef.hide();
  }
}
