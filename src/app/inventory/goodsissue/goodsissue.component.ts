import { Component, Injector, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "src/app/services/customer.service";
import * as moment from "moment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NoopScrollStrategy } from "@angular/cdk/overlay";
import { Overlay } from "@angular/cdk/overlay";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { I } from "@angular/cdk/keycodes";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-goodsissue",
  templateUrl: "./goodsissue.component.html",
  styleUrls: ["./goodsissue.component.scss"],
})
export class GoodsissueComponent implements OnInit {
  displayedColumns: any[] = [
    "sno",
    "material_code",
    "material_description",
    "unit_of_measurement",
    "storage_location",
    "request_quantity",
    "quantity",
    "item_remarks",
    // "batch_no",
    "valution_type",
    "action",
  ];
  displayedColumns1: any[] = [
    "sno",
    "misNumber",
    "Date",
    "company_Name",
    "tocompanyname",
    "contractor_name",
    "request_number",
    // 'issue_type',
    // 'ActiveStatus',
    "action",
  ];
  btn: any = "Save";
  model: any = {};
  model1: any = {};
  model2: any = {};
  editmodel: any = {};
  saveddataarray: any[] = [];
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  dataSourcemain = new MatTableDataSource();
  valuefrminv: any = 0;
  valuefrmrec: any = 0;
  unitValue: any = 0;
  discValue: any = 0;
  taxPercent: any = 0;
  masterData: any;
  taxData: any;
  companyData: any;
  vendorData: any;
  transporterName: any;
  vehicleNum: any;
  basicFreight: any = 0;
  freightPercentage: any = 0;
  freightPercentage1: any = 0;
  storageData: any;
  matCode: any[] = [];
  matName: any[] = [];
  UOM: any[] = [];
  storageLocation: any[] = [];
  InvoiceQuantity: any[] = [];
  ReqQTY: any[] = [];
  qty: any[] = [];
  itemremarks: any[] = [];
  batchno: any[] = [];
  valutionType: any[] = [];
  shrQTY: any[] = [];
  excsQTY: any[] = [];
  unitPrice: any[] = [];
  discPERCENT: any[] = [];
  discVALUE: any[] = [];
  basicPRICE: any[] = [];
  taxDESC: any[] = [];
  taxPERCEN: any[] = [];
  taxVALUE: any[] = [];
  otherTAXSPLIT: any[] = [];
  SNO: any[] = [];
  freightSPLIT: any[] = [];
  othertaxSPLIT: any[] = [];
  otherchargesSPLIT: any = [];
  totalPRICE: any[] = [];
  addedTableData: any = true;
  savedTableData: any = false;
  totalRecords: any = 0;
  reaData: boolean;
  loadingRecords: any = false;
  pageIndex: any = 1;
  pageSize: any = 10;
  deleteNumber: any;
  deletemodel: any = {};
  editModel: any = {};
  model2matcode: any;
  model2matdes: any;
  valuefrminvedit: any = 0;
  valuefrmrecedit: any = 0;
  unitValueedit: any = 0;
  discValueedit: any = 0;
  editedtaxdescription: any;
  selectedIndex: number;
  SUM: any = 0;
  editabledata: any;
  editDATAA: any = false;
  materialCODE: any;
  materialNAME: any;
  systemref: any;
  NUMBER: any;
  basicFreight1: any = 0;
  selectedtransporter: any;
  selectedvehiclenum: any;
  selectedvehiclenum1: any;
  selectedtransporter1: any;
  selectedmaterial: any;
  selectedstorage: any;
  selectedstorage1: any;
  selectedmaterial1: any;
  valutiondata: any;
  contracordata: any;
  demo1TabIndex: any = 0;
  smsdata: any;
  materialreqdata: any;
  dialogRef: any = null;
  ginumber: any;
  filedata: any;
  createNewFile: any = {};
  imageUrl = environment.base_url;
  deleteid: any;
  fileUploadUrls: any[] = [];
  fileUploadUrlsgi: any[] = [];
  resultginumber: any;
  selectedfiles: any[] = [];
  filenamearray: any[] = [];
  editednumber: any;
  logdata: any;
  editdataa: any;
  firstrecord: any;
  selectedconname: any;
  requesttype: any;
  selectedvehicledata: any;
  vehicledata: any;
  columnname: string;
  searchData: any;
  smsdata1: any;
  companyData1: any;
  matCode11: any;
  matDesc: string;
  constructor(
    private dialog: MatDialog,
    private custservice: CustomerService,
    private snackbar: MatSnackBar,
    public overlay: Overlay,
    private alertcall: AlertCallsService,
    private router: Router,
    private route: ActivatedRoute,
    private injector: Injector
  ) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.model1.requestdate = moment(new Date()).format("YYYY-MM-DD");
    this.model1.dateee = moment(new Date()).format("YYYY-MM-DD");
    this.route.queryParams.subscribe((params: any) => {
      if (params.tab == "notificationsissue") {
        this.demo1TabIndex = 1;
        console.log(params);
      } else {
        this.demo1TabIndex = 0;
      }
    });
    // this.getmasterdata()
    // this.getTaxlistdata();
    // this.getcompanydata();
    this.getmasterdata();
    this.getstoragelocData();
    this.getvalutionData();
    this.getData();
    // this.getvalutionData()
    this.getContractdata();
    this.getmaterialreqData();
    this.getlogdata();
    this.getvehiclelist();
    this.getcompanydata1();
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
 this.vehicledata=res.data
  
})
  }
  selectedvehiclenumber(){
    
  }
  selectedreqnumber() {
    let obj = {
      key: this.model1.requestnumber,
      field: "number",
      // command: "mat",
      command: "gir",
    };
    this.custservice.GoodsIssueRequest(obj).subscribe((res: any) => {
      console.log(res);
      this.firstrecord = res.data[0];
      res.data.forEach((element: any) => {
        element["request_quantity"] = element.quantity;
        element["quantity"] = "";
      });
      this.saveddataarray = res.data;
      this.dataSource.data = this.saveddataarray;
      (this.model1.companyname = this.firstrecord.company_name),
        (this.model1.contractorname = this.firstrecord.contractor_name),
        (this.model1.locations = this.firstrecord.locations),
        (this.model1.comments = this.firstrecord.comments),
        (this.model1.requesttype = this.firstrecord.request_type);
    });
   
  }
  getlogdata() {
    let obj = {
      command: "log",
      key: "GoodsIssue",
    };
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log;
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
      .set("document_type", "Goods Issue");
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
      .set("document_number", this.ginumber)
      .set("document_type", "Goods Issue")
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
    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type", "Goods Issue");
    postData.append("document_number", this.ginumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file);
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);
        this.getexistingfiles();
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
    postData.append("document_type", "Goods Issue");
    postData.append("document_number", this.resultginumber);
    for (const file of this.fileUploadUrlsgi) {
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
  printdmr(data: any) {
    console.log(data.number);
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     "dmrnumber": data.number
    //   }
    // };
    this.router.navigate(["/inventory/printgoodsissue"], {
      queryParams: { misnumber: data.number },
    });
    // this.dialog.open(PrintdmrComponent,{
    //   width:"500px",
    //   height:"auto",
    //   data:data.number
    // })
  }
  selectedreqqty() {
    if (this.model.qty > this.model.reqqty) {
      this.alertcall.showWarning(
        "Accepted",
        "Quantity Not More Than Request Quantity"
      );
    }
    console.log(this.model.qty);
  }
  selectedqty() {
    if (this.model.qty > this.model.reqqty) {
      this.alertcall.showWarning(
        "Accepted",
        "Quantity Not More Than Request Quantity"
      );
    }
    console.log(this.model.qty);
  }
  filtecontractordatadata(ev: any) {
    console.log(ev.target.value);
    this.selectedconname = ev.target.value;
    if (this.selectedconname.length > 2) {
      this.getContractdata();
    }
    if (!this.selectedconname) {
      this.getContractdata();
    }
  }
  getContractdata() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
      key: this.selectedconname || "",
    };
    this.custservice.getcontractormasterdata(obj).subscribe((res: any) => {
      this.contracordata = res.data;
    });
  }
  deleterow(index: any) {
    console.log(index);

    this.saveddataarray.splice(index, 1);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
  }

  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
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
    this.custservice.deletegoodsissue(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.getData();
        this.getlogdata();
        this.deletemodel.reason = "";
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
  getData() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
    };
    this.custservice.getSearchGoodsIssue1(obj).subscribe((res: any) => {
      console.log(res);

      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }

  getstorageDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedstorage = ev.target.value;
    if (this.selectedstorage.length > 2) {
      // this.getstoragelocData();
      this.getSMSdata();
    }else{
      this.getSMSdata();
    }
  }
  getstorageDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedstorage1 = ev.target.value;
    if (this.selectedstorage1.length > 2) {
      // this.getstoragelocData();
      this.getSMSdata();
    }else{
      this.getSMSdata();
    }
  }
  getstoragelocData() {
    let obj = {
      command: "mat",
      field: "storage_location",
      key: this.selectedstorage || this.selectedstorage1,
    };
    this.custservice.getmatstoragelocdata(obj).subscribe((res: any) => {
      this.storageData = res.data; 
    });
  }
  getvehiclenumDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedvehiclenum = ev.target.value;
    if (this.selectedvehiclenum.length > 2) {
      this.getvehiclenumdata();
    }
  }
  getvehiclenumDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedvehiclenum1 = ev.target.value;
    if (this.selectedvehiclenum1.length > 2) {
      this.getvehiclenumdata();
    }
  }
  getvehiclenumdata() {
    let obj = {
      command: "mat",
      field: "vehicle_number",
      key: this.selectedvehiclenum || this.selectedvehiclenum1,
    };
    this.custservice.getmatvehiclenumdata(obj).subscribe((res: any) => {
      this.vehicleNum = res.data;
    });
  }
  gettransportDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedtransporter = ev.target.value;
    if (this.selectedtransporter.length > 2) {
      this.getTransporterdata();
    }
    if (!this.selectedtransporter) {
      this.getTransporterdata();
    }
  }
  gettransportDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedtransporter1 = ev.target.value;
    if (this.selectedtransporter1.length > 2) {
      this.getTransporterdata();
    }
    if (!this.selectedtransporter1) {
      this.getTransporterdata();
    }
  }
  getTransporterdata() {
    let obj = {
      command: "mat",
      field: "transporter_name",
      key: this.selectedtransporter || this.selectedtransporter1,
    };
    this.custservice.getmattransnamedata(obj).subscribe((res: any) => {
      this.transporterName = res.data;
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
  getcompanydata() {
    let obj = {
      command: "lst",
    };
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data;
    });
  }
  getcompanydata1() {
    let obj = {
      command: "lst",
    };
    this.custservice.usercompanyData(obj).subscribe((res: any) => {
      this.companyData1 = res.data;
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
    };
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data;
    });
  }
  getTaxlistdata() {
    let obj = {
      command: "lst",
    };
    this.custservice.gettaxlistdata(obj).subscribe((res: any) => {
      this.taxData = res.data;
    });
  }
  selectedmastergroup() {
    console.log(this.model.matcode);
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.model.matcode) {
        this.model.uom = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });

    this.getSMSdata();
  }

  addgoodsissue(data: any) {
    // this.getmasterdata()
    // this.getstoragelocData()
    // this.getvalutionData()
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
    this.model["material_code"] = this.materialCODE;
    this.model["material_description"] = this.materialNAME;
    console.log(this.model);

    // this.editDATAA=true;
    this.saveddataarray.push(this.model);
    console.log(this.saveddataarray);

    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
    this.model = {};
    this.smsdata = "";
    this.smsdata1="";
    this.dialog.closeAll();
  }
  getvalutionData() {
    let obj = {
      lmt: 100000,
      pid: 1,
      command: "lst",
      key: "",
    };
    this.custservice.getvalutiondata(obj).subscribe((res: any) => {
      this.valutiondata = res.data;
    });
  }
  savefinaldata(fr: any) {
    if (this.btn == "Save") {
      console.log(this.saveddataarray);
      this.saveddataarray.forEach((ele: any, index) => {
        this.SNO.push(index + 1);
        this.matCode.push(ele.material_code);
        this.matName.push(ele.material_description);
        this.UOM.push(ele.uom);
        this.storageLocation.push(ele.storagelocation);
        this.ReqQTY.push(Number(ele.reqqty));
        this.qty.push(Number(ele.qty));
        this.itemremarks.push(ele.itemremarks);
        this.batchno.push(ele.batchno);
        this.valutionType.push(ele.valutiontype);
      });

      let obj = {
        date: moment(this.model1.dateee).format("YYYY-MM-DD"),

        company_name: this.model1.companyname,
        to_company_name: this.model1.tocompany,
        contractor_name: this.model1.contractorname,
        receiver_name: this.model1.receivername,
        request_number: this.model1.requestnumber,
        request_date: moment(this.model1.requestdate).format("YYYY-MM-DD"),
        issue_type: "type 1",
        locations: this.model1.locations,
        line_item: this.SNO,
        material_code: this.matCode,
        material_description: this.matName,
        unit_of_measurment: this.UOM,
        request_quantity: this.ReqQTY,
        quantity: this.qty,
        item_remarks: this.itemremarks,
        valuation_type: this.valutionType,
        storage_location: this.storageLocation,
        batch_number: this.batchno,
        comments: this.model1.comments,
        vehicle_number: this.model1.vehiclenumber,
        request_type: this.model1.requesttype,
        command: "add",
      };
      this.custservice.addgoodsissue(obj).subscribe((res: any) => {
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
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.storageLocation = [];
          this.ReqQTY = [];
          this.qty = [];
          this.itemremarks = [];
          this.batchno = [];
          this.smsdata = "";
          this.smsdata1="";
          this.getData();
          this.getlogdata();
          this.resultginumber = res["reference"];
          if (this.fileUploadUrlsgi.length > 0) {
            this.uploadselectedfiles();
          }
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.storageLocation = [];
          this.ReqQTY = [];
          this.qty = [];
          this.itemremarks = [];
          this.batchno = [];
        }
      });
    } else {
      console.log(this.saveddataarray);
      this.saveddataarray.forEach((ele: any, index) => {
        this.SNO.push(index + 1);
        this.matCode.push(ele.material_code);
        this.matName.push(ele.material_description);
        this.UOM.push(ele.uom || ele.unit_of_measurment);
        this.storageLocation.push(ele.storagelocation || ele.storage_location);
        this.ReqQTY.push(Number(ele.reqqty || ele.request_quantity));
        this.qty.push(Number(ele.qty || ele.quantity));
        this.itemremarks.push(ele.itemremarks || ele.item_remarks);
        this.batchno.push(ele.batchno || ele.batch_number);
        this.valutionType.push(ele.valutiontype || ele.valuation_type);
      });

      let obj = {
        reason: this.editModel.reason,
        date: moment(this.model1.dateee).format("YYYY-MM-DD"),

        company_name: this.model1.companyname,
        to_company_name: this.model1.tocompany,
        contractor_name: this.model1.contractorname,
        receiver_name: this.model1.receivername,
        request_number: this.model1.requestnumber,
        request_date: moment(this.model1.requestdate).format("YYYY-MM-DD"),
        issue_type: "type 1",
        locations: this.model1.locations,
        line_item: this.SNO,
        material_code: this.matCode,
        material_description: this.matName,
        unit_of_measurment: this.UOM,
        request_quantity: this.ReqQTY,
        quantity: this.qty,
        item_remarks: this.itemremarks,
        valuation_type: this.valutionType,
        storage_location: this.storageLocation,
        batch_number: this.batchno,
        comments: this.model1.comments,
        vehicle_number: this.model1.vehiclenumber,
        request_type: this.model1.requesttype,
        command: "edt",
        number: this.editednumber,
      };
      this.custservice.addgoodsissue(obj).subscribe((res: any) => {
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
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.storageLocation = [];
          this.ReqQTY = [];
          this.qty = [];
          this.itemremarks = [];
          this.batchno = [];
          this.smsdata = "";
          this.smsdata1="";
          this.getData();
          this.getlogdata();
          this.editModel.reason = "";
          this.resultginumber = this.editednumber;
          if (this.fileUploadUrlsgi.length > 0) {
            this.uploadselectedfiles();
          }
          this.btn = "Save";
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.storageLocation = [];
          this.ReqQTY = [];
          this.qty = [];
          this.itemremarks = [];
          this.batchno = [];
        }
      });
    }
  }
  editdata(row1: any, index: any, data: any) {
    // this.getmasterdata()
    // this.getstoragelocData()
    // this.getvalutionData()
    // this.editDATAA=false
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
    this.matDesc=row1.material_code+"-"+row1.material_description;
    this.matCode11=row1.material_code;
    this.materialNAME=row1.material_description;
    this.model2.matcode = this.systemref || this.matDesc;
    this.model2.uom = row1.uom || row1.unit_of_measurment;
    this.model2.storagelocation = row1.storagelocation || row1.storage_location;
    this.model2.reqqty = row1.reqqty || row1.request_quantity;
    this.model2.qty = row1.qty || row1.quantity;
    this.model2.itemremarks = row1.itemremarks || row1.item_remarks;
    this.model2.batchno = row1.batchno || row1.batch_number;
    this.model2.valutiontype = row1.valutiontype || row1.valuation_type;
    this.getSMSdata();
  }
  saveaddededitdata(fr: any) {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.model2.matcode) {
        this.model2matcode = el.code;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    this.getSMSdata();
    this.model2["material_code"] = this.materialCODE;
    this.model2["material_code"] = this.matCode11;
    this.model2["material_description"] = this.materialNAME;
    this.saveddataarray.splice(this.selectedIndex, 1, this.model2);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
    // this.saveddataarray[this.selectedIndex].matcode=this.model2matcode
    this.model2 = {};
    this.smsdata = "";
    this.smsdata1="";
    this.dialog.closeAll();
  }
  selectedmastereditgroup() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.model2.matcode) {
        this.model2.uom = el.uom_1;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    this.getSMSdata();
    console.log(this.model2matcode, this.model2matdes);
  }

  keyPressNumbers(evt: any) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  onSelectionChange(ev: any) {}
  getSMSdata() {
    let obj = {
      material_code: this.materialCODE  || this.matCode11,
      command: "sms",
    };
    this.custservice.getsmsdata(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res["status_code"] == "200") {
        console.log(res);

        this.smsdata = res.message;
        this.smsdata1=res.storage_locations;
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
        this.smsdata1="";
        this.alertcall.showWarning("Warning", res["message"]);
      }
    });
  }
  getmaterialreqData() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
      // "key": ""
    };
    this.custservice.getmaterialrequestdata(obj).subscribe((res: any) => {
      this.materialreqdata = res.data;
    });
  }
  editgidata(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px",
    });
    this.editednumber = data.number;
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      field: "number",
      number: this.editednumber,
    };
    this.custservice.addgoodsissue(obj).subscribe((res: any) => {
      this.dialog.closeAll();
      this.editdataa = res.data[0];
      this.saveddataarray = res.data;
      this.dataSource.data = this.saveddataarray;
      (this.model1.dateee = moment(this.editdataa.date).format("YYYY-MM-DD")),
        (this.model1.companyname = this.editdataa.company_name),
        (this.model1.tocompany = this.editdataa.to_company_name),
        (this.model1.contractorname = this.editdataa.contractor_name),
        (this.model1.receivername = this.editdataa.receiver_name),
        (this.model1.requestnumber = this.editdataa.request_number),
        (this.model1.requestdate = moment(this.editdataa.request_date).format(
          "YYYY-MM-DD"
        )),
        (this.model1.locations = this.editdataa.locations),
        (this.model1.comments = this.editdataa.comments),
        (this.model1.vehiclenumber = this.editdataa.vehicle_number),
        (this.model1.requesttype = this.editdataa.request_type);
      this.demo1TabIndex = 0;
      this.btn = "Update";
     
    });
  }
  onChange() {
    console.log('Selected:',this.columnname);
    this.searchData=""    
  }
  search(){
    console.log(this.searchData); 
   let obj= {"command":"lst","field":this.columnname ,"key":this.searchData,"lmt":this.pageSize,"pid":this.pageIndex}
    if(this.searchData.length>2){
      this.custservice.getSearchGoodsIssue1(obj).subscribe((res: any) => {
        console.log(res);
        this.reaData = false;
        this.totalRecords = res?.count;
        this.dataSourcemain.data = res.data;
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

