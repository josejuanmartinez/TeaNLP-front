import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {

  @Output() alerts = new EventEmitter<string[]>();
  @Output() processing = new EventEmitter<any>();
  @Output() processed = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
