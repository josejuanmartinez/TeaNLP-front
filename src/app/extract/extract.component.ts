import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit {

  @Output() alerts = new EventEmitter<string[]>();
  @Output() processing = new EventEmitter<any>();
  @Output() processed = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
