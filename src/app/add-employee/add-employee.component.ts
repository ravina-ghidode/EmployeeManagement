import { Component } from '@angular/core';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  constructor(public empService : EmployeeService,private toastr: ToastrService,private router : Router){}
  empData:Employee|undefined
  
  submit(data:Employee){
    this.empService.addEmployee(data).subscribe({
      next:(res)=>{
        this.toastr.success('Employee Added Successfully', 'Done', {
          timeOut: 2000,
          
        });
        this.router.navigateByUrl('/employee-list')
        
      }
    })


  }

}
