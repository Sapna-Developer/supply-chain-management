import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-singlematerialstock',
  templateUrl: './singlematerialstock.component.html',
  styleUrls: ['./singlematerialstock.component.scss']
})
export class SinglematerialstockComponent implements OnInit {
  masterData: any;
  selectematcode:any;
  selectedmaterial: any;
  selectedmatcode: any;
  smsdata: any;
  companyname:any[]=[]
  duplicate_cmpnynme:any[]=[]
  total: any=0;
  totalvalue: any=0;
  constructor(private custservice:CustomerService,private dialog:MatDialog,
    private alertcall:AlertCallsService) { }

  ngOnInit(): void {

    this.getmasterdata()
  }
  closemodel(){
    this.dialog.closeAll()
  }
  saveformdata(fr:any){
this.getSMSdata()
  }
  selectedmastergroup(){
console.log(this.selectematcode);
this.masterData.forEach((el:any) => {
  if(this.selectematcode==el.system_reference_1){
    this.selectedmatcode=el.code
  }
});

  }
  getmaterialDATA(ev:any){
    this.selectedmaterial=ev.target.value
    if(this.selectedmaterial.length>2){
this.getmasterdata()
    }
    if(!this.selectedmaterial){
      this.getmasterdata()
    }
  }
  getmasterdata(){
    let obj={
      "command":'lst',
      "lmt":100000,
      "pid":1,
      "key":this.selectedmaterial
    }
    this.custservice.getmaterialmasterdata(obj).subscribe((res:any)=>{
      console.log(res);
      this.masterData=res.data
      
    })
  }
getSMSdata(){
  let obj={
    "material_code": this.selectedmatcode, 
    "command": "sms"  
  }
  this.custservice.getsmsdata(obj).subscribe((res:any)=>{
    console.log(res);
    if(res&&res['status_code']=='200'){
      this.smsdata=res.message
      this.dialog.closeAll()
    this.total=0
    this.totalvalue=0
      this.smsdata.forEach((el:any)=>{
        this.total+= el.quantity;
        this.totalvalue += el.value;
        console.log(el.quantity);
      })
   
      
      // var duplicates =  this.smsdata.reduce(function(acc:any, el:any, i:any, arr:any) {
      //   if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
      // }, []);
      
      // document.write(duplicates);
      // unique = [...new Set(this.smsdata.map((ele:any) => ele.company_name))];
      // if (unique.length === 1) {
      // console.log(unique);
      // }
      // this.smsdata.forEach((element:any) => {
        // this.invoice_number:any[]=[]
        // this.companyname.push(element.company_name)
        // this.invoice_date.push(element.invoice_date)
        // this.deliverychallanno.push(element.dc_number)
      //  this.duplicate_cmpnynme= [...new Set( this.smsdata)];
     
      //  if(this.duplicate_cmpnynme){
      //    let strgarray:any=[]
      //    this.duplicate_cmpnynme.forEach((ele:any)=>{
      //     strgarray.push(ele.storage_location) 
      //    })
      //    console.log(strgarray);
         
      //  }
      // })
    }else{
      this.alertcall.showWarning('Warning', res['message']);
    }
  })
}
addsms(data:any){
  this.dialog.open(data,{
    width:"650px"
  })
}
}
