import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { CustomerService } from "src/app/services/customer.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-gate-outward-gi",
  templateUrl: "./gate-outward-gi.component.html",
  styleUrls: ["./gate-outward-gi.component.scss"],
})
export class GateOutwardGIComponent implements OnInit {
  activitylogcolumns :any[]=[
    "sno",
    "username",
    "created_date",
    "reference_number",
    "description",
    "remarks",
    // "reason",
    "action",
  ];
  reaDatalog: boolean;
  totalRecordslog: any;
  dataSourcemainlog = new MatTableDataSource();
  displayedColumns: any[] = [
    "sno",
    "materialCode",
    "materialDescription",
    "unit_of_measurement",
    "quantity",
    "action",
  ];

  displayedColumns1: any[] = [
    "sno",
    "GateEntryNumber",
    "Date",
    "company_Name",
    "document_number",
    "gateId",
    "contractor_name",
    "action",
  ];

  demo1TabIndex: any = 0;
  model1: any = {};
  btn: any = "Save";
  companyData: any;
  contracordata: any;
  selectedmaterial: any;
  selectedmaterialedit: any;
  masterData: any;
  dialogdata: any = {};
  materialNAME: any;
  materialCODE: any;
  formdatatotablearray: any[] = [];
  dataSource = new MatTableDataSource();
  selectedIndex: number;
  systemref: any;
  editeddialogdata: any = {};
  editeddialogdatamatcode: any;
  SNO: any[] = [];
  matName: any[] = [];
  matCodee: any[] = [];
  UOM: any[] = [];
  qty: any[] = [];
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  dataSourcemain = new MatTableDataSource();
  deletemodel: any = {};
  filenamearray1: any[] = [];
  fileUploadUrls: any[] = [];
  createNewFile: any = {};
  fileUploadUrlsgi: any[] = [];
  selectedfiles: any[] = [];
  filenamearray: any[] = [];
  editdataa: any;
  deleteNumber: any;
  resultginumber: any;
  ginumber: any;
  filedata: any;
  deleteid: any;
  dialogRef: any = null;
  imageUrl = environment.base_url;
  searchData: any;
  columnname: any;
  logdata: any;
  selectedcontractor: any;
  documentNumbers:any=[]
  selectedDocumentNumber: any;
  constructor(
    private custservice: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService
  ) {}

