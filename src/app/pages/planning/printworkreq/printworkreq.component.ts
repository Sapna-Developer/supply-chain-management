import { Component, OnInit, TemplateRef, VERSION, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { NgxPrintElementService } from "ngx-print-element";
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from "src/app/services/customer.service";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-printworkreq',
  templateUrl: './printworkreq.component.html',
  styleUrls: ['./printworkreq.component.scss']
})
export class PrintworkreqComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  @ViewChild('deletedocsigned') deletedocsigned: TemplateRef<any>;
  key: any;
  command = "mat";
  userData: any;

  dataa: any[] = [];
  Dataa: any[] = [];
  table: any[] = [];
  Table: any[] = [];
  total: any;
  value: any[];
  total_amount: any[] = [];
  data1: any;
  document_no: any;
  position:any;
  deletemodel: any = {};
  document_name: any;
  description: any;
  level: any;
  Viewsign: any;
  signature: any;
  SignData: any;
  signNull: any;
  signbtn: boolean =false;
  signtext:boolean=false;
  signStatus: boolean=false;
  descriptionData:boolean=true;
  document_no1: any;
  printstatus: any;
  reason: any;
  pwd: any;
  docsign_status:boolean=false
  constructor(
    private dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private service: CustomerService,
    public print: NgxPrintElementService,
    private route: ActivatedRoute,
    private router: Router,
    private alertcall: AlertCallsService,
  ) {}
  public config = {
    printMode: 'template', // template
    popupProperties: "window.open",
   stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
  //  styles: [
  //   ".printMe {display: block;}",
  //   ".print{display:none;}",
  //   ".pagebreak { page-break-before: always; }",
  //   ".tablesize p{font-size:12px; line-height: 14px; padding:1px;}",
  //   ".pagebreak { page-break-before: always; }",
  //   ".tabblesize {font-size: 12px;line-height: 0.9em;padding: 1px;}",
  // ],
  };

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.data1=params['wrnumber'];
      
      // }
    });
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.document_no=params['document_number'];
      this.position=params['position']
      console.log(this.position);
      
    });
    this.getUserFormData();
    this.getSignatureData();
    this.getSignature();
  }
  backtoworkreq(){
    this.router.navigate(["/planning/workrequest"], {
      queryParams: { tab: "notifications" },
    });
  }
  getUserFormData() {
    this.userData = [];
    let obj = {
      number: this.data1 || this.document_no,
      command: "mat",
    };
    this.service.addWorkOrderRequisitionData(obj).subscribe((res: any) => {
      this.dataa = res.data;
      this.userData.push(this.dataa[0]);
      console.log(this.userData);
      console.log(this.dataa);

      this.userData.push(this.table);
      this.table = res.data;
      console.log(this.table);

      this.Dataa = res.table;
      // this.userData.push(this.Dataa[0]);

      console.log(this.Dataa);

      // this.userData.push(this.Table);
      this.Table = res.table;
      console.log(this.Table);
      this.findsum(this.userData);
    });
  }
  findsum(Table: any) {
    this.value = this.Dataa;
    console.log(this.value);
    this.total = 0;
    for (let j = 0; j <= Table.length; j++) {
      this.total += this.value[j].total_amount;
      console.log(this.total);
      console.log(this.total_amount);
    }
  }
//signature
getSignatureData() {
  const postData = new FormData();
  postData.append("command","mat");
  postData.append("document_number", this.document_no ||  this.data1 || this.document_no1);
  postData.append("document_name", "WorkRequest" );
  this.service.DocumentSign(postData).subscribe((res: any) => {
    this.SignData = res.data;
    this.printstatus=res.print_status;  
    // console.log(this.printstatus);
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
          // if(ele.description !== "Recommanded by" || ele.description !=="Approved by"){
          //   this.descriptionData=false;
          //   alert(1);
          // }
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
      this.dialog.closeAll();
      Swal.fire({
        text: res["message"],
        title: res["reference"],
        icon: "success",
        // title: res['reference'],
        width: 500,
      });
    }
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
  this.service.deletepurchaseorderdata(obj).subscribe((res: any) => {
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
