import { Component, Injector, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "src/app/services/customer.service";
import * as moment from "moment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NoopScrollStrategy } from "@angular/cdk/overlay";
import { Overlay } from "@angular/cdk/overlay";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import Swal from "sweetalert2";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-materialrequest",
  templateUrl: "./materialrequest.component.html",
  styleUrls: ["./materialrequest.component.scss"],
})
export class MaterialrequestComponent implements OnInit {
  selectedmaterial1: any;
  smsdata: any;
  fileUploadUrls: any[] = [];
  createNewFile: any = {};
  girnumber: any;
  filedata: any;
  deleteid: any;
  imageUrl = environment.base_url;
  dialogRef: any = null;
  editednumber: any;
  editdataa: any;
  resultgirnumber: any;
  logdata: any;
  editModel: any = {};
  wolistdta: any;
  selectedwo: any;
  wodata: any;
  selectedconname: any;
  vehicledata: any;
  selectedvehicledata: any;
  columnname: any;
  searchData: string;
  constructor(
    private dialog: MatDialog,
    private custservice: CustomerService,
    private snackbar: MatSnackBar,
    public overlay: Overlay,
    private alertcall: AlertCallsService,
    private injector: Injector
  ) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  displayedColumns: any[] = [
    "sno",
    "materialCode",
    "materialDescription",
    "uom",
    "quantity",
    "comments",
    "locations",
    "purpose",
    "action",
  ];
  displayedColumnsList: any[] = [
    "sno",
    "MSRNnum",
    "date",
    "cmpnyName",
    "contractorName",
    "wrkordrnum",
    "action",
  ];

  dataSource = new MatTableDataSource();
  dataSourceList = new MatTableDataSource();

