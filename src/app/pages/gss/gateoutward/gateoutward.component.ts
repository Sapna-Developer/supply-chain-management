import { Component, Injector, OnInit } from '@angular/core';
import { CustomerService } from "src/app/services/customer.service";
import * as moment from "moment";
import Swal from "sweetalert2";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-gateoutward',
  templateUrl: './gateoutward.component.html',
  styleUrls: ['./gateoutward.component.scss']
})
export class GateoutwardComponent implements OnInit {

  displayedColumns: any[] = [
    "sno",
    "materialCode",
    "materialDescription",
    "unit_of_measurement",
    "quantity",
    "action",
  ];
  displayedColumns1: any[] = [
    "GateEntryNumber",
    "Date",
    "company_Name",
    "document_type",
    "document_number",
    "gateId",
    "vendor_name",
    // 'issue_type',
    // 'ActiveStatus',
    "action",
  ];
  gateoutnumber: any;
  filedata: any;
  deleteid: any;
  fileUploadUrls: any[]=[]
  resultgonumber: any;
  selecteddocnumbers: any;
  resdata: any;
  resdata1: any;
  editednumber: any;
  editModel:any={}
  editdataa: any;
  logdata: any;
  constructor(
    private dialog: MatDialog,
    private custservice: CustomerService,
    private alertcall: AlertCallsService,
    private router: Router,
    private route: ActivatedRoute,private injector:Injector
  ) { this.dialogRef = this.injector.get(MatDialogRef, null);}
  dialogRef:any=null;
  comments: any;
  time: any;
  companyname: any;
  documenttype: any;
  documentnumber: any;
  gateid: any;
  guardname: any;
  carriername: any;
  vehiclenumber: any;
  carriercontactnumber: any;
  vendorname: any;
  remarks: any;
  documentdate: any;
  matName: any[] = [];
  matCodee:any[]=[]
  UOM: any[] = [];
  qty: any[] = [];
  SNO: any[] = [];
  matCode: any[] = [];

