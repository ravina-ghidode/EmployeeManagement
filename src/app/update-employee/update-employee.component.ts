import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  empData: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private emp: EmployeeService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let Id = this.route.snapshot.paramMap.get('id');
    console.log(Id);

    if (Id) {
      this.emp.getEmpById(Id).subscribe((res) => {
        console.log(res);
        this.empData = res;
        console.log(this.empData);
      });
    }
  }
  submit(data: any) {
    if (this.empData) {
    }
    this.emp.updateEmployee(this.empData).subscribe({
      next: () => {
        this.toastr.success('Employee Updates Successful', 'Done', {
          timeOut: 2000,
        });
        this.router.navigateByUrl('/employee-list');
      },
      error: (error) => {
        this.toastr.error('everything is broken', 'Major Error', {
          timeOut: 3000,
        });
      },
      complete: () => {},
    });
  }
}
