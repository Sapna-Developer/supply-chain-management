import { environment } from './../../../../environments/environment';
import { GlobalService } from './../../../services/global.service';
import { CustomerService } from './../../../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
  });

  loading = true;
  tokenValue:any

  constructor(
    public router: Router,
    public customerService: CustomerService,
    public route: ActivatedRoute,
    public globalService: GlobalService
  ) {
    this.route.queryParams.subscribe((resp: any) => {
      if (resp && resp.code) {
        localStorage.setItem('token', JSON.stringify(resp.response_type));
        localStorage.setItem('redirect_uri', resp.redirect_uri);
        this.router.navigateByUrl('/maindashboard');
      } else {
        // localStorage.clear();
        this.removeLocalItem('authentication');
        this.removeLocalItem('currentUser');
        this.removeLocalItem('redirect_appurl');
        this.removeLocalItem('token');
        this.removeLocalItem('user-menu-role');
        this.removeLocalItem('user-project-role');
        this.removeLocalItem('redirect_uri');
        this.globalService.logout();
        window.location.href = environment.sso_url;
      }
    });
    // this.route.queryParams.subscribe((params) => {
    //   if (
    //     params.code === undefined &&
    //     params.response_type === undefined &&
    //     params.redirect_uri === undefined
    //   ) {
    //     var data = this.globalService.getLocalItem('GEEAuthentication', true);

    //     if (data == null) {
    //       this.globalService.logout();
    //     } else {
    //       // this.router.navigate(['/projects-dashborad']);
    //     }
    //   } else {
    //     this.globalService.removeLocalItem('GEEAuthentication');
    //     this.loading = true;

    //     localStorage.setItem('redirect_usermngt', params.redirect_uri);
    //     console.log('set redirect url: ' + params.redirect_uri);

    //     const data = atob(params.response_type);
    //     const res = JSON.parse(data);

    //     if (res.success === '1') {
    //       this.loading = false;

    //       this.globalService.setLocalItem('GEEAuthentication', res, true);
    //       this.globalService.init();
    //       this.router.navigate(['/projects-dashboard']);
    //     } else if (res.success === '0') {
    //       this.loading = false;
    //     }
    //   }
    // });
  }
  public removeLocalItem = function (key:any) {
    localStorage.removeItem(key);
}
  ngOnInit(): void {}

  userLogin(form: any) {}
}
