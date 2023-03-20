import { HttpParams } from '@angular/common/http';
import { AuthService } from './../../../auth/auth.service';
import { Router } from '@angular/router';
import { AlertCallsService } from './../../../auth/alert-calls.service';
import { GreenkoUtils } from './../../../utils/flip.utils';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: any = [];

  colors$ = ['gd-blue', 'gd-green', 'gd-purple', 'gd-ligh-green'];
  searchValue: any;

  mainProjects$: any = [];
  date: string;

  constructor(
    public customerService: CustomerService,
    public utils: GreenkoUtils,
    public alertCall: AlertCallsService,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.date= moment(new Date()).format("DD-MM-YYYY")
    this.getAllProjects();
    this.utils.searchText.subscribe((searchValue: any) => {
      this.searchValue = searchValue;
      this.filterProjects();
    });
    let company:any = localStorage.getItem("CompanyCode")
    // let company = "cccode=901"
    let companyCode:any=[]
    if(company){
      companyCode = company.split("=")
      if(companyCode.length!==0){
        let obj={
          "command":"set",
          "company_code":companyCode[1]
        }
        this.customerService.userCompany(obj).subscribe((res:any)=>{
          if(res&&res['status_code']===200){
          localStorage.removeItem("CompanyCode")
          }
          if(res&&res["status_code"]===500&&res['message']==="Invalid company code"){
            this.logOut()
            this.alertCall.showWarning("Alert",res['message'])
         }
        })
      }
    }
  }
  logOut() {
    // this.router.navigateByUrl('**');
    const url: any = localStorage.getItem('redirect_uri');
    localStorage.clear();
    window.location.href = url+'/logout';
  }

  getAllProjects() {
    const user = this.authService.currentUserRoleDetails;
    console.log(user);
    if (user) {
      const params = new HttpParams()
        .set('email', user.work_email)
        .set('role', user?.app_details?.roles);

      this.customerService
        .getUserListProjects(params)
        .subscribe((resp: any) => {
          if (resp.status_code === 200) {
            this.projects$ = resp.data;
            this.mainProjects$ = resp.data;
          } else {
            this.alertCall.showWarning('Token', resp.message);
            const url: any = localStorage.getItem('redirect_uri');
            localStorage.clear();
            window.location.href = url;
          }
        });
    }
  }

  getColorClass() {
    const id = Math.floor(Math.random() * 3);
    if (id) {
      return this.colors$[id];
    }
  }

  filterProjects() {
    if (this.searchValue && this.searchValue.length > 2) {
      this.projects$ = this.mainProjects$.filter((book: any) =>
        book.proj_short_name
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      );
    } else {
      this.projects$ = this.mainProjects$;
    }
  }
  // filterProjects() {
  //   this.utils.searchText.emit(this.searchValue);
  // }
}
