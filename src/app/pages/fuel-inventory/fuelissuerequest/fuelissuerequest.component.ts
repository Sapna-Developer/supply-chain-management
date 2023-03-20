import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "src/app/services/customer.service";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-fuelissuerequest',
  templateUrl: './fuelissuerequest.component.html',
  styleUrls: ['./fuelissuerequest.component.scss']
})
export class FuelissuerequestComponent implements OnInit {
  displayedColumns: any[] = [
    "lineItem",
    "vehiclenumber",
    "materialcode",
    "materialDescription",
    "unitofMeasurement",
    "requestQuantity",
    "action",
  ];
  displayedColumns1: any[] = [
    "sno",
    "CompanyName",
    "CompanyCode",
    "ContractorCode",
    "ContractorName",
    "Date",
    "Number",
    "WOD",
    "WON",
    "action",
  ];
  demo1TabIndex: any = 0;
  saveddataarray: any[] = [];
  selectCompanyName: any;
  CompanyData: any;
  inputmodel: any = {};
  selectedmaterial: any;
  masterData: any;
  materialCODE: any;
  materialNAME: any;
  addmodel: any = {};
  dataSource = new MatTableDataSource();
  vehicle_number: any[] = [];
  material_code: any[] = [];
  material_description: any[] = [];
  unit_of_measurement: any[] = [];
  request_quantity: any[] = [];
  line_item: any[] = [];
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  dataSourcemain = new MatTableDataSource();
  selectedIndex: number;
  editaddmodel: any = {};
  selectedmaterialedit: any;
  systemref: any;
  data_for_edit: any;
  editednumber: any;
  btn: any = "Save";
  editModel: any = {};
  editdataa: any;
  hideRefNum: boolean = false;
  deleteNumber: any;
  deleteModel: any = {};
  filenamearray1: any[] = [];
  fileUploadUrlspr: any[] = [];
  selectedfiles: any[] = [];
  resultFirnumber: any;
  firnumber: any;
  filedata: any;
  createNewFile: any = {};
  imageUrl = environment.base_url;
  deleteid: any;
  dialogRef: any = null;
  fileUploadUrls: any[] = [];
  filenamearray: any[] = [];
  selectedcontractorname: string;
  contractorData: any;

  constructor(
    private custService: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService
  ) {}
  ngOnInit(): void {
    this.getCompanyData();
    this.getFuelIssueReqList();
    this.getcontractorData();
  }
  getCompanyData() {
    let obj = {
      command: "lst",
      key: this.selectCompanyName,
    };
    this.custService.getcompanymasterdata(obj).subscribe((res: any) => {
      this.CompanyData = res.data;
      console.log(this.CompanyData);
    });
  }

  filterCompanyData(ev: any) {
    this.selectCompanyName = ev.target.value;
    console.log(ev.target.value);
    if (this.selectCompanyName.length > 2) {
      this.getCompanyData();
    } else {
      this.getCompanyData();
    }
  }
  getCompanyCode() {
    this.CompanyData.forEach((ele: any) => {
      console.log(ele);

      if (this.inputmodel.company_name == ele.name) {
        this.inputmodel.company_code = ele.code;
      }
    });
  }
  filtercontractordata(ev:any){
    this.selectedcontractorname = ev.target.value
    if (this.selectedcontractorname.length > 2) {
      this.getcontractorData();
    }
    if (!this.selectedcontractorname) {
      this.getcontractorData();
    }
  }
  getcontractorData(){
    let obj={
      "command" : "lst",
      "lmt":100000,
      "key": this.selectedcontractorname || ""
    }
    this.custService.getcontractormasterdata(obj).subscribe((res:any)=>{
      this.contractorData = res.data
    })
  }

