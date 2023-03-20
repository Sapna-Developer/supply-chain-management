import { HttpParams } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-goodsreceipt2',
  templateUrl: './goodsreceipt2.component.html',
  styleUrls: ['./goodsreceipt2.component.scss']
})
export class Goodsreceipt2Component implements OnInit {

  dataSourcemain = new MatTableDataSource();

  displayedColumns: any[] = [
    'sno',
    'grn_number',
    'dmr_number',
    'date',
    'purchase_order_number',
    'purchase_order_date',
    // 'company_name',
    'vendor_name',
    'invoice_number',
    // 'ActiveStatus',
    'action'

  ];
  panelOpenState = false;
  goodsreceptdata: any;
  dmrDATA: any;
  model: any = {}
  selectedDMR: any;
  selectionList: any;
  addeddmrlist: any;
  finallist: any;
  adddmrlist1: any;
  dmrnumbers: any[] = []
  // companyname: any[] = []
  storageData: any;
  valutiondata: any;
  showbtn: any = false;
  object: any;
  model1: any = {}
  deletefile: any;
  deletemodel: any = {}
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0
  tab: any;
  demo1TabIndex: any = 0;
  btn: any = "Save"
  purchaseorderdata: any;
  ponumber: any;
  dateee: any;
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
  editednumber: any;
  logdata: any;
  editdataa: any;
  Initialdata: any = true;
  editeddata: any = false;
  totalPrice: number;
  initialdata: any = false;
  columnname: string;
  searchData: any;
  constructor(public custservice: CustomerService, public dialog: MatDialog,
    public alertcall: AlertCallsService,
    private route: ActivatedRoute,
    private router: Router, private injector: Injector) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.dateee = moment(new Date()).format("YYYY-MM-DD")
    this.getpurchaseorderdata()
    this.route.queryParams.subscribe((params: any) => {

      if (params.tab == 'notifications') {
        this.demo1TabIndex = 1;
        console.log(params);

      }
      else {
        this.demo1TabIndex = 0;
      }
    })
    this.getgoodslist()
    // this.getMaterialdata()
    this.getstoragelocData()
    this.getvalutionData()
    this.getlogdata()
  }
  getlogdata() {
    let obj = {
      command: "log",
      key: "GoodsReceipt2"
    }
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log
      }
    })
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.grnumber = row1.dmr_number
    this.getexistingfiles()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.grnumber,)
      .set("document_type", "Goods Receipt")
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
      .set("document_type", "Goods Receipt")
      .set("id", this.deleteid)
    this.custservice.deletefiles(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", "File Deleted Successfully")
        this.getexistingfiles()
        this.dialogRef.close()
      } else {
        // this.alertcall.showWarning("Error", res['message'])
        Swal.fire({
          text: res['message'],
          title: res['reference'],
          icon: 'error',
          // title: res['reference'],
          width: 500,
        });

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
    postData.append("document_type", "Goods Receipt");
    postData.append("document_number", this.grnumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file)
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", res['message'])
        this.getexistingfiles()

      } else {
        // this.alertcall.showWarning("Error", res['message'])
        Swal.fire({
          text: res['message'],
          title: res['reference'],
          icon: 'error',
          // title: res['reference'],
          width: 500,
        });
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
    postData.append("document_type", "Goods Receipt");
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
  printdmr(data: any) {
    console.log(data.number);
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     "dmrnumber": data.number
    //   }
    // };
    this.router.navigate(['/inventory2/printgoodsreceipt2'], { queryParams: { 'dmrumber': data.number } })
    // this.dialog.open(PrintdmrComponent,{
    //   width:"500px",
    //   height:"auto",
    //   data:data.number
    // })

  }
  gettotalprice(data: any) {
    let sum = 0
    data.forEach((ele: any) => {
      sum += ele.total_price
    });

    return sum
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getgoodslist()
  }
  deleteItem(row: any, data: any) {
    this.deletefile = row.number
    this.dialog.open(data, {
      width: '400px'
    })
  }
  deleteFile() {
    let obj = {
      "command": "del",
      "number": this.deletefile,
      "reason": this.deletemodel.reason
    }
    this.custservice.deletegoodsreceiptlist2(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.dialog.closeAll();
        this.alertcall.showSuccess('Accepted', res['message']);
        this.deletemodel.reason = ""
        this.getgoodslist()
        this.getlogdata()
      } else {
        // this.alertcall.showWarning('Accepted', res['message']);
        this.dialog.closeAll();
        Swal.fire({
          text: res['message'],
          title: res['reference'],
          icon: 'error',
          // title: res['reference'],
          width: 500,
        });
      }

    })
  }
  savefinaldata() {
    if (this.btn === "Save") {
      console.log(this.addeddmrlist);
      // this.finallist=this.addeddmrlist
      this.addeddmrlist.forEach((element: any) => {
        //  console.log(element);

        this.dmrnumbers.push(element[0].dmr_number)
        // this.companyname.push(element[0].company_name)
        // console.log(this.companyname);

      });

      let obj = {
        "dmr_number": this.addeddmrlist,
        // "company_name": this.companyname[0],
        "date": moment(this.dateee).format("YYYY-MM-DD"),
        "command": "add",
      }

      this.custservice.addfinalgoodsreceiptlist2(obj).subscribe((res: any) => {
        console.log(res);
        if (res && res['status_code'] == '200') {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          this.model1.selectedDMR = ''
          this.model1.selectionList = ''
          this.addeddmrlist = []
          this.showbtn = false;
          this.getgoodslist()
          this.getlogdata()
          this.resultgrnumber = res['reference']
          if (this.fileUploadUrlsgr.length > 0) {
            this.uploadselectedfiles()
          }
        } else {
          // this.alertcall.showWarning('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'error',
            // title: res['reference'],
            width: 500,
          });
          //  this.saveformdata("")

        }


      })
    } else {
      console.log(this.editdataa.miscellaneous_charges_description);

      let obj = {
        "dmr_number": [this.editdataa.dmr_number],
        // "company_name": this.editdataa.company_name,
        "date": moment(this.dateee).format("YYYY-MM-DD"),
        "command": "edt",
        "number": this.editednumber
      }

      this.custservice.addfinalgoodsreceiptlist2(obj).subscribe((res: any) => {
        console.log(res);
        if (res && res['status_code'] == '200') {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          this.model1.selectedDMR = ''
          this.model1.selectionList = ''
          this.addeddmrlist = []
          this.editdataa = ""
          this.Initialdata = true;
          this.editeddata = false;
          this.showbtn = false;
          this.btn = "Save"
          this.getgoodslist()
          this.getlogdata()
          this.resultgrnumber = this.editednumber
          if (this.fileUploadUrlsgr.length > 0) {
            this.uploadselectedfiles()
          }

        } else {
          // this.alertcall.showWarning('Accepted', res['message']);
          //  this.saveformdata("")
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'error',
            // title: res['reference'],
            width: 500,
          });
        }


      })
    }
  }
  getvalutionData() {
    let obj = {
      "lmt": 100000,
      'pid': 1,
      "command": "lst",
      "key": ""
    }
    this.custservice.getvalutiondata(obj).subscribe((res: any) => {
      this.valutiondata = res.data

      // setTimeout(()=>{
      //   this.dataSourcevalution.paginator = this.paginatorvalue;
      //  })  
    })
  }
  getstoragelocData() {
    let obj = {
      "command": "mat",
      "field": "storage_location",
      "key": ""
    }
    this.custservice.getmatstoragelocdata(obj).subscribe((res: any) => {
      this.storageData = res.data
      console.log(this.storageData);



    })
  }
  getselecteddata() {
    console.log(this.model1.selectedDMR);
    this.model1.selectionList = this.model1.selectedDMR
  }
  closemodel() {
    this.dialog.closeAll()
  }
  getselectedpo() {
    console.log(this.ponumber);

  }
  getMaterialdata() {
    console.log(this.ponumber);

    let obj = {
      "command": "dmr",
      "purchase_order_number": this.ponumber,
      // "lmt" : 100000,
      // "pid" : 1,
      // "key" : ""
    }
    this.custservice.getgoodsreceiptdmrlist2(obj).subscribe((res: any) => {
      this.dmrDATA = res.data
      console.log(this.dmrDATA);

    })
  }
  saveformdata(fr: any) {
    let obj = {
      "dmr_number": this.model1.selectedDMR,
      "command": "set"
    }
    this.custservice.addgoodsreceiptlist2(obj).subscribe((res: any) => {
      console.log(res);
      if (res) {
        if (res.data.length > 0) {
          this.addeddmrlist = res.data
          this.showbtn = true
          fr.reset()
          //  this.selectedDMR=''
          // this.selectionList=''
          this.dialog.closeAll()
        } else {
          this.addeddmrlist = res.data
          this.showbtn = false;
        }

      }


    })
  }
  deleterowItem(data: any, index: any) {
    if (data.length == 1) {
      data.splice(index, 1);
      this.model1.selectedDMR = ''
      this.showbtn = false;
      this.saveformdata("")

    } else {
      data.splice(index, 1);
    }


  }
  getgoodslist() {
    let obj = {
      "command": "lst",
      "pid": this.pageIndex,
      "lmt": this.pageSize,
    }
    this.custservice.getgoodsreceiptlist2(obj).subscribe((res: any) => {

      this.goodsreceptdata = res.data
      this.dataSourcemain.data = res.data
      this.totalRecords = res.count
    })
  }
  addgoodsreceipt(data: any) {
    if (!this.ponumber) {
      this.alertcall.showWarning('Error', "Please Select Purchase Order Number");
    }
    else if (this.ponumber) {
      console.log("hello");

      this.dialog.open(data, {
        width: '600px'
      })
      this.getMaterialdata()

    }
  }
  getpurchaseorderdata() {
    let obj = {
      "command": "por"
    }
    this.custservice.getgoodsreceiptlist2(obj).subscribe((res: any) => {
      this.purchaseorderdata = res.data

    })
  }
  editdata(data: any) {
    this.Initialdata = false;
    this.editeddata = true;
    this.editednumber = data.number
    let obj = {
      command: "mat",
      field: "number",
      key: data.number
    }
    this.custservice.addgoodsreceiptlist2(obj).subscribe((res: any) => {
      this.editdataa = res.data[0]
      this.addeddmrlist = res.data
      this.showbtn = true
      let sum = 0
      this.addeddmrlist.forEach((ele: any) => {
        sum += ele.total_price
      });
      this.totalPrice = sum
      // this.model1.dmrnumber=this.editdataa.dmr_number, 
      // this.model1.comments=this.editdataa.comments,     
      // this.model1.dateee=moment(this.editdataa.date).format("YYYY-MM-DD"),                  
      // this.model1.ponumber=this.editdataa.purchase_order_number,    
      // this.model1.podate=moment(this.editdataa.purchase_order_date).format("YYYY-MM-DD"),
      // this.model1.companyname=this.editdataa.company_name, 
      // this.model1.vendorname=this.editdataa.vendor_name, 
      // this.model1.invoicenumber=this.editdataa.invoice_number, 

      this.demo1TabIndex = 0;
      this.initialdata = true;
      // this.btn="Update"
    })
  }
  onChange() {
    console.log('Selected:', this.columnname);
    this.searchData = ""
    // this.searchData=this.columnname
    // let selectedColumn=this.searchData
  }
  search() {
    console.log(this.searchData);
    // let key = this.columnname
    // let obj={"command":"lst",[key]:this.searchData}
    let obj = { "command": "lst", "field": this.columnname, "key": this.searchData, "lmt": this.pageSize, "pid": this.pageIndex }
    // this.searchData=event.target.value;
    if (this.searchData.length > 2) {
      this.custservice.getgoodsreceiptlist2(obj).subscribe((res: any) => {
        this.goodsreceptdata = res.data
        this.dataSourcemain.data = res.data
        this.totalRecords = res.count
      })
    } else if (!this.searchData) {
      this.getgoodslist()
      this.columnname = ""
    }
  }
}
