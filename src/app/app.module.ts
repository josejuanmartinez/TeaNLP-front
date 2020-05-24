import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrainComponent } from './train/train.component';
import { ExtractComponent } from './extract/extract.component';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { AnalyzeComponent } from './analyze/analyze.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpserviceService} from './httpservice.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalModule } from 'ngx-bootstrap/modal';
import { GraphComponent } from './graph/graph.component';
import {GraphModule} from '@swimlane/ngx-graph';
import {TooltipModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    TrainComponent,
    ExtractComponent,
    AnalyzeComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
    ModalModule.forRoot(),
    GraphModule,
    TooltipModule
  ],
  providers: [HttpserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
