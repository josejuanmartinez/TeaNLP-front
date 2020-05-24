import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable()
export class HttpserviceService {

  backend = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  preprocess(text: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset="utf-8"',
      })
    };
    text = text.replace(/"/g, '\\"');
    const body = JSON.stringify('{"text": \"' + text + '\"}');
    return this.http.post(this.backend + '/preprocess', body, httpOptions);
  }
}
