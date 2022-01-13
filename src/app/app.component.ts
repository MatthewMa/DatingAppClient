import { Constants } from './constants/constants';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get(Constants.BASE_URL + 'users').subscribe((data) => {
      console.log(data);
    });
  }

}
