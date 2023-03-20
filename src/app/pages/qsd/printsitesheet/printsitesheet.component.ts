import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPrintElementService } from "ngx-print-element";
import { CustomerService } from "src/app/services/customer.service";
@Component({
  selector: 'app-printsitesheet',
  templateUrl: './printsitesheet.component.html',
  styleUrls: ['./printsitesheet.component.scss']
})
export class PrintsitesheetComponent implements OnInit {

  key: any;

  command = "mat";
  userData: any;
  dataa: any[] = [];
  table: any[] = [];
  data1: any;
  constructor(
    private service: CustomerService,
    public print: NgxPrintElementService,private route:ActivatedRoute,private router:Router
  ) {}
  public config = {
    printMode: "template",
    popupProperties: "window.open",
  };

  ngOnInit(): void {
    console.log(this.userData);
    this.route.queryParams
    .subscribe(params => {
      this.data1=params['srsnumber'];
      
      // }
    });
    this.getUserFormData()
  }
  backtositesheet(){
    this.router.navigate(['/qsd/siterecomsheet'],{ queryParams: { tab: 'notifications'}})
  }
  getnetpayable(){
    let sum=0;
    this.userData.forEach((element:any) => {
      sum= Number(element.ra_bill_value) - Number(element.tds_value);
      return sum;
    });
   
    console.log(sum);
    
    
  }
  getUserFormData() {
    this.userData = [];
    let obj = {
      number: this.data1,

      command: "mat",
    };
    this.service.addSiteRecommendedSheetData(obj).subscribe((res: any) => {
      this.dataa = res.message;
      this.userData.push(this.dataa[0]);
      console.log(this.userData);
      console.log(this.dataa);
      this.table = res.message;
      this.userData.push(this.table);
      
      console.log(this.table);
      // this.findsum(this.userData);
    });
  }
}
