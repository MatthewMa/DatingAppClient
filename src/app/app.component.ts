import { AppUser } from './models/app-user.model';
import { HttpClientService } from './shared/http-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appUsers: AppUser[];
  constructor(private httpClientService: HttpClientService) {}
  ngOnInit() {
    this.httpClientService.getUsers().subscribe((data: AppUser[]) => {
      console.log(data);
      this.appUsers = data;
    },error => console.log(error));
  }
}

