import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
// import _ from 'lodash';
@Injectable()
export class GlobalService {
  apiToken!: any;
  GEEAuthentication: any;
  serverDateFormat: any = 'DD-MMM-YYYY HH:MM';
  rolesdata: any = {};

  public domain =
    location.protocol +
    '//' +
    location.hostname +
    (location.port ? ':' + location.port : '');

  userRoles: any = {};

  public onInvalidApiToken: EventEmitter<any>;
  public onLogOut: EventEmitter<any>;

  constructor(private router: Router, public snackBar: MatSnackBar) {
    this.init();
    //this.getUserRoles();
    this.onInvalidApiToken = new EventEmitter();
    this.onLogOut = new EventEmitter();
  }
  ngOnInit() {}

  /**
   * Api Urls
   */

  invalidApiToken(): void {
    this.logout();
    //this.router.navigate(['/session-expired']);
  }

  public getCurrentDate(format: any) {
    if (!format) {
      const format: any = this.serverDateFormat;
    }
    return moment().format(format);
  }

  public formatDate(date: any, format: any) {
    return moment(date).format(format);
  }

  public isValidDate(val: any, format: any) {
    if (format) {
      return moment(val, format).isValid();
    } else {
      return moment(val).isValid();
    }
  }

  public checkRole(router: any) {
    return this.userRoles[router];
  }

  hasValidIdToken(): boolean {
    const data = this.getLocalItem('token', true);
    return data ? true : false;
  }

  logout(): void {
    this.removeLocalItem('authentication');
        this.removeLocalItem('currentUser');
        this.removeLocalItem('redirect_appurl');
        this.removeLocalItem('token');
        this.removeLocalItem('user-menu-role');
        this.removeLocalItem('user-project-role');
        this.removeLocalItem('redirect_uri');
    // this.removeLocalItem('token');
    // localStorage.clear();
    window.location.href = this.domain + '/logout';
    this.init();
  }

  showErrorMessage(err: any): void {
    let msg;
    if (err && err.errors) {
      msg = err.errors[0].message;
    } else {
      msg = err.message;
    }
    //this.messageService.add({severity: 'error', detail: msg});
  }

  showSuccessMessage(obj: any): void {
    this.snackBar.open(obj, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snack-success'],
    });
  }

  public init() {
    this.apiToken = '';
    this.GEEAuthentication = null;
    var data: any = this.getLocalItem('token', true);
    if (data) {
      this.GEEAuthentication = data.data;
      this.apiToken = this.GEEAuthentication.token;
      this.rolesdata = this.GEEAuthentication.app_details.roles;
    }
  }
  public setLocalItem(key: any, value: any, encoded: any) {
    value = JSON.stringify(value);
    if (encoded) {
      value = btoa(value);
    }
    localStorage.setItem(key, value);
  }
  public removeLocalItem(key: any) {
    localStorage.removeItem(key);
  }
  public getLocalItem(key: any, decoded: any) {
    var value = localStorage.getItem(key);
    value = value ? JSON.parse(decoded ? atob(value) : value) : null;
    return value;
  }
}
