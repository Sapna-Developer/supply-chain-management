import { Component, OnInit } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import * as moment from "moment";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-job-order',
  templateUrl: './job-order.component.html',
  styleUrls: ['./job-order.component.scss']
})
export class JobOrderComponent implements OnInit {

  displayedColumns: any[] = [
    "lineItem",
    "material_code",
    "material_description",
    "mat_uom",
    "mat_quantity",
    "totalPrice",
    "action",
  ];
  displayedColumns1: any[] = [
    "sno",
    "Number",
    "Date",
    "company_name",
    "service_code",
    "service_description",
    "Vendor_name",
    "action",
  ];
  demo1TabIndex: any = 0;
  companyData: any;
  jodata: any = {};
  jodata1: any = {};
  jodata2: any = {};
  vendorData: any;
  taxData: any;
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  saveddataarray: any[] = [];
  dataSource = new MatTableDataSource();
  dataSourcemain = new MatTableDataSource();
  selectedIndex: number;
  deleteNumber: any;
  editednumber: any;
  editdataa: any;
  comments: any;
  date: string;
  subject: any;
  tax_percent: any;
  basic_price: any;
  tax_description: any;
  line_item: any[] = [];
  number: any[] = [];
  job_description: any[] = [];
  unit_price: any[] = [];
  total_amount: any[] = [];
  quantity: any[] = [];
  btn: any = "Save";
  editModel: any = {};
  deleteModel: any = {};
  finaldataarray: any[] = [];
  isactivestatus: any = true;
  data_for_edit: any;
  jonumber: any;
  filedata: any;
  createNewFile: any = {};
  imageUrl = environment.base_url;
  deleteid: any;
  dialogRef: any = null;
  logdata: any;
  fileUploadUrls: any[] = [];
  filenamearray: any[] = [];
  filenamearray1: any[] = [];
  fileUploadUrlspr: any[] = [];
  selectedfiles: any[] = [];
  resultdcnumber: any;
  selectedservicemaster: any;
  selectedservicemasteredit: any;
  servicemasterData: any;
  constructor(
    private dialog: MatDialog,
    private custservice: CustomerService,
    private alertcall: AlertCallsService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isactivestatus = true;
    this.date = moment(new Date()).format("YYYY-MM-DD");
    this.demo1TabIndex = 0;
    this.route.queryParams.subscribe((params: any) => {
      if (params.tab == "notifications") {
        this.demo1TabIndex = 1;
        console.log(params);
      } else {
        this.demo1TabIndex = 0;
      }
    });
    this.getcompanydata();
    this.getvendordata();
    this.getJoList();
    this.getTaxlistdata();
    this.getlogdata();
    this.getServiceData();
  }
  //get company data

