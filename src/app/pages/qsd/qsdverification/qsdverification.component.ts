import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-qsdverification',
  templateUrl: './qsdverification.component.html',
  styleUrls: ['./qsdverification.component.scss']
})
export class QsdverificationComponent implements OnInit {
  dataSource = new MatTableDataSource();
  dataSource1=new MatTableDataSource()
  dataSourcemain = new MatTableDataSource();
  displayedColumns: any[] = [
    'sno',
    'material_code',
    'material_description',
    'unit_of_measurement',
    'invoice_quantity',
    'received_quantity',
    'shortage_quantity',
    'excess_quantity',
    'unit_price',
    'discount_percent',
    'discount_value',
    'basic_price',
    'tax_description',
    'tax_percent',
    'tax_value',
    'freight_split',
    'basic_freight',
    'freight_tax_desc',
    'freight_tax_percent',
    'freight_tax_value',
    'total_freight',
    'other_tcharges_desc',
    'other_tcharges_value',
    'other_tcharges_split',
    'other_tax_percent',
    'other_tax_value',
    'other_tax_split',
    'total_price',
    'accepted_qty',
    'miscellaneous_charges_description',
    'miscellaneous_charges_value',
    'miscellaneous_charges_split',
    'total_value',
    'rejected_qty',
    // 'action'
      
    ];
    displayedColumns1: any[] = [
      'sno',
      'purchase_order_number',
      'grn_number',
      'ra_bill_number',
      'start_date',
      'completion_date',
      'action'
        
      ];
model1:any={}
model:any={}
model2:any={}
grnnumber1:any;
ponumber:any;
  dmrDATA: any;
  materialRECEIPTDATA: any;
  materialcode: any;
  MATDATA: any[]=[]
  qcqty: any=0
  recqty: any=0
  accqty: any=0
  materialCODE:any[]=[]
  matDESCRIPTION:any[]=[]
  UOM:any[]=[]
  SNO:any[]=[]
  QCQTY:any[]=[]
  AcceptedQTY:any[]=[]
  RejectedQTY:any[]=[]
  remarks: any;
  REMARKS:any[]=[]
  qcQuantity: any;
  itemremarks: any;
  pageIndex: any=1;
  pageSize:any=10;
  reaData: boolean;
  totalRecords:any=0
  loadingRecords:any=false;
  deletedItem: any;
  finalarray:any[]=[]
  selectedIndex:any=-1
  QC_QTY:any[]=[]
  ACC_QTY:any[]=[]
  REJ_QTY:any[]=[]
  ITEMREMARKS:any[]=[]
  selecteddmr1: any;
  goodsreceptdata: any;
  selectedgrn1: any;
  checklists:any=[{name:"Yes" ,id:"true"},{name:"No",id:"false"}]
  selectedgrn2: any;
  selectedgrnvalue: any;
  selectedmaterial1: any;
  masterData: any;
  selectedstorage: any;
  storageData: any;
  poDATA: any;
  selectedpovalue: any;
  qsdverificationdata: any;
  QSDDATA: any;
  matCode:any[]=[];
  matName:any[]=[]