  dialogdata: any = {};
  dialogdataedit: any = {};
  formdata: any = {};
  matcode: any;
  uom: any;
  quantity: any;
  comments: any;
  location: any;
  purpose: any;
  companyname: any;
  contractorname: any;
  tocompanyname: any;
  receivername: any;
  // requesttype: any;
  workordernum: any;
  formdatatotablearray: any[] = [];
  materialCODE: any;
  materialNAME: any;
  masterData: any;
  companyData: any;
  contractorData: any;
  selectedmaterial: any;
  dialogdataeditmatcode: any;
  editedmatrequestdata: any[] = [];
  selectedIndex: any;
  systemref: any;
  finaldataarray: any[] = [];
  SNO: any[] = [];
  matCode: any[] = [];
  matName: any[] = [];
  UOM: any[] = [];
  Quantity: any[] = [];
  Comments: any[] = [];
  Purpose: any[] = [];
  Location: any[] = [];
  reaData: boolean;
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  button: any;
  dialogeditmatdes: any;
  // editDATAA: any = false;
  editformdata: any = {};
  formediteddata: any = {};
  deleteNumber: any;
  number: any;
  SAVEdata: any = true;
  btn: any = "Save";
  demo1TabIndex: any = 0;
  filenamearray: any[] = [];
  filenamearray1: any[] = [];
  fileUploadUrlsgir: any[] = [];
  selectedfiles: any[] = [];
  deletemodel: any = {};
  validationmsg: any = false;
  ngOnInit(): void {
    this.formdata.date = moment(new Date()).format("YYYY-MM-DD");
    this.button = "Save";
    this.getmasterdata();
    this.getcompanydata();
    this.getcontractordata();
    this.getData();
    this.getlogdata();
    this.getworkorderlistData();
    this.getvehiclelist()
  }
  filtervehicledata(ev:any){
    this.selectedvehicledata=ev.target.value
    if(this.selectedvehicledata.length>1){
      this.getvehiclelist()
    }else if(!this.selectedvehicledata){
      this.getvehiclelist()
    }
  }
  getvehiclelist(){
let obj={
  "command":"lst",
  "key": this.selectedvehicledata
}
this.custservice.vehicleMasterListData(obj).subscribe((res:any)=>{
  console.log(res.data);
  
 this.vehicledata=res.data
  
})
  }
  selectedvehiclenumber(){
  }
  filteformrdata(ev: any) {
    this.selectedwo = ev.target.value;
    if (this.selectedwo.length > 2) {
      this.getworkorderlistData();
    }
    if (!this.selectedwo) {
      this.getworkorderlistData();
    }
  }
  filtecontractordatadata(ev: any) {
    this.selectedconname = ev.target.value;
    if (this.selectedconname.length > 2) {
      this.getcontractordata();
    }
    if (!this.selectedconname) {
      this.getcontractordata();
    }
  }
  getworkorderlistData() {
    let obj = {
      command: "wor",
      key: this.selectedwo || "",
    };
    this.custservice.addrequestmaterialdata(obj).subscribe((res: any) => {
      this.wolistdta = res.data;
    });
  }
  selectedWorkOrder() {
    let obj = {
      command: "mat",
      key: this.formdata.workordernum,
    };
    this.custservice.getWRdropdownData(obj).subscribe((res: any) => {
      this.wodata = res.data[0];
      this.formdata.companyname = this.wodata.company_name;
      this.formdata.contractorname = this.wodata.contractor_name;
    });
  }
  getlogdata() {
    let obj = {
      command: "log",
      key: "GoodsIssueRequest",
    };
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log;
      }
    });
  }
  editdata(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px",
    });
    this.editednumber = data.number;
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      field: "number",
      key: this.editednumber,
    };
    this.custservice.addrequestmaterialdata(obj).subscribe((res: any) => {
      this.dialog.closeAll();
      this.editdataa = res.data[0];
      this.finaldataarray = res.data;
      this.dataSource.data = this.finaldataarray;
      this.formdata.date = moment(this.editdataa.date).format("YYYY-MM-DD");
      this.formdata.tocompanyname = this.editdataa.to_company_name;
      this.formdata.companyname = this.editdataa.company_name;
      this.formdata.workordernum = this.editdataa.work_order_number;
      this.formdata.contractorname = this.editdataa.contractor_name;
      this.formdata.receivername = this.editdataa.receiver_name;
      this.formdata.vehiclenumber = this.editdataa.vehicle_number;
      // this.formdata.requesttype = this.editdataa.request_type;
      this.btn = "Update";
      this.demo1TabIndex = 0;
    });
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: "800px",
    });
    this.girnumber = row1.number;
    this.getexistingfiles();
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.girnumber)
      .set("document_type", "Goods Issue Requset");
    // let obj={
    //   "document_number" : this.dmrnumber,
    //   "document_type": "Daily Material Receipt"
    // }
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
      .set("document_number", this.girnumber)
      .set("document_type", "Goods Issue Requset")
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
    const postData = new FormData();
    postData.append("document_type", "Goods Issue Requset");
    postData.append("document_number", this.girnumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file);
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);
        this.getexistingfiles();
        this.fileUploadUrls = [];
        this.filenamearray = [];
      } else {
        this.alertcall.showWarning("Error", res["message"]);
      }
    });
  }
  uploadprfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsgir = fileInput.target.files;
      for (const file of this.fileUploadUrlsgir) {
        this.filenamearray1.push(file.name);
        this.selectedfiles.push(file);
      }
    }
  }
  uploadedselctedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Goods Issue Requset");
    postData.append("document_number", this.resultgirnumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file);
    }

    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.fileUploadUrlsgir = [];
        this.selectedfiles = [];
        this.filenamearray1 = [];
      } else {
      }
    });
  }
  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  addMaterialRequest(data: any) {
    this.dialog.open(data, {
      width: "1100px",
    });
  }
  closedialogdata() {
    this.dialog.closeAll();
  }
  binddatatotable(form: any) {
    this.dialogdata["material_code"] = this.materialCODE;
    this.dialogdata["material_description"] = this.materialNAME;
    console.log(this.dialogdata);
    this.finaldataarray.push(this.dialogdata);
    // this.formdatatotablearray.push(this.dialogdata)
    // console.log(this.formdatatotablearray);
    this.dataSource.data = this.finaldataarray;
    console.log(this.dataSource.data);
    this.dialogdata = {};
    this.dialog.closeAll();
  }
  deleterow(index: any) {
    console.log(index);

    this.finaldataarray.splice(index, 1);
    this.dataSource.data = this.finaldataarray;

    console.log(this.dataSource.data);
  }
  editbindedtabledata(row1: any, index: any, data: any) {
    console.log(row1);
    this.selectedIndex = this.finaldataarray.indexOf(row1);
    this.dialog.open(data, {
      width: "1100px",
    });
    this.masterData.forEach((val: any) => {
      if (val.code == row1.material_code) {
        this.systemref = val.system_reference_1;
      }
    });
    this.button = "Update";
    this.dialogdataedit.matcode = this.systemref || row1.matcode;
    this.dialogdataedit.uom = row1.uom || row1.unit_of_measurment;
    this.dialogdataedit.quantity = row1.quantity;
    this.dialogdataedit.comments = row1.comments;
    this.dialogdataedit.location = row1.location || row1.locations;
    this.dialogdataedit.purpose = row1.purpose;
  }
  editbinddatatotable() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.dialogdataedit.matcode) {
        this.dialogdataeditmatcode = el.code;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
      console.log(el.code, el.name);
    });
    this.dialogdataedit["material_code"] = this.materialCODE;
    this.dialogdataedit["material_description"] = this.materialNAME;
    this.finaldataarray.splice(this.selectedIndex, 1, this.dialogdataedit);
    this.dataSource.data = this.finaldataarray;
    console.log(this.dataSource.data);
    this.finaldataarray[this.selectedIndex].matcode =
      this.dialogdataeditmatcode;
    this.dialogdataedit = {};
    this.dialog.closeAll();
  }
  getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
      key: this.selectedmaterial || this.selectedmaterial1,
    };
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      this.masterData = res.data;
    });
  }
  getmaterialDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedmaterial = ev.target.value;
    if (this.selectedmaterial.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterial) {
      this.getmasterdata();
    }
  }
  getmaterialDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedmaterial1 = ev.target.value;
    if (this.selectedmaterial1.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterial1) {
      this.getmasterdata();
    }
  }
  selectedmaterialuom() {
    //console.log(this.dialogdata.matcode);
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.dialogdata.matcode) {
        this.dialogdata.uom = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });
    this.getSMSdata();
  }
  selectedmaterialuomedit() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.dialogdataedit.matcode) {
        this.dialogdataedit.uom = el.uom_1;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    console.log(this.matcode);
  }
  getcompanydata() {
    let obj = {
      command: "lst",
    };
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data;
      console.log(this.companyData);
    });
  }
  getcontractordata() {
    let obj = {
      command: "lst",
      key: this.selectedconname || "",
    };
    this.custservice.getcontractormasterdata(obj).subscribe((res: any) => {
      this.contractorData = res.data;
    });
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
    };
    this.custservice.getmaterialrequestdata(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });

    console.log(this.totalRecords);
  }

  savefinaldata(fr: any, index: any) {
    
    //form validation start
    if(fr.invalid){
      return
    }
    //form validation end


    // this.validationmsg=false;
    // for(let i of Object.values(fr.value)){
    // if(i=="" || i===undefined || i===null){
    //   this.validationmsg=true;
    // }
    // else{
    //   this.validationmsg=false;
    // }}
    // if(!this.validationmsg){
    if (this.btn === "Save") {
      this.SAVEdata = true;
      this.finaldataarray.forEach((val: any, index) => {
        this.SNO.push(index + 1);
        this.matCode.push(val.material_code);
        this.matName.push(val.material_description);
        this.UOM.push(val.uom);
        this.Quantity.push(val.quantity);
        this.Comments.push(val.comments);
        this.Location.push(val.location);
        this.Purpose.push(val.purpose);
      });
      console.log(this.finaldataarray);
      console.log(
        this.Location,
        this.Comments,
        this.Purpose,
        this.Quantity,
        this.UOM,
        this.matCode,
        this.matName,
        this.SNO
      );

      let obj = {
        date: moment(this.formdata.dateee).format("YYYY-MM-DD"),
        company_name: this.formdata.companyname,
        to_company_name: this.formdata.tocompanyname,
        contractor_name: this.formdata.contractorname,
        receiver_name: this.formdata.receivername,
        vehicle_number: this.formdata.vehiclenumber,
        // request_type: this.formdata.requesttype,
        line_item: this.SNO,
        material_code: this.matCode,
        material_description: this.matName,
        unit_of_measurment: this.UOM,
        quantity: this.Quantity,
        comments: this.Comments,
        locations: this.Location,
        purpose: this.Purpose,
        work_order_number: this.formdata.workordernum,
        command: "add",
      };
      this.custservice.addrequestmaterialdata(obj).subscribe((res: any) => {
        this.validationmsg = false;
        if (res && res["status_code"] == "200") {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.finaldataarray = [];
          this.dataSource.data = [];
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.Quantity = [];
          this.Comments = [];
          this.Location = [];
          this.Purpose = [];
          this.getData();
          this.getlogdata();
          this.resultgirnumber = res["reference"];
          if (this.fileUploadUrlsgir.length > 0) {
            this.uploadedselctedfiles();
          }
        } else {
          this.alertcall.showWarning("Error", res["message"]);
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.Quantity = [];
          this.Comments = [];
          this.Location = [];
          this.Purpose = [];
        }
        console.log(obj);
      });
    }
    if (this.btn === "Update") {
      this.finaldataarray.forEach((val: any, index) => {
        this.SNO.push(index + 1);
        this.matCode.push(val.material_code);
        this.matName.push(val.material_description);
        this.UOM.push(val.uom || val.unit_of_measurment);
        this.Quantity.push(val.quantity);
        this.Comments.push(val.comments);
        this.Location.push(val.location);
        this.Purpose.push(val.purpose);
      });
      console.log(this.finaldataarray);
      console.log(
        this.Location,
        this.Comments,
        this.Purpose,
        this.Quantity,
        this.UOM,
        this.matCode,
        this.matName,
        this.SNO
      );

      let obj = {
        reason: this.editModel.reason,
        date: moment(this.formdata.dateee).format("YYYY-MM-DD"),
        company_name: this.formdata.companyname,
        to_company_name: this.formdata.tocompanyname,
        contractor_name: this.formdata.contractorname,
        receiver_name: this.formdata.receivername,
        vehicle_number: this.formdata.vehiclenumber,
        // request_type: this.formdata.requesttype,
        line_item: this.SNO,
        material_code: this.matCode,
        material_description: this.matName,
        unit_of_measurment: this.UOM,
        quantity: this.Quantity,
        comments: this.Comments,
        locations: this.Location,
        purpose: this.Purpose,
        work_order_number: this.formdata.workordernum,
        command: "edt",
        number: this.editednumber,
      };
      this.custservice.addrequestmaterialdata(obj).subscribe((res: any) => {
        this.validationmsg = false;
        if (res && res["status_code"] == "200") {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.finaldataarray = [];
          this.dataSource.data = [];
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.Quantity = [];
          this.Comments = [];
          this.Location = [];
          this.Purpose = [];
          this.getData();
          this.getlogdata();
          this.editModel.reason = "";
          this.resultgirnumber = this.editednumber;
          if (this.fileUploadUrlsgir.length > 0) {
            this.uploadedselctedfiles();
          }
          this.validationmsg = false;
          this.btn = "Save";
        } else {
          this.alertcall.showWarning("Error", res["message"]);
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.Quantity = [];
          this.Comments = [];
          this.Location = [];
          this.Purpose = [];
        }
        console.log(obj);
      });
    }
    // }
  }
  editupdatedData(data: any) {
    //this.editDATAA = true;
    let obj = {
      command: "mat",
      key: data.number,
      field: "number",
    };
    this.custservice.editrequestmaterialdata(obj).subscribe((res: any) => {
      this.finaldataarray = res.data;
      this.dataSource.data = this.finaldataarray;
      this.formediteddata = res.data[0];
      this.editformdata.companyname = this.formediteddata.company_name;
      this.editformdata.dateee = moment(this.formediteddata.date).format(
        "YYYY-MM-DD"
      );
      //this.editformdata.tocompanyname = this.formediteddata.to_company_name
      this.editformdata.contractorname = this.formediteddata.contractor_name;
      this.editformdata.workordernum = this.formediteddata.work_order_number;
      // this.editformdata.requesttype = this.formediteddata.request_type;
    });
  }

  deletematreqdata(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
      // scrollStrategy: new NoopScrollStrategy()
    });
    this.deleteNumber = rw.number;
    console.log(this.deleteNumber);
    console.log(rw, data);
  }

  deleteItem() {
    let obj = {
      command: "del",
      number: this.deleteNumber,
      reason: this.deletemodel.reason,
    };
    this.custservice.deletematerialrequestdata(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);
        this.dialog.closeAll();
        this.deletemodel.reason = "";
        this.getData();
        this.getlogdata();
      } else {
        this.alertcall.showWarning("Accepted", res["message"]);
      }
    });
  }
  clearData() {
    // this.finaldataarray=[];
    // this.dataSource.data=[];
    this.formdata.companyname = "";
    this.formdata.date = "";
    this.formdata.companyname = "";
    this.formdata.tocompanyname = "";
    (this.formdata.contractorname = ""),
      (this.formdata.workordernum = ""),
      (this.formdata.receivername = ""),
      (this.formdata.vehiclenumber = ""),
      (this.dataSource.data = []);
  }

  getSMSdata() {
    let obj = {
      material_code: this.materialCODE,
      command: "sms",
    };
    this.custservice.getsmsdata(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res["status_code"] == "200") {
        console.log(res);

        this.smsdata = res.message;

        // this.total=0
        // this.totalvalue=0
        //   this.smsdata.forEach((el:any)=>{
        //     this.total+= el.quantity;
        //     this.totalvalue += el.value;
        //     console.log(el.quantity);
        // })

        // var duplicates =  this.smsdata.reduce(function(acc:any, el:any, i:any, arr:any) {
        //   if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
        // }, []);

        // document.write(duplicates);
        // unique = [...new Set(this.smsdata.map((ele:any) => ele.company_name))];
        // if (unique.length === 1) {
        // console.log(unique);
        // }
        // this.smsdata.forEach((element:any) => {
        // this.invoice_number:any[]=[]
        // this.companyname.push(element.company_name)
        // this.invoice_date.push(element.invoice_date)
        // this.deliverychallanno.push(element.dc_number)
        //  this.duplicate_cmpnynme= [...new Set( this.smsdata)];

        //  if(this.duplicate_cmpnynme){
        //    let strgarray:any=[]
        //    this.duplicate_cmpnynme.forEach((ele:any)=>{
        //     strgarray.push(ele.storage_location)
        //    })
        //    console.log(strgarray);

        //  }
        // })
      } else {
        this.smsdata = "";
        this.alertcall.showWarning("Warning", res["message"]);
      }
    });
  }

  onChange() {
    console.log('Selected:',this.columnname);
    this.searchData=""    
  // this.searchData=this.columnname
  // let selectedColumn=this.searchData
  }
  search(){
    console.log(this.searchData); 
   let obj= {"command":"lst","field":this.columnname ,"key":this.searchData,"lmt":this.pageSize,"pid":this.pageIndex}
    if(this.searchData.length>2){
      this.custservice.getmaterialrequestdata(obj).subscribe((res: any) => {
        this.reaData = false;
        this.totalRecords = res?.count;
        this.dataSourceList.data = res.data;
        if (res.data.length == 0) {
          this.reaData = true;
        }
      });
    }else if(!this.searchData){
      this.getData()
      this.columnname=""
    }
  }


}

