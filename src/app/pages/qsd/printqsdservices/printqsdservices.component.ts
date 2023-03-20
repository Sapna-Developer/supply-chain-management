import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPrintElementService } from "ngx-print-element";
import { CustomerService } from "src/app/services/customer.service";
@Component({
  selector: 'app-printqsdservices',
  templateUrl: './printqsdservices.component.html',
  styleUrls: ['./printqsdservices.component.scss']
})
export class PrintqsdservicesComponent implements OnInit {
  number: any;
  wonumber: any;
  billnumber: any;
  command = "mat";
  userData: any;
  CurData: any[] = [];
  cur_bill: any[] = [];
  PrevData: any[] = [];
  prev_bill: any[] = [];
  Keys: any[] = [];
  Value: any;
  dataa: any[] = [];
  table: any[] = [];
  Dataa: any[] = [];
  UserData: any[] = [];
  keys: any[] = [];
  value: any;
  abstract_value: any;
  CumIgst: any = 0;
  igst_5: any;
  cgst_5: any;
  sgst_5: any;
  tds_amount: any;
  labour_cess_amount: any;
  environment_cess_amount: any;
  mobilisation_recovery_amount: any;
  machinery_recovery_amount: any;
  retention_money: any;
  debit_value_royalty: any;
  diesel_recovery: any;
  grandTotal: any;
  taxes: any = 0;
  grossBill: any = 0;
  subTotal1: any = 0;
  subTotal2: any = 0;
  subTotal3: any = 0;
  statutoryDed: any = 0;
  otherDed: any = 0;
  mm: any = 0;
  netPay: any = 0;

  Taxes: any = 0;
  GrossBill: any = 0;
  subTot1: any = 0;
  subTot2: any = 0;
  subTot3: any = 0;
  StatutoryDed: any = 0;
  OtherDed: any = 0;
  MM: any = 0;
  NetPay: any = 0;
  CumAbs: number = 0;
  abs1: any;
  abs2: any;
  // array: any[] = [];
  igst1: any;
  igst2: any;
  cgst1: any;
  cgst2: any;
  CumCgst: any = 0;
  sgst2: any;
  sgst1: any;
  CumSgst: any = 0;
  CumGross: any = 0;
  grossBill1: any;
  grossBill2: any;
  tds1: any;
  tds2: any;
  CumTds: any = 0;
  LC1: any;
  LC2: any;
  EC2: any;
  EC1: any;
  CumLB: any = 0;
  CumEC: any = 0;
  CumSub1: any = 0;
  Rr1: any;
  Rr2: any;
  R2: any;
  R1: any;
  CumMm: any = 0;
  CumRm: any = 0;
  CumR: any = 0;
  CumSub2: any = 0;
  mR1: any;
  mR2: any;
  CumMR: any = 0;
  CumSub3: any = 0;
  CumNetpay: any = 0;
  data1: any;
  qsddata: any;
  WorkOrderNumber: any;
  RABillNo: any;

  constructor(
    private service: CustomerService,
    public print: NgxPrintElementService,
    private router:Router,
    private route:ActivatedRoute,private custservice:CustomerService
  ) {}
  public config = {
    printMode: "template",
    popupProperties: "window.open",
  };

