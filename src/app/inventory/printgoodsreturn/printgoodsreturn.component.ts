import { Component, OnInit, VERSION } from '@angular/core';
import { CustomerService } from "src/app/services/customer.service";
import { NgxPrintElementService } from "ngx-print-element";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
@Component({
  selector: 'app-printgoodsreturn',
  templateUrl: './printgoodsreturn.component.html',
  styleUrls: ['./printgoodsreturn.component.scss']
})
export class PrintgoodsreturnComponent implements OnInit {

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
    printMode: 'template', // template
    popupProperties: "window.open",
   stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
  };

  ngOnInit(): void { 
    this.route.queryParams
      .subscribe(params => {
        this.data1=params['dmrumber'];
     
      });
      this.getUserFormData()
  }
  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  backtogoodsreturn(){
    this.router.navigate(['/inventory/goodsreturn'],{ queryParams: { tab: 'notificationsissue'}})
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
