import { Component, Injector, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import Swal from 'sweetalert2';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-vehiclemaster',
  templateUrl: './vehiclemaster.component.html',
  styleUrls: ['./vehiclemaster.component.scss']
})
export class VehiclemasterComponent implements OnInit {

  constructor(private dialog: MatDialog, private custservice: CustomerService,
    private snackbar: MatSnackBar, public overlay: Overlay,
    private alertcall: AlertCallsService, public router: Router,
    public route: ActivatedRoute, private injector: Injector) { }

  dataSourceList = new MatTableDataSource();

  displayedColumnsList: any[] = [
    "sno", "contractorName", "vehicleNumber", "vehicleModel", "VehicleType", "accounting", "action"
  ]

  formdata: any = {}
  vehiclenumber: any
  contractorname: any
  vehiclemodel: any
  vehicletype: any
  accounting: any
  contractorData: any
  activitylogdata: boolean = true;
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  vehicleMasterData: any
  btn: any = "Save"
  createNewFile: any = {}
  fileUploadUrlsvehiclemaster: any[] = []
  filenamearray: any[] = []
  filenamearray1: any[] = []
  selectedfiles: any[] = []
  logdata: any;
  deletemodel: any = {}
  deleteNumber: any
  VehicleNumber : any
  selectedData:any
  editModel: any = {}
  editednumber:any;
  demo1TabIndex: any = 0;
  updatingData : any={}
  fileUploadUrls: any[] = []
  filedata: any;
  imageUrl = environment.base_url
  deleteid: any;
  dialogRef: any ;
  resultVehicleNumber : any
  fileUploadUrlsVehicleMaster: any[] = []

