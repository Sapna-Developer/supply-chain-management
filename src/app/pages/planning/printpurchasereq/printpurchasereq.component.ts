import { Component, OnInit,TemplateRef,VERSION, ViewChild } from "@angular/core";
import { NgxPrintElementService } from "ngx-print-element";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
@Component({
  selector: "app-printpurchasereq",
  templateUrl: "./printpurchasereq.component.html",
  styleUrls: ["./printpurchasereq.component.scss"],
})

export class PrintpurchasereqComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  @ViewChild('deletedocsigned') deletedocsigned: TemplateRef<any>;
  key: any;
  field: "number";
  command: "mat";
  userData: any[] = [];
  dataa: any[] = [];
  table: any[] = [];
  value: any[];
  total: any;
  total_price: any[] = [];
  user: any[] = [];
  location: any;
  number: any;
  date: any;
  po_duration: any;
  purpose: any;
  recommended_agency: any;
  line_item: any;
  material_code: any;
  material_description: any;
  unit_of_measurment: any;
  quantity: any;
  unit_price: any;
  remarks: any;
  approved_by: any;
  raised_by: any;
  po_series: any;
  data1: any;
  document_no: any;
  position: any;
  companydata: any[] = [];
  Viewsign: any;
  signature: any;
  SignData: any;
  signNull: any;
  signbtn: boolean =false;
  signtext:boolean=false;
  signStatus: boolean=false;
  descriptionData:boolean=true;
  pageSize: any;
  pageIndex: any;
  printstatus: any;
  companyName: any;
  document_name: any;
  description: any;
  level: any;
  docsign_status:boolean=false
  deletemodel: any = {};
  constructor(private dialog: MatDialog,
    private alertcall: AlertCallsService,
    public sanitizer: DomSanitizer,
    private service: CustomerService,
    public print: NgxPrintElementService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  public config = {
    // printMode: 'template-popup', // template
    // popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    printMode: 'template', // template
     popupProperties: "window.open",
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    pageTitle: '&nbsp;&nbsp;',
    templateString: '<header>&nbsp;&nbsp;</header>{{printBody}}<footer&nbsp;&nbsp;</footer>',
    // styles: ['td { border: 1px solid black; color: green; }', 'table { border: 1px solid black; color: red }', 'header, table, footer { margin: auto; text-align: center; }']
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.data1 = params["dmrumber"];

      // }
    });
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.document_no=params['document_number'];
      this.position=params['position']
      console.log(this.position);
    
    });
    console.log(this.userData);
    this.getUserFormData();
    setTimeout(() => {
      this.getCompanyAddress();
      this.getSignatureData();
      this.getSignature();
    }, 100);
  }

  
  getUserFormData() {
    this.userData = [];
    let obj = {
      key: this.data1 || this.document_no,
      field: "number",
      command: "mat",
    };
    this.service.getpurchaserequestdataprint(obj).subscribe((res: any) => {
      this.dataa = res.data;
      this.userData.push(this.dataa[0]);
      console.log(this.userData);
      console.log(this.dataa);

      this.userData.push(this.table);
      this.table = res.data;
      console.log(this.table);
      this.findsum(this.userData);
    });
  }

  findsum(table: any) {
    this.value = this.dataa;
    console.log(this.value);
    this.total = 0;
    this.table.forEach((ele:any) => {
      this.total+=ele.total_price
    });
    // for (let j = 0; j <= table.length; j++) {
    //   this.total += this.value[j].total_price;
    //   console.log(this.total);
    //   console.log(this.total_price);
    // }
  }
  backtodmr() {
    if(this.data1){
    this.router.navigate(["/planning/purchaserequest"], {
      queryParams: { tab: "notifications" },
    });
  }else{ 
    this.router.navigate(['/pending-signatures'],{ queryParams: { tab: 'notifications'}})
  }
}


getCompanyAddress() {
  let obj = {
    command: "mat",
    lmt: "10000",
    pid: this.pageIndex,
    key: this.companyName,
  };
  this.service.getcompanymasterdata(obj).subscribe((res: any) => {
    this.companydata = res.data;
    console.log(this.companydata);
  });
}
getAddress(data: any) {
  // console.log(data);
  let ADDRESS: any;
  this.companydata.forEach((element: any) => {
    if (element.name == data) {
      ADDRESS = element.address_1;
    }
  });
  return ADDRESS;
}
getGst(data: any) {
  // console.log(data);
  let GST: any;
  this.companydata.forEach((element: any) => {
    if (element.name == data) {
      GST = element.gst_number;
    }
  });
  return GST;
}


