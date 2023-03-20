import { Component, Inject, OnInit, VERSION } from '@angular/core';
import { NgxPrintElementService } from "ngx-print-element";
import { CustomerService } from "src/app/services/customer.service";
import * as converter from "number-to-words";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser"; 
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-printdmr',
  templateUrl: './printdmr.component.html',
  styleUrls: ['./printdmr.component.scss']
})
export class PrintdmrComponent implements OnInit {
  key: any;
  field: "number";
  command: "mat";
  userData: any[] = [];
  basic_price: any[] = [];
  dataaa: any[] = [];
  table: any[] = [];
  otherCharges: number;
  pageSize: any;
  pageIndex: any;
  searchData: string;
  vendordata: any;
  totalRecords: any;
  dataSource: any[] = [];
  vendorDetails: any;
  address: any;
  details: any[];
  ADDRESS: any;
  data1: any;
  duplicateinv_num:any[]=[]
  duplicateinv_date:any[]=[]
  invoice_number:any[]=[]
  invoice_date: any[]=[]
  deliverychallanno:any[]=[]
  duplicatedc_number:any[]=[]
  document_no: any;
  Viewsign: any;
  SignData: any;
  position: any;
  signNull: any;
  signbtn: boolean =false;
  signtext:boolean=false;
  signStatus: boolean=false;
  document_data: any;
  document_name: any;
  description: any;
  level: any;
  signature: any;
  document_no1: any;
  printstatus: any;
  constructor(private dialog: MatDialog,
    private service: CustomerService,
    public print: NgxPrintElementService,
    private route: ActivatedRoute,
    private router:Router,
    public sanitizer: DomSanitizer
    // @Inject(MAT_DIALOG_DATA) public data1:any
  ) {}
  public config = {
    printMode: 'template', // template
     popupProperties: "window.open",
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],

  };

  total: any = 0;
  Amount:any=0;
  totalDiscount: any = 0;
  totalTax: any = 0;
  value: any;
  other_tax_value: any[] = [];
  total_freight: any[] = [];
  other_charges: any[] = [];
  grandTotal: any;
  grandTotall: any; 
  sbtotal: any[] = [];
  outputWords = "";
  roundOff: any;
  
    ngOnInit(): void {
      // console.log(this.data1);
      
      this.route.queryParams
      .subscribe(params => {
        this.data1=params['dmrumber'];
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
      // console.log(this.dataaa);
  
      // console.log(this.other_charges);
      // console.log(this.other_tax_value);
      // console.log(this.total_freight);
      this.getvendordata();
      this.getUserFormData();
      this.getSignatureData();
      this.getSignature();
      // if(this.document_no){
      //   this.getSignatureData();
      //   this.getSignature();
      // }
    }
    name = 'Angular ' + VERSION.major;
    elementType = NgxQrcodeElementTypes.URL;
    correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    // ValueFromComp1(var1:any)
    // {
    //     this.ValueFromComponent1=var1;
    // }
    backtodmr(){
      if(this.data1){
        this.router.navigate(['/inventory/goodsreceipt'],{ queryParams: { tab: 'notifications'}})
      }else if(this.document_no){
        this.router.navigate(['/pending-signatures'],{ queryParams: { tab: 'notifications'}})
      }else{
        this.router.navigate(['/reports/transitreports'],{ queryParams: { tab: 'notifications'}})
      }
    }
    getUserFormData() {
      this.userData = [];
      let obj = {
        key:  this.data1 || this.document_no || this.document_no1,
        field: "number",
        command: "mat",
      };
      this.service.editgoodsreceiptdata(obj).subscribe((res: any) => {
        this.dataaa = res.data;
        this.userData.push(this.dataaa[0]);
        console.log(this.userData);
        this.table = res.data;
        // this.userData.push(this.table);
        this.table.forEach((element:any) => {
          // this.invoice_number:any[]=[]
          this.invoice_number.push(element.invoice_number)
          this.invoice_date.push(element.invoice_date)
          this.deliverychallanno.push(element.dc_number)
          this.duplicateinv_num= [...new Set(this.invoice_number)];
          this.duplicateinv_date= [...new Set(this.invoice_date)];
          this.duplicatedc_number=[...new Set(this.deliverychallanno)]
        });
        console.log(this.duplicateinv_num);
        this.findsum(this.table);
        console.log(res);
        console.log(this.dataaa);
  
        console.log(this.sbtotal);
  
        console.log(this.userData);
  
        console.log(this.other_charges);
        console.log(this.other_tax_value);
        console.log(this.total_freight);
        console.log(this.dataaa);
      });
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
      });
    }
  
    getaddress(data: any) {
      // console.log(data);
      let ADDRESS: any;
      // this.vendordata.forEach((element: any) => {
      //   if (element.name == data) {
      //     ADDRESS = element.address_1;
      //   }
      // });
      return ADDRESS;
    }
    findsum(table: any) {
      this.value = this.table;
     
      for (let j = 0; j < table.length; j++) {
        this.Amount = this.value[j].accepted_quantity * this.value[j].unit_price
        this.total +=  this.Amount;
       
        this.totalDiscount += this.value[j].discount_value;
       
        this.totalTax += this.value[j].tax_value;
      
  
        let c = Number(this.total) - Number(this.totalDiscount);
        let d = this.totalTax;
        let e = this.value[0].other_tax_value;
        let f = this.value[0].total_freight;
        let g = this.value[0].other_charges_value;
  
        console.log(c, d, e, f, g);
        this.grandTotal =
          +Number(c) + Number(d) + Number(e) + Number(f) + Number(g);
        console.log(Number(g));
  
        this.grandTotall = this.grandTotal.toFixed(2);
  
        this.roundOff = this.grandTotal.toFixed(0);
  
        this.outputWords = converter.toWords(this.roundOff);
        this.otherCharges = Number(g);
      }
    }
  
    onPrint() {
      window.print();
    }
    searchdata() {
      if (this.searchData.length > 2) {
        this.getvendordata();
      }
      if (!this.searchData) {
        this.getvendordata();
      }
    }
    getSignatureData() {
      const postData = new FormData();
      postData.append("command","mat");
      postData.append("document_number", this.document_no ||  this.data1 ||this.document_no1);
      postData.append("document_name", "GoodsReceipt" );
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

    

}