  dialogdata: any = {};
  formdata: any = {};
  dataSource = new MatTableDataSource();
  dataSourcemain = new MatTableDataSource();
  companyData: any;
  vendorData: any;
  formdatatotablearray: any[] = [];
  material_description: any[] = [];
  selectedIndex: any;
  finaldataarray: any[] = [];
  editeddialogdata: any = {};
  masterData: any;
  selectedmaterial: any;
  selectedmaterialedit: any;
  systemref: any;
  materialCODE: any;
  materialNAME: any;
  editeddialogdatamatcode: any;
  editeddialogdatamatdes: any;
  editdialogdata: any = {};
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  deleteNumber: any;
  deletemodel:any={}
  demo1TabIndex: any = 0;
  btn:any="Save";
  createNewFile:any={}
  imageUrl=environment.base_url
  filenamearray1:any[]=[]
  fileUploadUrlsgo:any[]=[]
  filenamearray:any[]=[]
  selectedfiles:any[]=[]
  initialdata:any=true;
  editdata:any=false;
  ngOnInit(): void {
    this.formdata.date=moment(new Date()).format("YYYY-MM-DD")
    this.formdata.documentdate=moment(new Date()).format("YYYY-MM-DD")
    let now = new Date();
    let hours = ("0" + now.getHours()).slice(-2);
    let minutes = ("0" + now.getMinutes()).slice(-2);
    let str = hours + ':' + minutes;
    this.formdata.time = str;
    this.route.queryParams.subscribe((params: any) => {
      if (params.tab == "notificationsissue") {
        this.demo1TabIndex = 1;
        console.log(params);
      } else {
        this.demo1TabIndex = 0;
      }
    });
    this.getData();
    this.getcompanydata();
    this.getvendordata();
    this.getmasterdata();
    this.getlogdata()
  }
  getlogdata(){
    let obj={
      command:"log",
      key:"GateOutward"
    }
    this.custservice.getActivityLog(obj).subscribe((res:any)=>{
      if(res.log.length > 0){
      this.logdata=res.log
      }
    })
  }
  openfileuploadmodel(data:any,row1:any){
    this.dialog.open(data,{
      width:'800px'
    })
    this.gateoutnumber=row1.number
    this.getexistingfiles()
  }
  getexistingfiles(){
    let params = new HttpParams();
    params = new HttpParams()
     .set("document_number", this.gateoutnumber,)
     .set( "document_type","Gate Outward")
    // let obj={
    //   "document_number" : this.dmrnumber,
    //   "document_type": "Daily Material Receipt"
    // }
    this.custservice.getexistingfies(params).subscribe((res:any)=>{
  if(res&&res['status_code']=='200'){
this.filedata=res.data
this.createNewFile.fileName=''
}else{
  this.filedata=''
  console.log(this.filedata);
}
    })
  }
  viewDoc(file: any) {
    const url = this.imageUrl + '/' + file.file_path;
    window.open(url, '_blank');
  }
  deleterowfile(row:any,data:any){
    this.deleteid=data.id
    this.dialogRef=this.dialog.open(row,{
      width:"400px"
    })
  }
  deleteexistingfile(){ 
    let params=new HttpParams()
    params=new HttpParams()
    .set("document_number", this.gateoutnumber,)
     .set( "document_type","Gate Outward")
     .set( "id",this.deleteid)
     this.custservice.deletefiles(params).subscribe((res:any)=>{
      if(res&&res['status_code']=='200'){
        this.alertcall.showSuccess("Accepted","File Deleted Successfully")
        this.getexistingfiles()
        this.dialogRef.close()
      }else{
        this.alertcall.showWarning("Error",res['message'])
       
        
       
      }
     })
  }
uploadWbsFile(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrls = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for(const file of this.fileUploadUrls){
        this.filenamearray1.push(file.name)
      }
    }
    const postData = new FormData();
    postData.append("document_type","Gate Outward");
    postData.append("document_number",this.gateoutnumber);
    for(const file of this.fileUploadUrls){
      postData.append("doc",file)
    }
    this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
this.alertcall.showSuccess("Accepted",res['message'])
this.getexistingfiles()
this.filenamearray1=[]
this.fileUploadUrls=[]
}else{
  this.alertcall.showWarning("Error",res['message'])
}
    })
  }
  uploadgofiles(fileInput:any){
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsgo = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for(const file of this.fileUploadUrlsgo){
        this.filenamearray.push(file.name)
        this.selectedfiles.push(file)
      } 
    }
  
  }
  uploadselectedfiles(){
    const postData = new FormData();
    postData.append("document_type","Gate Inward");
    postData.append("document_number",this.resultgonumber);
    for(const file of this.selectedfiles){
    postData.append("doc",file)
    }
    this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
  this.fileUploadUrlsgo=[]
  this.filenamearray=[]
  this.selectedfiles=[]

}else{
 
}
    }) 
  }

  // get company name in dropdown1
  getcompanydata() {
    let obj = {
      command: "lst",
      lmt:100000,
      pid:1
    };
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data;
      console.log(this.companyData);
    });
  }

  // validate number2
  // validateNumber(event: any) {
  //   var charCode = event.which ? event.which : event.keyCode;
  //   // Only Numbers 0-9
  //   if (charCode < 48 || charCode > 57) {
  //     event.preventDefault();
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // get vendor name in dropdown3
  getvendordata() {
    let obj = {
      command: "lst",
    };
    this.custservice.addvendormaster(obj).subscribe((res: any) => {
      this.vendorData = res.data;
    });
  }

  //final save button4
  savefinaldata(fr: any) {
    if(this.btn==="Save"){
    console.log(this.formdatatotablearray);
    this.formdatatotablearray.forEach((ele: any, index) => {
      this.SNO.push(index + 1);
      this.matName.push(ele.material_description);
      this.matCodee.push(ele.material_code);
      this.UOM.push(ele.uom || ele.unit_of_measurment);
      this.qty.push(Number(ele.qty || ele.quantity));
    });
    let obj = {
      command: "add",
      comments: this.formdata.comments,
      date: moment(this.formdata.dateee).format("YYYY-MM-DD"),
      time: this.formdata.time,
      company_name: this.formdata.companyname,
      document_type: this.formdata.documenttype,
      document_number: this.formdata.documentnumber,
      gate_id: this.formdata.gateid,
      guard_name: this.formdata.guardname,
      carrier_name: this.formdata.carriername,
      vehicle_number: this.formdata.vehiclenumber,
      carrier_contact_number: this.formdata.carriercontactnumber,
      vendor_name: this.formdata.vendorname,
      remarks: this.formdata.remarks,
      document_date: this.formdata.documentdate,
      material_description: this.matName,
      material_code: this.matCodee,
      unit_of_measurment: this.UOM,
      quantity: this.qty,
      // material_code: this.matCode,
    };
    this.custservice.addGateOutwardData(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        Swal.fire({
          text: res["message"],
          title: res["reference"],
          icon: "success",
          // title: res['reference'],
          width: 500,
        });
        fr.reset();
        this.formdatatotablearray = [];
        this.dataSource.data = [];
        this.SNO = [];
        this.matName = [];
        this.UOM = [];
        this.qty = [];
        this.matCodee=[]
        this.getData();
        this.getlogdata()
        this.resultgonumber=res['reference']
        if(this.fileUploadUrlsgo.length > 0){
          this.uploadselectedfiles()
        }
      } else {
        this.alertcall.showWarning("Accepted", res["message"]);
        this.SNO = [];
        this.matName = [];
        this.UOM = [];
        this.qty = [];
        this.matCodee=[]
      }
    });
  }else{
    this.formdatatotablearray.forEach((ele: any, index) => {
      this.SNO.push(index + 1);
      this.matName.push(ele.material_description);
      this.matCodee.push(ele.material_code);
      this.UOM.push(ele.uom ||ele.unit_of_measurment);
      this.qty.push(Number(ele.qty || ele.quantity));
    });
    let obj = {
      reason: this.editModel.reason,
      command: "edt",
      number:this.editednumber,
      comments: this.formdata.comments,
      date: moment(this.formdata.dateee).format("YYYY-MM-DD"),
      time: this.formdata.time,
      company_name: this.formdata.companyname,
      document_type: this.formdata.documenttype,
      document_number: this.formdata.documentnumber,
      gate_id: this.formdata.gateid,
      guard_name: this.formdata.guardname,
      carrier_name: this.formdata.carriername,
      vehicle_number: this.formdata.vehiclenumber,
      carrier_contact_number: this.formdata.carriercontactnumber,
      vendor_name: this.formdata.vendorname,
      remarks: this.formdata.remarks,
      document_date: this.formdata.documentdate,
      material_description: this.matName,
      material_code: this.matCodee,
      unit_of_measurment: this.UOM,
      quantity: this.qty,
      // material_code: this.matCode,
    };
    this.custservice.addGateOutwardData(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        Swal.fire({
          text: res["message"],
          title: res["reference"],
          icon: "success",
          // title: res['reference'],
          width: 500,
        });
        fr.reset();
        this.formdatatotablearray = [];
        this.dataSource.data = [];
        this.SNO = [];
        this.matName = [];
        this.UOM = [];
        this.qty = [];
        this.matCodee=[]
        this.getData();
        this.getlogdata()
        this.editModel.reason=""
        this.resultgonumber=this.editednumber
        if(this.fileUploadUrlsgo.length > 0){
          this.uploadselectedfiles()
        }
        this.btn="Save"
      } else {
        this.alertcall.showWarning("Accepted", res["message"]);
        this.SNO = [];
        this.matName = [];
        this.UOM = [];
        this.qty = [];
        this.matCodee=[]
      }
    });
  }
  }

  // add button to open gate outward dialogbox5
  addgateoutward(data: any) {
    this.dialog.open(data, {
      width: "1000px",
    });
    // this.getmasterdata();
  }

  // close gateoutward dialogbox6
  closedialogdata() {
    this.dialog.closeAll();
  }

  // add the binded data in dialogbox to table7
  binddatatotable(form: any) {
    this.dialogdata["material_code"] = this.materialCODE;
    this.dialogdata["material_description"] = this.materialNAME;
    console.log(this.dialogdata);

    // this.editDATAA=true;
    this.formdatatotablearray.push(this.dialogdata);
    console.log(this.formdatatotablearray);

    this.dataSource.data = this.formdatatotablearray;
    console.log(this.dataSource.data);
    this.dialogdata = {};
    // this.smsdata = "";
    this.dialog.closeAll();
  }
  // dropdown for description
  getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
      key: this.selectedmaterial || this.selectedmaterialedit,
    };
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data;
    });
  }
  filterdata(ev: any) {
    console.log(ev.target.value);
    this.selectedmaterial = ev.target.value;
    if (this.selectedmaterial.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterial) {
      this.getmasterdata();
    }
  }
  selectedmaterialuom() {
    console.log(this.dialogdata.matcode);
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.dialogdata.matcode) {
        this.dialogdata.uom = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });

    // this.getSMSdata();
  }
  // selectedqty() {
  //   if (this.dialogdata.qty > this.dialogdata.reqqty) {
  //     this.alertcall.showWarning(
  //       "Accepted",
  //       "Quantity Not More Than Request Quantity"
  //     );
  //   }
  //   console.log(this.dialogdata.qty);
  // }

  // edit gateoutward dialogbox and update in table8
  editgateoutwarddata(row1: any, index: any, data: any) {
   // this.editDATAA=false 
    console.log(row1);
    this.selectedIndex = this.formdatatotablearray.indexOf(row1);
    console.log(this.selectedIndex);
    this.dialog.open(data, {
      width: "1000px",
    });
    this.masterData.forEach((ele: any) => {
      if (ele.description === row1.material_description) {
        this.systemref = ele.system_reference_1;
        console.log(this.systemref);
        
      }
    });
    this.editeddialogdata.matcode = this.systemref || row1.matcode
    this.editeddialogdata.uom = row1.uom || row1.unit_of_measurment;
    this.editeddialogdata.qty = row1.qty || row1.quantity;
 }

  // close edited dialog box9
  closeeditdialogdata() {
    this.dialog.closeAll();
  }
  //edit the table content and update the editicon10
  editbindedDatatotable() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.editeddialogdata.matcode) {
        this.editeddialogdatamatcode = el.code;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    this.editeddialogdata["material_code"] = this.materialCODE;
    this.editeddialogdata["material_description"] = this.materialNAME;
    this.formdatatotablearray.splice(
      this.selectedIndex,
      1,
      this.editeddialogdata
    );
    this.dataSource.data = this.formdatatotablearray;
    console.log(this.dataSource.data);

    this.formdatatotablearray[this.selectedIndex].matcode =
      this.editeddialogdatamatcode;

    this.editeddialogdata = {};
    // this.smsdata = "";
    this.dialog.closeAll();
  }

  // delete the row data in the table11
  deleterowData(index: any) {
    console.log(index);
    this.formdatatotablearray.splice(index, 1);
    this.dataSource.data = this.formdatatotablearray;
    this.finaldataarray = [];
    // console.log(this.dataSource.data)
    // this.dataSource.data = new MatTableDataSource(this.count);
  }
  editfilterdata(ev: any) {
    this.selectedmaterialedit = ev.target.value;
    if (this.selectedmaterialedit.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterialedit) {
      this.getmasterdata();
    }
  }
  selectedmaterialuomedit() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.editeddialogdata.matcode) {
        this.editeddialogdata.uom = el.uom_1;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    // this.getSMSdata();
    console.log(this.editeddialogdatamatcode, this.editeddialogdatamatdes);
  }
  keyPressNumbers(evt: any) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  onSelectionChange(ev: any) {}
  getData() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custservice.getGateOutwardData(obj).subscribe((res: any) => {
      console.log(res);

      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }
  deleteItem(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
      // scrollStrategy: new NoopScrollStrategy()
    });
    this.deleteNumber = rw.number;
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }
  deleteFile() {
    let obj = {
      command: "del",
      number: this.deleteNumber,
      reason: this.deletemodel.reason
    };
    this.custservice.deleteGateOutwardData(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.deletemodel.reason=""
        this.getData();
        this.getlogdata()
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
  onSelected(){
    console.log(this.formdata.documenttype);
    if(this.formdata.documenttype==='goodsissue'){
      let obj={
        "command":"doc",
        "key":"GoodsIssue"
      }
  this.custservice.getGateOutwardGIList(obj).subscribe((res:any)=>{
    console.log(res);
    this.selecteddocnumbers=res.data
    this.formdata.documentnumber=""
    
  })

    }else{
      let obj={
        "command":"doc",
       
        "key" : "OutGatePass"
      }
  this.custservice.getGateOutwardData(obj).subscribe((res:any)=>{
    this.selecteddocnumbers=res.data
    this.formdata.documentnumber=""
   
    })
  }
  }
  onSelecteddocnumber(){
    if(this.formdata.documenttype==='goodsissue'){
      let obj={
      "command":"mat",
      "number":this.formdata.documentnumber
      }
 
      this.custservice.addgoodsissue(obj).subscribe((res:any)=>{
        this.resdata=res.data[0]
        this.formdatatotablearray=res.data
        this.dataSource.data = this.formdatatotablearray;
      this.formdata.companyname=this.resdata.company_name,
      this.formdata.vendorname=this.resdata.contractor_name
        
      })
    }else{
      let obj={
        "command":"mat",
        "number":this.formdata.documentnumber
        }
   
        this.custservice.addgoodstransfer(obj).subscribe((res:any)=>{
          this.resdata1=res.data[0]
        this.formdatatotablearray=res.data
        this.dataSource.data = this.formdatatotablearray;
      this.formdata.companyname=this.resdata1.company_name,
      this.formdata.vendorname=this.resdata1.to_company_name
          
        }) 
    }
  }
  editgodata(data:any,dialog:any){
    this.dialog.open(dialog,{
      width:"400px"
    })
    this.editednumber=data.number
  }
  saveeditreason(){
    this.initialdata=false;
  this.editdata=true;
    let obj={
      command: "mat",
      // field: "number",
      key: this.editednumber,
    }
    this.custservice.addGateOutwardData(obj).subscribe((res:any)=>{
      this.dialog.closeAll()
      console.log(res);
     this.editdataa=res.data[0]
     this.formdatatotablearray=res.data
     this.dataSource.data=this.formdatatotablearray
     this.formdata.comments=this.editdataa.comments,
     this.formdata.dateee=moment(this.editdataa.date).format("YYYY-MM-DD"),
     this.formdata.time=this.editdataa.time,
      this.formdata.companyname=this.editdataa.company_name,
     this.formdata.documenttype=this.editdataa.document_type,
    this.formdata.documentnumber=this.editdataa.document_number,
   this.formdata.gateid=this.editdataa.gate_id,
    this.formdata.guardname=this.editdataa.guard_name,
    this.formdata.carriername=this.editdataa.carrier_name,
    this.formdata.vehiclenumber=this.editdataa.vehicle_number,
     this.formdata.carriercontactnumber=this.editdataa.carrier_contact_number,
    this.formdata.vendorname=this.editdataa.vendor_name,
     this.formdata.remarks=this.editdataa.remarks,
    this.formdata.documentdate=moment(this.editdataa.document_date).format("YYYY-MM-DD"),   
      this.demo1TabIndex=0;
      this.btn="Update"
    
    })
  }
}
