import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {
  displayedColumns: any[] = [
    'sno',
    'code',
    'description',
    'percentage',
    'i_gst',
    'c_gst',
    's_gst',
    'tcs',
    'vat',
    'stax',
    'cst',
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
  companydata: any;
  prefix: any;
  prefixedit: any;
  deleteId: any;
  searchData: any;
  taxdata: any=false;
  cst: any=0
  stax: any=0
  vat: any=0
  tcs: any=0
  sgst: any=0
  cgst: any=0
  igst: any=0
  loadingRecords:any=false;
  constructor(private dialog:MatDialog,private custservice:CustomerService,
    private alertcall:AlertCallsService) { }



  ngOnInit(): void {
    this.getTaxlistdata()
  }
  onpageevent(event:any){
    this.pageIndex=event.pageIndex+1;
    this.pageSize= event.pageSize;
    this.getTaxlistdata()
  }
  getTaxlistdata(){
    let obj={
      "command" : "lst",
      "lmt" : this.pageSize,
      "pid" : this.pageIndex,
      "key" : ""||this.searchData
    }
    this.custservice.gettaxlistdata(obj).subscribe((res:any)=>{
    //  this.taxdata = res.data
     this.totalRecords = res?.count;
     this.dataSource.data = res.data
     this.taxdata=false
     if(res.data.length==0){
      this.taxdata = true
     }
    })
  }
  addtax(data:any){
this.dialog.open(data,{
  width:'600px'
})
  }
  savetaxdata(form:any){
let obj={

  "command" : "add",
  "igst": this.igst,                          
  "cgst": this.cgst,                          
  "sgst": this.sgst,                           
  "tcs": this.tcs,                          
  "vat": this.vat,                           
  "stax": this.stax,                            
  "cst": this.cst  
}
this.custservice.addtaxlist(obj).subscribe((res:any)=>{
  if(res&&res['status_code']=='200'){
    this.alertcall.showSuccess('Accepted', 'Added Successfully');
    this.dialog.closeAll() ;
    form.reset()
    this.getTaxlistdata()
  }else{
    this.alertcall.showWarning('Accepted', res['message']);
  }
})
  }
  // editdata(row1:any,data:any){
  //   console.log(row1);
  //   this.dialog.open(data,{
  //     width:'600px'
  //   })
  //   this.companyId=row1.id;
  //   this.companyCode=row1.code;
  //   this.companyeditname=row1.name;
  //   this.addressedit=row1.address_1;
  //   this.contactnumberedit=row1.contact_number;
  //   this.gstnumberedit=row1.gst_number;
  //   this.cityedit=row1.city;
  //   this.stateedit=row1.state;
  //   this.countryedit=row1.country;
  //   this.pincodeedit=row1.pin_code;
  //   this.prefixedit=row1.prefix
  // }
  // savetaxeditdata(fredit:any){
  //   let obj={
  //    "command" : "edt",
  //     "address_1": this.addressedit,
  //     "contact_number": this.contactnumberedit,
  //     "gst_number": this.gstnumberedit,
  //     "pin_code": this.pincodeedit,
  //     "city": this.cityedit,
  //     "state": this.stateedit,
  //     "country": this.countryedit,
  //     'id':this.companyId,
  //     'code':this.companyCode,
  //     "prefix": this.prefixedit
  //   }
  //   this.custservice.updatecompanymasterdata(obj).subscribe((res:any)=>{
  //     if(res&&res['status_code']=='200'){
  //       this.alertcall.showSuccess('Accepted', 'Updated Successfully');
  //       this.dialog.closeAll() ;
  //       fredit.reset()
  //       this.getCompanysdata()
  //     }else{
  //       this.alertcall.showWarning('Accepted', res['message']);
  //     }
  //   })
  // }
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
    this.custservice.deletetaxlistdata(obj).subscribe((res:any)=>{
      if(res&&res['status_code']=='200'){
        this.alertcall.showSuccess('Accepted', 'Deleted Successfully');
        this.dialog.closeAll() ;
       
        this.getTaxlistdata()
      }else{
        this.alertcall.showWarning('Accepted', res['message']);
      }
    })
  }
  searchdata(){
    // this.searchData=event.target.value;
    if(this.searchData.length>2){
      this.getTaxlistdata()
    }
    if(!this.searchData){
       this.getTaxlistdata()
    }
    
  
    
  }
  keyPressNumbers(evt:any)
  {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if (charCode != 46 && charCode > 31 
       && (charCode < 48 || charCode > 57))
        return false;

     return true;
  }
}
