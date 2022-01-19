import { Observable, Subject } from 'rxjs';
import { AccountService } from './../_services/account.service';
import { Register } from './../_models/register.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { User } from '../_models/user.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel: Register;
  showConfirmPasswordError =false;
  @ViewChild('registerForm', {static: true}) registerForm: NgForm;
  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute) { }

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
      this.router.navigate(['/members'], { relativeTo: this.route });
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  onCancel() {
    this.router.navigate(['/home'], { relativeTo: this.route });
  }

}