  storageLocation:any[]=[]
  valutionType:any[]=[]
  InvoiceQuantity:any[]=[]
  RecQTY:any[]=[]
  shrQTY:any[]=[]
  excsQTY:any[]=[]
  unitPrice:any[]=[]
  discPERCENT:any[]=[]
  discVALUE:any[]=[]
  basicPRICE:any[]=[]
  taxDESC:any[]=[]
  taxPERCEN:any[]=[]
  taxVALUE:any[]=[]
  freightsplit:any=[]
  basicfreight:any[]=[]
  freighttaxdesc:any[]=[]
  freighttaxpercent:any[]=[]
  freighttaxvalue:any[]=[]
  totalfreight:any[]=[]
  otherchargesdesc:any[]=[]
  otherchargesvalue:any[]=[]
  otherchargessplit:any[]=[]
  othertaxpercent:any[]=[]
  othertaxvalue:any[]=[]
  othertaxsplit:any[]=[]
  totalprice:any[]=[]
  acceptedqty:any[]=[]
  miscellaneouschargesdesc:any[]=[]
 miscellaneouschargesvalue:any[]=[]
  miscellaneouschargessplit:any[]=[]
  totalvalue:any[]=[]
  rejectedqty:any[]=[]
  deleteItemgrnnumber: any;
  fileUploadUrls: any[]=[]
  createNewFile: any = {};
  qsdsupplynumber: any;
  filedata: any;
  imageUrl=environment.base_url
  deleteid: any;
  dialogRef:any=null
  filenamearray:any[]=[]
  filenamearray1:any[]=[]
  selectedfiles:any[]=[]
  fileUploadUrlsqsd: any[]=[]
  resultqsdnumber: string | Blob;
  editednumber: any;
  editdataa: any;
  demo1TabIndex:any=0
  btn:any="Save"
  EDITdata: any;
  initialdata:any=false;
  logdata: any;
  deletemodel:any={}
  constructor(public custservice:CustomerService,private dialog:MatDialog,
    private alertcall:AlertCallsService,private injector:Injector) { 
      this.dialogRef = this.injector.get(MatDialogRef, null);
    }

