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
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-signaturelevels',
  templateUrl: './signaturelevels.component.html',
  styleUrls: ['./signaturelevels.component.scss']
})
export class SignaturelevelsComponent implements OnInit {
  displayedColumnsList: any[] = [
    "sno",
    // "Id",
    "document_name",
    "description",
    "level",
    "role",
    "sub_role",
    "department",
    "action",
  ];
  SubRolesData$: any;
  RoleData$: any;
  formdata: any = {};
  editModel: any = {};
  DeptData$: any;
  demo1TabIndex: any = 0;
  document_name$: any;
  saveddataarray: any[] = [];
  dataSourceList: any;
  dataSourcemain = new MatTableDataSource();
  totalRecords: any;
  editedId: any;
  editdataa: any;
  deletemodel: any = {};
  pageIndex: any = 1;
  pageSize: any = 10;
  btn: any = "Save";
  deleteId: any;
  reaData: boolean;
  selecteddocumentNumb: any;
  constructor(private custservice: CustomerService,
    private alertcall: AlertCallsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.tab == "notificationsissue") {
        this.demo1TabIndex = 1;
        console.log(params);
      } else {
        this.demo1TabIndex = 0;
      }
    });
    this.getRoles();
    this.getSubRoles();
    this.getDept();
    this.getDocumentName();
    this.getSignatureData();
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

  getDocumentName(){
    let obj = {
      command: "doc"
    }
    this.custservice.SignLevel(obj).subscribe((res: any) => {
      this.document_name$=res.data;
    });
  }

  //form
  savefinaldata(fr: any) {
    if(this.btn == "Save"){

      let obj = {
        command: "add",
        role:this.formdata.role,
        sub_role:this.formdata.sub_role,
        department:this.formdata.department,
        document_name: this.formdata.document_name,
        description:this.formdata.description
      };
      this.custservice.SignLevel(obj).subscribe((res: any) => {
        if (res && res["status_code"] === 200) {
          // this.alertcall.showSuccess("Accepted", res["message"]);
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.getSignatureData();
        } else {
           this.alertcall.showWarning("Accepted", res["message"]);
        }
      });
    }else{
      let obj = {
        command: "edt",
        id: this.editedId,
        role:this.formdata.role,
        sub_role:this.formdata.sub_role,
        department:this.formdata.department,
        document_name: this.formdata.document_name,
        description:this.formdata.description
      };
      this.custservice.SignLevel(obj).subscribe((res: any) => {
        if (res && res["status_code"] === 200) {
          // this.alertcall.showSuccess("Accepted", res["message"]);
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.btn == "Save"
          this.getSignatureData();
        } else {
           this.alertcall.showWarning("Accepted", res["message"]);
        }
      });
    }
  }

  //clear
  clearCheckBox(){
    this.formdata={}
  }

  //list
  getSignatureData() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      key: this.formdata.document_name
    };
    this.custservice.SignLevel(obj).subscribe((res: any) => {
       this.reaData = false;
       this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      console.log(this.dataSourcemain.data);
      
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }

  // edit
  editgidata(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px",
    });
    this.editedId = data.id;
  }

  saveeditreason() {
    let obj = {
      command: "mat",
      id: this.editedId,
    };
    this.custservice.SignLevel(obj).subscribe((res: any) => {
      this.dialog.closeAll();
      // console.log(res.data);
      this.editdataa = res.data[0];
      console.log(this.editdataa);
      (this.formdata.role = this.editdataa.role),
      (this.formdata.sub_role = this.editdataa.sub_role),
      (this.formdata.department = this.editdataa.department),
      (this.formdata.description = this.editdataa.description),
      (this.formdata.document_name= this.editdataa.document_name),
        //  this.document_name$.forEach((ele:any)=>{
        //   if(ele.document_name===this.editdataa.document_name){
        //     console.log("entered");
            
        //   }
        //  })
      // this.demo1TabIndex = 0;
      this.btn = "Update";
     
    });
  }


  //delete
  deleteItem(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
      // scrollStrategy: new NoopScrollStrategy()
    });
    this.deleteId = rw.id;
  }
  deleteFile() {
    let obj = {
      command: "del",
      id: this.deleteId,
      reason: this.deletemodel.reason,
    };
    this.custservice.SignLevel(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        // this.alertcall.showSuccess("Accepted", res["message"]);
        Swal.fire({
          text: res["message"],
          title: res["reference"],
          icon: "success",
          // title: res['reference'],
          width: 500,
        });
        this.dialog.closeAll();
        this.getSignatureData();
        this.deletemodel.reason = "";
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
  onpageevent(event:any){
    this.pageIndex=event.pageIndex+1;
    this.pageSize= event.pageSize;
    this.getSignatureData()
  }

  getdocumentdata(ev:any){
    this.selecteddocumentNumb=ev.target.value
    if(this.selecteddocumentNumb.length>2){
      this.getDocumentName()
    }if(!this.selecteddocumentNumb){
      this.getDocumentName()
    }
      }
  selectedDocNum(){
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      key: this.formdata.document_name
    };
    this.custservice.SignLevel(obj).subscribe((res: any) => {
       this.reaData = false;
       this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      console.log(this.dataSourcemain.data);
      
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }
}