  getContactorCode() {
    this.contractorData.forEach((ele: any) => {
      console.log(ele);

      if (this.inputmodel.contractor_name == ele.name) {
        this.inputmodel.contractor_code = ele.code;
      }
    });
  }
  addFuelIssueReqModel(data: any) {
    this.dialog.open(data, {
      // width: "1100px",
      width: "1050px",
    });
  }
  savefinaldata(fr: any) {
    if (this.btn === "Save") {
      this.saveddataarray.forEach((ele: any, index) => {
        console.log(ele);
        this.line_item.push(index + 1);
        this.vehicle_number.push(ele.vehicle_number);
        this.material_code.push(ele.material_code);
        this.material_description.push(ele.material_description);
        this.unit_of_measurement.push(ele.unit_of_measurement);
        this.request_quantity.push(Number(ele.request_quantity));
      });
      let obj = {
        command: "add",
        comments: this.inputmodel.comments,
        // number: this.editednumber,
        company_name: this.inputmodel.company_name,
        company_code: this.inputmodel.company_code,
        work_order_number: this.inputmodel.work_order_number,
        work_order_date: this.inputmodel.work_order_date,
        contractor_name: this.inputmodel.contractor_name,
        contractor_code: this.inputmodel.contractor_code,
        vehicle_number: this.vehicle_number,
        material_code: this.material_code,
        material_description: this.material_description,
        unit_of_measurement: this.unit_of_measurement,
        request_quantity: this.request_quantity,
      };
      this.custService.addFuelIssueReq(obj).subscribe((res: any) => {
        console.log(res);
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
          this.saveddataarray = [];
          this.dataSource.data = [];
          this.line_item = [];
          this.vehicle_number = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
          this.request_quantity = [];
          this.getFuelIssueReqList();
          this.resultFirnumber = res["reference"];
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.line_item = [];
          this.vehicle_number = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
          this.request_quantity = [];
        }
      });
    }
    if (this.btn === "Update") {
      console.log(this.saveddataarray);
      console.log(this.addmodel);
      console.log(this.inputmodel);
      this.line_item = [];
      this.vehicle_number = [];
      this.material_code = [];
      this.material_description = [];
      this.unit_of_measurement = [];
      this.request_quantity = [];

      this.saveddataarray.forEach((ele: any, index) => {
        console.log(ele);
        this.line_item.push(index + 1);
        this.vehicle_number.push(ele.vehicle_number);
        this.material_code.push(ele.material_code);
        this.material_description.push(ele.material_description);
        this.unit_of_measurement.push(ele.unit_of_measurement);
        this.request_quantity.push(Number(ele.request_quantity));
      });
      let obj = {
        reason: this.editModel.reason,
        command: "edt",
        created_by: "admin",
        updated_by: "admin",
        number: this.editednumber,
        comments: this.inputmodel.comments,
        date: moment(this.inputmodel.date).format("YYYY-MM-DD"),
        company_name: this.inputmodel.company_name,
        company_code: this.inputmodel.company_code,
        work_order_number: this.inputmodel.work_order_number,
        work_order_date: this.inputmodel.work_order_date,
        contractor_name: this.inputmodel.contractor_name,
        contractor_code: this.inputmodel.contractor_code,
        vehicle_number: this.vehicle_number,
        material_code: this.material_code,
        material_description: this.material_description,
        unit_of_measurement: this.unit_of_measurement,
        request_quantity: this.request_quantity,
      };

      this.custService.updateFuelIssueRequest(obj).subscribe((res: any) => {
        if (res && res["status_code"] == "200") {
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.saveddataarray = [];
          this.dataSource.data = [];
          this.line_item = [];
          this.vehicle_number = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
          this.request_quantity = [];
          this.getFuelIssueReqList();
          this.resultFirnumber = this.editednumber;
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
          this.editednumber = "";
          this.editModel.reason = "";
          // this.smsdata = "";
          this.btn = "Save";
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.line_item = [];
          this.vehicle_number = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
          this.request_quantity = [];
        }
      });
    }
  }

  closemodel() {
    this.dialog.closeAll();
  }
  getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
      key: this.selectedmaterial || this.selectedmaterialedit,
    };
    this.custService.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data;
    });
  }
  filterMaterialData(ev: any) {
    this.selectedmaterial = ev.target.value;
    if (this.selectedmaterial.length > 2) {
      this.getmasterdata();
    } else {
      this.getmasterdata();
    }
  }
  getMaterialGroup() {
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.addmodel.material_code_des) {
        this.addmodel.unit_of_measurement = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });
  }
  editfilterMaterialData(ev: any) {
    this.selectedmaterialedit = ev.target.value;
    if (this.selectedmaterialedit.length > 2) {
      this.getmasterdata();
    } else {
      this.getmasterdata();
    }
  }
  editgetMaterialGroup() {
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.editaddmodel.material_code_des) {
        this.editaddmodel.unit_of_measurement = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });
  }
  saveadddata() {
    this.addmodel["material_code"] = this.materialCODE;
    this.addmodel["material_description"] = this.materialNAME;
    this.saveddataarray.push(this.addmodel);
    console.log(this.saveddataarray);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
    this.addmodel = {};
    this.dialog.closeAll();
  }
  getFuelIssueReqList() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custService.getFuelIssueReqData(obj).subscribe((res: any) => {
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
    this.getFuelIssueReqList();
  }
  editdata(row1: any, index: any, data: any) {
    console.log(row1);

    this.selectedIndex = this.saveddataarray.indexOf(row1);
    console.log(this.selectedIndex);
    this.dialog.open(data, {
      width: "1100px",
    });

    this.masterData.forEach((ele: any) => {
      if (ele.code == row1.material_code) {
        this.systemref = ele.system_reference_1;
      }
    });
    this.editaddmodel.material_code_des = this.systemref;
    this.editaddmodel.material_code = row1.material_code;
    this.editaddmodel.vehicle_number = row1.vehicle_number;
    this.editaddmodel.unit_of_measurement = row1.unit_of_measurement;
    this.editaddmodel.request_quantity = row1.request_quantity;
  }
  saveaddededitdata(fr: any) {
    this.editaddmodel["material_code"] = this.materialCODE;
    this.editaddmodel["material_description"] = this.materialNAME;
    this.saveddataarray.splice(this.selectedIndex, 1, this.editaddmodel);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);

    this.editaddmodel = {};

    //  this.smsdata = "";comments
    this.dialog.closeAll();
  }
  deleterow(index: any) {
    this.saveddataarray.splice(index, 1);
    this.dataSource.data = this.saveddataarray;
  }
  editListdata(data: any, dialog: any) {
    console.log(data);
    this.data_for_edit = data;
    this.dialog.open(dialog, {
      width: "400px",
    });
    this.editednumber = data.number;
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      number: this.editednumber,
    };

    this.custService.addFuelIssueReq(obj).subscribe((res: any) => {
      this.dialog.closeAll();
      this.editModel.reason = "";
      this.editdataa = res.data[0];
      console.log(this.editdataa);
      this.saveddataarray = res.data;
      this.dataSource.data = this.saveddataarray;
      console.log(this.dataSource);
      this.inputmodel.date = moment(this.editdataa.date).format("YYYY-MM-DD");
      this.inputmodel.company_name = this.editdataa.company_name;
      this.inputmodel.company_code = this.editdataa.company_code;
      this.inputmodel.work_order_number = this.editdataa.work_order_number;
      this.editednumber = this.editdataa.number;
      this.inputmodel.work_order_date = moment(
        this.editdataa.work_order_date
      ).format("YYYY-MM-DD");
      this.inputmodel.contractor_name = this.editdataa.contractor_name;
      this.inputmodel.contractor_code = this.editdataa.contractor_code;
      this.inputmodel.comments = this.editdataa.comments;
      this.line_item = this.editdataa.line_item;
      this.vehicle_number = this.editdataa.vehicle_number;
      this.material_code = this.editdataa.material_code;
      this.material_description = this.editdataa.material_description;
      this.unit_of_measurement = this.editdataa.unit_of_measurement;
      this.request_quantity = this.editdataa.request_quantity;
      this.demo1TabIndex = 0;
      this.btn = "Update";
    });
  }
  deleteItem(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
    });
    this.deleteNumber = rw.number;
  }
  deleteFile() {
    let obj = {
      command: "del",
      deleted_by: "admin",
      number: this.deleteNumber,
      reason: this.deleteModel.reason,
    };
    this.custService.deleteFuelIssueReqFile(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.getFuelIssueReqList();
        this.deleteModel.reason = "";
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
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
      this.fileUploadUrlspr = fileInput.target.files;
      for (const file of this.fileUploadUrlspr) {
        this.filenamearray1.push(file.name);
        this.selectedfiles.push(file);
      }
    }
  }
  uploadedselctedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Fuel Issue Request");
    postData.append("document_number", this.resultFirnumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file);
    }

    this.custService.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.fileUploadUrlspr = [];
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
    this.firnumber = row1.number;
    this.getexistingfiles();
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.firnumber)
      .set("document_type", "Fuel Issue Request");
    this.custService.getexistingfies(params).subscribe((res: any) => {
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
    postData.append("document_type", "Fuel Issue Request");
    postData.append("document_number", this.firnumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file);
    }
    this.custService.addfileupload(postData).subscribe((res: any) => {
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
  deleteexistingfile() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.firnumber)
      .set("document_type", "Fule Issue Request")
      .set("id", this.deleteid);
    this.custService.deletefiles(params).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", "File Deleted Successfully");
        this.getexistingfiles();
        this.dialogRef.close();
      } else {
        this.alertcall.showWarning("Error", res["message"]);
      }
    });
  }

}
