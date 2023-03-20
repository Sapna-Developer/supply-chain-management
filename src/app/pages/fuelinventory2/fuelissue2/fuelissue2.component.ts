import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { CustomerService } from "src/app/services/customer.service";
import Swal from "sweetalert2";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-fuelissue2',
  templateUrl: './fuelissue2.component.html',
  styleUrls: ['./fuelissue2.component.scss']
})
export class Fuelissue2Component implements OnInit {

  
  dataSourceMain = new MatTableDataSource();

  displayedColumns = [
    "line_item",
    "vehicle_number",
    "material_code",
    "material_description",
    "unit_of_measurement",
    "issued_quantity",
    // "action",
  ];
  displayedColumns1: any[] = [
    "sno",
    "Date",
    "Number",
    // "CompanyName",
    "ContractorName",
    "requestnum",
    "action",
  ];

  demo1TabIndex: any = 0;
  btnSaveUpdate: any = "Save";
  formdata: any = {};
  tabledata: any = {};
  MATDATA: any[] = [];
  requestDetails: any = {};
  selectFuelRequestNumber: any;
  RequestData: any;
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  dataSourcemain = new MatTableDataSource();
  editNumber: any;
  editableData: any;
  editModel: any = {};
  filenamearray1: any[] = [];
  fileUploadUrlspr: any[] = [];
  selectedfiles: any[] = [];
  resultFinumber: any;
  finumber: any;
  filedata: any;
  createNewFile: any = {};
  imageUrl = environment.base_url;
  deleteid: any;
  dialogRef: any = null;
  fileUploadUrls: any[] = [];
  filenamearray: any[] = [];
  deleteNumber: any;
  deleteModel: any = {};
  issueType: any;
  fiNumber: any;
  issued_quantity: any[] = [];
  request_id: any;
  constructor(
    private custservice: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService
  ) { }

