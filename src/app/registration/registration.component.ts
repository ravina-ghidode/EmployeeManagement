import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  @Output() cancelRegister = new EventEmitter();
  submitted = false;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
    role: new FormControl('', [Validators.required]),
  });
  get f() {
    return this.registerForm.controls;
  }
  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Registration Successful', 'Done', {
          timeOut: 3000,
        });
        this.router.navigateByUrl('login')
      },
      error: (error) => {
        this.toastr.error('everything is broken', 'Major Error', {
          timeOut: 3000,
        });
      },
    });
    console.log(this.registerForm.value);
  }
  cancel() {
    this.router.navigateByUrl('');
  }
}
