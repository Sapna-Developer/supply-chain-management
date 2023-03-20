import { Component, OnInit,VERSION } from "@angular/core";
import { NgxPrintElementService } from "ngx-print-element";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: 'app-print-dc',
  templateUrl: './print-dc.component.html',
  styleUrls: ['./print-dc.component.scss']
})
export class PrintDcComponent implements OnInit {

  dcPrintData: any[] = [];
  companydata: any[] = [];
  table: any[] = [];
  document_no: any;
  position: any;
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
  descriptionData:boolean=true;
  printstatus: any;
  totalValue: number;
  userDataa: any;
  taxableValue: number;
  cGST: any;
  iGST: any;
  sGST: any;
  companyName: any;
  // qrdata: string;
  // public value: string = null;

  constructor(private dialog: MatDialog,
    public sanitizer: DomSanitizer,
    public print: NgxPrintElementService,
    private route: ActivatedRoute,
    private router: Router,
    private service: CustomerService
  ) {
    // this.sapna = "ItSoluionStuff.com";
  }

  data1: any;
  userData: any;
  searchData: string;
  pageSize: any;
  pageIndex: any;
  // company_name: any;
  ngOnInit(): void {
    
    // this.qrdata = "";
    this.route.queryParams.subscribe((params) => {
      this.data1 = params["dcnumber"];
      // }
    });
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.document_no=params['document_number'];
      this.position=params['position']
      console.log(this.position);
    
    });

    this.getDcPrintData();
    setTimeout(() => {
      this.getCompanyAddress();
      this.getSignatureData();
      this.getSignature();
    }, 100);
  }
  // console.log(this.data1);
  
  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  
  // value = this.data1;
  backtodmr() {
    if(this.data1){
      this.router.navigate(["/inventory/deliverychallan"], {
        queryParams: { tab: "notifications" },
      });
    }else{ 
      this.router.navigate(['/pending-signatures'],{ queryParams: { tab: 'notifications'}})
    }
  }
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
  getDcPrintData() {
    this.userData = [];
    let obj = {
      command: "mat",
      key: this.data1 || this.document_no,
    };
    this.service.getDcprint(obj).subscribe((res: any) => {
      this.userDataa=res.data
      this.dcPrintData = res.data[0];
      this.userData.push(this.dcPrintData);
      console.log(this.userData);
      this.userData.push(this.table);
      this.totalValue=0
      this.taxableValue=0
      this.cGST=0
      this.iGST=0
      this.sGST=0
      this.userDataa.forEach((ele:any)=>{
        this.companyName=ele.company_name
        console.log(ele.company_name);
        
        console.log(ele.total_value);
        this.taxableValue+=ele.basic_price
        this.totalValue+=ele.basic_price + ele.cgst_value + ele.igst_value + ele.sgst_value
        this.cGST+=ele.cgst_value
        this.iGST+=ele.igst_value
        this.sGST+=ele.sgst_value
      })
      console.log(this.totalValue);
      
      this.table = res.data;


    });
    // console.log(this.dcPrintData[0]);

    // console.log(this.dcPrintData[0]);
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
    postData.append("document_name", "DeliveryChallan" );
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

}


