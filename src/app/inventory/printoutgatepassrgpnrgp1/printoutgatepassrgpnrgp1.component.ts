import { Component, OnInit, TemplateRef, VERSION, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { NgxPrintElementService } from "ngx-print-element";
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-printoutgatepassrgpnrgp1',
  templateUrl: './printoutgatepassrgpnrgp1.component.html',
  styleUrls: ['./printoutgatepassrgpnrgp1.component.scss']
})
export class Printoutgatepassrgpnrgp1Component implements OnInit {
  @ViewChild('deletedocsigned') deletedocsigned: TemplateRef<any>;
  key: any;

  command = "mat";
  userData: any;
  dataa: any[] = [];
  table: any[] = [];
  vendordata: any;
  searchData: string;
  pageSize: any;
  pageIndex: any;
  data1: any;
  position: any;
  document_no: any;
  level: string | Blob;
  description: string | Blob;
  document_name: string | Blob;
  Viewsign: any;
  signature: any;
  SignData: any;
  signNull: any;
  signbtn: boolean =false;
  signtext:boolean=false;
  signStatus: boolean=false;
  document_no1: any;
  printstatus: any;
  value: string;
  value1: string;
  value2: string;
  reason: any;
  pwd: any;
  deletemodel: any = {};
  docsign_status:boolean=false
  constructor(private dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private service: CustomerService,
    private alertcall: AlertCallsService,
    public print: NgxPrintElementService,private route:ActivatedRoute,public router:Router
  ) {}
  public config = {
    printMode: 'template', // template
    popupProperties: "window.open",
   stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
  };

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.data1=params['ogpnumber'];
      console.log(this.data1);
    });
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.document_no=params['document_number'];
      this.position=params['position']
      console.log(this.position);
      
    });
    this.route.queryParams
    .subscribe(params => {  
      console.log(params);
      this.document_no1=params['document_number1'];
    });
    this.getvendordata();
    this.getUserFormData();
    this.getSignatureData();
    this.getSignature();
    this.value='Document_number:'+this.document_no +',Document_name:OutGatePassNRGP';
    this.value1='Document_number:'+this.document_no1 +',Document_name:OutGatePassNRGP';
    this.value2='Document_number:'+this.data1 +',Document_name:OutGatePassNRGP'
  }
  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  backtooutgatepass(){
    if(this.data1){
      this.router.navigate(['/inventory/nrgp'],{ queryParams: { tab: 'notificationsissue'}})
    }else if(this.document_no){
      this.router.navigate(['/pending-signatures'],{ queryParams: { tab: 'notifications'}})
    }else{
      this.router.navigate(['/reports/transitreports'],{ queryParams: { tab: 'notifications'}})
    }
  }
  getvendordata() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      key: "" || this.searchData,
    };
    this.service.getvendormasterdata(obj).subscribe((res: any) => {
      this.vendordata = res.data;
      console.log(this.vendordata);
    });
  }
  getaddress(data: any) {
    // console.log(data);
    // console.log(this.vendordata);
    let ADDRESS: any;
    this.vendordata.forEach((element: any) => {
      if (element.name == data) {
        ADDRESS = element.address_1;
      }
    });
    return ADDRESS;
  }

  getUserFormData() {
    this.userData = [];
    let obj = {
      key: this.data1  || this.document_no || this.document_no1,
      command: "mat",
    };
    this.service.addOutGatePassNrgp(obj).subscribe((res: any) => {
      console.log(res);
      this.dataa = res.data[0];
      this.userData.push(this.dataa);
      console.log(this.userData);
      console.log(this.dataa);

      this.userData.push(this.table);
      this.table = res.data;
      console.log(this.table);

      console.log(this.userData);

      // this.findsum(this.userData);
    });
  }

  
  //signature
  getSignatureData() {
    const postData = new FormData();
    postData.append("command","mat");
    postData.append("document_number", this.document_no ||  this.data1 || this.document_no1);
    postData.append("document_name", "OutGatePassNRGP" );
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
      console.log(this.SignData);
      
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
        Swal.fire({
          text: res["message"],
          title: res["reference"],
          icon: "success",
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
  // this.document_no=rw.document_number;
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
  this.service.deleteNrgpList(obj).subscribe((res: any) => {
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