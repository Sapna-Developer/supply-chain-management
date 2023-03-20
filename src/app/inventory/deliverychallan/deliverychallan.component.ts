import { Component, OnInit } from '@angular/core';
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
  selector: 'app-deliverychallan',
  templateUrl: './deliverychallan.component.html',
  styleUrls: ['./deliverychallan.component.scss']
})
export class DeliverychallanComponent implements OnInit {

  displayedColumns: any[] = [
    "sno",
    "material_code",
    "material_description",
    "hsn_code",
    // "description",
    "unit_of_measurement",
    "quantity",
    'unit_price',
    'total_value',
    'storage_location',
    'valution_type',
    "action",
  ];
  displayedColumns1: any[] = [
    "sno",
    "Number",
    "Date",
    "company_name",
    "consignee_name",
    "action",
  ];
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
  demo1TabIndex: any = 0;
  companyData: any;
  dcdata: any = {};
  dcdata1: any = {};
  deliveryChallan: any;
  saveddataarray: any[] = [];
  // remarks: any;
  basicprice: any;
  taxdescription: any;
  lineitem: any;
  hsn_Code: any;
  mat_description: any;
  Qty: any[] = [];
  taxpercent: any;
  // model: any = {};
  hsnCODE: any;
  DESCRIPTION: any;
  dataSource = new MatTableDataSource();
  dataSourcemain = new MatTableDataSource();
  dataSourcemainlog = new MatTableDataSource();
  SNO: any[] = [];
  matCode: any[] = [];
  matName: any[] = [];
  UOM: any[] = [];
  itemremarks: any;
  selectedIndex: number;
  deleteNumber: any;
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  editednumber: any;
  editdataa: any;
  remarks: any[];
  date: string;
  consignee_name: any;
  company_name: any;
  consignee_address: any;
  company_address: any;
  consignee_gst: any;
  company_gst: any;
  transporter_name: any;
  delivery_address: any;
  vehicle_number: any;
  lr_number: any;
  total_value: any;
  tax_percent: any;
  tax_description: any;
  line_item: any[] = [];
  hsn_code: any[] = [];
  unit_of_measurement: any[] = [];
  description: any[] = [];
  quantity: any[] = [];
  btn: any = "Save";
  editModel: any = {};
  deleteModel: any = {};
  finaldataarray: any[] = [];
  isactivestatus: any = true;
  data_for_edit: any;
  hsncode: any;
  dcdata2: any = {};
  fileUploadUrls: any[] = [];
  filenamearray: any[] = [];
  filenamearray1: any[] = [];
  fileUploadUrlspr: any[] = [];
  selectedfiles: any[] = [];
  resultdcnumber: any;
  dcnumber: any;
  filedata: any;
  createNewFile: any = {};
  imageUrl = environment.base_url;
  deleteid: any;
  dialogRef: any = null;
  logdata: any;
  vendorData: any;
  selectedvendor: any;
  selectedmaterial: any;
  selectedmaterial1: any;
  masterData: any=[]
  unit_price: any[]=[];
  storageLocation: any[] = [];
  valutionType: any[] = [];
  basic_price: any[]=[];
  materialCODE: any;
  materialNAME: any;
  matCode11: any;
  matDesc: string;
  taxData: any;
  columnname: any;
  searchData: string;
  reaDatalog: boolean;
  totalRecordslog: any;
  storageData: any;
  selectedstorage: any;
  valutiondata: any;
  smsdata: any;
  smsdata1: any;
  // matcodedata: string="";
  totalValue: any;
  documnet_nodata: any;
  constructor(
    private dialog: MatDialog,
    private custservice: CustomerService,
    private alertcall: AlertCallsService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isactivestatus = true;
    this.dcdata.date = moment(new Date()).format("YYYY-MM-DD");
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
    this.getDcList();
    this.getlogdata();
    this.getTaxlistdata();
    this.getstoragelocData();
    this.getvalutionData();
  }
  //get company data
  getcompanydata() {
    let obj = {
      command: "lst",
      lmt: 100,
      pid: this.pageIndex,
    };
    this.custservice.usercompanyData(obj).subscribe((res: any) => {
      this.companyData = res.data;
    });
  }
  saveFinalData(fr: any) {
    if (this.btn === "Save") {
      console.log(this.saveddataarray);
      this.saveddataarray.forEach((ele: any, index) => {
        console.log(ele);
        this.line_item.push(index + 1);
        this.hsn_code.push(ele.hsn_code);
        this.matCode.push(ele.material_code);
        this.matName.push(ele.material_description);
        // this.description.push(ele.description);
        this.unit_of_measurement.push(ele.unit_of_measurement);
        this.unit_price.push(ele.unit_price);
        this.basic_price.push(ele.basic_price);
        this.quantity.push(Number(ele.quantity));
        this.storageLocation.push(ele.storagelocation)
        this.valutionType.push(ele.valutiontype)
      });
      let obj = {
        command: "add",
        date: moment(this.dcdata.date).format("YYYY-MM-DD"),
        consignee_name: this.dcdata.consignee_name,
        company_name: this.dcdata.company_name,
        consignee_address: this.dcdata.consignee_address,
        company_address: this.dcdata.company_address,
        consignee_gst: this.dcdata.consignee_gst,
        // company_gst: this.model1.companygst,
        delivery_address: this.dcdata.delivery_address,
        transporter_name: this.dcdata.transporter_name,
        vehicle_number: this.dcdata.vehicle_number,
        lr_number: this.dcdata.lr_number,
        basic_price: this.dcdata.basic_price,
        tax_percent: this.dcdata.tax_percent,
        tax_description: this.dcdata.tax_description,
        remarks: this.dcdata.remarks,
        line_item: this.line_item,
        hsn_code: this.hsn_code,
        description: this.description,
        unit_of_measurement: this.unit_of_measurement,
        quantity: this.quantity,
        material_code: this.matCode,
        material_description: this.matName,
        unit_price:this.unit_price,
        total_value:this.total_value,
        valuation_type: this.valutionType,
        storage_location: this.storageLocation,
      };

      this.custservice.addDeliveryChallan(obj).subscribe((res: any) => {
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
          this.hsn_code = [];
          this.unit_price=[];
          this.total_value=[];
          this.matCode=[];
          this.matName=[];
          this.description = [];
          this.unit_of_measurement = [];
          this.quantity = [];
          this.storageLocation = []
          this.valutionType=[]
          this.getDcList();
          this.getlogdata();
          this.resultdcnumber = res["reference"];
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.line_item = [];
          this.hsn_code = [];
          this.description = [];
          this.unit_of_measurement = [];
          this.quantity = [];
          this.unit_price=[];
          this.basic_price=[];
          this.matCode=[];
          this.matName=[];
          this.storageLocation = []
          this.valutionType=[]
        }
      });
    }
    if (this.btn === "Update") {
      console.log(this.saveddataarray);
      console.log(this.dcdata1);
      console.log(this.dcdata);

      this.line_item = [];
      this.hsn_code = [];
      this.description = [];
      this.unit_of_measurement = [];
      this.quantity = [];
      this.saveddataarray.forEach((ele: any, index) => {
        console.log(ele);
        this.line_item.push(index + 1);
        this.matCode.push(ele.material_code);
        this.matName.push(ele.description||ele.material_description);
        this.hsn_code.push(ele.hsn_code);
        // this.description.push(ele.description);
        this.unit_of_measurement.push(ele.unit_of_measurement);
        this.quantity.push(Number(ele.quantity));
        this.unit_price.push(ele.unit_price);
        this.basic_price.push(ele.basic_price);
        this.storageLocation.push(ele.storagelocation || ele.storage_location)
        this.valutionType.push(ele.valutiontype || ele.valuation_type)
      });
      let obj = {
        reason: this.editModel.reason,
        date: moment(this.dcdata.date).format("YYYY-MM-DD"),
        consignee_name: this.dcdata.consignee_name,
        company_name: this.dcdata.company_name,
        consignee_address: this.dcdata.consignee_address,
        company_address: this.dcdata.company_address,
        consignee_gst: this.dcdata.consignee_gst,
        // company_gst: this.model1.companygst,
        delivery_address: this.dcdata.delivery_address,
        transporter_name: this.dcdata.transporter_name,
        vehicle_number: this.dcdata.vehicle_number,
        lr_number: this.dcdata.lr_number,
        total_value:this.dcdata.total_value,
        tax_percent: this.dcdata.tax_percent,
        tax_description: this.dcdata.tax_description,
        remarks: this.dcdata.remarks,
        line_item: this.line_item,
        hsn_code: this.hsn_code,
        // description: this.description,
        unit_of_measurement: this.unit_of_measurement,
        quantity: this.quantity,
        material_code: this.matCode,
        material_description: this.matName,
        unit_price:this.unit_price,
        basic_price: this.basic_price,
        number: this.editednumber,
        valuation_type: this.valutionType,
        storage_location: this.storageLocation,
        command: "edt",
      };
      this.custservice.updateDeliveryChallan(obj).subscribe((res: any) => {
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
          this.hsn_code = [];
          this.description = [];
          this.unit_of_measurement = [];
          this.quantity = [];
          this.unit_price=[];
          this.basic_price=[];
          this.matCode=[];
          this.matName=[];
          this.getDcList();
          this.getlogdata();
          this.editednumber = "";
          this.editModel.reason = "";

          this.resultdcnumber = this.editednumber;
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
          // this.smsdata = "";
          this.btn = "Save";
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.line_item = [];
          this.hsn_code = [];
          this.description = [];
          this.unit_price=[];
          this.basic_price=[];
          this.matCode=[];
          this.matName=[];
          this.unit_of_measurement = [];
          this.quantity = [];
        }
      });
    }
    // this.saveddataarray = [];
  }

  addDeliveryChallanmodel(data: any) {
    this.dcdata2 = {};
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

    // this.model["hsn_code"] = this.hsnCODE;
    // this.model["description"] = this.DESCRIPTION;
    console.log(this.dcdata1);

    // this.editDATAA=true;
    this.saveddataarray.push(this.dcdata2);
    console.log(this.saveddataarray);

    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
    // this.dcdata = {};
    // this.smsdata = "";
    this.dialog.closeAll();
    this.gettotalvalue11()
  }

  editdata(row1: any, index: any, data: any) {
    console.log(row1);
    // this.matcodedata=row1.material_code
    this.getmasterdata()
    this.selectedIndex = this.saveddataarray.indexOf(row1);
    console.log(this.selectedIndex);
    this.dialog.open(data, {
      width: "1100px",
    });
    this.matDesc=row1.material_code+"-"+(row1.description || row1.material_description);
    this.materialCODE=row1.material_code;
    this.materialNAME=row1.description || row1.material_description;
    this.dcdata1.matcode=this.matDesc;
    this.dcdata1.hsn_code = row1.hsn_code;
    this.dcdata1.unit_of_measurement = row1.unit_of_measurement;
    // this.dcdata1.description = row1.description;
    this.dcdata1.quantity = row1.quantity;
    this.dcdata1.unit_price=row1.unit_price;
    this.dcdata1.basic_price=row1.basic_price;
    this.dcdata1.storagelocation=row1.storage_location || row1.storagelocation;
    this.dcdata1.valutiontype=row1.valuation_type || row1.valuationtype || row1.valutiontype;

    this.dcdata1["material_code"] = this.materialCODE;
    this.dcdata1["material_description"] = this.materialNAME;
  }
  saveaddededitdata(fr: any) {
    console.log(this.masterData);
    this.masterData.forEach((el: any) => {
    
      
      if (el.system_reference_1 == this.dcdata1.matcode) {
        console.log(el);
        
        this.dcdata1.matcode = el.code;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    this.getSMSdata();
    this.dcdata1["material_code"] = this.materialCODE;
    // this.dcdata1["material_code"] = this.matCode11;
    this.dcdata1["material_description"] = this.materialNAME;
    console.log(this.dcdata1);
    
    this.saveddataarray.splice(this.selectedIndex, 1, this.dcdata1);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);

    this.dcdata1 = {};
   
    //  this.smsdata = "";
    this.dialog.closeAll();
    // setTimeout(() => {
    //   this.matcodedata=""
    // }, 100);
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
      // scrollStrategy: new NoopScrollStrategy()
    });
    this.deleteNumber = rw.number;
  }
  getDcList() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custservice.getDeliveryChallanData(obj).subscribe((res: any) => {
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
    this.getDcList();
  }
  deleteFile() {
    let obj = {
      command: "del",
      number: this.deleteNumber,
      reason: this.deleteModel.reason,
    };
    this.custservice.deleteDcFile(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.getDcList();
        this.deleteModel.reason = "";
        this.getlogdata();
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
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
      field: "number",
      key: this.editednumber,
    };
    this.custservice.addDeliveryChallan(obj).subscribe((res: any) => {
      this.dialog.closeAll();
      this.editdataa = res.data[0];
      console.log(this.editdataa);
      this.saveddataarray = res.data;
      this.dataSource.data = this.saveddataarray;
      console.log(this.dataSource);
      this.dcdata.date = moment(this.editdataa.date).format("YYYY-MM-DD");
      this.dcdata.consignee_name = this.editdataa.consignee_name;
      this.dcdata.company_name = this.editdataa.company_name;
      // this.model1.companygst = this.editdataa.company_gst;
      this.dcdata.consignee_address = this.editdataa.consignee_address;
      this.dcdata.company_address = this.editdataa.company_address;
      this.dcdata.consignee_gst = this.editdataa.consignee_gst;
      this.dcdata.delivery_address = this.editdataa.delivery_address;
      this.dcdata.transporter_name = this.editdataa.transporter_name;
      this.dcdata.vehicle_number = this.editdataa.vehicle_number;
      this.dcdata.lr_number = this.editdataa.lr_number;
      this.dcdata.total_value = this.editdataa.total_value;
      this.dcdata.tax_percent = this.editdataa.tax_percent;
      this.dcdata.tax_description = this.editdataa.tax_description;
      this.dcdata.remarks = this.editdataa.remarks;
      this.line_item = this.editdataa.line_item;
      this.hsn_code = this.editdataa.hsn_code;
      // this.mat_code=this.editdataa.material_code;
      // this.description = this.editdataa.description;
      this.unit_of_measurement = this.editdataa.unit_of_measurement;
      this.quantity = this.editdataa.quantity;

      this.demo1TabIndex = 0;
      this.btn = "Update";
    });
  }
  printDc(data: any) {
    console.log(data.number);
  //   const url = this.router.serializeUrl(
  //    this.router.createUrlTree(["/inventory/print-dc"], {queryParams: { dcnumber: data.number }}))
  //  window.open(url,"_blank")
// window.print(url,"_blank")

     this.router.navigate(["/inventory/print-dc"], {queryParams: { dcnumber: data.number }})

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
    this.dcnumber = row1.number;
    this.getexistingfiles();
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.dcnumber)
      .set("document_type", "Purchase Request");
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
      .set("document_number", this.dcnumber)
      .set("document_type", "Purchase Request")
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
    postData.append("document_type", "Dellivery Challanks");
    postData.append("document_number", this.dcnumber);
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
      lmt: this.pageSize,
      pid: this.pageIndex,
      key: "DeliveryChallan",
    };
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      console.log(res);
        this.logdata = res.log;
        this.reaDatalog = false;
      this.totalRecordslog = res?.count;
      this.dataSourcemainlog = res.log;
      console.log(this.dataSourcemainlog);
      if (res.log.length == 0) {
        this.reaDatalog = true;
      }
    });
  }
  onpageeventlog(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getlogdata();
  }
