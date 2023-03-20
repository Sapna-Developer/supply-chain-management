import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  tokenValue: any;
  decodedTokenValue: any;
  
  constructor(private http: HttpClient, private router: Router) {}

  jwtHelper: JwtHelperService = new JwtHelperService();

  isLoggedIn() {
    return this.jwtHelper.isTokenExpired();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return false;
    }

    return true;
  }

  get currentUserToken() {
    const token: any = localStorage.getItem('token');
    const data = atob(token);
    const res = JSON.parse(data);
    if (!token) {
      return null;
    }

    return res.data.token;
    // return this.jwtHelper.decodeToken(res.data.token);
  }

  get currentUserDetails() {
    const token: any = localStorage.getItem('token');
    const data = atob(token);
    const res = JSON.parse(data);
    if (!token) {
      return null;
    }

    return this.jwtHelper.decodeToken(res.data.token);
  }

  get currentUserRoleDetails() {
    const token: any = localStorage.getItem('token');
    const data = atob(token);
    const res = JSON.parse(data);
    // console.log(res);
    if (!token) {
      return null;
    }

    return res.data;
  }

  get currentuserProjectDetails(){
    const token: any = localStorage.getItem('token');
    const data = atob(token);
    const res = JSON.parse(data);
     console.log(res);
    
    const projects=res["data"]["projects"];
    console.log(res.projects);
    if(!projects){
      return null;
    }
    return projects
  }

  get currentUserId() {
    const token: any = localStorage.getItem('currentUser');

    const res = JSON.parse(token);
    if (!token) {
      return null;
    }

    return res.data;
    // return this.jwtHelper.decodeToken(res.data.token);
  }

  get userPermissions() {
    const menus: any = localStorage.getItem('user-menu-role');
    const user = JSON.parse(menus);
    if (user.length > 0) {
      return user;
    } else {
      return [];
    }
  }

  // get companyName(){
  //   const token: any = localStorage.getItem('token');
  //   const res = JSON.parse(token);
  //   if (!token) {
  //     return null;
  //   }
  //   return res.data;
  // }

  checkUserPermission(el: any): boolean {
    const objMap: any = { status: false };
    if (this.userPermissions.length < 1) {
      return objMap.status;
    }
    this.userPermissions.forEach((e1: any) =>
      el.forEach((e2: any) => {
        if (e1 === e2) {
          objMap.status = true;
        }
      })
    );
    return objMap.status;
    // return this.userPermissions.includes(el);
  }

  checkUserPermissionCompany(permissionCheckCopany:any){
    this.tokenValue = localStorage.getItem('token');
    this.decodedTokenValue =JSON.parse(atob(this.tokenValue));
    let currentCompany = permissionCheckCopany.find((e: any) => e == this.decodedTokenValue.data.company_name)
    if(currentCompany!== undefined){
      return true;
    }
    return false;
   }
}
