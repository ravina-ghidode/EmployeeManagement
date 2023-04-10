import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:7095/api/Account/";
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  Role =new EventEmitter<string>();
  UserName = new EventEmitter<string>();
 // Id = new EventEmitter<number>();

  constructor(private http:HttpClient,private router:Router) { }

  login(loginForm:any){
   return this.http.post<User>(`${this.baseUrl}Login`,loginForm).pipe(
    map((response:User)=>{
      const user = response;
      if(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    })
   )

  }

  logOut(){
    localStorage.removeItem('user')
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');

  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user)
  }

  register(RegisterForm:any){
    return this.http.post<User>(`${this.baseUrl}register`,RegisterForm).pipe(
      map((user:User) =>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        
      })
    )

  }

  // getCurrentUserRole(){
  //   this.currentUser$.pipe
  // }
  // getCurrentUserToken(): string | null {
  //   const token = localStorage.getItem('user');
  //   if (token) {
  //     return JSON.parse(token);
  //   }
  //   return null;
  // }
  // getRole() {
  //   const token = this.getCurrentUserToken();
  //   if (token !== null) {
  //     let a: any = jwt_decode(token);
  //     return this.http
  //       .get<any>(`${environment.apiUrl}users/${a.id}?populate=*`)
  //       .pipe(
  //         map((data) => {
  //           return data.role.name;
  //         })
  //       );
  //   }
  //   return;
  // }

  getCurrentUser(){
    return this.currentUser$.subscribe((val)=>{
      //console.log(val?.role);
      // this.Role.emit(val?.role)
      
      
    }
    )
  }
}
