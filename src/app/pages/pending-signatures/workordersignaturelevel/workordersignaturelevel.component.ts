import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "src/app/services/customer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SignaturePad } from 'ngx-signaturepad';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { Overlay } from "ngx-toastr";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
@Component({
  selector: 'app-workordersignaturelevel',
  templateUrl: './workordersignaturelevel.component.html',
  styleUrls: ['./workordersignaturelevel.component.scss']
})
export class WorkordersignaturelevelComponent implements OnInit {
  pageIndex: any = 1;
  pageSize: any = 10;
  demo1TabIndex: any = 0;
  dataSourcemain = new MatTableDataSource();
  dataSourcemain1 = new MatTableDataSource();
  displayedColumns: any[] = [
    "sno",
    "Document_No",
    "company_name",
    "Concern_name",
    "Description",
    "Level",
    "View",
    "signature",
  ];
  displayedColumns1: any[] = [
    "sno",
    "Document_No",
    "company_name",
    "Concern_name",
    "Description",
    "Level",
    "View",
    // "signature",
  ];
  reaData: boolean;
  totalRecords: any;
  Viewsign: any;
  document_no: any;
  document_name: any;
  description: any;
  imageUrl: any;
  signature: any;
  level: any;
  reaData1: boolean;
  totalRecords1: any;
  searchDatacmp: any;
  searchDatapnd: any;
 
  constructor(private dialog: MatDialog,
    private custservice: CustomerService,
    private snackbar: MatSnackBar,
    public overlay: Overlay,
    private alertcall: AlertCallsService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private injector: Injector) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.tab == "notificationsissue") {
        this.demo1TabIndex = 1;
        console.log(params);
      } else {
        this.demo1TabIndex = 0;
      }
    });
    this.getPendingSignatureData();
    this.getCompletedSignatureData();
  }

  getPendingSignatureData() {
    const postData = new FormData();
    postData.append("command","pnd");
    postData.append("lmt",this.pageSize);
    postData.append("pid",this.pageIndex);
    postData.append("document_name","WorkOrder");
    this.custservice.DocumentSign(postData).subscribe((res: any) => {
      this.reaData = false;
       this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      console.log(this.dataSourcemain.data);
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }
  



  //print
  printdmr(data:any){
    console.log(data.document_number);
    this.router.navigate(['/cp/printwo'],{ queryParams: {'document_number': data.document_number,'position':data.level}})
  } 

  getSignature(row:any,data:any){
    this.document_no=row.document_number;
    this.document_name=row.document_name;
    this.description=row.description;
    this.level=row.level;
    this.dialog.open(data,{
      width:'400px',
    })
    this.getSignatureData();
  }

  getSignatureData(){
    const postData = new FormData();
    postData.append("command", "lst");
    this.custservice.SignatureUpload(postData).subscribe((res:any)=>{
      // this.Viewsign=res.data[0].signature;
      this.Viewsign=this.sanitizer.bypassSecurityTrustResourceUrl(res.data[0].signature);
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
      this.custservice.DocumentSign(postData).subscribe((res: any) => {
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
          this.getPendingSignatureData();
          this.getCompletedSignatureData();
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

    //completed
    getCompletedSignatureData() {
    const postData = new FormData();
    postData.append("command","cmp");
    postData.append("lmt",this.pageSize);
    postData.append("pid",this.pageIndex);
    postData.append("document_name","WorkOrder");
    this.custservice.DocumentSign(postData).subscribe((res: any) => {
        console.log(res);
        this.reaData1 = false;
       this.totalRecords1 = res?.count;
      this.dataSourcemain1.data = res.data;
      console.log(this.dataSourcemain1.data);
        if (res.data.length == 0) {
          this.reaData1 = true;
        }
    });
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
      this.getPendingSignatureData();
  }
  onpageevent1(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
      this.getCompletedSignatureData();
    
  }

  
  //search
  searchpnd() {
    if (this.searchDatapnd.length > 2) {
      const postData = new FormData();
      postData.append("command", "pnd");
      postData.append("lmt", this.pageSize);
      postData.append("pid", this.pageIndex);
      postData.append("document_name", "WorkOrder");
      postData.append("key", this.searchDatapnd);
      this.custservice.DocumentSign(postData).subscribe((res: any) => {
        this.reaData = false;
        this.totalRecords = res?.count;
        this.dataSourcemain.data = res.data;
        console.log(this.dataSourcemain.data);
        if (res.data.length == 0) {
          this.reaData = true;
        }
      });
    } else if(!this.searchDatapnd){
      this.getPendingSignatureData();
    }
  }
  searchcmp() {
    if (this.searchDatacmp.length > 2) {
      const postData = new FormData();
      postData.append("command", "cmp");
      postData.append("lmt", this.pageSize);
      postData.append("pid", this.pageIndex);
      postData.append("document_name", "WorkOrder");
      postData.append("key", this.searchDatacmp);
      this.custservice.DocumentSign(postData).subscribe((res: any) => {
        console.log(res);
        this.reaData1 = false;
        this.totalRecords1 = res?.count;
        this.dataSourcemain1.data = res.data;
        console.log(this.dataSourcemain1.data);
        if (res.data.length == 0) {
          this.reaData1 = true;
        }
      });
    } else if(!this.searchDatacmp){
      this.getCompletedSignatureData();
    }
  }


}



