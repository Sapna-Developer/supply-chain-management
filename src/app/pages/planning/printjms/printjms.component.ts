import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgxPrintElementService } from "ngx-print-element";
import * as converter from 'number-to-words'
import { ActivatedRoute, Router } from '@angular/router';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { result } from 'lodash';
// import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-printjms',
  templateUrl: './printjms.component.html',
  styleUrls: ['./printjms.component.scss']
})
export class PrintjmsComponent implements OnInit {

  results_keys: string[];
  result: any[]=[];
  data1: any;

  constructor(private custservice: CustomerService,
    public print: NgxPrintElementService,
    private router: Router, private route: ActivatedRoute,) { }

    // displayedColumns: any[] = [
    //   'sno', 'description', 'uom', 'nos', 'length', 'width', 'height', 'action'
    // ]
  
  
    // dataSource = new MatTableDataSource();


  number: any
  JMSDATA: any[] = []
  groupedArray:any[]=[]
  test:any[]=[]
  totalquantity:any

  public config = {
    printMode: "template",
    popupProperties: "window.open",
  };

  getjmsdetails() {
    let obj = {
      "command": "mat",
      "key": this.data1
    }
    this.custservice.printJMSdetails(obj).subscribe((res: any) => {
      console.log(res.data)
      this.JMSDATA = res.data


 let result =  this.JMSDATA.reduce((r, a) => { 
  console.log("a", a); 
  console.log('r', r); 
  r[a.boq_item_description] = [...r[a.boq_item_description] || [], a]; 
  return r;
}, 
{});console.log(Object.values(result));
  this.result = Object.values(result)
    //   this.result = this.JMSDATA.reduce(function (a,b) {
    //     a.boq_item_description = b.boq_item_description 
    //     a.boq_item_description.push(a);
    //     return a
        
    //   }, Object.create(null))
    //   // this.totalquantity=0
    //   //   this.JMSDATA.forEach((ele:any)=>{
    //   //     this.totalquantity+=ele.quantity
    //   //   })
    //   console.log(this.result)
    //   this.results_keys = Object.keys(this.result)
    //   console.log(Object.keys(this.result))
    //   // this.groupedArray.push(this.result)
    //   // console.log(this.groupedArray)
    //   // this.groupedArray.forEach((ele:any)=>{
    //   //   console.log(ele)
    //   // })
     
    })
   
    

  }
  locationsSum(i: number){
    return this.result[i].map((tag: { quantity: any; }) => tag.quantity).reduce((a: any, b: any) => a + b, 0);
  }
  backtojms(){
    this.router.navigate(["/planning/jms"], {
      queryParams: { tab: "notifications" },
    });
  }
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.data1=params['wonumber'];
      
      // }
    });
    this.getjmsdetails()
  }

}
