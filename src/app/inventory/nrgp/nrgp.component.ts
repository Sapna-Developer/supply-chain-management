import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { CustomerService } from "src/app/services/customer.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-nrgp",
  templateUrl: "./nrgp.component.html",
  styleUrls: ["./nrgp.component.scss"],
})
export class NrgpComponent implements OnInit {
  activitylogcolumns: any[] = [
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
    "material_code",
    "material_description",
    "unit_of_measurement",
    "storage_location",
    "request_quantity",
    "quantity",
    "unit_price",
    "total_price",
    "item_remarks",
    // "batch_no",
    "valuation_type",
    "action",
  ];
  displayedColumns1: any[] = [
    "sno",
    "Number",
    "Date",
    "company_Name",
    "tocompanyname",
    "request_number",
    // "transfer_type",
    "action",
  ];
  demo1TabIndex = 0;
  model1: any = {};
  btn: any = "Save";
  companyData: any;
  masterData: any;
  selectedmaterial: any;
  model: any ={};
  materialCODE: any;
  materialNAME: any;
  selectedstorage: any;
  storageData: any;
  valutiondata: any;
  saveddataarray: any[] = [];
  matCode: any[] = [];
  matName: any[] = [];
  UOM: any[] = [];
  storageLocation: any[] = [];
  InvoiceQuantity: any[] = [];
  ReqQTY: any[] = [];
  qty: any[] = [];
  itemremarks: any[] = [];
  unitPrice:any=[]
  basic_price:any=[]
  // batchno: any[] = [];
  valutionType: any[] = [];
  dataSource = new MatTableDataSource();
  dataSourcemain = new MatTableDataSource();
  SNO: any[] = [];
  selectedIndex: number;
  systemref: any;
  model2: any = {};
  selectedmaterial1: any;
  model2matcode: any;
  model2matdes: any;
  selectedstorage1: any;
  pageIndex: any = 1;
  pageSize: any = 10;
  reaData: boolean;
  totalRecords: any = 0;
  editednumber: any;
  deleteNumber: any;
  editdataa: any;
  editModel: any = {};
  deletemodel: any = {};
  nrgpnum: any;
  filedata: any;
  createNewFile: any = {};
  fileUploadUrls: any[] = [];
  filenamearray1: any[] = [];
  imageUrl = environment.base_url;
  deleteid: any;
  dialogRef: any = null;
  fileUploadUrlsgt: any[] = [];
  filenamearray: any[] = [];
  selectedfiles: any[] = [];
  resultNrgpnumber: any;
  columnname: any;
  searchData: any;
  smsdata: any;
  smsdata1: any;
  companyData1: any;
  logdata: any;
  total:number=0;
  purposeData:any=[]
  selectedPurpose: any;
  selectedvendor: any;
  vendorData: any;
  rgpnumber: any;
  rgpdata: any;
  selectedrgpnumber: any;
  poiddata: any;
  dcnumber: any;
  DCDATA: any;
  selecteddcnumber: any;
  matcodedata: any;
  DCID: any[] = []
  editDATAA: any = false;
  matDesc: string;
  documnet_nodata: any;
  constructor(
    private custservice: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.model1.date = moment(new Date()).format("YYYY-MM-DD");
    this.model1.reqdate = moment(new Date()).format("YYYY-MM-DD");
    this.model1.lrdate = moment(new Date()).format("YYYY-MM-DD");
    this.model1.order_nodate=moment(new Date()).format("YYYY-MM-DD");
    this.getcompanydata();
    this.getmasterdata();
    this.getstoragelocData();
    this.getvalutionData();
    this.getNRGPlist();
    this.getcompanydata1();
    this.getlogdata();
    this.getPurposeData();
    this.getvendordata();
    this.getpoData();
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
    //activity log
    getlogdata() {
      let obj = {
        command: "log",
        key: "OutGatePassNRGP"
      }
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
      })
    }
  savefinaldata(fr: any) {
    console.log(this.saveddataarray);
    
    if (this.btn === "Save") {
      this.saveddataarray.forEach((ele: any, index) => {
        this.SNO.push(index + 1);
        this.matCode.push(ele.material_code);
        this.matName.push(ele.material_description || ele.description);
        this.UOM.push(ele.uom || ele.unit_of_measurment || ele.unit_of_measurement);
        this.storageLocation.push(ele.storagelocation || ele.storage_location);
        this.ReqQTY.push(Number(ele.reqqty || ele.request_quantity));
        this.qty.push(Number(ele.qty || ele.quantity));
        this.itemremarks.push(ele.itemremarks || ele.item_remarks);
        this.unitPrice.push(ele.unit_price)
        this.basic_price.push(ele.basic_price )
        // this.batchno.push(ele.batchno);
        this.valutionType.push(ele.valutiontype || ele.valuation_type);
        console.log(this.valutionType);
        
      });
      let obj = {
        command: "add",
        work_order_number: this.model1.wonumber,
        date: moment(this.model1.date).format("YYYY-MM-DD"),
        company_name: this.model1.companyname,
        to_company_name: this.model1.tocompanyname,
        receiver_name: this.model1.receivername,
        request_date: moment(this.model1.reqdate).format("YYYY-MM-DD"),
        request_number: this.model1.reqnumber,
        comments: this.model1.cmts,
        vehicle_number: this.model1.vehnumber,
        // Transfer_type: this.model1.ttype,
        consignee_name: this.model1.cosignee,
        lr_number: this.model1.lrnumber,
        transporter_name: this.model1.tname,
        lr_date: this.model1.lrdate,
        purpose: this.model1.purpose,
        locations: this.model1.location,
        line_item: this.SNO,
        material_code: this.matCode,
        material_description: this.matName,
        unit_of_measurment: this.UOM,
        request_quantity: this.ReqQTY,
        quantity: this.qty,
        item_remarks: this.itemremarks,
        valuation_type: this.valutionType,
        storage_location: this.storageLocation,
        unit_price: this.unitPrice,
        basic_price: this.basic_price,
        order_number:this.model1.order_no,
        order_date: moment(this.model1.order_nodate).format("YYYY-MM-DD"),
        eway_bill:this.model1.ewaybillno,
        to_locations:this.model1.to_location,
        rejection_number:this.model1.rejection_number,
        delivery_challan_number:this.model1.dcnumber
        // batch_number: this.batchno,
        // comments: this.model1.comments,
      };
      this.custservice.addOutGatePassNrgp(obj).subscribe((res: any) => {
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
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.storageLocation = [];
          this.ReqQTY = [];
          this.qty = [];
          this.itemremarks = [];
          this.unitPrice=[],
          this.basic_price=[]
          this.valutionType=[]
          this.dcnumber=""
          // this.batchno = [];
          this.smsdata = "";
          this.smsdata1="";
          this.total = 0;
          this.getNRGPlist();
          this.resultNrgpnumber = res["reference"];
          if (this.fileUploadUrlsgt.length > 0) {
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
          this.unitPrice=[],
          this.basic_price=[]
          this.valutionType=[]
          // this.batchno = [];
        }
      });
    } else {
      console.log(this.saveddataarray);
      this.saveddataarray.forEach((ele: any, index) => {
        this.SNO.push(index + 1);
        this.matCode.push(ele.material_code);
        this.matName.push(ele.material_description);
        this.UOM.push(ele.uom || ele.unit_of_measurment || ele.unit_of_measurement);
        this.storageLocation.push(ele.storagelocation || ele.storage_location);
        this.ReqQTY.push(Number(ele.reqqty || ele.request_quantity));
        this.qty.push(Number(ele.qty || ele.quantity));
        this.itemremarks.push(ele.itemremarks || ele.item_remarks);
        // this.batchno.push(ele.batchno || ele.batch_number);
        this.valutionType.push(ele.valutiontype || ele.valuation_type);
        this.unitPrice.push(ele.unit_price)
        this.basic_price.push(ele.basic_price)
      });
      let obj = {
        reason: this.editModel.reason,
        work_order_number: this.model1.wonumber,
        date: moment(this.model1.date).format("YYYY-MM-DD"),
        company_name: this.model1.companyname,
        to_company_name: this.model1.tocompanyname,
        // contractor_name: this.model1.contractorname,
        // giver_name: this.model1.givername,
        receiver_name: this.model1.receivername,
        request_date: moment(this.model1.reqdate).format("YYYY-MM-DD"),
        request_number: this.model1.reqnumber,
        comments: this.model1.cmts,
        vehicle_number: this.model1.vehnumber,
        // Transfer_type: this.model1.ttype,
        transporter_name: this.model1.tname,
        consignee_name: this.model1.cosignee,
        lr_number: this.model1.lrnumber,
        lr_date: moment(this.model1.lrdate).format("YYYY-MM-DD"),
        locations: this.model1.location,
        purpose: this.model1.purpose,
        line_item: this.SNO,
        material_code: this.matCode,
        material_description: this.matName,
        unit_of_measurment: this.UOM,
        request_quantity: this.ReqQTY,
        quantity: this.qty,
        item_remarks: this.itemremarks,
        valuation_type: this.valutionType,
        storage_location: this.storageLocation,
        unit_price: this.unitPrice,
        basic_price: this.basic_price,
        order_number:this.model1.order_no,
        order_date: moment(this.model1.order_nodate).format("YYYY-MM-DD"),
        eway_bill:this.model1.ewaybillno,
        to_locations:this.model1.to_location,
        rejection_number:this.model1.rejection_number,
        // batch_number: this.batchno,
        delivery_challan_number:this.model1.dcnumber,
        command: "edt",
        number: this.editednumber,
      };
      this.custservice.addOutGatePassNrgp(obj).subscribe((res: any) => {
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
          this.unitPrice=[],
          this.basic_price=[]
          this.valutionType=[]
          // this.batchno = [];
          this.smsdata = "";
          this.smsdata1="";
          this.total = 0;
          this.getNRGPlist();
          this.editModel.reason = "";
          this.resultNrgpnumber = this.editednumber;
          if (this.fileUploadUrlsgt.length > 0) {
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
          this.unitPrice=[],
          this.basic_price=[]
          this.valutionType=[]
          // this.batchno = [];
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
    });
  }
  getcompanydata1() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
    };
    this.custservice.usercompanyData(obj).subscribe((res: any) => {
      this.companyData1 = res.data;
    });
  }
  addNrgp(data: any) {
    this.model ={qty:0,unit_price:0,basic_price:0}
    this.dialog.open(data, {
      width: "1100px",
    });
  }
  closemodel() {
    this.dialog.closeAll();
  }

  getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100,
      pid: 1,
      key: this.selectedmaterial || this.selectedmaterial1,
      // "code":this.matcodedata,
    };
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data;
    //   this.masterData.forEach((ele: any) => {
    //     if (ele.code == this.matcodedata) {
    //       // alert(1)
    //       this.model2.matcode = ele.system_reference_1
    //       // this.systemref = ele.system_reference_1
    //     }
    // });
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
  getstorageDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedstorage = ev.target.value;
    if (this.selectedstorage.length > 2) {
      this.getstoragelocData();
    }
  }
  getstoragelocData() {
    let obj = {
      command: "mat",
      field: "storage_location",
      key: this.selectedstorage,
    };
    this.custservice.getmatstoragelocdata(obj).subscribe((res: any) => {
      this.storageData = res.data;
    });
  }
  keyPressNumbers(evt: any) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
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
  saveaddeddata() {
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
    this.dialog.closeAll();
    this.total = 0;
    this.saveddataarray.forEach((ele:any)=>{
      this.total += ele.total_value
      this.model1.materialvalue = ele.total_value
      // this.total +=ele.total_value
      })
  }
  editdata(row1: any, index: any, data: any) {
    // this.editDATAA=false
    // this.matcodedata=row1.material_code
    // this.getmasterdata()
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
    this.matDesc=row1.material_code+"-"+(row1.description || row1.material_description);
    this.materialCODE=row1.material_code;
    this.materialNAME=row1.description || row1.material_description ;
    this.model2.matcode = this.systemref || row1.matcode || this.matDesc;
    this.model2.uom = row1.uom || row1.unit_of_measurment || row1.unit_of_measurement ;
    this.model2.storagelocation = row1.storagelocation || row1.storage_location ;
    this.model2.reqqty = row1.reqqty || row1.request_quantity || row1.quantity;
    this.model2.qty = row1.qty || row1.quantity || row1.quantity;
    this.model2.itemremarks = row1.itemremarks || row1.item_remarks;
    // this.model2.batchno = row1.batchno || row1.batch_number;
    this.model2.valutiontype = row1.valutiontype || row1.valuation_type;
    this.model2.unit_price = row1.unit_price
    this.model2.basic_price = row1.basic_price;
    
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
  getstorageDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedstorage1 = ev.target.value;
    if (this.selectedstorage1.length > 2) {
      this.getstoragelocData();
    }
  }
  saveaddededitdata(fr: any) {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.model2.matcode) {
        this.model2matcode = el.code;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    this.model2["material_code"] = this.materialCODE;
    this.model2["material_description"] = this.materialNAME;
    this.saveddataarray.splice(this.selectedIndex, 1, this.model2);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);

    this.saveddataarray[this.selectedIndex].matcode = this.model2matcode;

    this.model2 = {};
    this.smsdata = "";
    this.smsdata1="";
    this.dialog.closeAll();
    this.total=0;
    this.saveddataarray.forEach((ele:any)=>{
      this.total += ele.basic_price 
      this.model1.materialvalue+=ele.basic_price
      })
  }
  deleterow(index: any) {
    this.saveddataarray.splice(index, 1);
    console.log(this.saveddataarray);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
  }
  getNRGPlist() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custservice.getNrgpDataList(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }
  editNrgpData(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px",
    });
    this.editednumber = data.number;
    console.log(this.editednumber);
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      number: this.editednumber,
    };
    this.custservice.editNrgpData(obj).subscribe((res: any) => {
      console.log(res);
      this.dialog.closeAll();
      this.editdataa = res.data[0];
      this.saveddataarray = res.data;
      this.dataSource.data = this.saveddataarray;
      (this.model1.wonumber = this.editdataa.work_order_number),
        (this.model1.date = moment(this.editdataa.date).format("YYYY-MM-DD")),
        (this.model1.companyname = this.editdataa.company_name),
        (this.model1.tocompanyname = this.editdataa.to_company_name),
        // this.model1.contractorname=this.editdataa.to_company_name,
        // this.model1.givername=this.editdataa.to_company_name,
        (this.model1.reqnumber = this.editdataa.request_number),
        (this.model1.reqdate = moment(this.editdataa.request_date).format(
          "YYYY-MM-DD"
        )),
        (this.model1.receivername = this.editdataa.receiver_name),
        // (this.model1.ttype = this.editdataa.Transfer_type),
        (this.model1.expectedredate = moment(
          this.editdataa.expected_return_date
        ).format("YYYY-MM-DD")),
        (this.model1.vehnumber = this.editdataa.vehicle_number),
        (this.model1.tname = this.editdataa.transporter_name),
        (this.model1.lrnumber = this.editdataa.lr_number),
        (this.model1.lrdate = moment(this.editdataa.lr_date).format(
          "YYYY-MM-DD"
        )),
        (this.model1.cmts = this.editdataa.comments),
        (this.model1.cosignee = this.editdataa.consignee_name),
        (this.model1.purpose = this.editdataa.purpose),
        (this.model1.location = this.editdataa.locations),
        (this.model1.order_no=this.editdataa.order_number),
        (this.model1.order_nodate=moment(this.editdataa.order_date).format(
          "YYYY-MM-DD"
        )),
        (this.model1.rejection_number=this.editdataa.rejection_number),
        (this.model1.ewaybillno=this.editdataa.eway_bill),
        (this.model1.tolocation=this.editdataa.to_locations),
        (this.model1.dcnumber=this.editdataa.delivery_challan_number),
        (this.demo1TabIndex = 0);
      this.btn = "Update";
    });
  }
  deleteNrgpItem(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
    });
    this.deleteNumber = rw.number;
  }
  deleteFile() {
    let obj = {
      command: "del",
      number: this.deleteNumber,
      reason: this.deletemodel.reason,
    };
    this.custservice.deleteNrgpList(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.deletemodel.reason = "";
        this.getNRGPlist();
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
  printNRGP(data: any) {
    console.log(data.number);
    this.router.navigate(["/inventory/printoutgatepassrgpnrgp1"], {
      queryParams: { ogpnumber: data.number },
    });
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: "800px",
    });
    this.nrgpnum = row1.number;
    this.getexistingfiles();
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.nrgpnum)
      .set("document_type", "Out Gate PassNRGP");
    // let obj={
    //   "document_number" : this.dmrnumber,
    //   "document_type": "Daily Material Receipt"
    // }
    this.custservice.getexistingfies(params).subscribe((res: any) => {
      console.log(res);
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
    // console.log(url);  
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
      .set("document_number", this.nrgpnum)
      .set("document_type", "Out Gate Pass")
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
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getNRGPlist();
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
    postData.append("document_type", "Out Gate Pass NRGP");
    postData.append("document_number", this.nrgpnum);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file);
    }

    let obj = {
      document_type: "Out Gate Pass NRGP",
      document_number: this.nrgpnum,
      doc: this.fileUploadUrls,
    };
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);
        this.getexistingfiles();
        this.filenamearray1 = [];
      } else {
        this.alertcall.showWarning("Error", res["message"]);
      }
    });
  }
  uploadgtfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsgt = fileInput.target.files;
      for (const file of this.fileUploadUrlsgt) {
        this.filenamearray.push(file.name);
        this.selectedfiles.push(file);
      }
    }
  }
  uploadselectedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Out Gate Pass");
    postData.append("document_number", this.resultNrgpnumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file);
    }

    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.filenamearray = [];
        this.selectedfiles = [];
        this.fileUploadUrlsgt = [];
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
      this.custservice.getNRGPsearchData(obj).subscribe((res: any) => {
        this.reaData = false;
        this.totalRecords = res?.count;
        this.dataSourcemain.data = res.data;
        if (res.data.length == 0) {
          this.reaData = true;
        }
      });
    } else if (!this.searchData) {
      this.getNRGPlist();
      this.columnname = "";
    }
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
  getPurpose(ev:any){
  this.selectedPurpose= ev.target.value
  if(this.selectedPurpose.length>2){
    this.getPurposeData()
  }if(!this.selectedPurpose){
    this.getPurposeData()
  }
  }
  getNRGPQTY(){
    this.model.basic_price= Number(this.model.qty)*Number(this.model.unit_price)
    this.model1.materialvalue=Number(this.model.qty)*Number(this.model.unit_price)

  } 
  getNRGPQTYedit(){
    this.model2.basic_price= Number(this.model2.qty)*Number(this.model2.unit_price)
    this.model1.materialvalue==Number(this.model.qty)*Number(this.model.unit_price)
  }

  getPurposeData(){
    let obj={
"command":"pps",
"key":this.selectedPurpose?this.selectedPurpose:""
    }
    this.custservice.getPurposeNRGP(obj).subscribe((res:any)=>{
if(res){
  this.purposeData= res.data
}
    })
  }

    //rgp modal
    openpurchaseordermodel(data: any) {
      this.dialog.open(data, {
        width: '600px'
      })
    }

    getpurchaseorderDATA(ev: any) {
      console.log(ev.target.value);
      this.selectedrgpnumber = ev.target.value
      if (this.selectedrgpnumber.length > 2) {
        this.getpoData()
      }
      if (!this.selectedrgpnumber) {
        this.getpoData()
      }
    }
    getpoData() {
      let obj = {
        "command": "rgp",
        // "lmt": 100000,
        // "pid": 1,
        // "key": this.rgpnumber
      }
      this.custservice.getOutGatePassNrgp(obj).subscribe((res: any) => {
        this.rgpdata = res.data
      })
    }

    submitpono(fr:any){
      let obj={
      "command": "set",
       "document_number": this.rgpnumber,
      // "field":"number"
      }
      this.custservice.getOutGatePassNrgp(obj).subscribe((res:any)=>{
      // this.poiddata=res.data
      this.dialog.closeAll();
      this.editdataa = res.data[0];
      this.saveddataarray = res.data;
      this.dataSource.data = this.saveddataarray;
        (this.model1.companyname = this.editdataa.consignee_name),
        // (this.model1.tocompanyname = this.editdataa.company_name),
        (this.model1.reqnumber = this.editdataa.number),
        (this.model1.reqdate = moment(this.editdataa.date).format(
          "YYYY-MM-DD"
        )),
        (this.model1.cosignee = this.editdataa.company_name),
        (this.model1.location = this.editdataa.to_locations),
        (this.model1.tolocation=this.editdataa.locations)

      });
    }

    getdcDATA(ev: any) {
      console.log(ev.target.value);
      this.selecteddcnumber = ev.target.value
      if (this.selecteddcnumber.length > 2) {
        this.getdcData()
      }
      if (!this.selecteddcnumber) {
        this.getdcData()
      }
    }
    getdcData() {
      let obj = {
         "command":"dcn",
        // "command": "set",
        // "lmt" : 100000,
        // "pid" : 1 ,
        "key": this.dcnumber
      }
      this.custservice.getOutGatePassNrgp(obj).subscribe((res: any) => {
        this.DCDATA = res.data
  
      })
    }
  
    deliveryChallanData(data: any) {
       this.DCID = []
      this.dialog.open(data, {
        width: '600px'
      })
      this.getdcData()
    }
  
    submitdcno(fr: any) {
      let obj = {
        "command": "mat",
        "key": this.dcnumber,
        field: "number",
      }
      this.custservice.addDeliveryChallan(obj).subscribe((res: any) => {
        this.dialog.closeAll();
        this.editdataa = res.data[0]
        this.saveddataarray = res.data
        this.dataSource.data = this.saveddataarray
          this.model1.dateee = moment(this.editdataa.date).format("YYYY-MM-DD"),
          this.model1.companyname = this.editdataa.company_name,
          this.model1.cosignee = this.editdataa.consignee_name,
          this.model1.vehnumber = this.editdataa.vehicle_number,
          this.model1.tname = this.editdataa.transporter_name,
          this.model1.lrnumber = this.editdataa.lr_number,
          this.model1.lrdate = moment(this.editdataa.lr_date).format("YYYY-MM-DD"),
          this.model1.dcnumber=this.dcnumber,
          // this.model1.consigneename = this.editdataa.consignee_name,       
        this.demo1TabIndex = 0;
        // this.btn = "Update"
      });
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
    document_name: "OutGatePassNRGP",
    document_number:this.documnet_nodata
  };
  this.custservice.AutoDocUpdate2(obj).subscribe((res: any) => {
    if(res && res['status_code']==200){
      this.dialog.closeAll()
      this.alertcall.showSuccess("Accepted", res['message'])
      this.getNRGPlist()
    } else {
      this.dialog.closeAll()
      this.alertcall.showWarning("Error", res['message'])
    }      
  });
}

}