  getServiceData() {
    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedservicemaster || this.selectedservicemasteredit
    }
    this.custservice.getServiceMasterData(obj).subscribe((res: any) => {
      console.log(res.data)
      this.servicemasterData = res.data
      console.log(this.servicemasterData)
    })
  }
  filterServiceCode(ev: any) {
    console.log(ev.target.value)
    this.selectedservicemaster = ev.target.value
    if (this.selectedservicemaster.length > 2) {
      this.getServiceData()
    }
    if (!this.selectedservicemaster) {
      this.getServiceData()
    }
  }
  getserviceDescription() {
    this.servicemasterData.forEach((ele: any) => {
      if (ele.code == this.jodata2.number) {
        this.jodata2.job_description = ele.name
      }
    });
  }
  filterServiceCodeEdit(ev: any) {
    console.log(ev.target.value)
    this.selectedservicemasteredit = ev.target.value
    if (this.selectedservicemasteredit.length > 2) {
      this.getServiceData()
    }
    if (!this.selectedservicemasteredit) {
      this.getServiceData()
    }
  }
  getserviceDescriptionEdit() {
    this.servicemasterData.forEach((ele: any) => {
      if (ele.code == this.jodata1.number) {
        this.jodata1.job_description = ele.name
      }
    });
  }

  getcompanydata() {
    let obj = {
      command: "lst",
      lmt:100000,
      pid:1
    };
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data;
    });
  }
  getvendordata() {
    let obj = {
      command: "lst",
    };
    this.custservice.getvendormasterdata(obj).subscribe((res: any) => {
      this.vendorData = res.data;
    });
  }
  getTaxlistdata() {
    let obj = {
      command: "lst"
      // lmt: this.pageSize,
      // pid: this.pageIndex,
      // key: "" || this.searchData,
    };
    this.custservice.gettaxlistdata(obj).subscribe((res: any) => {
      this.taxData = res.data;
      console.log(this.taxData);
    });
  }

  getTaxPercent() {
    this.taxData.forEach((ele: any) => {
      if (this.jodata.tax_description == ele.description) {
        this.jodata.tax_percent = ele.percentage;
      }
    });
  }
  saveFinalData(fr: any) {
    if (this.btn === "Save") {
      console.log(this.saveddataarray);
      this.saveddataarray.forEach((ele: any, index) => {
        console.log(ele);
        this.line_item.push(index + 1);
        this.number.push(ele.number);
        this.job_description.push(ele.job_description);
        this.unit_price.push(ele.unit_price);
        this.quantity.push(Number(ele.quantity));
        this.total_amount.push(Number(ele.total_amount));
      });
      let obj = {
        command: "add",
        created_by: "admin",
        comments: this.jodata.comments,
        date: moment(this.jodata.date).format("YYYY-MM-DD"),
        company_name: this.jodata.company_name,
        vendor_name: this.jodata.vendor_name,
        subject: this.jodata.subject,
        job_description: this.job_description,
        quantity: this.quantity,
        unit_price: this.unit_price,
        tax_percent: this.jodata.tax_percent,
        tax_description: this.jodata.tax_description,
      };

      this.custservice.addjobOrder(obj).subscribe((res: any) => {
        console.log(obj);
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
          this.finaldataarray = [];
          this.dataSource.data = [];
          this.line_item = [];
          this.number = [];
          this.job_description = [];
          this.unit_price = [];
          this.quantity = [];
          this.total_amount = [];
          this.getJoList();
          this.getlogdata();
          this.resultdcnumber = res["reference"];
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.line_item = [];
          this.number = [];
          this.job_description = [];
          this.unit_price = [];
          this.quantity = [];
          this.total_amount = [];
        }
      });
    }
    if (this.btn === "Update") {
      console.log(this.saveddataarray);
      console.log(this.jodata1);
      console.log(this.jodata);

      this.line_item = [];
      this.number = [];
      this.job_description = [];
      this.unit_price = [];
      this.quantity = [];
      this.total_amount = [];
      this.saveddataarray.forEach((ele: any, index) => {
        console.log(ele);
        this.line_item.push(index + 1);
        this.number.push(ele.number);
        this.job_description.push(ele.job_description);
        this.unit_price.push(ele.unit_price);
        this.quantity.push(Number(ele.quantity));
        this.total_amount.push(Number(ele.total_amount));
      });
      let obj = {
        reason: this.editModel.reason,
        command: "edt",
        created_by: "admin",
        updated_by: "admin",
        number: this.editednumber,
        comments: this.jodata.comments,
        date: moment(this.jodata.date).format("YYYY-MM-DD"),
        company_name: this.jodata.company_name,
        vendor_name: this.jodata.vendor_name,
        subject: this.jodata.subject,
        job_description: this.job_description,
        quantity: this.quantity,
        line_item: this.line_item,
        unit_price: this.unit_price,
        tax_description: this.jodata.tax_description,
        tax_percent: this.jodata.tax_percent,
      };
      this.custservice.updateJobOrder(obj).subscribe((res: any) => {
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
          this.finaldataarray = [];
          this.dataSource.data = [];
          this.line_item = [];
          this.number = [];
          this.job_description = [];
          this.unit_price = [];
          this.quantity = [];
          this.total_amount = [];
          this.getJoList();
          this.editednumber = "";
          this.editModel.reason = "";
          this.getlogdata();
          this.resultdcnumber = this.editednumber;
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
          // this.smsdata = "";
          this.btn = "Save";
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.line_item = [];
          this.number = [];
          this.job_description = [];
          this.unit_price = [];
          this.quantity = [];
          this.total_amount = [];
        }
      });
    }
    // this.saveddataarray = [];
  }


  addJobOrderModel(data: any) {
    this.jodata2 = {};
    this.dialog.open(data, {
      width: "1100px",
      // scrollStrategy: this.overlay.scrollStrategies.noop()
      //  scrollStrategy: new NoopScrollStrategy()
    });
  }

  closemodel() {
    this.dialog.closeAll();
  }
  saveaddeddata(form: any) {
    console.log(this.jodata1);
    this.saveddataarray.push(this.jodata2);
    console.log(this.saveddataarray);

    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
    // this.jodata = {};
    // this.smsdata = "";
    this.dialog.closeAll();
  }

  editdata(row1: any, index: any, data: any) {
    console.log(row1);

    this.selectedIndex = this.saveddataarray.indexOf(row1);
    console.log(this.selectedIndex);
    this.dialog.open(data, {
      width: "1100px",
    });
    this.jodata1.number = row1.number;
    this.jodata1.unit_price = row1.unit_price;
    this.jodata1.job_description = row1.job_description;
    this.jodata1.quantity = row1.quantity;
    this.jodata1.total_amount = row1.total_amount;
  }
  saveaddededitdata(fr: any) {
    this.saveddataarray.splice(this.selectedIndex, 1, this.jodata1);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);

    this.jodata1 = {};
    //  this.smsdata = "";comments
    this.dialog.closeAll();
  }
  deleterow(index: any) {
    console.log(index);
    this.saveddataarray.splice(index, 1);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
  }
  deleteItem(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
    });
    this.deleteNumber = rw.number;
  }
  getJoList() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custservice.getJobOrderData(obj).subscribe((res: any) => {
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
    this.getJoList();
  }

  edit_data(data: any, index: number, dialog: any) {
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
      // field: "number",
      number: this.editednumber,
    };

    this.custservice.addjobOrder(obj).subscribe((res: any) => {
      this.dialog.closeAll();
      this.editdataa = res.data[0];
      console.log(this.editdataa);
      this.saveddataarray = res.data;
      this.dataSource.data = this.saveddataarray;
      console.log(this.dataSource);
      this.jodata.date = moment(this.editdataa.date).format("YYYY-MM-DD");
      this.jodata.company_name = this.editdataa.company_name;
      this.jodata.vendor_name = this.editdataa.vendor_name;
      this.jodata.subject = this.editdataa.subject;
      this.jodata.tax_percent = this.editdataa.tax_percent;
      this.jodata.tax_description = this.editdataa.tax_description;
      this.jodata.comments = this.editdataa.comments;
      this.line_item = this.editdataa.line_item;
      this.number = this.editdataa.number;
      this.job_description = this.editdataa.job_description;
      this.unit_price = this.editdataa.unit_price;
      this.quantity = this.editdataa.quantity;
      this.total_amount = this.editdataa.total_amount;
      this.demo1TabIndex = 0;
      this.btn = "Update";
    });
  }
  deleteFile() {
    let obj = {
      command: "del",
      deleted_by: "admin",
      number: this.deleteNumber,
      // reason: this.deleteModel.reason,
    };
    this.custservice.deleteJoFile(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.getJoList();
        this.deleteModel.reason = "";
        this.getlogdata();
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
    postData.append("document_type", "Daily Material Receipt");
    postData.append("document_number", this.resultdcnumber);
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
    this.jonumber = row1.number;
    this.getexistingfiles();
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.jonumber)
      .set("document_type", "Job Order");
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
      .set("document_number", this.jonumber)
      .set("document_type", "Job Order")
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
    postData.append("document_type", "Job Order");
    postData.append("document_number", this.jonumber);
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
  getlogdata() {
    let obj = {
      command: "log",
      key: "PurchaseRequest",
    };
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log;
      }
    });
  }

}
