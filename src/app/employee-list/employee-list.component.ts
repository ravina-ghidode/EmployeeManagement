import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';
import { AccountService } from '../_services/account.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}
  // employees: Employee[] = [];
  employees: any = [];
  icon = faTrash;
  userRole: string | undefined;

  ngOnInit(): void {
    this.getAll();
    this.accountService.currentUser$.subscribe((res) => {
      this.userRole = res?.role;
    });
  }

  getAll() {
    this.employeeService.getAllEmployee().subscribe({
      next: (response) => {
        this.employees = response;
        console.log(this.employees);
      },
      error: (error) => {
        console.log('error');
      },
    });
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.toastr.error('Employee deleted Successful', 'Done', {
          timeOut: 2000,
        });
        this.employees = [];
        this.getAll();
      },
    });
  }
}
