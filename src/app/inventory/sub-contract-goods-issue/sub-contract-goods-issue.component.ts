import { Component, OnInit } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import * as moment from "moment";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-sub-contract-goods-issue',
  templateUrl: './sub-contract-goods-issue.component.html',
  styleUrls: ['./sub-contract-goods-issue.component.scss']
})
export class SubContractGoodsIssueComponent implements OnInit {

  dataSourceList = new MatTableDataSource()
  displayedColumnsList: any[] = [
    "sno", "Number", "Date", "company_name", "service_code", "service_description", "is_active", "action"
  ]

  demo1TabIndex: any = 0;
  scgidata: any = {};
  tabledata: any = {};
  dialogdata: any = {};
  editModel: any = {};
  deletemodel: any = {};
  editdataa: any = {}
  companyData: any;
  vendorData: any;
  selectedIndex: number;
  company_name:any
  date: string;
  vendor_name: any;
  order_number: any;
  vehicle_number: any;
  service_code: any;
  receiver_name: any;
  service_description: any;
  boq_id: any;
  comments: any;
  number: any;
  btn: any = "Save";
  saveddataarray: any[] = [];
  editednumber: any;
  finaldataarray: any[] = [];
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  JOlistData: any;
  selectedOrderNumber: any;
  matcode: any[]=[];
  matdesc: any[]=[];
  uom: any[]=[];
  quantity: any[]=[];
  itemRemarks: any[]=[];
  batchNumber: any[]=[];
  storageLocation: any[]=[];
  valuationType: any[]=[];
  unitPrice:any[]=[]
  SCGIListData: any;
  BOQID: any;
  reason: any;
  deleteNumber: any;
  joBOQlistData:any;
  selectedBOQid:any;
  BoqIdDetailsList :any[]=[]
  BoqIdDetailsListArray:any[]=[]
  logdata: any;


  constructor(
    private dialog: MatDialog,
    private custservice: CustomerService,
    private alertcall: AlertCallsService,
    public router: Router,
    public route: ActivatedRoute
  ) { }


  ngOnInit(): void {
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
    this.getSubContractGoodsIssueList();
    this.getJoList();
    this.getJOBOQlistData();
    this.getlogdata();
  }

  getJOBOQlistData(){
    let obj = { 
      "command" : "lst"
    }
    this.custservice.getJoBOoqList(obj).subscribe((res:any)=>{
      console.log(res.data);
      this.joBOQlistData = res.data
    })
  }

  filterBoqId(ev:any){
    // console.log(ev.target.value)
    this.selectedBOQid = ev.target.value
    if(this.selectedBOQid.length > 2){
      this.getJOBOQlistData()
    }
    if(!this.selectedBOQid){
      this.getJOBOQlistData();
    }
  }

