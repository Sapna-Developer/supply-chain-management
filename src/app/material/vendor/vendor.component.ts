import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  displayedColumns: any[] = [
    'sno',
    'code',
    'name',
    'address',
    'contact_number',
    'gst_number',
    'pan_number',
    'city',
    'state',
    'country',
    'pincode',
    // 'ActiveStatus',
    'action'
  ];
  dataSource = new MatTableDataSource();
  totalRecords=0;
  vendorname:any;
  address:any;
  contactnumber:any;
  gstnumber:any;
  pincode:any;
  city:any;
  state:any;
  country:any;
  pageIndex: any=1;
  pageSize:any=10;
  vendordata: any=false;
  vendoreditname: any;
  addressedit: any;
  contactnumberedit: any;
  gstnumberedit: any;
  cityedit: any;
  countryedit: any;
  stateedit: any;
  pincodeedit: any;
  vendorId: any;
  vendorCode: any;
  deleteId: any;
  searchData: any;
  pan: any;
  panedit: any;
  constructor(private dialog:MatDialog,private custservice:CustomerService,
    private alertcall:AlertCallsService) { }

  ngOnInit(): void {
    this.getvendordata()
  }
  onpageevent(event:any){
    this.pageIndex=event.pageIndex+1;
    this.pageSize= event.pageSize;
    this.getvendordata()
  }
  getvendordata(){
    let obj={
      "command" : "lst",
      "lmt" : this.pageSize,
      "pid" : this.pageIndex,
      "key" : "" ||this.searchData
    }
    this.custservice.getvendormasterdata(obj).subscribe((res:any)=>{
     this.vendordata = false;
     this.totalRecords = res?.count;
     this.dataSource.data = res.data;
     if(res.data.length==0){
      this.vendordata=true;
     }
    })
  }
  addvendor(data:any){
this.dialog.open(data,{
  width:'900px'
})
  }
  savevendordata(form:any){
let obj={
  "command" : "add",
  "name": this.vendorname,
  "address_1": this.address,
  "contact_number": this.contactnumber,
  "gst_number": this.gstnumber,
  "pan_number":this.pan,
  "pin_code": this.pincode,
  "city": this.city,
  "state": this.state,
  "country": this.country
}
this.custservice.addvendormaster(obj).subscribe((res:any)=>{
  if(res&&res['status_code']=='200'){
    this.alertcall.showSuccess('Accepted', 'Added Successfully');
    this.dialog.closeAll() ;
    form.reset()
    this.getvendordata()
  }else{
    this.alertcall.showWarning('Accepted', res['message']);
  }
})
  }
  editdata(row1:any,data:any){
    console.log(row1);
    this.dialog.open(data,{
      width:'900px'
    })
    this.vendorId=row1.id;
    this.vendorCode=row1.code;
    this.vendoreditname=row1.name;
    this.addressedit=row1.address_1;
    this.contactnumberedit=row1.contact_number;
    this.gstnumberedit=row1.gst_number;
    this.cityedit=row1.city;
    this.stateedit=row1.state;
    this.countryedit=row1.country;
    this.pincodeedit=row1.pin_code
  }
  savevendoreditdata(fredit:any){
    let obj={
      "command" : "edt",
      "address_1": this.addressedit,
      "contact_number": this.contactnumberedit,
      "gst_number": this.gstnumberedit,
      "pan_number":this.panedit,
      "pin_code": this.pincodeedit,
      "city": this.cityedit,
      "state": this.stateedit,
      "country": this.countryedit,
      'id':this.vendorId,
      'code':this.vendorCode
    }
    this.custservice.updatevendormasterdata(obj).subscribe((res:any)=>{
      if(res&&res['status_code']=='200'){
        this.alertcall.showSuccess('Accepted', 'Updated Successfully');
        this.dialog.closeAll() ;
        fredit.reset()
        this.getvendordata()
      }else{
        this.alertcall.showWarning('Accepted', res['message']);
      }
    })
  }
  deletedata(rw:any,data:any){
    this.dialog.open(data,{
      width:'400px'
    })
    this.deleteId=rw.id
      }
  deleteFile(){
    let obj={
      "command" : "del", 
      "id" : this.deleteId
    }
    this.custservice.deletevendormasterdata(obj).subscribe((res:any)=>{
      if(res&&res['status_code']=='200'){
        this.alertcall.showSuccess('Accepted', 'Deleted Successfully');
        this.dialog.closeAll() ;
       
        this.getvendordata()
      }else{
        this.alertcall.showWarning('Accepted', res['message']);
      }
    })
  }
  searchdata(){
    // this.searchData=event.target.value;
    if(this.searchData.length>2){
      this.getvendordata()
    }
    if(!this.searchData){
       this.getvendordata()
    }
    
  
    
  }
}
