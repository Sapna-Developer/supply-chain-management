import { Component, OnInit, TemplateRef, VERSION, ViewChild } from "@angular/core";
import { NgxPrintElementService } from "ngx-print-element";
import { CustomerService } from "src/app/services/customer.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as converter from "number-to-words";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from "@techiediaries/ngx-qrcode";
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { AlertCallsService } from "src/app/auth/alert-calls.service";

@Component({
  selector: "app-printpurchaseorder",
  templateUrl: "./printpurchaseorder.component.html",
  styleUrls: ["./printpurchaseorder.component.scss"],
})
export class PrintpurchaseorderComponent implements OnInit {
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
  totalTax: any;
  total_price: any[] = [];
  basic_price: any[] = [];
  tax_value: any[] = [];
  companyData: any;
  // name: any;
  address: any[] = [];
  vendordata: any;
  vendorAdrs: any[] = [];
  grandTotal: any;
  outputWords = "";
  pageSize: any;
  pageIndex: any;
  searchData: string;
  data1: any;
  annexture: boolean = false;
  purchaseordernum:any[]=[]
  duplicateinv_num:any[]=[]
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
  constructor(private dialog: MatDialog,
    public sanitizer: DomSanitizer,
    private service: CustomerService,
    public print: NgxPrintElementService,
    private route: ActivatedRoute,
    private router: Router,
    private alertcall: AlertCallsService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.data1 = params["ponumber"];
      // }
    });
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      this.document_no=params['document_number'];
      this.position=params['position']
      console.log(this.position);
      
    });
    this.getcompanydata();
    this.getvendordata();
    this.getUserFormData();
    this.getSignatureData();
    this.getSignature();
    // this.getDATA();
  }


  // getDATA() {
  //   let obj = {
  //     command: "mat",
  //     key: this.data1,
  //   };
  //   this.service.printpurchaseorderdata(obj).subscribe((res: any) => {
  //      this.dataa = res.data;
  //      this.userData.push(this.dataa[0]);
  //   });
  // }
  // public config = {
  //   printMode: "template",
  //   popupProperties: "window.open",
  //   styles: [
  //     ".printMe {display: block;}",
  //     ".print{display:none;}",
  //     ".pagebreak { page-break-before: always; }",
  //     ".tablesize p{font-size:12px; line-height: 14px; padding:1px;}",
  //     ".pagebreak { page-break-before: always; }",
  //     ".tabblesize {font-size: 12px;line-height: 0.9em;padding: 1px;}",
  //   ],
  // };
  public config = {
    printMode: 'template', // template
    popupProperties: "window.open",
   stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
   styles: [
        ".printMe {display: block;}",
        ".print{display:none;}",
        ".pagebreak { page-break-before: always; }",
        ".tablesize p{font-size:12px; line-height: 14px; padding:1px;}",
        ".pagebreak { page-break-before: always; }",
        ".tabblesize {font-size: 12px;line-height: 0.9em;padding: 1px;}",
      ],
  };
  backtodmr() {
    if(this.data1){
      this.router.navigate(["/cp/purchase_order"], {
        queryParams: { tab: "notificationsissue" },
      });
    }else if(this.document_no){ 
      this.router.navigate(['/pending-signatures'],{ queryParams: { tab: 'notifications'}})
    }
    
  }

  getUserFormData() {
    this.userData = [];
    let obj = {
      key: this.data1 || this.document_no,
      // field: "number",
      command: "mat",
    };
    this.service.printpurchaseorderdata(obj).subscribe((res: any) => {
      this.dataa = res.data;
      this.userData.push(this.dataa[0]);
      console.log(this.userData);
      console.log(this.dataa);

      this.userData.push(this.table);
      this.table = res.data;
      this.table.forEach((element:any) => {
        // this.invoice_number:any[]=[]
     this.purchaseordernum.push(element.pr_number)
       this.duplicateinv_num= [...new Set(this.purchaseordernum)];
      })
    
      this.findsum(this.userData);
     
    });
  }

  findsum(table: any) {
    this.value = this.table;
    console.log(this.value);
    this.total = 0;
    this.totalTax = 0;
    for (let j = 0; j <= table.length; j++) {
      this.total += this.value[j].basic_price;
      console.log(this.total);
      console.log(this.basic_price);
      this.totalTax += this.value[j].tax_value;
      console.log(this.tax_value);
      this.grandTotal = this.total + this.totalTax;
      this.outputWords = converter.toWords(this.grandTotal);
      //this.totalTax += this.value[j].tax_value;
      //console.log(this.totalTax);
    }
  }
  getcompanydata() {
    this.address = [];
    let obj = {
      command: "lst",
      lmt:100000,
      pid:1
    };
    this.service.getcompanymasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.companyData = res.data;
      this.address.push(this.companyData[0]);
    });
  }
  getvendordata() {
    this.vendorAdrs = [];
    let obj = {
      command: "lst",
    };
    this.service.getvendormasterdata(obj).subscribe((res: any) => {
      this.vendordata = res.data;
      this.vendorAdrs.push(this.vendordata[0]);
    });
  }
  // getvendordata() {
  //   let obj = {
  //     command: "lst",
  //     lmt: this.pageSize,
  //     pid: this.pageIndex,
  //     key: "" || this.searchData,
  //   };
  //   this.service.getvendormasterdata(obj).subscribe((res: any) => {
  //     this.vendordata = res.data;
  //   });
  // }
  // getaddress(data: any) {
  //   console.log(data);
  //   let ADDRESS: any;
  //   this.vendordata.forEach((element: any) => {
  //     if (element.name == data) {
  //       ADDRESS = element.address_1;
  //     }
  //   });
  //   return ADDRESS;
  // }
  // getcontact(data: any) {
  //   console.log(data);
  //   let CONTACT: any;
  //   this.vendordata.forEach((element: any) => {
  //     if (element.name == data) {
  //       CONTACT = element.contact_number;
  //     }
  //   });
  //   return CONTACT;
  // }

  
  //signature
  getSignatureData() {
    const postData = new FormData();
    postData.append("command","mat");
    postData.append("document_number", this.document_no ||  this.data1 || this.document_no1);
    postData.append("document_name", "PurchaseOrder" );
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
