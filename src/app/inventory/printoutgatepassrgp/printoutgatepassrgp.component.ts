import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPrintElementService } from "ngx-print-element";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: 'app-printoutgatepassrgp',
  templateUrl: './printoutgatepassrgp.component.html',
  styleUrls: ['./printoutgatepassrgp.component.scss']
})
export class PrintoutgatepassrgpComponent implements OnInit {
  key: any;

  command = "mat";
  userData: any;
  dataa: any[] = [];
  table: any[] = [];
  data1: any;
  constructor(
    private service: CustomerService,
    public print: NgxPrintElementService, public router:Router,public route:ActivatedRoute
  ) {}
  public config = {
    printMode: 'template', // template
     popupProperties: "window.open",
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
  };

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.data1=params['ogpnumber'];
      console.log(this.data1);
      
   
    });
    this.getUserFormData()
  }
  backtooutgatepass(){
    this.router.navigate(['/inventory/goodstransfer'],{ queryParams: { tab: 'notificationsissue'}})
  }
  getUserFormData() {
    this.userData = [];
    let obj = {
      key: this.data1,
      command: "mat",
    };
    this.service.addRgpData(obj).subscribe((res: any) => {
      console.log(res);
      this.dataa = res.data[0];
      this.userData.push(this.dataa);
      console.log(this.userData);
      console.log(this.dataa);

      this.userData.push(this.table);
      this.table = res.data[0];
      console.log(this.table);

      // this.findsum(this.userData);
    });
  }

}
