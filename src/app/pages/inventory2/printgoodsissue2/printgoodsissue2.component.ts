import { Component, OnInit } from '@angular/core';
import { CustomerService } from "src/app/services/customer.service";
import { NgxPrintElementService } from "ngx-print-element";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-printgoodsissue2',
  templateUrl: './printgoodsissue2.component.html',
  styleUrls: ['./printgoodsissue2.component.scss']
})
export class Printgoodsissue2Component implements OnInit {

  key: any;
  field: "number";
  command = "mat";
  userData: any[] = [];
  dataa: any[] = [];
  table: any[] = [];
  value: any[];
  total: any;
  total_value: any[] = [];
  Purpose: any;
  workNumber: any;
  data1: any;

  constructor(
    private service: CustomerService,
    public print: NgxPrintElementService,
    private route:ActivatedRoute,
    private router:Router
  ) {}
  // public config = {
  //   printMode: "template-popup",
  //   popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
  //   // popupProperties: "window.open",
  // };
  public config = {
    printMode: 'template', // template
    //  popupProperties: "window.open",
    // popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    // styles: [ 'table { border: 1px solid #888; }']
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.data1=params['misnumber'];
        
        // }
      });
      this.getUserFormData()
  }
  backtodmr(){
    this.router.navigate(['/inventory2/goodsissue2'],{ queryParams: { tab: 'notificationsissue'}})
  }
  getUserFormData() {
    this.userData = [];
    let obj = {
      number: this.data1,
      // field: "number",
      command: "mat",
    };
    this.service.editgoodsissue(obj).subscribe((res: any) => {
      // this.userData = res.data;
      this.dataa = res.data;
      this.userData.push(this.dataa[0]);

      this.userData.push(this.table);
      this.table = res.data;

      this.findsum(this.userData);
    });
    let purpose = null;
    let work_order_number = null;

    if (purpose == null && work_order_number == null) {
      purpose = '--';
      work_order_number = '--';
    }
    console.log(purpose);
    this.Purpose = purpose;
    this.workNumber = work_order_number;
  }

  findsum(table: any) {
    this.value = this.table;
    console.log(this.value);
    this.total = 0;
    for (let j = 0; j <= table.length; j++) {
      this.total += this.value[j].total_value;
      console.log(this.total);
      console.log(this.total_value);
    }
  }

}

