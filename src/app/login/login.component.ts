import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitted = false;
  constructor(
    public accountService: AccountService,
    private toastr: ToastrService,
    private router:Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required])
  });
  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    this.accountService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Login Successful', 'Done', {
          timeOut: 3000,
        });
        this.router.navigateByUrl('employee-list')
      },
      error: (error) => {
        this.toastr.error('everything is broken', 'Major Error', {
          timeOut: 3000,
        });
      },
    });
  }
  cancel(){
    this.router.navigateByUrl("/")
    
  }

}
