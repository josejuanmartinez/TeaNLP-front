import { Component, OnInit } from '@angular/core';
import {HttpserviceService} from '../httpservice.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {

  text = '';
  tokens: any;
  constructor(private httpservice: HttpserviceService) { }

  ngOnInit(): void {
  }

  changeInputArea(newText: string): void {
    this.text = newText;
  }
  tokenize() {

    this.httpservice.tokenize(this.text).subscribe(
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

}