  getContractorData() {
    let obj = {
      "command": "lst",
    }
    this.custservice.getcontractormasterdata(obj).subscribe((res: any) => {
      this.contractorData = res.data;

    })
  }
  getvehicleMasterData() {
    let obj = {
      "command": "lst"
    }
    this.custservice.vehicleMasterListData(obj).subscribe((res: any) => {
      console.log(res.data)
      this.vehicleMasterData = res.data
      console.log(res)
    })
  }
  getVehicleMasterListData() {
    let obj = {
      "command": "lst",
      "pid": this.pageIndex,
      "lmt": this.pageSize
    }
    this.custservice.vehicleMasterListData(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }
    })
    console.log(this.totalRecords);
  }
  uploadvehiclemasterfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsvehiclemaster = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for (const file of this.fileUploadUrlsvehiclemaster) {
        this.filenamearray1.push(file.name)
        this.selectedfiles.push(file)

      }
    }
  }
  deleteVehiclemasterData(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px',
      scrollStrategy: new NoopScrollStrategy()
    })
    this.deleteNumber = rw.vehicle_number;
    console.log(this.deleteNumber)
    console.log(rw, data)
  }
  deleteItem() {
    let obj = {
      "command": "del",
      "vehicle_number": this.deleteNumber,
    }
    this.custservice.deleteVehicleMasterData(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.getVehicleMasterListData()
        // this.deletemodel.reason = ""
      } else {
        this.alertcall.showWarning('Error', res['message']);
      }
    })
  }
  filterdata(ev: any) {
    console.log(ev.target.value);
    this.selectedData= ev.target.value
    if (this.selectedData.length > 2) {
      this.getvehicleMasterData()
    }
    if (!this.selectedData) {
      this.getvehicleMasterData()
    }
  }
 
  getlogdata() {
    let obj = {
      command: "log",
      key: "VehicleMaster"
    }
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log
      }
      this.logdata = res.log
    })
  }



  savefinaldata(fr: any) {
    if (this.btn === 'Save') {
      let obj = {
        "command": "add",
        "contractor_name" : this.formdata.contractorname,
        "vehicle_number" : this.formdata.vehiclenumber,
        "vehicle_type" : this.formdata.vehicletype,
        "vehicle_model" : this.formdata.vehiclemodel,
        "accounting" : this.formdata.accounting     
      }
      this.custservice.addVehiclemasterData(obj).subscribe((res: any) => {
        if (res && res['status_code'] == "200") {
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
          });
          fr.reset();
          this.getVehicleMasterListData();
          this.getlogdata();
        } else {
          this.alertcall.showWarning('Accepted', res['message']);
        }
      })
    } if (this.btn === 'Update') {
      let obj = {
        "command" : "edt",
        "contractor_name" : this.formdata.contractorname,
        "vehicle_number" : this.formdata.vehiclenumber,
        "vehicle_type" : this.formdata.vehicletype,
        "vehicle_model" : this.formdata.vehiclemodel,
        "accounting" : this.formdata.accounting  
      }
      this.custservice.addVehiclemasterData(obj).subscribe((res: any) => {
        if (res && res['status_code'] == "200") {
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            width: 500,
          });
          fr.reset();
          this.btn = "Save"
        } else {
          this.alertcall.showWarning('Accepted', res['message']);
        }
      })
    }
  }
  editdata(data:any) {
    // this.dialog.open(dialog, {
    //   width: "400px"
    // })
    this.editednumber = data.vehicle_number
    let obj = {
      command: "mat",
      field: "number",
      key: this.editednumber,
    }
    this.custservice.addVehiclemasterData(obj).subscribe((res: any) => {
      this.dialog.closeAll()
      console.log(res.data)
      this.demo1TabIndex = 0;
      this.btn = "Update"
      this.updatingData = res.data[0]
      console.log(this.updatingData)
      this.formdata.vehiclenumber = this.updatingData.vehicle_number
      this.formdata.contractorname = this.updatingData.contractor_name
      this.formdata.vehiclemodel = this.updatingData.vehicle_model
      this.formdata.vehicletype = this.updatingData.vehicle_type
      this.formdata.accounting = this.updatingData.accounting
    })
  }
  // editListdata(){
  //     let obj = {
  //       command: "mat",
  //       field: "number",
  //       key: this.editednumber,
  //     }
  //     this.custservice.addVehiclemasterData(obj).subscribe((res: any) => {
  //       this.dialog.closeAll()
  //       console.log(res.data)
  //       this.demo1TabIndex = 0;
  //       this.btn = "Update"
  //       this.updatingData = res.data[0]
  //       console.log(this.updatingData)
  //       this.formdata.vehiclenumber = this.updatingData.vehicle_number
  //       this.formdata.contractorname = this.updatingData.contractor_name
  //       this.formdata.vehiclemodel = this.updatingData.vehicle_model
  //       this.formdata.vehicletype = this.updatingData.vehicle_type
  //       this.formdata.accounting = this.updatingData.accounting
  //     })
  // }
  uploadedselctedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Vehicle Master");
    postData.append("document_number", this.resultVehicleNumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file);
    }

    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.fileUploadUrlsVehicleMaster = [];
        this.selectedfiles = [];
        this.filenamearray1 = [];
      } else {
      }
    });
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: "800px",
    });
    this.VehicleNumber = row1.vehicle_number;
    console.log(this.VehicleNumber)
    this.getexistingfiles();
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.VehicleNumber)
      .set("document_type", "Vehicle Master");
    this.custservice.getexistingfies(params).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.filedata = res.data;
        this.createNewFile.fileName = "";
      } else {
        this.filedata = "";
        console.log(this.filedata);
      }
    });
  }
  viewDoc(file: any) {
    const url = this.imageUrl + "/" + file.file_path;
    window.open(url, "_blank");
  }
  deleterowfile(row: any, data: any) {
    this.deleteid = data.id;
    this.dialogRef = this.dialog.open(row, {
      width: "400px",
    });
  }
  deleteexistingfile() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.VehicleNumber)
      .set("document_type", "Vehicle Master")
      .set("id", this.deleteid);
    this.custservice.deletefiles(params).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", "File Deleted Successfully");
        this.getexistingfiles();
        this.dialogRef.close();
      } else {
        this.alertcall.showWarning("Error", res["message"]);
      }
    });
  }
  uploadWbsFile(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrls = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for (const file of this.fileUploadUrls) {
        this.filenamearray.push(file.name);
      }
    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type", "Vehicle Master");
    postData.append("document_number", this.VehicleNumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file);
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);
        this.getexistingfiles();
        this.filenamearray = [];
        this.fileUploadUrls = [];
      } else {
        this.alertcall.showWarning("Error", res["message"]);
      }
    });
  }
  closemodel(){
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.getContractorData();
    this.getVehicleMasterListData();
    this.getvehicleMasterData();
    this.getlogdata();
  }

}
