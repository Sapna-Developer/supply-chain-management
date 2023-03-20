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
  selector: 'app-userdashbords',
  templateUrl: './userdashbords.component.html',
  styleUrls: ['./userdashbords.component.scss']
})
export class UserdashbordsComponent implements OnInit {

  displayedColumnsList: any[] = [
    "sno",
    // "id",
    "role",
    "sub_role",
    "department",
    "dash_board",
    // "menu",
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
  selecteddashboardvalue: string;
  deleteNumber: any;
  deletemodel: any= {};
  constructor(
    private custservice: CustomerService,
    private alertcall: AlertCallsService,
    private dialog: MatDialog
  ) {}
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
    this.custservice.UserDashboard(obj).subscribe((res: any) => {
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
      dash_board:this.formdata.dashboard
    };
    this.custservice.UserDashboard(obj).subscribe((res: any) => {
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
        this.actionArray = [];
        this.dataSource.data = [];
        this.SNO = [];
        this.Menu = [];
        this.Action = [];
        this.getData();
      } else {
        this.alertcall.showWarning("Accepted", res["message"]);
        this.SNO = [];
        this.Menu = [];
        this.Action = [];
      }
    });
  }

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
  getdashboarddata(ev:any){
    console.log(ev.target.value);
    this.selecteddashboardvalue=ev.target.value
    if( this.selecteddashboardvalue.length>2){
   this.getModule()
    }
    if(! this.selecteddashboardvalue){
      this.getModule()
    }
  }
  getModule() {
    let obj = {
      command: "com",
      key: this.selecteddashboardvalue || "",
    };
    this.custservice.UserDashboard(obj).subscribe((res: any) => {
      this.userModule = res.data;
      console.log(this.userModule);
    });
  }


    //delete service integration
    deleteItem(rw: any, data: any) {

      this.dialog.open(data, {
        width: '400px',
        // scrollStrategy: new NoopScrollStrategy()
      })
      this.deleteNumber = rw.id
    }
    deleteFile() {
      let obj = {
        "command": "del",
        "id": this.deleteNumber,
        "reason": this.deletemodel.reason
      }
      this.custservice.UserDashboard(obj).subscribe((res: any) => {
        if (res && res['status_code'] == "200") {
          this.alertcall.showSuccess('Accepted', res['message']);
  
          this.dialog.closeAll()
          this.deletemodel.reason = ""
         this.getData();
        } else {
          this.alertcall.showSuccess('Accepted', res['message']);
        }
      })
    }
}
