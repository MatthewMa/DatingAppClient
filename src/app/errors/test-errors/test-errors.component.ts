import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/_constants/constants';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  validationErrors: string[] = [];
  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(Constants.BASE_URL + 'buggy/not-found').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get400Error() {
    this.http.get(Constants.BASE_URL + 'buggy/bad-request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get500Error() {
    this.http.get(Constants.BASE_URL + 'buggy/server-error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get401Error() {
    this.http.get(Constants.BASE_URL + 'buggy/auth').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get400ValidationError() {
    this.http.post(Constants.BASE_URL + 'account/register', {}).subscribe(response => {

    }, error => {
      this.validationErrors = error
    });
  }

  getClientError() {

  }
}
