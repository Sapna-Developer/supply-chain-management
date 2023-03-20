import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.scss']
})
export class CompanysComponent implements OnInit {
  displayedColumns: any[] = [
    'sno',
    'code',
    "project_name",
    'name',
    'billing_address',
    "shipping_address",
   'contact_number',
    'gst_number',
    'pan_number',
    'city',
    'state',
    'country',
    'pincode',
    'prefix',
    // 'ActiveStatus',
    'action'
  ];
  dataSource = new MatTableDataSource();
  totalRecords=0;
  companyname:any;
  address:any;
  contactnumber:any;
  gstnumber:any;
  pincode:any;
  city:any;
  state:any;
  country:any;
  pageIndex: any=1;
  pageSize:any=10;
  vendordata: any;
  companyeditname: any;
  addressedit: any;
  contactnumberedit: any;
  gstnumberedit: any;
  cityedit: any;
  countryedit: any;
  stateedit: any;
  pincodeedit: any;
  companyId: any;
  companyCode: any;
  companydata: any=false;
  prefix: any;
  prefixedit: any;
  deleteId: any;
  searchData: any;
  pan: any;
  panedit: any;
  shippingaddress: any;
  projectname: any;
  projectnameedit: any;
  shippingaddressedit: any;
  cmpydata: any;
  projectName: any;
  projectNameedit: any;
  constructor(private dialog:MatDialog,private custservice:CustomerService,
    private alertcall:AlertCallsService) { }


  ngOnInit(): void {
    this.getCompanysdata()
    this.getcompanydata()
  }
  onpageevent(event:any){
    this.pageIndex=event.pageIndex+1;
    this.pageSize= event.pageSize;
    this.getCompanysdata()
  }
  getCompanysdata(){
    let obj={
      "command" : "lst",
      "lmt" : this.pageSize,
      "pid" : this.pageIndex,
      "key" : ""||this.searchData
    }
    this.custservice.getcompanymasterdata(obj).subscribe((res:any)=>{
     this.companydata = false
     this.totalRecords = res?.count;
     this.dataSource.data = res.data;
     if(res.data.length==0){
      this.companydata=true
     }
    })
  }
  addcompany(data:any){
this.dialog.open(data,{
  width:'800px'
})
  }
  savecompanydata(form:any){
let obj={
 "command" : "add",
 "project_id":this.projectname,
 "project_name":this.projectName,
  "name": this.companyname,
  "address_1": this.address,
  "address_2":this.shippingaddress,
  "contact_number": this.contactnumber,
  "gst_number": this.gstnumber,
  "pan_number": this.pan,
  "pin_code": this.pincode,
  "city": this.city,
  "state": this.state,
  "country": this.country,
  "prefix": this.prefix
}
this.custservice.addcompanymaster(obj).subscribe((res:any)=>{
  if(res&&res['status_code']=='200'){
    this.alertcall.showSuccess('Accepted', 'Added Successfully');
    this.dialog.closeAll() ;
    form.reset()
    this.getCompanysdata()
  }else{
    this.alertcall.showWarning('Accepted', res['message']);
  }
})
  }
  editdata(row1:any,data:any){
    console.log(row1);
    this.dialog.open(data,{
      width:'800px'
    })
    this.companyId=row1.id;
    this.companyCode=row1.code;
    this.projectnameedit=row1.project_id,
    this.shippingaddressedit=row1.address_2,
    this.companyeditname=row1.name;
    this.addressedit=row1.address_1;
    this.contactnumberedit=row1.contact_number;
    this.gstnumberedit=row1.gst_number;
    this.cityedit=row1.city;
    this.stateedit=row1.state;
    this.countryedit=row1.country;
    this.pincodeedit=row1.pin_code;
    this.prefixedit=row1.prefix
  }
  savecompanyeditdata(fredit:any){
    let obj={
     "command" : "edt",
     "project_id":this.projectnameedit,
     "project_name":this.projectNameedit,
  "name": this.companyname,
  "address_1": this.addressedit,
  "address_2":this.shippingaddressedit,
     
      "contact_number": this.contactnumberedit,
      "gst_number": this.gstnumberedit,
      "pan_number": this.panedit,
      "pin_code": this.pincodeedit,
      "city": this.cityedit,
      "state": this.stateedit,
      "country": this.countryedit,
      'id':this.companyId,
      'code':this.companyCode,
      "prefix": this.prefixedit
    }
    this.custservice.updatecompanymasterdata(obj).subscribe((res:any)=>{
      if(res&&res['status_code']=='200'){
        this.alertcall.showSuccess('Accepted', 'Updated Successfully');
        this.dialog.closeAll() ;
        fredit.reset()
        this.getCompanysdata()
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
    this.custservice.deletecompanymasterdata(obj).subscribe((res:any)=>{
      if(res&&res['status_code']=='200'){
        this.alertcall.showSuccess('Accepted', 'Deleted Successfully');
        this.dialog.closeAll() ;
       
        this.getCompanysdata()
      }else{
        this.alertcall.showWarning('Accepted', res['message']);
      }
    })
  }
  searchdata(){
    // this.searchData=event.target.value;
    if(this.searchData.length>2){
      this.getCompanysdata()
    }
    if(!this.searchData){
       this.getCompanysdata()
    }
    
  
    
  }
  keyPressAlphaNumeric(event:any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  getcompanydata(){
    let obj={
      "command":"prj"
    }
    this.custservice.getcompanymasterdata(obj).subscribe((res:any)=>{
      this.cmpydata=res.data
    })
  }
  selectedproject(){
    this.cmpydata.forEach((element:any) => {
      if(element.proj_id==this.projectname){
        this.projectName=element.proj_short_name
      }
    });
  }
  selectedprojectedit(){
    this.cmpydata.forEach((element:any) => {
      if(element.proj_id==this.projectnameedit){
        this.projectNameedit=element.proj_short_name
      }
    });
  }
}
