import { MessagesComponent } from './../messages/messages.component';
import { Constants } from 'src/app/_constants/constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(private http: HttpClient) { }
  handleError(error: any): void {
    if (!(error instanceof HttpErrorResponse)) {
      const body = {
        statusCode: 0,
        message: error.message,
        details: error.stack
      };
      // client-side error (send back to server)
      this.http.post(Constants.BASE_URL + 'ApiException', body);
    }
  }
}