//material code
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
  this.selectedmaterial1 = ev.target.value;
  if (this.selectedmaterial1.length > 2) {
    this.getmasterdata();
  }
  if (!this.selectedmaterial1) {
    this.getmasterdata();
  }
}
getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100,
      pid: 1,
      key: this.selectedmaterial || this.selectedmaterial1,
      // "code":this.matcodedata
    };
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data;
    //   this.masterData.forEach((ele: any) => {
    //     if (ele.code == this.matcodedata) {
    //       // alert(1)
    //       this.dcdata1.matcode = ele.system_reference_1
    //       // this.matcodedata=""
    //       // this.systemref = ele.system_reference_1
    //     }
    // });
  });
 
}

selectedmastergroup() {
  console.log(this.dcdata2.matcode);
  this.masterData.forEach((ele: any) => {
    if (ele.system_reference_1 == this.dcdata2.matcode) {
      this.dcdata2.unit_of_measurement = ele.uom_1;
      this.materialCODE = ele.code;
      this.materialNAME = ele.name;
    }
  });
  this.dcdata2["material_code"] = this.materialCODE;
  // this.dcdata2["material_code"] = this.matCode11;
  this.dcdata2["material_description"] = this.materialNAME;
  this.getSMSdata();
}

selectedmastereditgroup() {
  this.masterData.forEach((el: any) => {
    if (el.system_reference_1 == this.dcdata2.matcode) {
      this.dcdata2.uom = el.uom_1;
      this.materialCODE = el.code;
      this.materialNAME = el.description;
    }
  });
  this.dcdata1["material_code"] = this.materialCODE;
  // this.dcdata2["material_code"] = this.matCode11;
  this.dcdata1["material_description"] = this.materialNAME;
  this.getSMSdata();
}

