import { AccountService } from './../_services/account.service';
import { Register } from './../_models/register.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel: Register;
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[];
  constructor(private accountService: AccountService, private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }


  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]],
      passwordconfirm: ['', [Validators.required, this.matchValues('password')]],
      gender: ['male'],
      knownAs: ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dateOfBirth: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      country: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
    });
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.passwordconfirm.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(data => {
      this.router.navigate(['/members'], { relativeTo: this.route });
    }, error => {
      this.validationErrors = error;
    });
  }

  onCancel() {
    this.router.navigate(['/home'], { relativeTo: this.route });
  }

}
