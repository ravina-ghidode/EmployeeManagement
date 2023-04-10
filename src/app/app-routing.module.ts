import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthGuard } from './_guard/auth.guard';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'employee-list',
    component:EmployeeListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'update/:id',
    component:UpdateEmployeeComponent,
   
  },
  {
    path:'add',
    component:AddEmployeeComponent,
   
  }
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
