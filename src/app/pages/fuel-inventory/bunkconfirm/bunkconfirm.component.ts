import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "src/app/services/customer.service";
import * as moment from "moment";
import Swal from "sweetalert2";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
// import { ThrowStmt } from "@angular/compiler";
@Component({
  selector: 'app-bunkconfirm',
  templateUrl: './bunkconfirm.component.html',
  styleUrls: ['./bunkconfirm.component.scss']
})
export class BunkconfirmComponent implements OnInit {

  displayedColumns: any[] = [
    "lineItem",
    "materialcode",
    "materialDescription",
    "unitofMeasurement",
    "requestQuantity",
    "filledQuantity",
  ];
  displayedColumns1: any[] = [
    "sno",
    "Date",
    "Number",
    "CompanyName",
    "ContractorName",
    "material_des",
    "quantity",
    "action",
  ];
  CompanyData: any;
  VendorData: any;
  inputmodel: any = {};
  model: any = {};
  selectCompanyName: any;
  selectedVendorName: any;
  dataSource = new MatTableDataSource();
  saveddataarray: any[] = [];
  selectedmaterial: any;
  masterData: any;
  materialCODE: any;
  materialNAME: any;
  material_code: any[] = [];
  material_description: any[] = [];
  // quantity: any[] = [];
  unit_of_measurement: any[] = [];
  Qty: any;
  Cmts: any;
  bunk_operator: any[] = [];
  security_guard: any[] = [];
  line_item: any[] = [];
  RequestData: any;
  selectRequestNumber: any;
  requestDetails: any = {};
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  dataSourcemain = new MatTableDataSource();
  data_for_edit: any;
  editednumber: any;
  btn: any = "Save";
  editModel: any = {};
  editdataa: any;
  demo1TabIndex: any = 0;
  MATDATA: any[];
  request_quantity: any;
  deleteNumber: any;
  deleteModel: any = {};
  filenamearray1: any[] = [];
  fileUploadUrlspr: any[] = [];
  selectedfiles: any[] = [];
  resultBcnumber: any;
  bcnumber: any;
  filedata: any;
  createNewFile: any = {};
  imageUrl = environment.base_url;
  deleteid: any;
  dialogRef: any = null;
  fileUploadUrls: any[] = [];
  filenamearray: any[] = [];
  constructor(
    private custService: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService
  ) {}

  ngOnInit(): void {
    this.getRequestNo();
    this.getBunkConfirmList();
  }

  getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
      key: this.selectedmaterial,
    };
    this.custService.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data;
    });
  }
  filterMaterialData(ev: any) {
    this.selectedmaterial = ev.target.value;
    if (this.selectedmaterial > 2) {
      this.getmasterdata();
    } else {
      this.getmasterdata();
    }
  }
  getMaterialGroup() {
    this.masterData.forEach((ele: any) => {
      if (ele.material_code == this.inputmodel.material_code) {
        this.inputmodel.material_description = ele.material_description;
      }
    });
  }
  closemodel() {
    this.dialog.closeAll();
  }
  savefinaldata(fr: any) {
    if (this.btn === "Save") {
      console.log(this.MATDATA);
      this.MATDATA.forEach((ele: any, index: any) => {
        console.log(ele);
        this.line_item = index + 1;
        this.material_code = ele.material_code;
        this.material_description = ele.material_description;
        this.unit_of_measurement = ele.unit_of_measurement;
        this.Cmts = ele.comments;
        this.Qty = Number(ele.filled_quantity);
      });
      let obj = {
        command: "add",
        request_number: this.inputmodel.request_number,
        company_name: this.inputmodel.company_name,
        company_code: this.inputmodel.company_code,
        vendor_name: this.inputmodel.vendor_name,
        vendor_code: this.inputmodel.vendor_code,
        purchase_order_number: this.inputmodel.purchase_order_number,
        purchase_order_date: moment(this.inputmodel.purchase_order_date).format(
          "YYYY-MM-DD"
        ),
        date: moment(this.inputmodel.date).format("YYYY-MM-DD"),
        department: this.inputmodel.department,
        request_type: this.inputmodel.request_type,
        quantity: this.inputmodel.request_quantity,
        contractor_name: this.inputmodel.contractor_name,
        vehicle_number: this.inputmodel.vehicle_number,
        receiver_name: this.inputmodel.receiver_name,
        contact_number: this.inputmodel.contact_number,
        bunk_operator: this.inputmodel.bunk_operator,
        security_guard: this.inputmodel.security_guard,
        material_code: this.inputmodel.material_code,
        material_description: this.inputmodel.material_description,
        unit_of_measurement: this.inputmodel.unit_of_measurement,
        comments: this.Cmts,
        filled_quantity: this.Qty,
      };
      this.custService.addBunkConfirm(obj).subscribe((res: any) => {
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
          this.MATDATA = [];
          this.dataSource.data = [];
          this.line_item = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
          this.Cmts = [];
          this.Qty = [];
          this.getBunkConfirmList();
          this.resultBcnumber = res["reference"];
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.line_item = [];
          this.Cmts = [];
          this.Qty = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
        }
      });
    }
    if (this.btn === "Update") {
      this.MATDATA.forEach((ele: any, index: any) => {
        console.log(ele);
        this.line_item = index + 1;
        this.material_code = ele.material_code;
        this.material_description = ele.material_description;
        this.unit_of_measurement = ele.unit_of_measurement;
        this.Cmts = ele.comments;
        this.Qty = Number(ele.filled_quantity);
      });
      let obj = {
        reason: this.editModel.reason,
        command: "edt",
        created_by: "admin",
        updated_by: "admin",
        // number: this.editednumber,
        number: this.inputmodel.number,
        company_name: this.inputmodel.company_name,
        company_code: this.inputmodel.company_code,
        vendor_name: this.inputmodel.vendor_name,
        vendor_code: this.inputmodel.vendor_code,
        purchase_order_number: this.inputmodel.purchase_order_number,
        purchase_order_date: moment(this.inputmodel.purchase_order_date).format(
          "YYYY-MM-DD"
        ),
        date: moment(this.inputmodel.date).format("YYYY-MM-DD"),
        department: this.inputmodel.department,
        request_type: this.inputmodel.request_type,
        request_quantity: this.inputmodel.request_quantity,
        contractor_name: this.inputmodel.contractor_name,
        vehicle_number: this.inputmodel.vehicle_number,
        receiver_name: this.inputmodel.receiver_name,
        contact_number: this.inputmodel.contact_number,
        bunk_operator: this.inputmodel.bunk_operator,
        security_guard: this.inputmodel.security_guard,
        comments: this.Cmts,
        filled_quantity: this.Qty,
        material_code: this.material_code,
        material_description: this.material_description,
        unit_of_measurement: this.unit_of_measurement,
        confirmation_number: this.inputmodel.number,
        request_number: this.inputmodel.request_number,
      };

      this.custService.updateBunkConfirmation(obj).subscribe((res: any) => {
        if (res && res["status_code"] == "200") {
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();

          this.line_item = [];
          this.Cmts = [];
          this.Qty = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
          this.getBunkConfirmList();
          this.resultBcnumber = this.editednumber;
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
          this.Cmts = [];
          this.Qty = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
        }
      });
    }
  }

  getRequestNo() {
    let obj = {
      command: "lst",
      key: this.selectRequestNumber,
    };
    this.custService.getRequestNumber(obj).subscribe((res: any) => {
      this.RequestData = res.data;
      console.log(this.RequestData);
    });
    // this.getMat();
  }
  filterRequestData(ev: any) {
    this.selectRequestNumber = ev.target.value;
    console.log(ev.target.value);
    if (this.selectRequestNumber.length > 2) {
      this.getRequestNo();
    } else {
      this.getRequestNo();
    }
  }
  getRequestDetails() {
    let obj = {
      command: "mat",
      number: this.inputmodel.request_number,
    };
    this.custService.getMatVBR(obj).subscribe((res: any) => {
      console.log(res);
      this.MATDATA = res.data;

      this.requestDetails = res.data[0];
      console.log(this.requestDetails);

      this.inputmodel.date = moment(this.requestDetails.date).format(
        "YYYY-MM-DD"
      );
      this.inputmodel.company_name = this.requestDetails.company_name;
      this.inputmodel.company_code = this.requestDetails.company_code;
      this.inputmodel.vendor_name = this.requestDetails.vendor_name;
      this.inputmodel.vendor_code = this.requestDetails.vendor_code;
      this.inputmodel.purchase_order_number =
        this.requestDetails.purchase_order_number;
      this.inputmodel.purchase_order_date = moment(
        this.requestDetails.purchase_order_date
      ).format("YYYY-MM-DD");
      this.inputmodel.contractor_name = this.requestDetails.contractor_name;
      this.inputmodel.vehicle_number = this.requestDetails.vehicle_number;
      this.inputmodel.receiver_name = this.requestDetails.receiver_name;
      this.inputmodel.contact_number = this.requestDetails.contact_number;
      this.inputmodel.material_code = this.requestDetails.material_code;
      this.inputmodel.material_description =
        this.requestDetails.material_description;
      this.inputmodel.unit_of_measurement =
        this.requestDetails.unit_of_measurement;
      this.inputmodel.department = this.requestDetails.department;
      this.inputmodel.request_type = this.requestDetails.request_type;
      this.inputmodel.request_quantity = this.requestDetails.request_quantity;
      this.inputmodel.confirmation_number =
        this.requestDetails.confirmation_number;
    });
  }
  deleterowItem(index: any) {
    this.MATDATA.splice(index, 1);
  }
  getBunkConfirmList() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custService.getBunkConfirmData(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
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

    this.custService.addBunkConfirm(obj).subscribe((res: any) => {
      this.dialog.closeAll();
      this.MATDATA = res.data;
      this.editModel.reason = "";
      this.editdataa = res.data[0];
      console.log(this.editdataa);
      // this.saveddataarray = res.data[0];
      // this.dataSource.data = this.saveddataarray;
      console.log(this.dataSource);
      this.inputmodel.request_number = this.editdataa.request_number;
      this.inputmodel.number = this.editdataa.number;
      this.inputmodel.date = moment(this.editdataa.date).format("YYYY-MM-DD");
      this.inputmodel.company_name = this.editdataa.company_name;
      this.inputmodel.company_code = this.editdataa.company_code;
      this.inputmodel.vendor_name = this.editdataa.vendor_name;
      this.inputmodel.vendor_code = this.editdataa.vendor_code;
      this.editednumber = this.editdataa.number;
      this.inputmodel.purchase_order_date = moment(
        this.editdataa.purchase_order_date
      ).format("YYYY-MM-DD");
      this.inputmodel.purchase_order_number =
        this.editdataa.purchase_order_number;
      this.inputmodel.vehicle_number = this.editdataa.vehicle_number;
      this.inputmodel.receiver_name = this.editdataa.receiver_name;
      this.inputmodel.department = this.editdataa.department;
      this.inputmodel.contractor_name = this.editdataa.contractor_name;
      this.inputmodel.contact_number = this.editdataa.contact_number;
      this.inputmodel.bunk_operator = this.editdataa.bunk_operator;
      this.inputmodel.security_guard = this.editdataa.security_guard;
      this.inputmodel.request_quantity = this.editdataa.request_quantity;
      this.inputmodel.request_type = this.editdataa.request_type;
      this.line_item = this.editdataa.line_item;
      this.inputmodel.vehicle_number = this.editdataa.vehicle_number;
      this.material_code = this.editdataa.material_code;
      this.material_description = this.editdataa.material_description;
      this.unit_of_measurement = this.editdataa.unit_of_measurement;
      this.Qty = this.editdataa.filled_quantity;
      // this.inputmodel.comments = this.editdataa.comments;
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
      number: this.deleteNumber,
      reason: this.deleteModel.reason,
    };
    this.custService.deleteBunkConfirmFile(obj).subscribe((res: any) => {
      if (res) {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.getBunkConfirmList();
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
    postData.append("document_type", "Bunk Confirmation");
    postData.append("document_number", this.resultBcnumber);
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
    this.bcnumber = row1.number;
    this.getexistingfiles();
  }

  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.bcnumber)
      .set("document_type", "Bunk Confirmation");
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
    postData.append("document_type", "Bunk Confirmation");
    postData.append("document_number", this.bcnumber);
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
      .set("document_number", this.bcnumber)
      .set("document_type", "Bunk Confirmation")
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
