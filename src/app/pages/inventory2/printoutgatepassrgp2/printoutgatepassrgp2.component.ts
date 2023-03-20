import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPrintElementService } from "ngx-print-element";
import { CustomerService } from "src/app/services/customer.service";
@Component({
  selector: 'app-printoutgatepassrgp2',
  templateUrl: './printoutgatepassrgp2.component.html',
  styleUrls: ['./printoutgatepassrgp2.component.scss']
})
export class Printoutgatepassrgp2Component implements OnInit {

  key: any;

  command = "mat";
  userData: any;
  dataa: any[] = [];
  table: any[] = [];
  data1: any;
  constructor(
    private service: CustomerService,
    public print: NgxPrintElementService, public router: Router, public route: ActivatedRoute
  ) { }
  public config = {
    printMode: "template",
    popupProperties: "window.open",
  };

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.data1 = params['ogpnumber'];
        console.log(this.data1);


      });
    this.getUserFormData()
  }
  backtooutgatepass() {
    this.router.navigate(['/inventory2/outgatepassrgp2'], { queryParams: { tab: 'notificationsissue' } })
  }
  getUserFormData() {
    this.userData = [];
    let obj = {
      key: this.data1,
      command: "mat",
    };
    this.service.printoutgatepassRgpData2(obj).subscribe((res: any) => {
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
