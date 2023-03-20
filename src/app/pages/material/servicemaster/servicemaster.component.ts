import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { MatTableDataSource } from '@angular/material/table';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-servicemaster',
  templateUrl: './servicemaster.component.html',
  styleUrls: ['./servicemaster.component.scss']
})
export class ServicemasterComponent implements OnInit {
  classification: any;
  maingroupdata: any;
  selectedmaingrp: any;
  matCode: any;
  selecteduom: any;
  UOMDATA: any;

 constructor(private custservice:CustomerService,
    private alertcall:AlertCallsService,
    private dialog:MatDialog) { }

    dataSourceList = new MatTableDataSource();
    displayedColumnsList:any[]=[
      'sno', 'code', 'name','classification', 'uom', 'hsnsacCode', 'action'
    ]

  // formdata={}
  naame:any
  description:any;
  hsn_sac_code:any;
  uom:any;
  finaldataArray:any[]=[]
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  deleteNumber:any


  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getsrvcMasterData()
  }
  getmaingroupDATA(ev:any){
    this.selectedmaingrp=ev.target.value
    if(this.selectedmaingrp.length>2){
this.getmaingrpdata()
    }
    if(!this.selectedmaingrp){
      this.getmaingrpdata()
    }
  }
  getmaingrpdata(){
    let obj={
      "command" : "lst",
      "key":this.selectedmaingrp || ""
    }
    this.custservice.getmaingroupdata(obj).subscribe((res:any)=>{
     this.maingroupdata=res.data
    })
  }
  selected(){
this.maingroupdata.forEach((element:any) => {
  if(element.description===this.classification){
    this.matCode=element.code
  }
});
  }
  getUOM(ev:any){
    this.selecteduom=ev.target.value
    if(this.selecteduom.length>0){
this.getunitData()
    }
    if(!this.selecteduom){
      this.getunitData()
    } 
  }
  getunitData(){
    let obj={
      "command" : "lst",
      "key":this.selecteduom || ""
    }
    this.custservice.getunitdata(obj).subscribe((res:any)=>{
      this.UOMDATA=res.data
    })
  }
  selectedUOM(){

  }
  getsrvcMasterData() {
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex,
      "key": ""
    }
    this.custservice.getServiceMasterData(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }
    })
    console.log(this.totalRecords);
  }


  savefinaldata(fr:any){
    // console.log(this.formdata)
    console.log(this.finaldataArray)
    this.finaldataArray=[]
    let obj={
      "command" : "add",
      "name" : this.naame,
      "description" : this.description,
      "hsn_sac_code" : this.hsn_sac_code,
      "unit_of_measurment": this.uom,
      "classification": this.classification,
      "main_group_code": this.matCode
    }
    this.custservice.getServicesData(obj).subscribe((res:any)=>{
      console.log(obj)
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        console.log(res.data)
        fr.reset();
        this.getsrvcMasterData()
      }
      else{
        this.alertcall.showWarning('Accepted', res['message']);
      }
    })


  }

  deleteservicemaster(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px',
      // scrollStrategy: new NoopScrollStrategy()
    })
    this.deleteNumber = rw.code;
    console.log(this.deleteNumber)
    console.log(rw, data)
  }


  deleteItem() {
    let obj = {
      "command": "del",
      "code": this.deleteNumber
    }
    this.custservice.deleteservicemasterdata(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.getsrvcMasterData()
      } else {
        this.alertcall.showWarning('Error', res['message']);
      }
    })
  
  }



  ngOnInit(): void {
    this.getsrvcMasterData();
    this.getmaingrpdata();
    this.getunitData()
  }


}
