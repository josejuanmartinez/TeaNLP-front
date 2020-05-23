import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpserviceService {

  backend = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  tokenize(text: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset="utf-8"',
      })
    };

    const body = JSON.stringify('{"text": \"' + text + '\"}');
    return this.http.post(this.backend + '/tokenize', body, httpOptions);
  }
}
