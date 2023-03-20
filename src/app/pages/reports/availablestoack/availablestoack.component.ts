import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-availablestoack',
  templateUrl: './availablestoack.component.html',
  styleUrls: ['./availablestoack.component.scss']
})
export class AvailablestoackComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: any[] = [
    'sno',
    'mat_code',
    'mat_description',
    'uom',
    'storage_location',
    'valuation_type',
    'available_qty',
    'available_value',
    'unit_price',
    
   
      
    ];
  avaialablestockdata: any;
model:any={}
  companyData: any;
  totalRecords:any=0;
  reaData: boolean;
  loadingRecords:any=false;
  constructor(public custservice:CustomerService) { }

  ngOnInit(): void {
    // this.getdata()
    this.getcompanydata()
  }
  getcompanydata(){
    let obj={
      "command":"lst",
      lmt:100000,
      pid:1
    }
    this.custservice.getcompanymasterdata(obj).subscribe((res:any)=>{
    this.companyData=res.data
      
    })
  }
  getAvailablestock(){
    console.log(this.model);
    this.getdata()
  }
getdata(){
  let array:any[]=[]
  array.push(this.model.companyname)
  let obj={
    "command": "stk",
    //  "from_date":this.model.fromdate,
    //  "to_date":this.model.todate,
      "company_name": array
  }
  this.custservice.getavailablestockdata(obj).subscribe((res:any)=>{
  if(res&&res['status_code']=='200'){
    this.avaialablestockdata=res.message
    this.dataSource.data=res.message
    this.totalRecords=res.count
    this.reaData=false;
    if(res.message.length==0){
      this.reaData = true
    }
  }
    
  })
}
}
