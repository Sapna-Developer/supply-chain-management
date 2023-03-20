import { CustomerService } from './../../../services/customer.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reload',
  templateUrl: './reload.component.html',
  styleUrls: ['./reload.component.scss'],
})
export class ReloadComponent implements OnInit {
 public  dashboardList: any;
  resp: any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public customerService: CustomerService
  ) {
    // return;
    this.route.queryParams.subscribe((resp: any) => {
      if (resp && resp.code) {
        localStorage.setItem('token', resp.response_type);
        this.getUserRoles(resp);
        
      } else {
        localStorage.clear();
        window.location.href = environment.sso_url;
      }
    });
  }

  ngOnInit(): void {}

  getUserRoles(data: any) {
    const user = atob(data.response_type);
    const userDetails = JSON.parse(user);
    // console.log(userDetails)
    this.customerService
      .getUserMenuRoles(userDetails.data.employee_id)
      .subscribe(
        (resp: any) => {
          if (resp && resp.status_code === 200) {
            this.getDashboardData();
            if (resp && resp.data) {
              let menuRoles: any = [];
              resp.data.forEach((element: any) => {
                menuRoles = [...menuRoles, ...element.menus];
              });
              localStorage.setItem('user-menu-role', JSON.stringify(menuRoles));
              localStorage.setItem(
                'user-project-role',
                JSON.stringify(resp.data)
              );
              localStorage.setItem('redirect_uri', data.redirect_uri);
              // this.router.navigateByUrl('/maindashboard');
            } else {
              localStorage.clear();
              window.location.href = environment.sso_url;
            }
          } else {
            localStorage.clear();
            window.location.href = environment.sso_url;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getDashboardData() {
    let obj = {
      command: "mat"
    };
    this.customerService.UserDashboard(obj).subscribe((res: any) => {  
      this.resp=res.data
      if(this.resp.length > 0){
        this.dashboardList=res.data[0].dash_board;
        console.log( this.dashboardList);
        if(this.dashboardList === "GAMS"){
          this.router.navigateByUrl('/GamsDashboard');
        }else if(this.dashboardList === "PROJECT"){
          this.router.navigateByUrl('/projectdashboard');
        }else{
          this.router.navigateByUrl('/maindashboard');
        }
      }else{
        this.router.navigateByUrl('/maindashboard');
      }
    });
  }
}
