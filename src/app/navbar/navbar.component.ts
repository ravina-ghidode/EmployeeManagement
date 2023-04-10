import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userRole: string | undefined = '';
  userName: string | undefined = '';
  constructor(
    public accountService: AccountService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((val) => {
      console.log(val);
      this.userRole = val?.role;
      this.userName = val?.userName;
    });
  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Login Successful', 'Done', {
          timeOut: 3000,
        });
      },
      error: (error) => {
        this.toastr.error('everything is broken', 'Major Error', {
          timeOut: 3000,
        });
      },
    });
  }

  logOut() {
    this.accountService.logOut();
  }
}
