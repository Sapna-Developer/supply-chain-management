import { Component, OnInit } from '@angular/core';
import { CustomerService } from "src/app/services/customer.service";
import { NgxPrintElementService } from "ngx-print-element";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-printgoodsissuerequest2',
  templateUrl: './printgoodsissuerequest2.component.html',
  styleUrls: ['./printgoodsissuerequest2.component.scss']
})
export class Printgoodsissuerequest2Component implements OnInit {

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
  public config = {
    printMode: 'template', // template
     popupProperties: "window.open",
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
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
    this.router.navigate(['/planning2/goodsissuerequest2'],{ queryParams: { tab: 'notificationsissue'}})
  }
  getUserFormData() {
    this.userData = [];
    let obj = {
      number: this.data1,
      // field: "number", 
      command: "mat",
    };
    this.service.editgoodissuerequest2(obj).subscribe((res: any) => {
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

