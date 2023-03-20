import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPrintElementService } from "ngx-print-element";
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-printoutgatepassrgp2nrgp',
  templateUrl: './printoutgatepassrgp2nrgp.component.html',
  styleUrls: ['./printoutgatepassrgp2nrgp.component.scss']
})
export class Printoutgatepassrgp2nrgpComponent implements OnInit {

  key: any;

  command = "mat";
  userData: any;
  dataa: any[] = [];
  table: any[] = [];
  vendordata: any;
  searchData: string;
  pageSize: any;
  pageIndex: any;
  data1: any;
  constructor(
    private service: CustomerService,
    public print: NgxPrintElementService,private route:ActivatedRoute,public router:Router
  ) {}
  public config = {
    printMode: "template",
    popupProperties: "window.open",
  };

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.data1=params['ogpnumber'];
      console.log(this.data1);
      
   
    });
    this.getvendordata();
    this.getUserFormData()
  }
  backtooutgatepass(){
    this.router.navigate(['inventory2/nrgp2'],{ queryParams: { tab: 'notificationsissue'}})
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
      console.log(this.vendordata);
    });
  }
  getaddress(data: any) {
    // console.log(data);
    // console.log(this.vendordata);
    let ADDRESS: any;
    this.vendordata.forEach((element: any) => {
      if (element.name == data) {
        ADDRESS = element.address_1;
      }
    });
    return ADDRESS;
  }

  getUserFormData() {
    this.userData = [];
    let obj = {
      key: this.data1,
      command: "mat",
    };
    this.service.printOutGatePassNrgp2(obj).subscribe((res: any) => {
      console.log(res);
      this.dataa = res.data[0];
      this.userData.push(this.dataa);
      console.log(this.userData);
      console.log(this.dataa);

      this.userData.push(this.table);
      this.table = res.data[0];
      console.log(this.table);

      console.log(this.userData);

      // this.findsum(this.userData);
    });
  }

}

