import { Component } from '@angular/core';
import {AlertService} from 'ngx-alerts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeaNLP-front';
  constructor(private alertService: AlertService) {}
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
}
