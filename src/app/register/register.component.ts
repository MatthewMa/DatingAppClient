import { Observable, Subject } from 'rxjs';
import { AccountService } from './../_services/account.service';
import { Register } from './../_models/register.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel: Register;
  showConfirmPasswordError =false;
  @ViewChild('registerForm', {static: true}) registerForm: NgForm;
  @Output() cancelEvent: Subject<boolean> = new Subject();
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    const username = this.registerForm.value['username'];
    const password = this.registerForm.value['password'];
    const passwordConfirmed = this.registerForm.value['passwordconfirm'];
    if (password !== passwordConfirmed) {
      this.showConfirmPasswordError = true;
      return;
    }
    this.accountService.register(new Register(username, password)).subscribe(data => {
      console.log(data);
      this.onCancel();
    }, error => console.log(error));
  }

  onCancel() {
    this.cancelEvent.next(false);
  }

}