  ngOnInit(): void {
    console.log(this.userData);
    this.route.queryParams
    .subscribe(params => {
      this.data1=params['qsdservicenumber'];
      
      // }
    });
   
    this.getdata()
  }
  getdata(){
    let obj={
      "command" : "lst",
      //  "pid" :  this.pageIndex,
      //  "lmt" : this.pageSize,
    }
    this.custservice.getqsdservices(obj).subscribe((res:any)=>{
      console.log(res.data);
    this.qsddata=res.data
    this.qsddata.forEach((element:any) => {
      if(element.number===this.data1){
        this.WorkOrderNumber=element.work_order_number
        this.RABillNo=element.ra_bill_number
      }
    });
    this.getUserFormData()
    })
  }
  backtoqsdservices(){
    this.router.navigate(['/qsd/qsdservices'],{ queryParams: { tab: 'notifications'}})
  }
  getUserFormData() {
    this.userData = [];
    let obj = {
      number: this.data1,
      command: "mat",
      // number: "GEPPL/22-23/QSD-SERV/001",
      work_order_number: this.WorkOrderNumber,
      ra_bill_number: this.RABillNo,
    };
    this.service.addQsdData(obj).subscribe((res: any) => {
      this.dataa = res.data[0];
      this.userData.push(this.dataa[0]);
      console.log(this.userData);

      this.userData.push(this.table);
      this.table = res.data[0];
      console.log(this.table);

      this.Dataa = res.data[1]["top_sheet"];
      console.log(this.Dataa);
      this.UserData.push(this.Dataa);
      console.log(this.UserData);

      this.cur_bill = res.data[2]["cur_bill"];
      console.log(this.cur_bill);
      this.CurData.push(this.cur_bill);
      console.log(this.CurData);
      var obj: any = {};
      this.CurData.forEach(function (e) {
        obj = e;
      });
      console.log(obj);
      this.keys = Object.keys(obj);
      console.log(this.keys);

      this.prev_bill = res.data[3]["prev_bill"];
      console.log(this.prev_bill);
      // this.abs2 = this.abs2["abstract_value"];

      // this.ABS2 = this.abs2["abstract_value"];
      // console.log(this.ABS2);
      this.PrevData.push(this.prev_bill);
      console.log(this.PrevData);
      var obj: any = {};
      this.PrevData.forEach(function (e) {
        obj = e;
      });
      console.log(obj);
      this.Keys = Object.keys(obj);
      console.log(this.Keys);
      // this.array.push(this.ABS2);
      this.findsum(this.CurData, this.PrevData);
      // this.findsum(this.PrevData);
    });
  }
  findsum(CurData: any, PrevData: any) {
    this.value = this.CurData;
    for (let j = 0; j < CurData.length; j++) {
      this.abs1 = this.value[j].abstract_value;
      this.igst1 = this.value[j].igst_5;
      this.cgst1 = this.value[j].cgst_5;
      this.sgst1 = this.value[j].sgst_5;
      this.grossBill1 = this.grossBill;
      this.tds1 = this.value[j].tds_amount;
      this.LC1 = this.value[j].labour_cess_amount;
      this.EC1 = this.value[j].environment_cess_amount;

      this.Rr1 = this.value[j].retention_money;
      this.R1 = this.value[j].debit_value_royalty;
      this.mR1 = this.value[j].diesel_recovery;
      this.taxes =
        this.value[j].cgst_5 + this.value[j].igst_5 + this.value[j].sgst_5;
      console.log(this.taxes);
      this.grossBill = this.value[j].abstract_value + this.taxes;
      console.log(this.grossBill);
      this.statutoryDed =
        this.value[j].tds_amount +
        this.value[j].labour_cess_amount +
        this.value[j].environment_cess_amount;
      console.log(this.statutoryDed);
      this.subTotal1 = this.statutoryDed;
      console.log(this.subTotal1);
      this.mm =
        this.value[j].mobilisation_recovery_amount +
        this.value[j].machinery_recovery_amount;
      console.log(this.mm);
      this.otherDed =
        this.mm +
        this.value[j].retention_money +
        this.value[j].debit_value_royalty;
      console.log(this.mm);
      this.subTotal2 = this.otherDed;
      this.subTotal3 = this.value[j].diesel_recovery;
      this.netPay =
        (this.grossBill||0) - (this.subTotal1 + this.subTotal2 + this.subTotal3);
      console.log(this.subTotal1);
      console.log(this.subTotal2);
      console.log(this.subTotal3);
    }
    this.Value = this.PrevData;
    console.log(this.Value);
    
    for (let i = 0; i < PrevData.length; i++) {
      this.abs2 = this.Value[i].abstract_value || 0;
      this.igst2 = this.Value[i].igst_5 || 0;
      this.cgst2 = this.Value[i].cgst_5 || 0;
      this.sgst2 = this.Value[i].sgst_5 || 0;
      this.grossBill2 = this.GrossBill || 0;
      this.tds2 = this.Value[i].tds_amount || 0;
      this.LC2 = this.Value[i].labour_cess_amount || 0;
      this.EC2 = this.Value[i].environment_cess_amount || 0;
      this.Rr2 = this.Value[i].retention_money || 0;
      this.R2 = this.Value[i].debit_value_royalty || 0;
      this.mR2 = this.Value[i].diesel_recovery || 0;
      // console.log(this.abs2);
      this.Taxes =
        this.Value[i].cgst_5 + this.Value[i].igst_5 + this.Value[i].sgst_5;
      console.log(this.taxes);
      this.GrossBill = (this.Value[i].abstract_value + this.Taxes) || 0;
      console.log(this.GrossBill);
      this.StatutoryDed =
        (this.Value[i].tds_amount||0) +
        (this.Value[i].labour_cess_amount||0) +
        (this.Value[i].environment_cess_amount||0);
      console.log(this.statutoryDed);
      this.subTot1 = this.StatutoryDed;
      console.log(this.subTot1);
      this.MM =
        (this.Value[i].mobilisation_recovery_amount +
          this.Value[i].machinery_recovery_amount) |
        0;
      console.log(this.MM);
      this.OtherDed =
        (this.MM ||0) +
        (this.Value[i].retention_money ||0)+
        (this.Value[i].debit_value_royalty || 0);
      console.log(this.MM);
      this.subTot2 = this.OtherDed ;
      console.log(this.OtherDed);
      
      this.subTot3 = (this.Value[i].diesel_recovery||0) ;
      this.NetPay =
        (this.GrossBill - (this.subTot1 + this.subTot2 + this.subTot3)) ;
      console.log(this.subTotal1);
      console.log(this.subTotal2);
      console.log(this.subTotal3);
    }
    this.CumAbs = 0;
    this.CumAbs = this.abs1 + this.abs2;
    this.CumIgst = this.igst1 + this.igst2;
    this.CumCgst = this.cgst1 + this.cgst2;
    this.CumSgst = this.sgst1 + this.sgst2;
    this.CumGross = this.grossBill + this.GrossBill;
    this.CumTds = this.tds1 + this.tds2;
    this.CumLB = this.LC1 + this.LC2;
    this.CumEC = this.EC1 + this.EC2;
    this.CumSub1 = this.subTot1 + this.subTotal1;
    this.CumMm = this.mm + this.MM;
    this.CumRm = this.Rr1 + this.Rr2;
    this.CumR = this.R1 + this.R2;
    this.CumSub2 = this.subTot2 + this.subTotal2;
    this.CumMR = this.mR1 + this.mR2;
    this.CumSub3 = this.subTot3 + this.subTotal3;
    this.CumNetpay = this.NetPay + this.netPay;
    console.log(this.CumAbs);
  }

}
