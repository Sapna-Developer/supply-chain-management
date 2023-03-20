import { Component, Injector, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "src/app/services/customer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SignaturePad } from 'ngx-signaturepad';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { Overlay } from "ngx-toastr";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-transitreports',
  templateUrl: './transitreports.component.html',
  styleUrls: ['./transitreports.component.scss']
})
export class TransitreportsComponent implements OnInit {
  dateNow: Date = new Date();
  // row = [
  //   {
  //     name: 'GoodsReceipt', document_number: 'GAP01/21-22/GRN/203', company_name: 'GREENKO AP01 IREP PRIVATE LIMITED'
  //     , location: 'Hyderabad', date: this.dateNow
  //   },

  // ];

  demo1TabIndex: any = 0;
  // dataSourcemain = new MatTableDataSource(this.row); //static data
  dataSourcemain = new MatTableDataSource();
  dataSourcemain1 = new MatTableDataSource();
  displayedColumns: any[] = [
    "sno",
    "Date",
    "Document_name",
    "Document_No",
    "From_Location",
    "From_Company",
    "to_Company",
    // "View",
    "action",

  ];
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  dialogRef: any = null;
  grnumber: any;
  filedata: any;
  createNewFile: any = {}
  imageUrl = environment.base_url
  deleteid: any;
  fileUploadUrls: any[] = []
  fileUploadUrlsgr: any[] = []
  resultgrnumber: any;
  selectedfiles: any[] = []
  filenamearray: any[] = []
  doc_name: any;


  constructor(
    private snackbar: MatSnackBar,
    public overlay: Overlay,
    public custservice: CustomerService, public dialog: MatDialog,
    public alertcall: AlertCallsService,
    private route: ActivatedRoute,
    private router: Router, private injector: Injector) {
    this.dialogRef = this.injector.get(MatDialogRef, null); { }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.tab == "notificationsissue") {
        this.demo1TabIndex = 1;
        console.log(params);
      } else {
        this.demo1TabIndex = 0;
      }
    });
    this.gettransitData();
  }



  //table 
  // GoodsInTransit

  gettransitData() {
    let obj = {
      command: "lst",
      // lmt: this.pageSize,
      // pid: this.pageIndex,
      // key: "",
    };
    this.custservice.GoodsInTransit(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }

  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    // this.gettransitData();
  }
  //print
  printdmr(data: any) {
    console.log(data.document_number);
    if (data.document_name === "OutGatePassNRGP") {
      this.router.navigate(['/inventory/printoutgatepassrgpnrgp1'], { queryParams: { 'document_number1': data.document_number } })
    }else if(data.document_name === 'OutGatePassRGP'){
      this.router.navigate(['/inventory/printoutgatepassrgp1'],{ queryParams: {'document_number1': data.document_number}})
    }
  }
  //attach or upload file
  openfileuploadmodel(data: any, row1: any) {
   this.dialog.open(data,{
      width: '800px'
    })
    this.grnumber = row1.document_number
    this.doc_name =row1.document_name
    this.getexistingfiles()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.grnumber,)
      .set("document_type", this.doc_name)
    // let obj={
    //   "document_number" : this.dmrnumber,
    //   "document_type": "Daily Material Receipt"
    // }
    this.custservice.getexistingfies(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.filedata = res.data
        this.createNewFile.fileName = ''
      } else {
        this.filedata = ''
        console.log(this.filedata);
      }
    })
  }
  viewDoc(file: any) {
    const url = this.imageUrl + '/' + file.file_path;
    window.open(url, '_blank');
  }
  deleterowfile(row: any, data: any) {
    this.deleteid = data.id
    this.dialogRef = this.dialog.open(row, {
      width: "400px"
    })
  }
  deleteexistingfile() {
    let params = new HttpParams()
    params = new HttpParams()
      .set("document_number", this.grnumber,)
      .set("document_type", this.doc_name)
      .set("id", this.deleteid)
    this.custservice.deletefiles(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", "File Deleted Successfully")
        this.getexistingfiles()
        this.dialogRef.close()
      } else {
        this.alertcall.showWarning("Error", res['message'])



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

    }
    const postData = new FormData();
    postData.append("document_type", this.doc_name);
    postData.append("document_number", this.grnumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file)
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", res['message'])
        this.getexistingfiles()

      } else {
        this.alertcall.showWarning("Error", res['message'])
      }
    })
  }
  uploadgrfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsgr = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for (const file of this.fileUploadUrlsgr) {
        this.filenamearray.push(file.name)
        this.selectedfiles.push(file)
      }
    }

  }
  uploadselectedfiles() {
    const postData = new FormData();
    postData.append("document_type", this.doc_name);
    postData.append("document_number", this.resultgrnumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file)
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.fileUploadUrlsgr = []
        this.selectedfiles = []
        this.filenamearray = []
      } else {

      }
    })
  }
 
}