  ngOnInit(): void {
    this.model1.podate=moment(new Date()).format("YYYY-MM-DD")
    this.model1.rabilldate=moment(new Date()).format("YYYY-MM-DD")
    this.model1.startdate=moment(new Date()).format("YYYY-MM-DD")
    this.model1.completiondate=moment(new Date()).format("YYYY-MM-DD")
    this.model1.amendment_date=moment(new Date()).format("YYYY-MM-DD")

    this.getMaterialdata()
    this.getdata()
    this.getgoodslist()
    this.getmasterdata()
    this.getstoragelocData()
   this.getpodataData()
   this.getlogdata()
  }
  getlogdata(){
    let obj={
      command:"log",
      key:"QsdSupply"
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
    this.qsdsupplynumber=row1.grn_number
    this.getexistingfiles()
  }
  getexistingfiles(){
    let params = new HttpParams();
    params = new HttpParams()
     .set("document_number", this.qsdsupplynumber,)
     .set( "document_type","QSD Supply")
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
    .set("document_number", this.qsdsupplynumber,)
     .set( "document_type","QSD Supply")
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
      for (const file of this.fileUploadUrls) {
        this.filenamearray.push(file.name)
      }
      
    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type","QSD Supply");
    postData.append("document_number",this.qsdsupplynumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc",file)
    }
    
    let obj={
      "document_type":"QSD Supply",
      "document_number":this.qsdsupplynumber,
      "doc":this.fileUploadUrls
    }
    this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
this.alertcall.showSuccess("Accepted",res['message'])
this.getexistingfiles()
this.filenamearray=[]
this.fileUploadUrls=[]
}else{
  this.alertcall.showWarning("Error",res['message'])
}
    })
  }
  uploadqsdfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsqsd = fileInput.target.files;
      for (const file of this.fileUploadUrlsqsd) {
        this.filenamearray1.push(file.name)
        this.selectedfiles.push(file)
      }
    }
  //  this.uploadingselectedfiles()
  }
  uploadingselectedfiles(){
    const postData = new FormData();
    postData.append("document_type","Qsd Supply");
    postData.append("document_number",this.resultqsdnumber);
    for (const file of this.selectedfiles) {
      postData.append('doc', file);
    }
    // postData.append("doc",this.fileUploadUrlspo)
    
    this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
// this.alertcall.showSuccess("Accepted",res['message'])
this.fileUploadUrlsqsd=[]
this.selectedfiles=[]
this.filenamearray1=[]
}else{
  // this.alertcall.showWarning("Error",res['message'])
}
    })
  }
  opengrnmodel(data:any){
    this.dialog.open(data,{
      width:"600px"
    })
  }
  setdata(){
    let obj={
      "purchase_order_number":this.ponumber,
      "grn_number":this.grnnumber1,
      "command":"set"
    }
    this.custservice.setqsd(obj).subscribe((res:any)=>{
    if(res&&res['status_code']=="200"){
      this.dialog.closeAll()
      this.ponumber=''
      this.grnnumber1=''
      this.dataSource.data=res.data
      this.QSDDATA=res.data
      this.qsdverificationdata=res.data[0]
      this.model1.grnnumber=this.qsdverificationdata.grn_number
      this.model1.purchaseordernum=this.qsdverificationdata.purchase_order_number
      this.model1.podate=moment(this.qsdverificationdata.purchase_order_date).format("YYYY-MM-DD")
      this.model1.projectname=this.qsdverificationdata.project_name
      this.model1.vendorname=this.qsdverificationdata.vendor_name
      
      // this.model1.description=this.qsdverificationdata.
      this.model1.abstractvalue=this.qsdverificationdata.abstract_value
      this.model1.invoicedate=moment(this.qsdverificationdata.invoice_date).format("YYYY-MM-DD")
      this.model1.invoicenumber=res.data.invoice_number
      this.model1.gateentrynumber=this.qsdverificationdata.gate_entry_number
      this.model1.deliverychallannumber=this.qsdverificationdata.delivery_challan
      this.model1.othertaxdesc=this.qsdverificationdata.other_tax_description
      this.model1.amendment_number=this.qsdverificationdata.amendment_number
      this.model1.amendment_value=this.qsdverificationdata.amendment_value
      this.model1.amendment_date=moment(this.qsdverificationdata.amendment_date).format("YYYY-MM-DD")

      this.model1.deliverychallan=this.qsdverificationdata.is_delivery_challan
      this.model1.gateentry=this.qsdverificationdata.is_gate_entry
      this.model1.isinvoice=this.qsdverificationdata.is_invoice
      this.model1.ismrn=this.qsdverificationdata.is_mrn
     
      this.model1.vendoepannumber=this.qsdverificationdata.pan_number
     this.model1.vendorgst=this.qsdverificationdata.gst_number
  
      this.model1.wodate=moment(this.qsdverificationdata.work_order_date).format("YYYY-MM-DD")
    }else{
      this.alertcall.showWarning("Error",res['message'])
    }
      
    })
  }
  addQSD(data:any){
    this.dialog.open(data, {
      width: '1100px',
    })
  }
  binddatatotable(fr:any){
    console.log(this.model);
    
    this.MATDATA.push(this.model)
    this.dataSource.data =  this.MATDATA
    console.log(this.dataSource.data)
    this.model = {}
    this.dialog.closeAll();
  }
  goodsreceptdatAA(ev:any){
    console.log(ev.target.value);
    this.selectedgrn1=ev.target.value
    if(this.selectedgrn1.length>2){
this.getgoodslist()
    }
  }
  goodsreceptdatAA1(ev:any){
    console.log(ev.target.value);
    this.selectedgrn2=ev.target.value
    if(this.selectedgrn2.length>2){
this.getgoodslist()
    }
  }
  getgoodslist(){
    let obj={
      "command" : "lst",
       "pid" : 1, 
       "lmt" : 100000,
       "key": this.selectedgrn1 || this.selectedgrn2
    }
    this.custservice.getgoodsreceiptlist(obj).subscribe((res:any)=>{
    
      this.goodsreceptdata=res.data
      // this.dataSourcemain.data=res.data
      // this.totalRecords=res.count
    })
  }
  onpageevent(event:any){
    this.pageIndex=event.pageIndex+1;
    this.pageSize= event.pageSize;
    this.getdata()
  }
  getdata(){
    let obj={
      "command" : "lst",
       "pid" :  this.pageIndex,
       "lmt" : this.pageSize,
    }
    this.custservice.getqsd(obj).subscribe((res:any)=>{
      console.log(res.data);
      this.reaData=false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data
      if(res.data.length==0){
       this.reaData = true
     }
    })
  }
  deleteItem(data:any,rw:any){
    this.deletedItem=data.purchase_order_number,
    this.deleteItemgrnnumber=data.grn_number
    this.dialog.open(rw,{
      width:'400px'
    })
  }
  deleteFile(){
    let obj={
      "command" : "del", 
      "purchase_order_number" : this.deletedItem,
      "grn_number":this.deleteItemgrnnumber,
      "reason": this.deletemodel.reason
    }
    this.custservice.addqsd(obj).subscribe((res:any)=>{
      if(res&&res['status_code']=="200"){
        this.alertcall.showSuccess('Accepted', res['message']);
       
        this.dialog.closeAll()
        this.deletemodel.reason=""
        this.getdata()
        this.getlogdata()
           }else{
            this.alertcall.showWarning('Accepted', res['message']);
           }
    })
      }
  getMaterialdata(){
    let obj={
      "command":"dmr",
      "lmt" : 100000,
      "pid" : 1,
      "key" : this.selecteddmr1
    }
    this.custservice.getQualityCheckdmrdata(obj).subscribe((res:any)=>{
     this.dmrDATA=res.data
      
    })
  }
  selectedgrn(){
// this.setdata()
  }
  selectedGRN1(){
    console.log(this.grnnumber1);
    
this.selectedgrnvalue=this.grnnumber1
  }
  bindgrndatatotable(fr:any){
    this.setdata()
  }
  selecteddmr(){
    console.log(this.model1.dmrnumber);
    let obj={
      command: "mat",
       key: this.model1.dmrnumber,
        field: "number"
    }
    this.custservice.  getmaterialreceiptdata(obj).subscribe((res:any)=>{
      console.log(res);
      this.MATDATA=res.data
      this.materialRECEIPTDATA=res.data[0]
      this.model1.ponumber=this.materialRECEIPTDATA.purchase_order_number
      this.model1.podate=moment(this.materialRECEIPTDATA.purchase_order_date).format("YYYY-MM-DD");
      this.model1.companyname=this.materialRECEIPTDATA.company_name
      this.model1.vendorname=this.materialRECEIPTDATA.vendor_name
      this.model1.invoicenumber=this.materialRECEIPTDATA.invoice_number
      this.materialcode=this.materialRECEIPTDATA.material_code
     
    })
  }
  selectedqcqty(ev:any){
    this.qcqty=ev.target.value

    
  }
  selectedaccqty(ev:any,data:any){
    console.log(data);
    this.accqty=ev.target.value
    if(this.accqty>((this.qcqty||data)-this.recqty)){
      console.log((this.qcqty||data)-this.recqty);
      
      this.alertcall.showWarning("Accepted","Accepted Qty Exceed The Limit")
    }
  //  this.qcQuantity=data
  }
  selectedrecqty(ev:any,data:any){
this.recqty=ev.target.value
if(this.recqty>((this.qcqty||data)-this.accqty)){
  this.alertcall.showWarning("Accepted","Rejected Qty Exceeds The Limit")
}

  }
  selectedremarks(ev:any,index:any){
    this.selectedIndex=index

    this.REMARKS.push(ev.target.value)
   console.log(this.REMARKS);
  
  
  }
  // savetabledata(){
  //   const b1: HTMLElement = window.document.getElementById("myTable")!
  //   b1?.addEventListener('click', (e: Event) => {
  //     // Do stuff.
  //     console.log(e);
  //   });
  //   // var b2=b1.rows.length
  //   // console.log(b1,b2);
    
  // }
  deleterowItem(index:any){
    this.QSDDATA.splice(index,1)
    this.dataSource.data=this.QSDDATA

    console.log(this.dataSource.data)
    
  }
  savefinaldata(fr:any){
    this.QSDDATA.forEach((ele:any,index:any)=>{
      // this.SNO.push(index+1)
      this.matCode.push(ele.material_code)
      this.matName.push(ele.material_description)
      this.UOM.push(ele.unit_of_measurment)
      this.InvoiceQuantity.push(Number(ele.invoice_quantity)||0)
      this.RecQTY.push(Number(ele.received_quantity)||0)
      this.shrQTY.push(ele.shortage_quantity ||0)
      this.excsQTY.push(ele.excess_quantity||0)
      this.unitPrice.push(Number(ele.unit_price)||0)
      this.discPERCENT.push(Number(ele.discount_percent)||0)
      this.discVALUE.push(ele.discount_value||0)
      this.basicPRICE.push(ele.basic_price||0)
      this.taxDESC.push(ele.tax_description)
      this.taxPERCEN.push(ele.tax_percent||0)
      this.taxVALUE.push(ele.tax_value||0)
      this.freightsplit.push(ele.freight_split)
      this.basicfreight.push(ele.basic_freight)
      this.freighttaxdesc.push(ele.freight_tax_description)
      this.freighttaxpercent.push(ele.freight_tax_percent)
      this.freighttaxvalue.push(ele.freight_tax_value)
      this.totalfreight.push(ele.total_freight)
      this.otherchargesdesc.push(ele.other_charges_description)
      this.otherchargesvalue.push(ele.other_charges_value)
      this.otherchargessplit.push(ele.other_charges_split)
      this.othertaxpercent.push(ele.other_tax_percent)
      this.othertaxvalue.push(ele.other_tax_value)
      this.othertaxsplit.push(ele.other_tax_split)
      this.totalprice.push(ele.total_price)
      this.acceptedqty.push(ele.accepted_quantity)
      this.miscellaneouschargesdesc.push(ele.miscellaneous_charges_description)
      this.miscellaneouschargesvalue.push(ele.miscellaneous_charges_value)
      this.miscellaneouschargessplit.push(ele.miscellaneous_charges_split)
      this.totalvalue.push(ele.total_value)
      this.rejectedqty.push(ele.rejected_quantity)
        }
       )
    
    let obj={
      "grn_number": this.model1.grnnumber,
      "purchase_order_number": this.model1.purchaseordernum,     
      "command":"add",
      "description_of_work": this.model1.description,
      "purchase_order_value": Number(this.model1.purchaseordervalue),
      "ra_bill_date": this.model1.rabilldate,
      "order_duration": this.model1.orderduration,
      "start_date": this.model1.startdate,
      "completion_date": this.model1.completiondate,
      "previous_information_location": this.model1.preinfolocation,
      "observations": this.model1.observations,
      "statutory_deductions_tds_percentage": Number(this.model1.Statutorydeductionstds),
      "statutory_deductions_labour_percentage": Number(this.model1.Statutorydeductionslabour),
      "statutory_deductions_environment_percentage": Number(this.model1.Statutorydeductions),
      "other_deductions_mobilisation_recovery_percentage": Number(this.model1.otherdeductionsmobilisation),
      "other_deductions_machinery_recovery_percentage": Number(this.model1.otherdeductionsmachinary),
      "other_deductions_retention_money_percentage":Number(this.model1.otherdeductionsretention),
      "other_deductions_royality_amount": Number(this.model1.otherdeductions),
      "material_recovery_amount": Number(this.model1.materialrecovery),
      "is_jms_logsheets_reports": this.model1.jmslogsheets,
      "is_engineering_information": this.model1.enginfo,
      "is_quality_information": this.model1.qualityinfo,
      "is_projects_information": this.model1.projectsinfo,
      "is_planning_information": this.model1.planninginfo,
      "is_p_m_information": this.model1.pminfo,
      "is_accounts_information":this.model1.accountsinfo,
      "is_cmm_information": this.model1.cmminfo,   
      "is_order_copy":this.model1.ordercopy,
      "is_amendments":this.model1.ambendments,
      "is_pbg_abg_guarantees":this.model1.pbgabg,
      "is_proforma_invoice":this.model1.profomainv,
      "is_mdcc":this.model1.mdcc,
      "is_third_party_inspection":this.model1.thirdpartyinspection,
      "debit_note":this.model1.debitnote,
      "is_no_due_acceptance":this.model1.nodueacc,
      "is_reconcillation":this.model1.reconcillatiuon,
      "is_packing_list":this.model1.packinglist,
      "is_warrenty":this.model1.iswarranty,
      "is_guarantee":this.model1.isguarantee,
      "project_name": this.model1.projectname,
      "vendor_name": this.model1.vendorname,
      "purchase_order_date": this.model1.podate,
      "invoice_number": this.model1.invoicenumber,
      "invoice_date": this.model1.invoicedate,
      "abstract_value": Number(this.model1.abstractvalue),
      "gate_entry_number": this.model1.gateentrynumber,
      "delivery_challan": this.model1.deliverychallannumber,
      "other_tax_description": this.model1.othertaxdesc,
      "material_code": this.matCode,
      "material_description": this.matName,
      "unit_of_measurment": this.UOM,
      "invoice_quantity": this.InvoiceQuantity,
      "received_quantity": this.RecQTY,
      "shortage_quantity": this.shrQTY,
      "unit_price": this.unitPrice,
      "discount_percent": this.discPERCENT,
      "discount_value": this.discVALUE,
      "basic_price": this.basicPRICE,
      "tax_description": this.taxDESC,
      "tax_percent": this.taxPERCEN,
      "tax_value": this.taxVALUE,
      "freight_split": this.freightsplit,
      "basic_freight": this.basicfreight,
      "freight_tax_description": this.freighttaxdesc,
      "freight_tax_percent": this.freighttaxpercent,
      "freight_tax_value": this.freighttaxvalue,
      "total_freight": this.totalfreight,
      "other_charges_description": this.otherchargesdesc,
      "other_charges_value": this.otherchargesvalue,
      "other_charges_split": this.otherchargessplit,
      "other_tax_percent": this.othertaxpercent,
      "other_tax_value": this.othertaxvalue,
      "other_tax_split": this.othertaxsplit,
      "total_price": this.totalprice,
      "accepted_quantity": this.acceptedqty,
      "miscellaneous_charges_description": this.miscellaneouschargesdesc,
      "miscellaneous_charges_value": this.miscellaneouschargesvalue,
      "miscellaneous_charges_split": this.miscellaneouschargessplit,
      "total_value": this.totalvalue,
      "excess_quantity": this.excsQTY,
      "rejected_quantity": this.rejectedqty,
      "pan_number": this.model1.vendoepannumber,
      "gst_number": this.model1.vendorgst,
      "amendment_number": Number(this.model1.amendment_number),
      "amendment_date": this.model1.amendment_date,
      "amendment_value": Number(this.model1.amendment_value),
      "is_invoice": this.model1.isinvoice,
      "is_gate_entry": this.model1.gateentry,
      "is_delivery_challan": this.model1.deliverychallan,
      "is_mrn": this.model1.ismrn
      
  }
  this.custservice.addqsd(obj).subscribe((res:any)=>{
    console.log(res);
    if(res&&res['status_code']=='200'){
      // this.alertcall.showSuccess('Accepted', res['message']);
      Swal.fire({
        text: res['message'],
        title: res['reference'],
         icon: 'success',
        // title: res['reference'],
        width: 500,
        });
      this.QSDDATA=[]
      this.dataSource.data=[]
      fr.reset()
      this.matCode=[]
      this.matName=[]
      this.UOM=[]
      this.InvoiceQuantity=[]
      this.RecQTY=[]
      this.shrQTY=[]
      this.excsQTY=[]
      this.unitPrice=[]
      this.discPERCENT=[]
      this.discVALUE=[]
      this.basicPRICE=[]
      this.taxDESC=[]
      this.taxPERCEN=[]
      this.taxVALUE=[]
      this.freightsplit=[]
      this.basicfreight=[]
      this.freighttaxdesc=[]
      this.freighttaxpercent=[]
      this.freighttaxvalue=[]
      this.totalfreight=[]
      this.otherchargesdesc=[]
      this.otherchargesvalue=[]
      this.otherchargessplit=[]
      this.othertaxpercent=[]
      this.othertaxvalue=[]
      this.othertaxsplit=[]
      this.totalprice=[]
      this.acceptedqty=[]
      this.miscellaneouschargesdesc=[]
      this.miscellaneouschargesvalue=[]
      this.miscellaneouschargessplit=[]
      this.totalvalue=[]
      this.rejectedqty=[]
      // this.model1.ponumber=null
      // this.model1.podate=null
      // this.model1.companyname=null
      // this.model1.vendorname=null
      // this.model1.invoicenumber=null
      // this.materialcode=null
      // this.model1.dmrnumber=null
    this.getdata()
    this.getlogdata()
    this.resultqsdnumber=res['reference']
    if(this.fileUploadUrlsqsd.length > 0){
      this.uploadingselectedfiles()
    }
    
       }else{
        this.alertcall.showWarning('Accepted', res['message']);
        this.matCode=[]
        this.matName=[]
        this.UOM=[]
        this.InvoiceQuantity=[]
        this.RecQTY=[]
        this.shrQTY=[]
        this.excsQTY=[]
        this.unitPrice=[]
        this.discPERCENT=[]
        this.discVALUE=[]
        this.basicPRICE=[]
        this.taxDESC=[]
        this.taxPERCEN=[]
        this.taxVALUE=[]
        this.freightsplit=[]
        this.basicfreight=[]
        this.freighttaxdesc=[]
        this.freighttaxpercent=[]
        this.freighttaxvalue=[]
        this.totalfreight=[]
        this.otherchargesdesc=[]
        this.otherchargesvalue=[]
        this.otherchargessplit=[]
        this.othertaxpercent=[]
        this.othertaxvalue=[]
        this.othertaxsplit=[]
        this.totalprice=[]
        this.acceptedqty=[]
        this.miscellaneouschargesdesc=[]
        this.miscellaneouschargesvalue=[]
        this.miscellaneouschargessplit=[]
        this.totalvalue=[]
        this.rejectedqty=[]
       } 
    
  })
  }
  getdmrDATA(ev:any){
    console.log(ev.target.value);
    this.selecteddmr1=ev.target.value
    if(this.selecteddmr1.length>2){
this.getMaterialdata()
    }
  }
  getmaterialDATA(ev:any){
    this.selectedmaterial1=ev.target.value
    if(this.selectedmaterial1.length>2){
this.getmasterdata()
    }
    if(! this.selectedmaterial1){
      this.getmasterdata()
    }
  }
  getmasterdata(){
    let obj={
      "command":'lst',
      "lmt":100000,
      "pid":1,
      "key":this.selectedmaterial1 ||''
    }
    this.custservice.getmaterialmasterdata(obj).subscribe((res:any)=>{
      console.log(res);
      this.masterData=res.data
      
    })
  }
  getstorageDATA(ev:any){
    console.log(ev.target.value);
    this.selectedstorage=ev.target.value
    if( this.selectedstorage.length>2){
this.getstoragelocData()
    }
  }
  getstoragelocData(){
    let obj={
      "command": "mat",
      "field": "storage_location",
      "key":this.selectedstorage ||''
    }
    this.custservice.getmatstoragelocdata(obj).subscribe((res:any)=>{
       this.storageData=res.data
        
      
      
    })
  }
  purchaseorderdata(ev:any){
    this.selectedpovalue=ev.target.value
    if( this.selectedpovalue.length>2){
this.getpodataData()
    }
    if(!this.selectedpovalue){
      this.getpodataData()
    }
  }
  getpodataData() {
    let obj = {
      command: "por",
      // lmt: 100000,
      // pid: 1,
      key: this.selectedpovalue ||"",
    };
    this.custservice.addqsd(obj).subscribe((res: any) => {
     this.poDATA=res.data
    });
  }
  selectedponumber(){
    let obj={
      command:"grn",
      "purchase_order_number":this.ponumber
    }
    this.custservice.addqsd(obj).subscribe((res:any)=>{
    this.goodsreceptdata=res.data
     this.grnnumber1=''
    })
  }
  keyPressNumbers(evt:any)
  {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if (charCode != 46 && charCode > 31 
       && (charCode < 48 || charCode > 57))
        return false;

     return true;
  }
  editqsddata(data:any){
    this.editednumber=data.number
    
    let obj={
      command: "mat",
      // field: "number",
      purchase_order_number: data.purchase_order_number
    }
    this.custservice.addqsd(obj).subscribe((res:any)=>{
      console.log(res);
     this.EDITdata=res.data[0]
    this.QSDDATA=res.data
    this.dataSource.data=this.QSDDATA
      this.demo1TabIndex=0;
      this.initialdata=true;
      // this.btn="Update"
      this.model1.grnnumber = this.EDITdata.grn_number
      this.model1.purchaseordernum = this.EDITdata.purchase_order_number
      this.model1.description = this.EDITdata.description_of_work
      this.model1.purchaseordervalue = this.EDITdata.purchase_order_value
      this.model1.rabilldate = moment(this.EDITdata.ra_bill_date).format("YYYY-MM-DD")
      this.model1.orderduration = this.EDITdata.order_duration
      this.model1.startdate = moment(this.EDITdata.start_date).format("YYYY-MM-DD")
      this.model1.completiondate = moment(this.EDITdata.completion_date).format("YYYY-MM-DD")
      this.model1.preinfolocation = this.EDITdata.previous_information_location
      this.model1.observations = this.EDITdata.observations
      this.model1.Statutorydeductionstds =this.EDITdata.statutory_deductions_tds_percentage
      this.model1.Statutorydeductionslabour = this.EDITdata.statutory_deductions_labour_percentage
      this.model1.Statutorydeductions = this.EDITdata.statutory_deductions_environment_percentage
      this.model1.otherdeductionsmobilisation = this.EDITdata.other_deductions_mobilisation_recovery_percentage
      this.model1.otherdeductionsmachinary = this.EDITdata.other_deductions_machinery_recovery_percentage
      this.model1.otherdeductionsretention = this.EDITdata.other_deductions_retention_money_percentage
      this.model1.otherdeductions = this.EDITdata.other_deductions_royality_amount
      this.model1.materialrecovery = this.EDITdata.material_recovery_amount
      this.model1.jmslogsheets = this.EDITdata.is_jms_logsheets_reports
      this.model1.enginfo = this.EDITdata.is_engineering_information
      this.model1.qualityinfo = this.EDITdata.is_quality_information
      this.model1.projectsinfo = this.EDITdata.is_projects_information
      this.model1.planninginfo = this.EDITdata.is_planning_information
      this.model1.pminfo = this.EDITdata.is_p_m_information
      this.model1.accountsinfo = this.EDITdata.is_accounts_information
      this.model1.cmminfo = this.EDITdata.is_cmm_information
      this.model1.ordercopy = this.EDITdata.is_order_copy
      this.model1.ambendments =this.EDITdata.is_amendments
      this.model1.pbgabg =this.EDITdata.is_pbg_abg_guarantees
      this.model1.profomainv = this.EDITdata.is_proforma_invoice
      this.model1.mdcc = this.EDITdata.is_mdcc
      this.model1.thirdpartyinspection = this.EDITdata.is_third_party_inspection
      this.model1.debitnote = this.EDITdata.debit_note
      this.model1.nodueacc = this.EDITdata.is_no_due_acceptance
      this.model1.reconcillatiuon = this.EDITdata.is_reconcillation
      this.model1.packinglist = this.EDITdata.is_packing_list
      this.model1.iswarranty =this.EDITdata.is_warrenty
      this.model1.isguarantee = this.EDITdata.is_guarantee
      this.model1.projectname = this.EDITdata.project_name
      this.model1.vendorname = this.EDITdata.vendor_name
      this.model1.podate = this.EDITdata.purchase_order_date
      this.model1.invoicenumber = this.EDITdata.invoice_number
      this.model1.invoicedate = moment(this.EDITdata.invoice_date).format('YYYY-MM-DD')
      this.model1.abstractvalue = Number(this.EDITdata.abstract_value)
      this.model1.gateentrynumber =this.EDITdata.gate_entry_number
      this.model1.deliverychallannumber = this.EDITdata.delivery_challan
      this.model1.othertaxdesc =this.EDITdata.other_tax_description
      this.model1.vendoepannumber = this.EDITdata.pan_number
      this.model1.vendorgst = this.EDITdata.gst_number
      this.model1.amendment_number = Number(this.EDITdata.amendment_number)
      this.model1.amendment_date = moment(this.EDITdata.amendment_date).format('YYYY-MM-DD')
      this.model1.isinvoice = this.EDITdata.is_invoice
      this.model1.gateentry = this.EDITdata.is_gate_entry
      this.model1.deliverychallan = this.EDITdata.is_delivery_challan
      this.model1.ismrn = this.EDITdata.is_mrn
      this.model1.amendment_value = this.EDITdata.amendment_value
    })
  }
}
