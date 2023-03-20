import { Component, OnInit } from '@angular/core';
import { NgxPrintElementService } from "ngx-print-element";
import { CustomerService } from "src/app/services/customer.service";
import * as converter from "number-to-words";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-printinvoice',
  templateUrl: './printinvoice.component.html',
  styleUrls: ['./printinvoice.component.scss']
})
export class PrintinvoiceComponent implements OnInit {
  command = "mat";
  key: any;
  userData: any;
  dataa: any[] = [];
  table: any[] = [];
  value: any;
  total: any = 0;
  outputWords = "";
  data1: any;
  contractorname: any;
  contractordata: any[]=[]
  contractornumber: any;
  contractorpan: any;
  constructor(
    private service: CustomerService,
    public print: NgxPrintElementService, private router:Router,private route:ActivatedRoute
  ) {}
  public config = {
    printMode: "template",
    popupProperties: "window.open",
  };

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.data1=params['invoicenumber'];
      
      // }
    });
   this.getUserFormData()
   this.getContractdata()
  }
  getContractdata(){
    let obj={
      "command" : "lst",
      // "lmt" : this.pageSize,
      // "pid" : this.pageIndex,
      // "key" : "" || this.searchData
    }
    this.service.getcontractormasterdata(obj).subscribe((res:any)=>{
    this.contractordata=res.data
    })
  }
  getUserFormData() {
    this.userData = [];
    let obj = {
      key: this.data1,
      command: "mat",
    };
    this.service.addInvoiceData(obj).subscribe((res: any) => {
      this.dataa = res.data;
      this.userData.push(this.dataa[0]);
      this.contractorname=this.dataa[0].contractor_name
      this.contractordata.forEach((element:any) => {
        if(element.name===this.contractorname){
          this.contractornumber=element.contact_number
          this.contractorpan=element.pan_number
          console.log(this.contractornumber);
          
        }
      });
      console.log(this.userData);
      console.log(this.dataa);

      this.userData.push(this.table);
      this.table = res.data;
      console.log(this.table);
      this.findsum(this.table);
    });
  }
  findsum(table: any) {
    this.value = this.table;
    for (let j = 0; j < table.length; j++) {
      this.total += this.value[j].basic_price;
      this.outputWords = converter.toWords(this.total);
    }
  }
  backtomodelinvoices(){
    this.router.navigate(['/qsd/invoice'],{ queryParams: { tab: 'notifications'}})

    }
}
