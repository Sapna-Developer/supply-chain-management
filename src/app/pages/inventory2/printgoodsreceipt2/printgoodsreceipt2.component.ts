import { Component, Inject, OnInit } from '@angular/core';
import { NgxPrintElementService } from "ngx-print-element";
import { CustomerService } from "src/app/services/customer.service";
import * as converter from "number-to-words";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser"; 
@Component({
  selector: 'app-printgoodsreceipt2',
  templateUrl: './printgoodsreceipt2.component.html',
  styleUrls: ['./printgoodsreceipt2.component.scss']
})
export class Printgoodsreceipt2Component implements OnInit {

  key: any;
  field: "number";
  command: "mat";
  userData: any[] = [];
  basic_price: any[] = [];
  dataaa: any[] = [];
  table: any[] = [];
  otherCharges: number;
  pageSize: any;
  pageIndex: any;
  searchData: string;
  vendordata: any;
  totalRecords: any;
  dataSource: any[] = [];
  vendorDetails: any;
  address: any;
  details: any[];
  ADDRESS: any;
  data1: any;
  duplicateinv_num:any[]=[]
  duplicateinv_date:any[]=[]
  invoice_number:any[]=[]
  invoice_date: any[]=[]
  deliverychallanno:any[]=[]
  duplicatedc_number:any[]=[]
  constructor(
    private service: CustomerService,
    public print: NgxPrintElementService,
    private route: ActivatedRoute,
    private router:Router,
    public sanitizer: DomSanitizer
    // @Inject(MAT_DIALOG_DATA) public data1:any
  ) {}
  public config = {
    printMode: "template",
    popupProperties: "window.open",
  };

  total: any = 0;
  Amount:any=0;
  totalDiscount: any = 0;
  totalTax: any = 0;
  value: any;
  other_tax_value: any[] = [];
  total_freight: any[] = [];
  other_charges: any[] = [];
  grandTotal: any;
  grandTotall: any;
  sbtotal: any[] = [];
  outputWords = "";
  roundOff: any;
  
    ngOnInit(): void {
      // console.log(this.data1);
      this.route.queryParams
      .subscribe(params => {
        this.data1=params['dmrumber'];
        
        // }
      });
      // console.log(this.dataaa);
  
      // console.log(this.other_charges);
      // console.log(this.other_tax_value);
      // console.log(this.total_freight);
      this.getvendordata();
      this.getUserFormData()
    }
    // ValueFromComp1(var1:any)
    // {
    //     this.ValueFromComponent1=var1;
    // }
    backtodmr(){
      this.router.navigate(['/inventory2/goodsreceipt2'],{ queryParams: { tab: 'notifications'}})
    }
    getUserFormData() {
      this.userData = [];
      let obj = {
        key:  this.data1,
        field: "number",
        command: "mat",
      };
      this.service.editgoodsreceiptdata(obj).subscribe((res: any) => {
        this.dataaa = res.data;
        this.userData.push(this.dataaa[0]);
        console.log(this.userData);
        this.table = res.data;
        // this.userData.push(this.table);
        this.table.forEach((element:any) => {
          // this.invoice_number:any[]=[]
          this.invoice_number.push(element.invoice_number)
          this.invoice_date.push(element.invoice_date)
          this.deliverychallanno.push(element.dc_number)
         this.duplicateinv_num= [...new Set(this.invoice_number)];
         this.duplicateinv_date= [...new Set(this.invoice_date)];
          this.duplicatedc_number=[...new Set(this.deliverychallanno)]
        });
        console.log(this.duplicateinv_num);
        this.findsum(this.table);
        console.log(res);
        console.log(this.dataaa);
  
        console.log(this.sbtotal);
  
        console.log(this.userData);
  
        console.log(this.other_charges);
        console.log(this.other_tax_value);
        console.log(this.total_freight);
      });
    }
  
    getvendordata() {
      let obj = {
        command: "lst",
        lmt: this.pageSize,
        pid: this.pageIndex,
        key: "" || this.searchData,
      };
      this.service.getvendormasterdata(obj).subscribe((res: any) => {
        this.vendordata = res.data;
      });
    }
  
    getaddress(data: any) {
      // console.log(data);
      let ADDRESS: any;
      this.vendordata.forEach((element: any) => {
        if (element.name == data) {
          ADDRESS = element.address_1;
        }
      });
      return ADDRESS;
    }
    findsum(table: any) {
      this.value = this.table;
     
      for (let j = 0; j < table.length; j++) {
        this.Amount = this.value[j].accepted_quantity * this.value[j].unit_price
        this.total +=  this.Amount;
       
        this.totalDiscount += this.value[j].discount_value;
       
        this.totalTax += this.value[j].tax_value;
      
  
        let c = Number(this.total) - Number(this.totalDiscount);
        let d = this.totalTax;
        let e = this.value[0].other_tax_value;
        let f = this.value[0].total_freight;
        let g = this.value[0].other_charges_value;
  
        console.log(c, d, e, f, g);
        this.grandTotal =
          +Number(c) + Number(d) + Number(e) + Number(f) + Number(g);
        console.log(Number(g));
  
        this.grandTotall = this.grandTotal.toFixed(2);
  
        this.roundOff = this.grandTotal.toFixed(0);
  
        this.outputWords = converter.toWords(this.roundOff);
        this.otherCharges = Number(g);
      }
    }
  
    onPrint() {
      window.print();
    }
    searchdata() {
      if (this.searchData.length > 2) {
        this.getvendordata();
      }
      if (!this.searchData) {
        this.getvendordata();
      }
    }
  
}
