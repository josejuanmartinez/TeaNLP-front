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
  process(message: string) {
    const config: ModalOptions = {
      backdrop: 'static',
      class: 'modal-dialog-centered modal-md',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
    };
    this.modalRef = this.modalService.show(this.confModal, config);
    this.message = message;
  }
  stopProcess() {
    this.modalRef.hide();
  }
}