  ngOnInit(): void {
    this.getcompanydata();
    this.getContractdata();
    this.getmasterdata();
    this.getGiListData();
    this.getlogdata();
    this.getdocumentnumbers()
  }
  getlogdata(){
    let obj={
      command:"log",
      key:"GateOutwardGI"
    }
    this.custservice.getActivityLog(obj).subscribe((res:any)=>{
      console.log(res);
      this.logdata = res.log;
      this.reaDatalog = false;
    this.totalRecordslog = res?.count;
    this.dataSourcemainlog = res.log;
    console.log(this.dataSourcemainlog);
    if (res.log.length == 0) {
      this.reaDatalog = true;
    }
    })
  }
  savefinaldata(fr: any) {
    if (this.btn === "Save") {
      this.formdatatotablearray.forEach((ele: any, index) => {
        this.SNO.push(index + 1);
        this.matName.push(ele.material_description);
        this.matCodee.push(ele.material_code);
        this.UOM.push(ele.uom || ele.unit_of_measurment);
        this.qty.push(Number(ele.qty || ele.quantity));
      });
      let obj = {
        command: "add",
        company_name: this.model1.companyname,
        gate_id: this.model1.gateid,
        document_number: this.model1.documentnumber,
        document_date: moment(this.model1.document_date).format("YYYY-MM-DD"),
        comments: this.model1.comments,
        date: moment(this.model1.date).format("YYYY-MM-DD"),
        time: this.model1.time,
        document_type: this.model1.documenttype,
        guard_name: this.model1.guardname,
        carrier_name: this.model1.carriername,
        vehicle_number: this.model1.vehiclenumber,
        carrier_contact_number: this.model1.carriercontactnumber,
        remarks: this.model1.remarks,
        contractor_name: this.model1.contractorname,
        line_item: this.SNO,
        material_description: this.matName,
        material_code: this.matCodee,
        unit_of_measurment: this.UOM,
        quantity: this.qty,
      };
      this.custservice.addGateOutwordGI(obj).subscribe((res: any) => {
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
          this.formdatatotablearray = [];
          this.dataSource.data = [];
          this.SNO = [];
          this.matName = [];
          this.UOM = [];
          this.qty = [];
          this.matCodee = [];
          this.getGiListData();
          this.resultginumber = res["reference"];
          if (this.fileUploadUrlsgi.length > 0) {
            this.uploadselectedfiles();
          }
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.SNO = [];
          this.matName = [];
          this.UOM = [];
          this.qty = [];
          this.matCodee = [];
        }
      });
    }
  }
  getcompanydata() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
    };
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data;
      console.log(this.companyData);
    });
  }
  getContractdata() {
    let obj = {
      command: "lst",
      key: this.selectedcontractor
    };
    this.custservice.getcontractormasterdata(obj).subscribe((res: any) => {
      this.contracordata = res.data;
    });
  }
  addGiData(data: any) {
    this.dialog.open(data, {
      width: "1100px",
    });
    this.getmasterdata();
  }
  closedialogdata() {
    this.dialog.closeAll;
  }
  getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100,
      pid: 1,
      key: this.selectedmaterial || this.selectedmaterialedit,
    };
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {

      this.masterData = res.data;
    });
  }
  filterdata(ev: any) {
    console.log(ev.target.value);
    this.selectedmaterial = ev.target.value;
    if (this.selectedmaterial.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterial) {
      this.getmasterdata();
    }
  }
  selectedmaterialuom() {
    console.log(this.dialogdata.matcode);
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.dialogdata.matcode) {
        this.dialogdata.uom = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });
  }
  binddatatotable(fr: any) {
    this.dialogdata["material_code"] = this.materialCODE;
    this.dialogdata["material_description"] = this.materialNAME;
    console.log(this.dialogdata);
    this.formdatatotablearray.push(this.dialogdata);
    console.log(this.formdatatotablearray);
    this.dataSource.data = this.formdatatotablearray;
    console.log(this.dataSource.data);
    this.dialogdata = {};
    this.dialog.closeAll();
  }
  editGidata(row1: any, index: any, data: any) {
    console.log(row1);
    this.selectedIndex = this.formdatatotablearray.indexOf(row1);
    console.log(this.selectedIndex);
    this.dialog.open(data, {
      width: "1000px",
    });
    this.masterData.forEach((ele: any) => {
      if (ele.code == row1.material_code) {
        this.systemref = ele.system_reference_1;
      }
    });
    this.editeddialogdata.matcode = this.systemref || row1.matcode;
    this.editeddialogdata.uom = row1.uom || row1.unit_of_measurment;
    this.editeddialogdata.qty = row1.qty || row1.quantity;
    this.getmasterdata();
  }
  editbindedDatatotable() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.editeddialogdata.matcode) {
        this.editeddialogdatamatcode = el.code;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    this.editeddialogdata["material_code"] = this.materialCODE;
    this.editeddialogdata["material_description"] = this.materialNAME;
    this.formdatatotablearray.splice(
      this.selectedIndex,
      1,
      this.editeddialogdata
    );
    this.dataSource.data = this.formdatatotablearray;
    console.log(this.dataSource.data);
    this.formdatatotablearray[this.selectedIndex].matcode =
      this.editeddialogdatamatcode;

    this.editeddialogdata = {};
    this.dialog.closeAll();
  }
  editfilterdata(ev: any) {
    this.selectedmaterialedit = ev.target.value;
    if (this.selectedmaterialedit.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterialedit) {
      this.getmasterdata();
    }
  }
  selectedmaterialuomedit() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.editeddialogdata.matcode) {
        this.editeddialogdata.uom = el.uom_1;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    console.log(this.editeddialogdatamatcode);
  }
  keyPressNumbers(evt: any) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  deleterowData(index: any) {
    console.log(index);
    this.formdatatotablearray.splice(index, 1);
    this.dataSource.data = this.formdatatotablearray;
  }
  getGiListData() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custservice.getGateOutwardGIList1(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getGiListData();
  }
  deleteItem(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
      // scrollStrategy: new NoopScrollStrategy()
    });
    this.deleteNumber = rw.number;
  }
  deleteFile() {
    let obj = {
      command: "del",
      number: this.deleteNumber,
      reason: this.deletemodel.reason,
    };
    this.custservice.deleteGateOutwardGiData(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.deletemodel.reason = "";
        this.getGiListData();
        // this.getlogdata();
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: "800px",
    });
    this.ginumber = row1.number;
    this.getexistingfiles();
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.ginumber)
      .set("document_type", "Gate Outward GI");
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
      .set("document_number", this.ginumber)
      .set("document_type", "Gate Outward GI")
      .set("id", this.deleteid);
    this.custservice.deletefiles(params).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", "File Deleted Successfully");
        this.getexistingfiles();
        this.dialogRef.close();
        this.dialog.closeAll();
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
        this.filenamearray1.push(file.name);
      }
    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type", "Gate Outward GI");
    postData.append("document_number", this.ginumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file);
    }

    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);
        this.getexistingfiles();
        this.filenamearray1 = [];
        this.fileUploadUrls = [];
      } else {
        this.alertcall.showWarning("Error", res["message"]);
      }
    });
  }
  uploadgifiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsgi = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for (const file of this.fileUploadUrlsgi) {
        this.filenamearray.push(file.name);
        this.selectedfiles.push(file);
      }
    }
  }
  uploadselectedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Gate Outward GI");
    postData.append("document_number", this.resultginumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file);
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.fileUploadUrlsgi = [];
        this.filenamearray = [];
        this.selectedfiles = [];
      } else {
      }
    });
  }
  onChange() {
    console.log("Selected:", this.columnname);
    this.searchData = "";
  }
  search() {
    console.log(this.searchData);
    let obj = {
      command: "lst",
      field: this.columnname,
      key: this.searchData,
      lmt: this.pageSize,
      pid: this.pageIndex,
    };
    if (this.searchData.length > 2) {
      this.custservice.getGIsearchData(obj).subscribe((res: any) => {
        this.reaData = false;
        this.totalRecords = res?.count;
        this.dataSourcemain.data = res.data;
        if (res.data.length == 0) {
          this.reaData = true;
        }
      });
    } else if (!this.searchData) {
      this.getGiListData();
      this.columnname = "";
    }
  }
  filtercontractor(ev:any){
    this.selectedcontractor = ev.target.value;
    if (this.selectedcontractor.length > 2) {
      this.getContractdata();
    }
    if (!this.selectedcontractor) {
      this.getContractdata();
    } 
  }
  getdocumentnumbers(){
    let obj={
    "command":"doc"
    }
    this.custservice.addGateOutwordGI(obj).subscribe((res:any)=>{
      if(res){
        this.documentNumbers=res.data
      }
    })
  }
  filterdocumentnum(ev:any){
    this.selectedDocumentNumber= ev.target.value
if(this.selectedDocumentNumber.length>2){
  this.getdocumentnumbers()
}if(!this.selectedDocumentNumber){
  this.getdocumentnumbers()
}
  }
  selectedDocNumber(){
    let obj={
      "command":"mat",
      "number": this.model1.documentnumber
      }
      this.custservice.addgoodsissue(obj).subscribe((res:any)=>{
        if(res){
          this.formdatatotablearray=res.data
          this.dataSource.data = this.formdatatotablearray;
          this.model1.companyname= res.data[0].company_name
        }
      })
  }
}