  ngOnInit(): void {
    this.getRequestDetails();
    this.getRequestNo();
    this.getFuelIssueList();
  }
  getRequestDetails() {
    let obj = {
      command: "mat",
      number: this.formdata.fuel_request_number,
    };
    this.custservice.getFuelRequestData2(obj).subscribe((res: any) => {
      console.log(res);
      this.MATDATA = res.data;

      this.requestDetails = res.data[0];
      console.log(this.requestDetails);

      this.formdata.date = moment(this.requestDetails.date).format(
        "YYYY-MM-DD"
      );
      this.formdata.work_order_number = this.requestDetails.work_order_number;
      this.formdata.work_order_date = moment(
        this.requestDetails.work_order_date
      ).format("YYYY-MM-DD");
      // this.formdata.company_name = this.requestDetails.company_name;
      // this.formdata.company_code = this.requestDetails.company_code;
      this.formdata.contractor_name = this.requestDetails.contractor_name;
      this.formdata.contractor_code = this.requestDetails.contractor_code;
      this.tabledata.vehicle_number = this.requestDetails.vehicle_number;
      this.tabledata.line_item = this.requestDetails.line_item;
      this.request_id = this.requestDetails.id;
      this.tabledata.material_code = this.requestDetails.material_code;
      this.tabledata.material_description =
        this.requestDetails.material_description;
      this.tabledata.unit_of_measurement =
        this.requestDetails.unit_of_measurement;
      this.formdata.request_quantity = this.requestDetails.request_quantity;
      this.formdata.quantity = this.requestDetails.quantity;
    });
  }
  getRequestNo() {
    let obj = {
      command: "lst",
      key: this.selectFuelRequestNumber,
    };
    this.custservice.getFuelRequestNumber2(obj).subscribe((res: any) => {
      this.RequestData = res.data;
      console.log(this.RequestData);
    });
    // this.getMat();
  }
  filterFuelRequestNumber(ev: any) {
    this.selectFuelRequestNumber = ev.target.value;
    console.log(ev.target.value);
    if (this.selectFuelRequestNumber.length > 2) {
      this.getRequestNo();
    } else {
      this.getRequestNo();
    }
  }
  validateNumber(e: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = e.target.value + String.fromCharCode(e.charCode);
    if (!reg.test(input)) {
      e.preventDefault();
    }
  }
  savefinaldata(fr: any) {
    if (this.btnSaveUpdate === "Save") {
      this.issued_quantity.push(Number(this.tabledata.issued_quantity));
      let obj = {
        command: "add",
        number: "GEPPL/22-23/FI/003",
        date: moment(this.formdata.date).format("YYYY-MM-DD"),
        fuel_request_number: this.formdata.fuel_request_number,
        work_order_number: this.formdata.work_order_number,
        work_order_date: this.formdata.work_order_date,
        // company_name: this.formdata.company_name,
        // company_code: this.formdata.company_code,
        document_number: this.formdata.document_number,
        document_date: moment(this.formdata.document_date).format("YYYY-MM-DD"),
        operator_name: this.formdata.operator_name,
        dispenser: this.formdata.dispenser,
        contractor_name: this.formdata.contractor_name,
        contractor_code: this.formdata.contractor_code,
        starting_reading: this.formdata.starting_reading,
        gate_entry_number: this.formdata.gate_entry_number,
        gate_entry_date: this.formdata.gate_entry_date,
        closing_reading: this.formdata.closing_reading,
        issue_type: this.formdata.issue_type,
        total_issued_quantity: this.formdata.total_issued_quantity,
        line_item: [this.tabledata.line_item],

        request_id: [this.request_id],
        vehicle_number: [this.tabledata.vehicle_number],
        material_code: [this.tabledata.material_code],
        material_description: [this.tabledata.material_description],
        unit_of_measurement: [this.tabledata.unit_of_measurement],
        issued_quantity: this.issued_quantity,

      };
      this.custservice.addFuelIssueData2(obj).subscribe((res: any) => {
        console.log(res);
        if (res && res["status_code"] == "200") {
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            width: 500,
          });
          fr.reset();
          this.formdata = {};
          this.tabledata = {};
          this.issued_quantity = [];
          this.getFuelIssueList();
          this.resultFinumber = res["reference"];
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          // this.formdata = {};
          // this.tabledata = {};
          // this.issued_quantity = [];
        }
      });
    }
    if (this.btnSaveUpdate === "Update") {
      this.issued_quantity.push(Number(this.tabledata.issued_quantity));
      let obj = {
        // reason: this.editModel.reason,
        command: "edt",
        created_by: "admin",
        updated_by: "admin",
        number: this.editNumber,
        date: moment(this.formdata.date).format("YYYY-MM-DD"),
        fuel_request_number: this.formdata.fuel_request_number,
        work_order_number: this.formdata.work_order_number,
        work_order_date: this.formdata.work_order_date,
        // company_name: this.formdata.company_name,
        // company_code: this.formdata.company_code,
        document_number: this.formdata.document_number,
        document_date: this.formdata.document_date,
        operator_name: this.formdata.operator_name,
        dispenser: this.formdata.dispenser,
        contractor_name: this.formdata.contractor_name,
        contractor_code: this.formdata.contractor_code,
        starting_reading: this.formdata.starting_reading,
        gate_entry_number: this.formdata.gate_entry_number,
        gate_entry_date: this.formdata.gate_entry_date,
        closing_reading: this.formdata.closing_reading,
        issue_type: this.formdata.issue_type,
        quantity: this.formdata.quantity,
        total_issued_quantity: this.formdata.total_issued_quantity,
        line_item: [this.tabledata.line_item],
        vehicle_number: [this.tabledata.vehicle_number],
        material_code: [this.tabledata.material_code],
        material_description: [this.tabledata.material_description],
        unit_of_measurement: [this.tabledata.unit_of_measurement],
        issued_quantity: this.issued_quantity,
      };
      this.custservice.addFuelIssueData2(obj).subscribe((res: any) => {
        console.log(res);
        if (res && res["status_code"] == "200") {
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            width: 500,
          });
          fr.reset();
          this.formdata = {};
          this.tabledata = {};
          this.getFuelIssueList();
          this.resultFinumber = this.editNumber;
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
          this.editNumber = "";
          this.editModel.reason = "";
          this.btnSaveUpdate = "Save";
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          // this.formdata = {};
          // this.tabledata = {};
        }
      });
    }
  }
  getFuelIssueList() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custservice.getFuelIssueData2(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      console.log(this.dataSourcemain.data);

      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }
  editListdata(data: any, rw: any) {
    this.dialog.open(data, {
      width: "400px",
    });
    this.editNumber = rw.number;
  }
  closemodel() {
    this.dialog.closeAll();
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      number: this.editNumber,
    };
    this.custservice.editFuelIssue2(obj).subscribe((res: any) => {
      console.log(res);
      this.dialog.closeAll();
      this.editModel.reason = "";
      this.editableData = res.data[0];
      this.formdata.closing_reading = this.editableData.closing_reading;
      // this.formdata.company_code = this.editableData.company_code;
      // this.formdata.company_name = this.editableData.company_name;
      this.formdata.contractor_code = this.editableData.contractor_code;
      this.formdata.contractor_name = this.editableData.contractor_name;
      this.formdata.date = moment(this.editableData.date).format("YYYY-MM-DD");
      this.formdata.dispenser = this.editableData.dispenser;
      this.formdata.document_date = moment(
        this.editableData.document_date
      ).format("YYYY-MM-DD");
      this.formdata.document_number = this.editableData.document_number;
      this.formdata.fuel_request_number = this.editableData.fuel_request_number;
      this.formdata.request_quantity = this.editableData.request_quantity;
      this.formdata.gate_entry_date = moment(
        this.editableData.gate_entry_date
      ).format("YYYY-MM-DD");
      this.formdata.gate_entry_number = this.editableData.gate_entry_number;
      this.formdata.issue_type = this.editableData.issue_type;
      this.tabledata.issued_quantity = this.editableData.issued_quantity;
      this.formdata.operator_name = this.editableData.operator_name;
      this.formdata.work_order_date = moment(
        this.editableData.work_order_date
      ).format("YYYY-MM-DD");
      this.formdata.work_order_number = this.editableData.work_order_number;
      this.formdata.total_value = this.editableData.total_value;
      this.formdata.starting_reading = this.editableData.starting_reading;
      this.tabledata.line_item = this.editableData.line_item;
      this.tabledata.vehicle_number = this.editableData.vehicle_number;
      this.formdata.refNumber=this.editableData.number;
      this.tabledata.material_description =
        this.editableData.material_description;
      this.tabledata.material_code = this.editableData.material_code;
      this.tabledata.unit_of_measurement =
        this.editableData.unit_of_measurement;
      this.tabledata.request_quantity = this.editableData.request_quantity;
      this.demo1TabIndex = 0;
      this.btnSaveUpdate = "Update";
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
    postData.append("document_type", "FuelIssue2");
    postData.append("document_number", this.resultFinumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file);
    }

    this.custservice.addfileupload(postData).subscribe((res: any) => {
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
    this.finumber = row1.number;
    this.getexistingfiles();
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.finumber)
      .set("document_type", "FuelIssue2");
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
    postData.append("document_type", "FuelIssue2");
    postData.append("document_number", this.finumber);
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
  deleteexistingfile() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.finumber)
      .set("document_type", "FuelIssue2")
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
  deleteItem(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
    });
    this.deleteNumber = rw.number;
    this.issueType = rw.issue_type;
    this.fiNumber = rw.fuel_request_number;
  }
  deleteFile() {
    let obj = {
      command: "del",
      issue_type: this.issueType,
      deleted_by: "admin",
      number: this.deleteNumber,
      fuel_request_number: this.fiNumber,
      // reason: this.deleteModel.reason,
    };
    this.custservice.deleteFuelIssueFile2(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.getFuelIssueList();
        this.deleteModel.reason = "";
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
}

