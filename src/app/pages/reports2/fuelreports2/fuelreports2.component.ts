import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-fuelreports2',
  templateUrl: './fuelreports2.component.html',
  styleUrls: ['./fuelreports2.component.scss']
})
export class Fuelreports2Component implements OnInit {
  selectedVendorName: any;
  VendorData: any;
  bunkreqvendor_name: any;
  bunkreqvendor_code: any;
  bunkcfrmvendor_name: any;
  bunkcfrmvendor_code: any;
  fuelreqvendor_name: any;
  fuelreqvendor_code: any;
  fuelissuevendor_name: any;
  fuelissuevendor_code: any;
  fuelreceiptvendor_name: any;
  fuelreceiptvendor_code: any;
  contractorData: any;
  selectedcontractorname: string;
  fuelreqcontractor_name: any;
  fuelreqcontractor_code: any;
  ficontractor_name: any;
  ficontractor_code: any;
  selectedmaterial: any;
  masterData: any;
  selectedmatcode: any;
  fuelStmtselectematcode: any;

  constructor(private custService: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService) { }

  ngOnInit(): void {
    this.getVendorData();
    this.getcontractorData();
    this.getmasterdata();
  }

  //vendor name
  getVendorData() {
    let obj = {
      command: "lst",
      key: this.selectedVendorName,
    };
    this.custService.getvendormasterdata(obj).subscribe((res: any) => {
      this.VendorData = res.data;
      console.log(this.VendorData);
    });
  }
  filterVendorData(ev: any) {
    this.selectedVendorName = ev.target.value;
    console.log(ev.target.value);
    if (this.selectedVendorName > 2) {
      this.getVendorData();
    } else {
      this.getVendorData();
    }
  }
  getVendorCode() {
    this.VendorData.forEach((ele: any) => {
      if (this.bunkreqvendor_name == ele.name) {
        this.bunkreqvendor_name = ele.name;
        this.bunkreqvendor_code = ele.code;
      }
    });
    console.log(this.bunkreqvendor_name);
    console.log( this.bunkreqvendor_code);
    
  }
  getVendorCodeBC(){
    this.VendorData.forEach((ele: any) => {
      if (this.bunkcfrmvendor_name == ele.name) {
        this.bunkcfrmvendor_name = ele.name;
        this.bunkcfrmvendor_code = ele.code;
      }
    });
    console.log(this.bunkcfrmvendor_name);
    console.log( this.bunkcfrmvendor_code);
  }
  getVendorCodeFReceipt(){
    this.VendorData.forEach((ele: any) => {
      if (this.fuelreceiptvendor_name == ele.name) {
        this.fuelreceiptvendor_name = ele.name;
        this.fuelreceiptvendor_code = ele.code;
      }
    });
    console.log(this.fuelreceiptvendor_name);
    console.log( this.fuelreceiptvendor_code);
  }



  //contractor
  getcontractorData(){
    let obj={
      "command" : "lst",
      "lmt":100,
      "key": this.selectedcontractorname || ""
    }
    this.custService.getcontractormasterdata(obj).subscribe((res:any)=>{
      this.contractorData = res.data
    })
  }
  filterContractorData(ev:any){
    this.selectedcontractorname = ev.target.value
    if (this.selectedcontractorname.length > 2) {
      this.getcontractorData();
    }
    if (!this.selectedcontractorname) {
      this.getcontractorData();
    }
  }
 

  getContactorCodefuelreq() {
    this.contractorData.forEach((ele: any) => {
      if (this.fuelreqcontractor_name == ele.name) {
        this.fuelreqcontractor_name = ele.name
        this.fuelreqcontractor_code = ele.code;
      }
    });
    console.log( this.fuelreqcontractor_name);
    console.log(this.fuelreqcontractor_code);
  }
  
  getContactorCodeFI() {
    this.contractorData.forEach((ele: any) => {
      if (this.ficontractor_name == ele.name) {
        this.ficontractor_name = ele.name
        this.ficontractor_code = ele.code;
      }
    });
    console.log( this.ficontractor_name);
    console.log(this.ficontractor_code);
  }
  

  //material master
  //material code 
getmasterdata(){
  let obj={
    "command":'lst',
    "lmt":100,
    "pid":1,
    "key":this.selectedmaterial 
  }
  this.custService.getmaterialmasterdata(obj).subscribe((res:any)=>{
    console.log(res);
    this.masterData=res.data
    
  })
}
//search 
getmaterialDATA(ev:any){
  console.log(ev.target.value);
  this.selectedmaterial=ev.target.value
  if(this.selectedmaterial.length>2){
this.getmasterdata()
  }
  if(! this.selectedmaterial){
    this.getmasterdata()
  }
}

selected(){
  console.log(this.fuelStmtselectematcode);
  
  this.masterData.forEach((element:any) => {
    if(element.system_reference_1==this.fuelStmtselectematcode){
      this.selectedmatcode=element.code
    }
  });
console.log(this.selectedmatcode);

}

  //clear form
  bunkreqclearForm(){
    (<HTMLFormElement>document.getElementById("form")).reset();
  }
  fuelreqclearForm() {
  (<HTMLFormElement>document.getElementById("form")).reset();
  // this.dmrdata=[];
  }
  fuelissueclearForm(){
    (<HTMLFormElement>document.getElementById("form")).reset();

  }
  fuelstmtclearForm(){
    (<HTMLFormElement>document.getElementById("form")).reset();
  }
  fuelreceiptclearForm(){
    (<HTMLFormElement>document.getElementById("form")).reset();
  }
  bunkcfrmclearForm(){
    (<HTMLFormElement>document.getElementById("form")).reset();
  }
}