  getlogdata() {
    let obj = {
      command: "log",
      key: "SubContractGoodsIssue",
    };
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log;
      }
    });
  }
  getBoqIdDetails(ev:any){
    // console.log(ev)
    let obj = {
      "command" : "mat",
      "boq_id" : this.scgidata.boq_id
    }
    this.custservice.getBoqIdDetails(obj).subscribe((res:any)=>{
      console.log(res.data)
      this.BoqIdDetailsList = res.data
      this.BoqIdDetailsList.forEach((ele:any)=>{
        console.log(ele)
        this.BoqIdDetailsListArray.push(ele)
        this.BoqIdDetailsListArray.forEach((val:any)=>{
          console.log(val)
          if(val.boq_id == this.scgidata.boq_id){
            this.tabledata.matcode = val.material_code;
            console.log(this.tabledata.matcode)
            this.tabledata.matdesc = val.material_description;
            this.tabledata.uom = val.unit_of_measurment;
            this.tabledata.quantity = val.quantity;
          }
        })
      })
    })
  }

  getJoList() {
    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedOrderNumber
    };
    this.custservice.getJobOrderData(obj).subscribe((res: any) => {
      console.log(res.data);
      this.JOlistData = res.data
    });
  }

  filterOrderNumber(ev: any) {
    console.log(this.JOlistData)
    console.log(ev)
    this.selectedOrderNumber = ev.target.value
    if (this.selectedOrderNumber.length > 2) {
      this.getJoList()
    }
    if (!this.selectedOrderNumber) {
      this.getJoList()
    }
  }

  getServiceDetails() {
    this.JOlistData.forEach((ele: any) => {
      if (this.scgidata.order_number == ele.number) {
        this.scgidata.vendor_name = ele.vendor_name;
        this.scgidata.service_code = ele.service_code;
        this.scgidata.service_description = ele.service_description
      }
    })

  }

  getSubContractGoodsIssueList() {
    let obj = {
      "command": "lst",
    }
    this.custservice.getSubContractGoodsIssueData(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.SCGIListData = res.data
      this.dataSourceList.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }

  getcompanydata() {
    let obj = {
      command: "lst",
      lmt:100000,
      pid:1
    };
    this.custservice.usercompanyData(obj).subscribe((res: any) => {
      this.companyData = res.data;
    });
  }

  closemodel() {
    this.dialog.closeAll();
  }

  editSCGIData(row: any, data: any) {
    this.dialog.open(data, {
      width: '500px'
    })
    this.editednumber = row.number
  }

  saveeditreason() {
    let obj = {
      "command": "mat",
      "key": this.editednumber,
    }
    this.custservice.addSCGIData(obj).subscribe((res: any) => {
      debugger;
      this.dialog.closeAll()
      console.log(res)
      this.editdataa = res.data[0];
         this.scgidata.company_name = this.editdataa.company_name
        this.scgidata.comments = this.editdataa.comments
        this.scgidata.number = this.editdataa.number
        this.scgidata.date = this.editdataa.date
        this.scgidata.order_number = this.editdataa.order_number
        this.scgidata.service_code = this.editdataa.service_code
        this.scgidata.service_description = this.editdataa.service_description
        this.scgidata.vendor_name = this.editdataa.vendor_name
        this.scgidata.vehicle_number = this.editdataa.vehicle_number
        this.scgidata.receiver_name = this.editdataa.receiver_name
        this.scgidata.boq_id = this.editdataa.boq_id
        this.tabledata.itemRemarks = this.editdataa.item_remarks
        this.tabledata.batchNumber = this.editdataa.batch_number
        this.tabledata.storageLocation = this.editdataa.storage_location
        this.tabledata.valuationType = this.editdataa.valuation_type
        this.tabledata.matcode = this.editdataa.material_code
        this.tabledata.matdesc = this.editdataa.material_description
        this.tabledata.uom = this.editdataa.unit_of_measurment
        this.tabledata.quantity = this.editdataa.quantity
        this.tabledata.unitPrice = this.editdataa.unit_price
        console.log(this.editdataa.material_code)
        // this.selectedIndex = 0

    })
    this.demo1TabIndex = 0;
    this.btn = "Update"
  }

  deleteSCGIdata(row: any, data: any) {
    this.dialog.open(data, {
      width: '500px'
    })
    this.deleteNumber = row.number
  }

  deleteItem() {
    let obj = {
      "command": "del",
      "number": this.deleteNumber,
      // "reason": this.deletemodel.reason
    }
    this.custservice.deleteSCGIdata(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.deletemodel.reason = "";
        this.getSubContractGoodsIssueList();
      } else {
        this.alertcall.showWarning('Error', res['message']);
      }
    })
  }

  deleterow(index:any){
    // debugger;
    this.tabledata.splice(index,1)

  }

  saveFinalData(fr: any) {
    if (this.btn === "Save") {
      let obj = {
        "command": "add",
        "company_name": this.scgidata.company_name,
        "comments": this.scgidata.comments,
        "number": this.scgidata.number,
        "date": moment(this.scgidata.date).format('YYYY-MM-DD'),
        "order_number": this.scgidata.order_number,
        "service_code": this.scgidata.service_code,
        "service_description": this.scgidata.service_description,
        "vendor_name": this.scgidata.vendor_name,
        "vehicle_number": this.scgidata.vehicle_number,
        "receiver_name": this.scgidata.receiver_name,
        "boq_id": this.scgidata.boq_id,
        "item_remarks": [this.tabledata.itemRemarks],
        "batch_number": [this.tabledata.batchNumber],
        "storage_location": [this.tabledata.storageLocation],
        "valuation_type": [this.tabledata.valuationType],
        "material_code": [this.tabledata.matcode],
        "material_description": [this.tabledata.matdesc],
        "unit_of_measurment": [this.tabledata.uom],
        "quantity": [this.tabledata.quantity],
        "unit_price" : [this.tabledata.unitPrice]
        // "company_name" : this.scgidata.company_name
      }
      this.custservice.addSCGIData(obj).subscribe((res: any) => {
        if (res && res["status_code"] == "200") {
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            width: 500,
          });
          fr.reset();
          this.tabledata = {}
        }
        else {
          this.alertcall.showWarning('Accepted', res['message']);
        }
      })

    }
    if (this.btn === "Update") {
      let obj = {
        "command": "add",
        "company_name": this.scgidata.company_name,
        "comments": this.scgidata.comments,
        "number": this.scgidata.number,
        "date": moment(this.scgidata.date).format('YYYY-MM-DD'),
        "order_number": this.scgidata.order_number,
        "service_code": this.scgidata.service_code,
        "service_description": this.scgidata.service_description,
        "vendor_name": this.scgidata.vendor_name,
        "vehicle_number": this.scgidata.vehicle_number,
        "receiver_name": this.scgidata.receiver_name,
        "boq_id": this.scgidata.boq_id,
        "item_remarks": [this.tabledata.itemRemarks],
        "batch_number": [this.tabledata.batchNumber],
        "storage_location": [this.tabledata.storageLocation],
        "valuation_type": [this.tabledata.valuationType],
        "material_code": [this.tabledata.matcode],
        "material_description": [this.tabledata.matdesc],
        "unit_of_measurment": [this.tabledata.uom],
        "quantity": [this.tabledata.quantity]
      }
      this.custservice.addSCGIData(obj).subscribe((res: any) => {
        if (res && res["status_code"] == "200") {
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            width: 500,
          });
          fr.reset();
          this.tabledata = {}
        }
        else {
          this.alertcall.showWarning('Accepted', res['message']);
        }
      })
    }

  }

  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

}
