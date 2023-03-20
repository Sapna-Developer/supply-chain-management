import { Component, OnInit } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-usercredentials",
  templateUrl: "./usercredentials.component.html",
  styleUrls: ["./usercredentials.component.scss"],
})
export class UsercredentialsComponent implements OnInit {
  displayedColumnsList: any[] = [
    "sno",
    "role",
    "sub_role",
    "department",
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
  RoleData$: any;
  SubRolesData$: any;
  DeptData$: any;
  constructor(
    private custservice: CustomerService,
    private alertcall: AlertCallsService,
    private dialog: MatDialog
  ) {
    this.getUserRoleDetails();
    setTimeout(() => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((val) => {
          return this.filter(val);
        })
      );
      console.log(this.filteredOptions);
    });
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
  closedialogdata() {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.getModule();
    // this.getActionData();
    this.getData();
    this.getRoles();
    this.getSubRoles();
    this.getDept();
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }
  getData() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // "key": ""
    };
    this.custservice.addUserCredentials(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }
  savefinaldata(fr: any) {
    let obj = {
      command: "add",
      role:this.formdata.role,
      sub_role:this.formdata.sub_role,
      department:this.formdata.deparment_name,
      // user_name: this.formdata.username,
      // user_email: this.formdata.useremail,
      module: this.formdata.module,
      menu: this.userMenu,
      add: this.userAdd,
      edt: this.userEdt,
      del: this.userDel,
      view: this.userView,
    };
    this.custservice.addUserCredentials(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);
        Swal.fire({
          text: res["message"],
          title: res["reference"],
          icon: "success",
          // title: res['reference'],
          width: 500,
        });
        fr.reset();

        this.clearCheckBox();
        this.actionArray = [];
        this.dataSource.data = [];
        this.SNO = [];
        this.Menu = [];
        this.Action = [];
        this.getData();
      } else {
        this.alertcall.showWarning("Accepted", res["message"]);
        this.clearCheckBox();
        this.SNO = [];
        this.Menu = [];
        this.Action = [];
      }
    });
  }
  getModule() {
    let obj = {
      command: "mod",
      key: this.selectedmodulevalue || "",
    };
    this.custservice.getUserCredentialsModule(obj).subscribe((res: any) => {
      this.userModule = res.data;
      console.log(this.userModule);
    });
  }
  getMenu() {
    let obj = {
      command: "men",
      module: this.formdata.module,
      role:this.formdata.role,
      sub_role:this.formdata.sub_role,
      department:this.formdata.deparment_name,
      // user_name: this.formdata.username,
      // user_email: this.formdata.useremail,
      key: this.selectedmenuvalue || "",
    };
    this.custservice.getUserCredentialsMenu(obj).subscribe((res: any) => {
      if(res.status_code ===200){
        let newdata: any = [];
        newdata = res.data;
        this.userMenu = [];
        if(this.formdata.module !==""){
        newdata[0].menu.forEach((item: any) => {
          console.log(item);
          this.userMenu.push(item);
        });
        this.userAdd = [];
        newdata[0].add.forEach((item: any) => {
          console.log(item);
          this.userAdd.push(item);
        });
        this.userDel = [];
        newdata[0].del.forEach((item: any) => {
          console.log(item);
          this.userDel.push(item);
        });
        this.userEdt = [];
        newdata[0].edt.forEach((item: any) => {
          console.log(item);
          this.userEdt.push(item);
        });
        this.userView = [];
        newdata[0].view.forEach((item: any) => {
          console.log(item);
          this.userView.push(item);
        });
        console.log(this.userMenu);
       
          this.dataSource.data = this.userMenu[0];
        }
      }
    });
  }
  getModuleData(ev: any) {
    this.selectedmodulevalue = ev.target.value;
    console.log(  this.selectedmodulevalue);
    
    if (this.selectedmodulevalue.length > 1) {
      console.log(this.selectedmodulevalue);
      this.getMenu();
    }
    if (!this.selectedmodulevalue) {
      this.getMenu();
    }
  }
  selectedmoduleVALUE() {
    if(this.formdata.module !==""){
      this.getMenu();
    }
  }
  getUserRoleDetails() {
    const params: any = {};

    if (this.userSearchObj.user) {
      params.email = this.userSearchObj.user;
    }
  }
  getUserDetails(ev: any, type: any) {
    let user;
    if (ev && type === "user") {
      user = this.allUsers$.find((x: any) => x.work_email === ev);
    }
  }
  filter(val: string): any {
    console.log(val);

    if (!val) {
      return [];
    }
    return this.custservice.getSearchUsers(val).pipe(
      map((response: any) => {
        this.allUsers$ = response.data || [];
        console.log(this.allUsers$);
        this.allUsers$.forEach((ele: any) => {
          console.log(ele);
          if (ele.usename == this.formdata.username) {
            this.formdata.useremail = ele.work_email;
            this.getMenu();
          }
        });
        return response.data || [];
      })
    );
  }
  checkboxes: any[] = [
    { name: "Add" },
    { name: "Edit" },
    { name: "Delete" },
    { name: "View" },
  ];
  GetStatsview(event: any, data: any) {
    console.log(this.userMenu[0]);
  }
  GetStatsedit(event: any, data: any) {
    console.log(this.userMenu[0]);
  }
  GetStatsdelete(event: any, data: any) {
    console.log(this.userMenu[0]);
  }
  GetStats(event: any, data: any) {
    console.log(this.userMenu[0]);
  }
  clearCheckBox() {
    this.userMenu = [];
    this.formdata={};
    // this.formdata.module = null;
    // this.formdata.username = null;
    // this.formdata.useremail = null;
    console.log(this.userMenu);
  }

  //roles
  // filterRoledata(ev: any) {
  //   console.log(ev.target.value);
  //   this.selectedconname = ev.target.value;
  //   if (this.selectedconname.length > 2) {
  //     this.getAll();
  //   }else{
  //     this.getAll()
  //   }
  // }
  // getContractdata() {
  //   let obj = {
  //     command: "lst",
  //     lmt: 100000,
  //     pid: 1,
  //     key: this.selectedconname || "",
  //   };
  //   this.custservice.getcontractormasterdata(obj).subscribe((res: any) => {
  //     this.contracordata = res.data;
  //   });
  // }
  getRoles() {
    this.custservice.getAllRoles().subscribe((resp: any) => {
        if (resp && resp.status_code === 200) {
          this.RoleData$ = resp.data;
          console.log(this.RoleData$);
          
        }
      });
  }
  getSubRoles() {
    this.custservice.getAllSubRoles().subscribe((resp: any) => {
        if (resp && resp.status_code === 200) {
          this.SubRolesData$ = resp.data;
        }
      });
  }
  getDept() {
    this.custservice.getAllDept().subscribe((resp: any) => {
        if (resp && resp.status_code === 200) {
          this.DeptData$ = resp.data;
        }
      });
  }
  moduleRoles(){
    this.formdata.module="";
    setTimeout(() => {
      this.userMenu=[];
    }, 100);
  }
}
