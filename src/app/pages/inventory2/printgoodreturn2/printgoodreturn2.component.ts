import { Component, OnInit } from '@angular/core';
import { CustomerService } from "src/app/services/customer.service";
import { NgxPrintElementService } from "ngx-print-element";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-printgoodreturn2',
  templateUrl: './printgoodreturn2.component.html',
  styleUrls: ['./printgoodreturn2.component.scss']
})
export class Printgoodreturn2Component implements OnInit {


  key: any;
    field: "number";
    command = "mat";
    userData: any[] = [];
    dataa: any[] = [];
    table: any[] = [];
    value: any[];
    total: any;
    total_value: any[] = [];
  data1: any;

  constructor(
    private service: CustomerService,
    public print: NgxPrintElementService,
    public route:ActivatedRoute,
    public router:Router
  ) {}
  public config = {
    printMode: "template",
    popupProperties: "window.open",
  };

  ngOnInit(): void { 
    this.route.queryParams
      .subscribe(params => {
        this.data1=params['dmrumber'];
     
      });
      this.getUserFormData()
  }
  backtogoodsreturn(){
    this.router.navigate(['/inventory2/goodreturn2'],{ queryParams: { tab: 'notificationsissue'}})
  }
  getUserFormData() {
    this.userData = [];
    let obj = {
      key: this.data1,
      field: "number",
      command:"mat",
    }
    this.service.getgoodsreturnprint(obj).subscribe((res: any) => {
      this.dataa = res.data;
      this.userData.push(this.dataa[0]);
      console.log(this.userData)
      console.log(this.dataa)

      this.userData.push(this.table);
      this.table = res.data;
      console.log(this.table);
      this.findsum(this.userData);
      
    });
  }

  findsum(table:any) {
    this.value = this.dataa;
    console.log(this.value);
    this.total = 0;
    for (let j = 0; j <= table.length; j++) {
      this.total += this.value[j].total_value;
      console.log(this.total);
      console.log(this.total_value);
    }
  }

}
