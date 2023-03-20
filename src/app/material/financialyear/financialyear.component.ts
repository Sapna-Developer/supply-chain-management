import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-financialyear',
  templateUrl: './financialyear.component.html',
  styleUrls: ['./financialyear.component.scss']
})
export class FinancialyearComponent implements OnInit {
  displayedColumns: any[] = [
    'sno',
    'description',
    'fromdate',
    'todate',
    // 'ActiveStatus',
    'action'
  ];
  dataSource = new MatTableDataSource();
  totalRecords=0;
  description:any;
  fromdate:any;
  todate:any;
  pageIndex:any=1;
  pageSize:any=10;
  searchData: string;
  financedata:any=false;
  deleteId: any;
  financeId: any;
  descriptionedit: any;
  fromdateedit: any;
  todateedit: any;
  constructor(private dialog:MatDialog,private custservice:CustomerService,
    private alertcall:AlertCallsService) { }

  ngOnInit(): void {
    this.fromdate=moment(new Date()).format("YYYY-MM-DD")
    this.todate=moment(new Date()).format("YYYY-MM-DD")

    this.getFinancedata()
  }
  onpageevent(event:any){
    this.pageIndex=event.pageIndex+1;
    this.pageSize= event.pageSize;
    this.getFinancedata()
  }
  getFinancedata(){
    let obj={
      "command" : "lst",
      "lmt" : this.pageSize,
      "pid" : this.pageIndex,
      "key" : ""||this.searchData
    }
    this.custservice.getfinancialyear(obj).subscribe((res:any)=>{
    //  this.taxdata = res.data
     this.totalRecords = res?.count;
     this.dataSource.data = res.data
     this.financedata=false
     if(res.data.length==0){
      this.financedata = true
     }
    })
  }
  addfinanceyr(data:any){
this.dialog.open(data,{
  width:'600px'
})
  }
  savefinancedata(form:any){
let obj={

  "command" : "add",            
  "description": this.description,
  "from_date": moment(this.fromdate).format('YYYY-MM-DD'), 
  "to_date": moment(this.todate).format('YYYY-MM-DD')       
}
this.custservice.addfinancialyear(obj).subscribe((res:any)=>{
  if(res&&res['status_code']=='200'){
    this.alertcall.showSuccess('Accepted', 'Added Successfully');
    this.dialog.closeAll() ;
    form.reset()
    this.getFinancedata()
  }else{
    this.alertcall.showWarning('Accepted', res['message']);
  }
})
  }
  editdata(row1:any,data:any){
    console.log(row1);
    this.dialog.open(data,{
      width:'600px'
    })
    this.financeId=row1.id;
   this.descriptionedit=row1.description;
   this.fromdateedit=moment(row1.from_date).format('YYYY-MM-DD');
   this.todateedit=moment(row1.to_date).format('YYYY-MM-DD');
  }
  savefinanceeditdata(fredit:any){
    let obj={
      "command" : "edt",
      "id" : this.financeId,
       "description": this.descriptionedit,
       "from_date": this.fromdateedit,   
       "to_date": this.todateedit    
    }
    this.custservice.updatefinancialyear(obj).subscribe((res:any)=>{
      if(res&&res['status_code']=='200'){
        this.alertcall.showSuccess('Accepted', 'Updated Successfully');
        this.dialog.closeAll() ;
        fredit.reset()
        this.getFinancedata()
      }else{
        this.alertcall.showWarning('Accepted', res['message']);
      }
    })
  }
  deletedata(rw:any,data:any){
    this.deleteId=rw.id
this.dialog.open(data,{
  width:'400px'
})
  }
  deleteFile(){
    let obj={
      "command" : "del", 
      "id" :  this.deleteId
    }
    this.custservice.deletefinancialyear(obj).subscribe((res:any)=>{
      if(res&&res['status_code']=='200'){
        this.alertcall.showSuccess('Accepted', 'Deleted Successfully');
        this.dialog.closeAll() ;
       
        this.getFinancedata()
      }else{
        this.alertcall.showWarning('Accepted', res['message']);
      }
    })
  }
  searchdata(){
    // this.searchData=event.target.value;
    if(this.searchData.length>2){
      this.getFinancedata()
    }
    if(!this.searchData){
       this.getFinancedata()
    }
    
  
    
  }
}
