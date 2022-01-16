import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error: any;
  constructor(private router: Router) {
    this.error = this.router.getCurrentNavigation()?.extras?.state?.error
    console.log(this.router.getCurrentNavigation());
   }

  ngOnInit(): void {

  }

}
