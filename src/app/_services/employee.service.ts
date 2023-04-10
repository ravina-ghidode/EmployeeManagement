import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../_models/employee';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //private currentUserSource = new BehaviorSubject<User | null>(null);
  //currentUser$ = this.currentUserSource.asObservable();
  constructor(private http : HttpClient,private accountService : AccountService){}
  
  baseUrl:string = "https://localhost:7095/api/User/";
  url = "https://localhost:7095/api/User"
  apiUrl = "https://localhost:7095/api/Employee";
  userId:number | undefined
  //https://localhost:7095/api/Employee?employeeId=14

  getAllEmployee(){
    return this.http.get<any>(`${this.url}`).pipe(
      map((response)=>{
        return response.data
      })
    )
    
  }
  getEmpById(id:string) {
   return this.http.get<any>(`${this.url}/${id}`).pipe(
    map((response)=>{
      return response.data
    })
   )
  }

  setCurrentUser(user:User){
    //this.currentUserSource.next(user)
  }
  updateEmployee(data: any) {
    
    
    return this.http.put<any>(`${this.url}`, data);
  }
  addEmployee(data:Employee){
    this.accountService.currentUser$.subscribe((val)=>{
      console.log(val);
      data.userId = val?.id
    })
    return this.http.post<any>(`${this.apiUrl}`,data);

  }
  deleteEmployee(employeeId:number){
    return this.http.delete(`${this.apiUrl}?employeeId=${employeeId}`)

  }
  // getAdminId(){
  //   this.http.get()
  // }
}