//signature
getSignatureData() {
  const postData = new FormData();
  postData.append("command","mat");
  postData.append("document_number", this.document_no ||  this.data1 );
  postData.append("document_name", "PurchaseRequest" );
  this.service.DocumentSign(postData).subscribe((res: any) => {
    this.SignData = res.data;
    this.printstatus=res.print_status;  
    this.SignData.forEach((ele:any)=>{
      ele['signbtn']=false
      this.signNull =ele.signature
      if(ele.status ==="PENDING" && ele.signature === null){
        // alert(1)
        this.signStatus=false
          if(this.position == ele.level ){
            console.log("entered");
            
            ele['signbtn']=true
          //  this.signbtn=true;
        
          }
      }else if(ele.status ==="COMPLETED" && ele.signature !==null){
        this.signStatus=true
        ele.signature = this.sanitizer.bypassSecurityTrustResourceUrl(ele.signature);
       
      }

    })
    // console.log(this.SignData);
    
  });
}
getSignatureView(row:any,data:any){
  this.document_no=row.document_number;
  this.document_name=row.document_name;
  this.description=row.description;
  this.level=row.level;
  // this.document_data=row
  // console.log(this.document_data);
  this.dialog.open(data,{
    width:"400px"
  })

  this.getSignatureData();
}
getSignature(){
  const postData = new FormData();
  postData.append("command", "lst");
  this.service.SignatureUpload(postData).subscribe((res:any)=>{
    console.log(res);
    // this.Viewsign=res.data[0].signature;
    this.Viewsign=  this.sanitizer.bypassSecurityTrustResourceUrl(res.data[0].signature);
    console.log(this.Viewsign);  
    this.signature= res.data[0].signature
    });
}

SignatureFile(){
  // this.imageUrl = this.Viewsign.toDataURL();
  console.log(this.Viewsign);
  const imageBlob = this.dataURItoBlob(this.signature);
  var file = new File([imageBlob], "fileName.jpeg", {
    type: "'image/jpeg'"
  });
  const postData = new FormData();
  postData.append("command", "add");
  postData.append("document_number",this.document_no);
  postData.append("level",this.level);
  postData.append('description', this.description);
  postData.append("document_name", this.document_name );
  postData.append("image",file);
  this.service.DocumentSign(postData).subscribe((res: any) => {
    console.log(res);
    if(res && res.status_code===200){
      this.dialog.closeAll();
      Swal.fire({
        text: res["message"],
        title: res["reference"],
        icon: "success",
        // title: res['reference'],
        width: 500,
      });
      this.getSignature();
      this.getSignatureData();
    }else{
      this.dialog.closeAll();
      Swal.fire({
        text: res["message"],
        title: res["reference"],
        icon: "error",
        // title: res['reference'],
        width: 500,
      });
    }
    // this.reaData = false;
    //  this.totalRecords = res?.count;
    // this.dataSourcemain.data = res.data;
    // console.log(this.dataSourcemain.data);
    
    // if (res.data.length == 0) {
    //   this.reaData = true;
    // }
  });
}

dataURItoBlob(dataURI: any) {
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}


  //cancel
 
  deleteItem(rw: any, data: any) {

    this.dialog.open(data, {
      width: '400px',
    })
    this.document_no=rw.document_number;
  }
  deleteSeleted(data:any){
    this.dialog.closeAll()
    this.dialog.open(data, {
      width: '400px',
    })
  }
  deleteFile() {
    let obj = {
      "command": "del",
      "number": this.document_no,
      "reason": this.deletemodel.reason,
      "pwd":this.deletemodel.pwd
    }
    this.service.deletepurchaserequestdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.deletemodel.reason = ""
        this.docsign_status=false
        this.router.navigate(['/pending-signatures'],{ queryParams: { tab: 'notifications'}})
      }else if (res && res['status_code'] == "501"){
        this.docsign_status=true
        this.dialog.closeAll()
        this.dialog.open(this.deletedocsigned,{
          width:"400px"
        })
        this.deletemodel.reason = ""
      } else {
        this.dialog.closeAll()
        this.alertcall.showWarning('Accepted', res['message']);
      }
    })
  }

  submitform(data:any){
    this.dialog.open(data,{
      width:"400px"
    })
  }
}


