import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import Swal from 'sweetalert2';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-modelinvoice',
  templateUrl: './modelinvoice.component.html',
  styleUrls: ['./modelinvoice.component.scss']
})
export class ModelinvoiceComponent implements OnInit {
  invoicenumber: any;
  logdata: any;

  constructor(
    private custservice:CustomerService,private dialog: MatDialog,
    private alertcall: AlertCallsService,public overlay: Overlay,
    private router:Router,private route:ActivatedRoute
  ) { }



  formdata:any={}
  date:any
  contractor:any;
  contractorData:any;
  companyname:any
  companyData:any
  invoicedate:any
  WOdata:any
  wonumber:any
  wodate:any
  dialogdataArray:any[]=[]
  selectedIndex:any
  dialogdata:any={}
  editdialogdata:any={}
  description:any
  servicemasterData:any
  selectedservicemaster:any
  selectedservicemasteredit:any
  quantity:any
  unitprice:any
  taxdesc:any
  taxprcnt:any
  taxData:any
  selectedtaxmaster:any
  editselectedtaxmaster:any
  comments:any
  pageIndex:any=1
  pageSize:any=10
  modelInvoicelist:any
  reaData:any
  totalRecords:any
  deleteNumber:any
  deletemodel:any={}
  SNO:any[]=[]
  Description:any[]=[]
  UOM:any[]=[]
  Quantity:any[]=[]
  UnitPrice:any[]=[]
  TaxDesc:any[]=[]
  TaxPrcnt:string[]=[]
  Comments:any[]=[]
  btnsaveupdate="Save"
  editedadata:any
  editModel:any={}
  EDITdata : any
  finaldataarray:any
  demo1TabIndex: any = 0;
  unit_of_measurment:any
  unit_price:any
  tax_description:any
  tax_percent:any


  dataSource = new MatTableDataSource();
  dataSourceList = new MatTableDataSource


  displayedColumns = [
    "sno", "description", "uom", "quantity", "unitprice", "taxdesc", "tacprcnt", "comments", "action"
  ]
  displayedColumnsList = [
    "sno", "date", "contractorname", "serial", "cmpnyname", "number", "invoicedate", "wonumber", "wodate", "description",
    "uom", "quantity", "unit_price", "basic_price", "tax_description", "tax_percent", "tax_value", "total_price", "comments", "action"
  ]



