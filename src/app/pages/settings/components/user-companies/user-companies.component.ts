import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Observable } from "rxjs";
@Component({
  selector: 'app-user-companies',
  templateUrl: './user-companies.component.html',
  styleUrls: ['./user-companies.component.scss']
})
export class UserCompaniesComponent implements OnInit {
  filteredProjects: Observable<any[]>;
  displayedColumnsList: any[] = [
    "sno",
    "username",
    "usermail",
    "module",
    "menu",
    "action",
  ];
  reaData: boolean;
  totalRecords: any;
  allUsers$: any;
  filteredOptions: any;
  myControl = new FormControl();
  newdata: any[] = [];
  // companydata: boolean;
  companydata: any[] = [];
  tableData: any;
  CompanyName: any[] = [];

  selectedMenus$: any = [];
  @ViewChild('menuInput')
  menuInput!: ElementRef<HTMLInputElement>;
  projects$: any;
  selectCompanyName: any;
  constructor(
    private custservice: CustomerService,
    private alertcall: AlertCallsService,
    private dialog: MatDialog
  ) {
    this.getUserRoleDetails();
    // setTimeout(() => {
    //   this.filteredProjects = this.menuControl.valueChanges.pipe(
    //     startWith(null),
    //     map((fruit: string | null) =>
    //       fruit ? this.projectFilter(fruit) : this.projects$.slice()
    //     )
    //   );
    // }, 1000);
  }
  userModule: any;
  userMenu: any[] = [];
  userAdd: any[] = [];
  userEdt: any[] = [];
  userView: any[] = [];
  userDel: any[] = [];
  formdata: any = {};
  dialogdata: any = {};
  username: any;
  useremail: any;
  Menu: any[] = [];
  module: any[] = [];
  dataSource = new MatTableDataSource();
  Action: any[] = [];
  actionArray: any[] = [];
  SNO: any[] = [];
  selectedmenuvalue: any;
  selectedmodulevalue: any;
  //selectedprVALUE:any;
  pageIndex: any = 1;
  pageSize: any = 10;
  dataSourceList = new MatTableDataSource();
  userSearchObj: any = {};
  array: any = [];
  mainarray: any = [];
  ADD: any = [];
  menuControl = new FormControl();
  removable = true;
  selectable = true;
  closedialogdata() {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    // this.getActionData();
    // this.getData();
    this.getCompanysdata();
    this.filter("")
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    // this.getData();
  }
  // getData() {
  //   let obj = {
  //     command: "lst",
  //     lmt: this.pageSize,
  //     pid: this.pageIndex,
  //     // "key": ""
  //   };
  //   this.custservice.addUserCredentials(obj).subscribe((res: any) => {
  //     this.reaData = false;
  //     this.totalRecords = res?.count;
  //     this.dataSourceList.data = res.data;
  //     if (res.data.length == 0) {
  //       this.reaData = true;
  //     }
  //   });
  // }

  savefinaldata(fr: any) {
    let obj = {
      command: "add",
      user_name: this.formdata.username,
      user_email: this.formdata.useremail,
      // company_name: this.formdata.companyname,
      company_name:this.selectedMenus$
    };
    this.custservice.usercompanyData(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);
        Swal.fire({
          text: res["message"],
          title: res["reference"],
          icon: "success",
          // title: res['reference'],
          width: 500,
        });
        this.gettableData();
        fr.reset();
        this.clearCheckBox();
        this.actionArray = [];
        this.dataSource.data = [];
        this.SNO = [];
        this.Menu = [];
        this.Action = [];
      
        // this.getData();
      } else {
        this.alertcall.showWarning("Accepted", res["message"]);
        this.clearCheckBox();
        this.SNO = [];
        this.Menu = [];
        this.Action = [];
      }
    });
  }

  getCompaniesData(ev:any){
    this.selectCompanyName=ev.target.value
    if(this.selectCompanyName.length>2){
      this.getCompanysdata()
    }if(!this.selectCompanyName){
      this.getCompanysdata()
    }
      }
  getCompanysdata() {
    let obj = {
      "command": "lst",
      // "lmt" : this.pageSize,
      "lmt": 10000,
      "pid": this.pageIndex,
      "key": this.selectCompanyName
    }
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      if (res) {
        this.companydata = res.data
      }
    })
  }

  getUserRoleDetails() {
    const params: any = {};

    if (this.userSearchObj.user) {
      params.email = this.userSearchObj.user;
    }
  }
  getUserDetails(ev: any, type: any) {
    // let user;
    // if (ev && type === "user") {
    //   user = this.allUsers$.find((x: any) => x.work_email === ev);
    //   this.formdata.useremail=user
    // }
    this.allUsers$.find((ele: any) => {
      console.log(ele);
      if (ele.username == this.formdata.username) {
        this.formdata.useremail = ele.work_email;
        // this.getMenu();
        this.gettableData();
      }
    });
  }
  // getData(ev:any){
  //   if(ev.target.value.length>1){
  //     this.filter()
  //   }
  // }
  filter(val: string): any {
    console.log(val);
    this.custservice.getSearchUsers(val).subscribe((res: any) => {
      console.log(res);
      this.allUsers$ = res.data
      
    })
    // if (!val) {
    //   return [];
    // }
    // this.custservice.getSearchUsers(val).pipe(
    //   map((response: any) => {
    //     this.allUsers$ = response.data || [];
    //     console.log(this.allUsers$);
    //     this.allUsers$.forEach((ele: any) => {
    //       console.log(ele);
    //       if (ele.usename == this.formdata.username) {
    //         this.formdata.useremail = ele.work_email;
    //         // this.getMenu();
    //         this.gettableData();
    //       }
    //     });
    //     return response.data || [];
    //   })
    // );
  }


  clearCheckBox() {
    this.userMenu = [];
    this.formdata.companyname = null;
    this.formdata.username = null;
    this.formdata.useremail = null;
    // this.menuControl.setValue(null);
    this.selectedMenus$= null;
    console.log(this.userMenu);
  }

  gettableData() {
    if (this.formdata.username !== null && this.formdata.useremail !== null) {
      let obj = {
        command: "com",
        user_email: this.formdata.useremail,
        user_name: this.formdata.username,
        "lmt": 100,
        "pid": this.pageIndex,
      }
      this.custservice.usercompanyData(obj).subscribe((res: any) => {
        this.tableData = res.data;
      });
    }
  }
  delCompanyData(data: any) {
    console.log(data);
    // console.log(data.company_name);
    let obj = {
      command: "del",
      user_name: data.user_name,
      user_email: data.user_email,
      company_name: data.company_name,
    };
    this.custservice.usercompanyData(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.gettableData();
        this.alertcall.showSuccess("Accepted", res["message"]);
        Swal.fire({
          text: res["message"],
          title: res["reference"],
          icon: "success",
          // title: res['reference'],
          width: 500,
        });

      }
    });
  }
  //select + search
  remove(fruit: any) {
    const index = this.selectedMenus$.indexOf(fruit);

    if (index >= 0) {
      this.selectedMenus$.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedMenus$.push(event.option.viewValue);
     this.menuInput.nativeElement.value = '';
     this.menuControl.setValue(null);
  }
  //Project
  // projectFilter(value: string): any {
  //   const filterValue = value.toLowerCase();

  //   return this.projects$.filter((fruit) =>
  //     fruit.menu_name.toLowerCase().includes(filterValue)
  //   );
  // }
}