//consignee 
getvendordropdowndata(ev:any){
  console.log(ev.target.value);
  this.selectedvendor=ev.target.value
  if( this.selectedvendor.length>2){
 this.getvendordata()
  }
  if(! this.selectedvendor){
    this.getvendordata()
  }
}
getvendordata(){
  let obj={
    "command":"lst",
    "lmt":100000,
    "key":this.selectedvendor ||"",
  }
  this.custservice.getvendormasterdata(obj).subscribe((res:any)=>{
    this.vendorData=res.data

  })
}

selectedConsignee(){
    this.vendorData.forEach((el: any) => {
      if (el.name == this.dcdata.consignee_name) {
        this.dcdata.consignee_address=el.address_1
        this.dcdata.delivery_address=el.address_1
      }
    });
}
getTaxlistdata(){
  let obj={
    "command" : "lst",
   
  }
  this.custservice.gettaxlistdata(obj).subscribe((res:any)=>{
  this.taxData=res.data
  })
}
selectedTAXDESC(){
  this.taxData.forEach((element:any) => {
    if(element.code==this.dcdata.tax_description){
      this.dcdata.tax_percent=element.percentage
      // this.model1.othertaxvalue=this.basicFreight1*this.editmodel.frtaxpercentage*0.01
      // this.editmodel.totalfreight= +this.basicFreight1+this.editmodel.frtaxvalue
    }
  });  
}
//select all
onChange() {
  console.log('Selected:',this.columnname);
  this.searchData=""    
}
search(){
  // console.log(this.searchData); 
 let obj= {"command":"lst","field":this.columnname ,"key":this.searchData,"lmt":this.pageSize,"pid":this.pageIndex}
  if(this.searchData.length>2){
    this.custservice.getSearchDeliveryChallan(obj).subscribe((res: any) => {
      // console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }else if(!this.searchData){
    this.getDcList()
    this.columnname=""
  }
}

//
keyPressNumbers(evt: any) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
    return false;

  return true;
}
getTotalValue(ev: any) {
  // this.dcdata2.unit_price = ev.target.value
  // console.log(this.dcdata2.unit_price);
  this.dcdata2.basic_price = (this.dcdata2.unit_price * this.dcdata2.quantity);
}
getTotalValueedit(ev: any) {
  // this.dcdata1.unit_price = ev.target.value
  // console.log(this.dcdata1.unit_price);
  
  this.dcdata1.basic_price = (this.dcdata1.unit_price * this.dcdata1.quantity);
}

  //get storage data
  getstorageDATA(ev: any) {
    // console.log(ev.target.value);
    this.selectedstorage = ev.target.value
    if (this.selectedstorage.length > 2) {
      this.getstoragelocData();
    }
  }
  getstoragelocData() {
    let obj = {
      "command": "mat",
      "field": "storage_location",
      "key": this.selectedstorage
    }
    this.custservice.getmatstoragelocdata(obj).subscribe((res: any) => {
      this.storageData = res.data
    })
  }
  //get valuation data
  getvalutionData() {
    let obj = {
      "lmt": 100000,
      'pid': 1,
      "command": "lst",
      "key": ""
    }
    this.custservice.getvalutiondata(obj).subscribe((res: any) => {
      this.valutiondata = res.data
    })
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
        this.smsdata1=res.storage_locations;
      } else {
        this.smsdata = "";
        this.smsdata1="";
        this.alertcall.showWarning("Warning", res["message"]);
      }
    });
  }

  gettotalvalue11(){
        // console.log(this.saveddataarray);
        // console.log(this.dcdata.tax_percent);
      this.totalValue=0
      this.saveddataarray.forEach((ele:any)=>{
        this.totalValue+=ele.basic_price;
      })
  // console.log(this.totalValue);
      this.dcdata.total_value =(this.totalValue * this.dcdata.tax_percent * 0.01) + this.totalValue
      console.log(this.dcdata.total_value);
  
    }
 

      //approval icon
  getApprovals(data:any, row1: any){
    // console.log(data.number);
    this.dialog.open(data, { // this.getConfirmData();
      width: '600px'
    })
    this.documnet_nodata=row1.number;
  }

getConfirmData(){
  let obj = {
    command: "add",
    document_name: "DeliveryChallan",
    document_number:this.documnet_nodata
  };
  this.custservice.AutoDocUpdate2(obj).subscribe((res: any) => {
    if(res && res['status_code']==200){
      this.dialog.closeAll()
      this.alertcall.showSuccess("Accepted", res['message'])
      this.getDcList()
    } else {
      this.dialog.closeAll()
      this.alertcall.showWarning("Error", res['message'])
    }      
  });
}

}