  ModelInvoicelist() {
    let obj = {
      "command": "lst",
    }
    this.custservice.getWOlistData(obj).subscribe((res: any) => {
     this.modelInvoicelist = res.data
    })
  }
  getmodelinvoicelistlistData() {
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex
    }
    this.custservice.getMIlistData(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }
    })
    console.log(this.totalRecords);
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getworkorderlistData()
  }
  getcontractorData(){
    let obj={
      "command" : "lst"
    }
    this.custservice.getcontractormasterdata(obj).subscribe((res:any)=>{
      this.contractorData = res.data
    })
  }
  getcompanydata() {
    let obj = {
      "command": "lst",
      lmt:100000,
      pid:1
    };
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data;
    });
  }
  getworkorderlistData() {
    let obj = {
      "command": "lst",
    }
    this.custservice.getWOlistData(obj).subscribe((res: any) => {
     console.log(res)
     this.WOdata = res.data
    })
  }
  addmodelinvoicedata(data: any) {
    this.dialog.open(data, {
      width: '1100px'
    })
    this.dialogdata={}
  }
  deleterowData(index: any) {
    console.log(index)
    this.dialogdataArray.splice(index, 1);
    this.dataSource.data = this.dialogdataArray
  }

  closedialogdata() {
    this.dialog.closeAll();
  } 
  getsrvcMasterData() {
    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedservicemaster || this.selectedservicemasteredit
    }
    this.custservice.getServiceMasterData(obj).subscribe((res: any) => {
      console.log(res.data)
      this.servicemasterData = res.data
      console.log(this.servicemasterData)

    })
  }
  filterdata(ev: any) {
    console.log(ev.target.value);
    this.selectedservicemaster = ev.target.value
    if (this.selectedservicemaster.length > 2) {
      this.getsrvcMasterData()
    }
    if (!this.selectedservicemaster) {
      this.getsrvcMasterData()
    }
  }
  selectedserviceuom() {
    console.log(this.dialogdata.description)
    this.servicemasterData.forEach((ele: any) => {
      if (ele.description == this.dialogdata.description) {
        this.dialogdata.unit_of_measurment = ele.unit_of_measurment
      }
    });
    console.log(this.dialogdata.unit_of_measurment)
  }
  filterdataedit(ev: any) {
    console.log(ev.target.value);
    this.selectedservicemasteredit = ev.target.value
    if (this.selectedservicemasteredit.length > 2) {
      this.getsrvcMasterData()
    }
    if (!this.selectedservicemasteredit) {
      this.getsrvcMasterData()
    }
  }
  selectedserviceuomedit() {
    console.log(this.editdialogdata.description)
    this.servicemasterData.forEach((ele: any) => {
      if (ele.description == this.editdialogdata.description) {
        this.editdialogdata.unit_of_measurment = ele.unit_of_measurment
      }
    });
    console.log(this.dialogdata.unit_of_measurment)
  }
  getTaxlistdata(){
    let obj={
      "command" : "lst",
      "key": this.selectedtaxmaster || this.editselectedtaxmaster

    }
    this.custservice.gettaxlistdata(obj).subscribe((res:any)=>{
      this.taxData = res.data
      console.log(this.taxData)
    })
  }
  filtetaxdata(ev: any) {
    console.log(ev.target.value);
    this.selectedtaxmaster = ev.target.value
    if (this.selectedtaxmaster.length > 2) {
      this.getTaxlistdata()
    }
    if (!this.selectedtaxmaster) {
      this.getTaxlistdata()
    }
  }
  selectedtaxpercent() {
    console.log(this.dialogdata.tax_description)
    this.taxData.forEach((ele: any) => {
      if (ele.description == this.dialogdata.tax_description) {
        this.dialogdata.tax_percent = ele.percentage
       
      }
    });
  }
  editfiltetaxdata(ev: any) {
    console.log(ev.target.value);
    this.editselectedtaxmaster = ev.target.value
    if (this.editselectedtaxmaster.length > 2) {
      this.getTaxlistdata()
    }
    if (!this.editselectedtaxmaster) {
      this.getTaxlistdata()
    }
  }
  editselectedtaxpercent() {
    console.log(this.editdialogdata.tax_description)
    this.taxData.forEach((ele: any) => {
      if (ele.description == this.editdialogdata.tax_description) {
        this.editdialogdata.tax_percent = ele.percentage
       
      }
    });
  }
  deletemodelinvoicelistdata(rw: any, data: any){
    this.dialog.open(data, {
      width: '400px',
      // scrollStrategy: new NoopScrollStrategy()
    })
    this.deleteNumber = rw.number;
    console.log(this.deleteNumber)
    console.log(rw, data)
  }
  deleteItem() {
    let obj = {
      "command": "del",
      "number": this.deleteNumber,
      "reason": this.deletemodel.reason
    }
    this.custservice.deleteMIlistdata(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.deletemodel.reason=""
        this.getmodelinvoicelistlistData()
      } else {
        this.alertcall.showWarning('Error', res['message']);
      }
    })
  
  }
  validateNumber(e: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = e.target.value + String.fromCharCode(e.charCode);

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }

  binddatatotable(fr: any) {
    
    console.log(this.dialogdata);
    this.dialogdataArray.push(this.dialogdata)
    this.dataSource.data = this.dialogdataArray
    this.dialog.closeAll()
    this.dialogdata={}
  }
  editmodelinvoicedata(row1: any, index: any, data: any) {
    console.log(row1)
    this.selectedIndex = this.dialogdataArray.indexOf(row1)
    console.log(row1)
    this.dialog.open(data, {
      width: '1000px'
    })
    this.editdialogdata.description = row1.description
    this.editdialogdata.unit_of_measurment = row1.unit_of_measurment || row1.UOM
    this.editdialogdata.quantity = row1.quantity
    this.editdialogdata.unit_price = row1.unit_price
    this.editdialogdata.tax_description = row1.tax_description
    this.editdialogdata.tax_percent = row1.tax_percent
    this.editdialogdata.comments = row1.comments
  }
  editbindedDatatotable() {
    this.dialogdataArray.splice(this.selectedIndex, 1, this.editdialogdata);
    this.dataSource.data = this.dialogdataArray
    console.log(this.dataSource.data);
    this.editdialogdata = {}
    this.dialog.closeAll();
  }

  savefinaldata(fr: any){
    if(this.btnsaveupdate === "Save"){
      console.log(this.dialogdataArray);
      this.dialogdataArray.forEach((val: any, index) => {
        this.SNO.push(index + 1),
        this.Description.push(val.description),
        this.UOM.push(val.unit_of_measurment),
        this.Quantity.push(Number(val.quantity)),
        this.UnitPrice.push(Number(val.unit_price)),
        this.TaxDesc.push(val.tax_description),
        this.TaxPrcnt.push(val.tax_percent)
        this.Comments.push(val.comments)
      })
      let obj = {
        "command" : "add",
        "date" : moment(this.formdata.date).format("YYYY-MM-DD"),
        "contractor_name" : this.formdata.contractor,
        "company_name" : this.formdata.companyname,
        "invoice_date" : this.formdata.invoicedate,
        "work_order_number" : this.formdata.wonumber,
        "work_order_date" : this.formdata.wodate,
        "description" : this.Description,
        "unit_of_measurment" : this.UOM,
        "quantity" : this.Quantity,
        "unit_price" : this.UnitPrice,
        "tax_description" : this.TaxDesc,
        "tax_percent" : this.TaxPrcnt,
        "comments" : this.Comments
      }
      this.custservice.addmodelinvoicedata(obj).subscribe((res:any)=>{
        console.log(obj);
        console.log(res)
        if (res && res['status_code'] == "200") {
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            width: 500,
          });
          fr.reset();
          this.dataSource.data=[]
          this.SNO=[]
          this.Description=[]
          this.UOM=[]
          this.Quantity=[]
          this.UnitPrice=[]
          this.TaxDesc=[]
          this.TaxPrcnt=[]
          this.Comments=[]
        } else {
          this.alertcall.showWarning('Error', res['message']);
          this.SNO=[]
          this.Description=[]
          this.UOM=[]
          this.Quantity=[]
          this.UnitPrice=[]
          this.TaxDesc=[]
          this.TaxPrcnt=[]
          this.Comments=[]
        }
      })
    }
    if(this.btnsaveupdate === "Update"){
      console.log(this.dialogdataArray);
      this.dialogdataArray.forEach((val: any, index) => {
        this.SNO.push(index + 1),
          this.Description.push(val.description),
          this.UOM.push(val.uom),
          this.Quantity.push(Number(val.quantity)),
          this.UnitPrice.push(Number(val.unit_price)),
          this.TaxDesc.push(val.tax_description),
          this.TaxPrcnt.push(val.tax_percent)
          this.Comments.push(val.comments)
      })
      let obj = {
        "command" : "edt",
        "date" : moment(this.formdata.date).format("YYYY-MM-DD"),
        "contractor_name" : this.formdata.contractor,
        "company_name" : this.formdata.companyname,
        "invoice_date" : this.formdata.invoicedate,
        "work_order_number" : this.formdata.wonumber,
        "work_order_date" : this.formdata.wodate,
        "description" : this.Description,
        "unit_of_measurment" : this.UOM,
        "quantity" : this.Quantity,
        "unit_price" : this.UnitPrice,
        "tax_description" : this.TaxDesc,
        "tax_percent" : this.TaxPrcnt,
        "comments" : this.Comments,
        "number": this.editedadata
      }
      this.custservice.addmodelinvoicedata(obj).subscribe((res:any)=>{
        console.log(obj);
        console.log(res)
        if (res && res['status_code'] == "200") {
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            width: 500,
          });
          fr.reset();
          this.dataSource.data=[]
          this.SNO=[]
          this.Description=[]
          this.UOM=[]
          this.Quantity=[]
          this.UnitPrice=[]
          this.TaxDesc=[]
          this.TaxPrcnt=[]
          this.Comments=[]
        } else {
          this.alertcall.showWarning('Accepted', res['message']);
          this.SNO=[]
          this.Description=[]
          this.UOM=[]
          this.Quantity=[]
          this.UnitPrice=[]
          this.TaxDesc=[]
          this.TaxPrcnt=[]
          this.Comments=[]
     
        }
      })
    }

    this.btnsaveupdate = "Save"
    
  }
  editcompleteData(data:any,dialog:any){
    console.log(data)
    this.dialog.open(dialog,{
      width:"400px"
    })
    this.editedadata = data.number
  }
  saveeditreason(){
    let obj = {
      "command": "mat",
      "key": this.editedadata,
      "reason": this.editModel.reason
    }
    this.custservice.getMImatData(obj).subscribe((res:any)=>{
      this.dialog.closeAll()
      this.editModel.reason=""
      console.log(res)
      console.log(res.data)
      this.EDITdata = res.data[0]
      console.log(this.EDITdata)
      this.dialogdataArray = res.data
      console.log(this.dialogdataArray);      
      this.dataSource.data = res.data
      console.log(this.dataSource.data)
      this.btnsaveupdate = "Update"
      this.demo1TabIndex = 0
      this.formdata.date = moment(this.EDITdata.date).format("YYYY-MM-DD")
      this.formdata.contractor = this.EDITdata.contractor_name
      this.formdata.companyname = this.EDITdata.company_name
      this.formdata.invoicedate = moment(this.EDITdata.invoice_date).format("YYYY-MM-DD")
      this.formdata.wonumber = this.EDITdata.work_order_number
      this.formdata.wodate = moment(this.EDITdata.work_order_date).format("YYYY-MM-DD")
      console.log(this.formdata.contractor, this.formdata.wonumber)

    })
  }
  printmodelinvoice(data:any){
    console.log(data.number);   
    this.router.navigate(['/qsd/printinv'],{ queryParams: {'invoicenumber': data.number}})
    
      }

    //   openfileuploadmodel(data:any,row1:any){
    //     this.dialog.open(data,{
    //       width:'800px'
    //     })
    //     this.invoicenumber=row1.number
    //     this.getexistingfiles()
    //   }
    //   getexistingfiles(){
    //     let params = new HttpParams();
    //     params = new HttpParams()
    //      .set("document_number", this.qsdservicenumber,)
    //      .set( "document_type","Qsd Services")
    //     this.custservice.getexistingfies(params).subscribe((res:any)=>{
    //   if(res&&res['status_code']=='200'){
    //   this.filedata=res.data
    //   this.createNewFile.fileName=''
    //   }else{
    //   this.filedata=''
    //   console.log(this.filedata);
    //   }
    //     })
    //   }
    //   viewDoc(file: any) {
    //     const url = this.imageUrl + '/' + file.file_path;
    //     window.open(url, '_blank');
    //   }
    //   deleterowfile(row:any,data:any){
    //     this.deleteid=data.id
    //     this.dialogRef=this.dialog.open(row,{
    //       width:"400px"
    //     })
    //   }
    //   deleteexistingfile(){ 
    //     let params=new HttpParams()
    //     params=new HttpParams()
    //     .set("document_number", this.qsdservicenumber,)
    //      .set( "document_type","Qsd Services")
    //      .set( "id",this.deleteid)
    //      this.custservice.deletefiles(params).subscribe((res:any)=>{
    //       if(res&&res['status_code']=='200'){
    //         this.alertcall.showSuccess("Accepted","File Deleted Successfully")
    //         this.getexistingfiles()
    //         this.dialogRef.close()
    //       }else{
    //         this.alertcall.showWarning("Error",res['message'])
           
            
           
    //       }
    //      })
    //   }
    //   uploadWbsFile(fileInput: any) {
    //     if (
    //       fileInput &&
    //       fileInput.target &&
    //       fileInput.target.files &&
    //       fileInput.target.files.length > 0
    //     ) {
    //       this.fileUploadUrls = fileInput.target.files;
    //       for (const file of this.fileUploadUrls) {
    //         this.filenamearray.push(file.name)
    //       }
          
    //     }
    //     console.log(this.fileUploadUrls);
    //     const postData = new FormData();
    //     postData.append("document_type","Qsd Services");
    //     postData.append("document_number",this.qsdservicenumber);
    //     for (const file of this.fileUploadUrls) {
    //       postData.append("doc",file)
    //     }
       
    //     this.custservice.addfileupload(postData).subscribe((res:any)=>{
    //   if(res&&res['status_code']=='200'){
    //   this.alertcall.showSuccess("Accepted",res['message'])
    //   this.getexistingfiles()
    //   this.filenamearray=[]
    //   this.fileUploadUrls=[]
    //   }else{
    //   this.alertcall.showWarning("Error",res['message'])
    //   }
    //     })
    //   }
    //   uploadqsdfiles(fileInput: any) {
    //     if (
    //       fileInput &&
    //       fileInput.target &&
    //       fileInput.target.files &&
    //       fileInput.target.files.length > 0
    //     ) {
    //       this.fileUploadUrlsqsd = fileInput.target.files;
    //       for (const file of this.fileUploadUrlsqsd) {
    //         this.filenamearray1.push(file.name)
    //         this.selectedfiles.push(file)
    //       }
    //     }
    //   //  this.uploadingselectedfiles()
    //   }
    //   uploadingselectedfiles(){
    //     const postData = new FormData();
    //     postData.append("document_type","Qsd Services");
    //     postData.append("document_number",this.resultqsdnumber);
    //     for (const file of this.selectedfiles) {
    //       postData.append('doc', file);
    //     }
    //     // postData.append("doc",this.fileUploadUrlspo)
        
    //     this.custservice.addfileupload(postData).subscribe((res:any)=>{
    // if(res&&res['status_code']=='200'){
    // // this.alertcall.showSuccess("Accepted",res['message'])
    // this.fileUploadUrlsqsd=[]
    // this.selectedfiles=[]
    // this.filenamearray1=[]
    // }else{
    //   // this.alertcall.showWarning("Error",res['message'])
    // }
    //     })
    //   }
  ngOnInit(): void {
    this.getsrvcMasterData()
    this.getTaxlistdata()
    this.getcontractorData();
    this.getcompanydata();
    this.getmodelinvoicelistlistData()
    this.getworkorderlistData()
    this.getlogdata()
    this.route.queryParams.subscribe((params:any) => {
      if(params.tab=='notifications'){
        this.demo1TabIndex=1;
        console.log(params);
        
      }
    else{
      this.demo1TabIndex=0;
    }
      })
  }
  getlogdata(){
    let obj={
      command:"log",
      key:"ModelInvoice"
    }
    this.custservice.getActivityLog(obj).subscribe((res:any)=>{
      if(res.log.length > 0){
      this.logdata=res.log
      }
    })
  }
}

