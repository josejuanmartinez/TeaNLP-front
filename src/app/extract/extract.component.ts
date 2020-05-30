import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit {

  @Output() alerts = new EventEmitter<string[]>();
  constructor() { }

  ngOnInit(): void {
  }

}
