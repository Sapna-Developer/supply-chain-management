import { Component, OnInit } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { NgxPrintElementService } from "ngx-print-element";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-printpurchaserequest2',
  templateUrl: './printpurchaserequest2.component.html',
  styleUrls: ['./printpurchaserequest2.component.scss']
})
export class Printpurchaserequest2Component implements OnInit {
  key: any;
  field: "number";
  command: "mat";
  userData: any[] = [];
  dataa: any[] = [];
  table: any[] = [];
  value: any[];
  total: any;
  total_price: any[] = [];
  user: any[] = [];
  location: any;
  number: any;
  date: any;
  po_duration: any;
  purpose: any;
  recommended_agency: any;
  line_item: any;
  material_code: any;
  material_description: any;
  unit_of_measurment: any;
  quantity: any;
  unit_price: any;
  remarks: any;
  approved_by: any;
  raised_by: any;
  po_series: any;
  data1: any;
  constructor(  
    private service: CustomerService,
    public print: NgxPrintElementService,
    public route: ActivatedRoute,
    public router: Router
    ) { }
    public config = {
      printMode: "template",
      popupProperties: "window.open",
    };
  
    ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
        this.data1 = params["dmrumber"];
  
        // }
      });
      console.log(this.userData);
      this.getUserFormData();
    }
  
    getUserFormData() {
      this.userData = [];
      let obj = {
        key: this.data1,
        field: "number",
        command: "mat",
      };
      this.service.getpurchaserequest2print(obj).subscribe((res: any) => {
        this.dataa = res.data;
        this.userData.push(this.dataa[0]);
        console.log(this.userData);
        console.log(this.dataa);
  
        this.userData.push(this.table);
        this.table = res.data;
        console.log(this.table);
        this.findsum(this.userData);
      });
    }
  
    findsum(table: any) {
      this.value = this.dataa;
      console.log(this.value);
      this.total = 0;
      for (let j = 0; j <= table.length; j++) {
        this.total += this.value[j].total_price;
        console.log(this.total);
        console.log(this.total_price);
      }
    }
    backtodmr() {
      this.router.navigate(["/planning2/purchaserequest2"], {
        queryParams: { tab: "notifications" },
      });
    }
}
