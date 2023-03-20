import { Component, OnInit } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { environment } from "src/environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { HttpParams } from "@angular/common/http";
@Component({
  selector: 'app-excelupload',
  templateUrl: './excelupload.component.html',
  styleUrls: ['./excelupload.component.scss']
})
export class ExceluploadComponent implements OnInit {
  displayedColumns: any[] = [
    "sno",
    "company_name",
    "date",
    "manual_purchase_order_number",
    "material_code",
    "material_description",
    "uom",
    "material_main_group",
    "material_sub_group",
    "quantity",
    "vendor_name",
    "action",
  ];
  displayedColumns1: any[] = [
    "sno",
    "PO_number",
    "Date",
    "company_Name",
    "vendor_name",

    "action",
  ];
  imageUrl = environment.base_url;
  dataSourcemaster = new MatTableDataSource();
  fileUploadUrlspo: any[] = [];
  filenamearray1: any[] = [];
  selectedfiles: any[] = [];
  changedRow: number = 0;
  row: any = {};
  maindata1: any[] = [];
  maingroup: any;
  subgroupdata: any = [];
  mainDATA: any = [];
  unitDATA1: any;
  company_name: any;
  subgroup: any;
  uom: any;
  material_description: any;
  mainGroupCode: any;
  subGroupCode: any;
  saveddataarray: any = {};
  SNO: any[] = [];
  Date: any[] = [];
  Mpon: any[] = [];
  MatDes: any[] = [];
  MatCode: any[] = [];
  Mmg: any[] = [];
  Qty: any[] = [];
  Uom: any[] = [];
  VenName: any[] = [];
  demo1TabIndex: any = 0;
  dataSourcemain = new MatTableDataSource();
  isAttachFileLength: boolean=true;
  fileUploadUrls: any;
  createNewFile: any;
  filenamearray: any;
  purchaseordernumber: any;
  deleteid: any;
  dialogRef: any;
  purchaserequestnumber: string;
  prvaluenum: any;
  filedata1: any;
  createNewFile1: any;
  filedata: any;
  pageIndex: any = 1;
  pageSize: any = 10;
  reaData: boolean;
  totalRecords: any;
  deleteNumber: any;
  deletemodel: any={};
  
  constructor(
    // private custservice: CustomerService,
    // private alertcall: AlertCallsService
    private dialog: MatDialog, private custservice: CustomerService,
    private alertcall: AlertCallsService, 
    ) 
   { }
  title = "PO Uploads Excel Sheet";
  ngOnInit(): void { 
    this.getdatadropdown();
    this.getunitDatadropdown();
    this.getData()
  }
  uploadingselectedfiles() {
    const postData = new FormData();
    for (const file of this.selectedfiles) {
      postData.append("file", file);
    }
    this.custservice.addfilepoupload(postData).subscribe((res: any) => {
      this.dataSourcemaster.data = res.msg;
      this.mainDATA = res.msg;
      this.row.maingroup = {};
      this.subgroupdata = [];
      console.log(this.mainDATA);
      // this.getdatadropdown();
      // this.getunitDatadropdown();
    });
  }
  uploadpofiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlspo = fileInput.target.files;
      for (const file of this.fileUploadUrlspo) {
        this.filenamearray1.push(file.name);
        this.selectedfiles.push(file);
      }
      this.isAttachFileLength=false;
    }
    console.log(this.fileUploadUrlspo);

  }
  getdatadropdown() {
    let obj = {
      lmt: 100000,
      pid: 1,
      command: "lst",
      // key: "" || this.searchmainData,
    };
    this.custservice.getmaingroupdata(obj).subscribe((res: any) => {
      this.maindata1 = res.data;
    });
  }
  selectedmaingroup(data: any, row: number) {
    this.changedRow = row;
    let obj = {
      key: data.maingroup,
      command: "lst",
      lmt: 100000,
    };
    this.custservice.getsubgroupdata(obj).subscribe((res: any) => {
      this.subgroupdata[row] = res.data;
      this.subgroupdata[row].forEach((ele: any, row: any) => {
        if (ele.description == data.subgroup) {
          this.mainGroupCode = ele.main_group_code;
          this.subGroupCode = ele.code;
        }
      });
    });
  }
  getunitDatadropdown() {
    let obj = {
      lmt: 100000,
      pid: 1,
      command: "lst",
    };
    this.custservice.getunitdata(obj).subscribe((res: any) => {
      this.unitDATA1 = res.data;
    });
  }
  onClick(data: any, row: any) {
    let obj = {
      command: "add",
      company_name: "",
      class_code: "",
      criticality_code: "",
      date: "",
      description: "",
      manual_purchase_order_number: "",
      material_code: "",
      name: data.material_description,
      main_group_name: data.maingroup,
      sub_group_name: data.subgroup,
      main_group_code: this.mainGroupCode,
      sub_group_code: this.subGroupCode,
      quantity: "",
      uom_1: data.uom,
      vendor_name: "",
      uom_2: "",
      uom_ratio: "1",
      category_code: "",
      hsn_sac_code: "",
      class_name: "",
      criticality_name: "",
      category_name: "",
    };
    this.custservice.addmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res.data);
      this.uploadingselectedfiles();
    });
  }
  saveFinalTable() {
    console.log(this.mainDATA);
    this.mainDATA.forEach((val: any, index: any) => {
      this.SNO.push(index + 1);
      this.Date.push(val.date);
      this.Mpon.push(val.manual_purchase_order_number);
      this.MatCode.push(val.material_code);
      this.MatDes.push(val.material_description);
      this.Mmg.push(val.material_main_group);
      this.Qty.push(val.quantity);
      this.Uom.push(val.unit_of_measurement);
      this.VenName.push(val.vendor_name);
    });
    this.custservice.excelUpload(this.mainDATA).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        Swal.fire({
          text: res["message"],
          title: res["reference"],
          icon: "success",
          width: 500,
        });
        this.mainDATA = [];
        this.SNO = [];
        this.Date = [];
        this.Mpon = [];
        this.MatCode = [];
        this.MatDes = [];
        this.Mmg = [];
        this.Qty = [];
        this.Uom = [];
        this.VenName = [];
      } else {
        this.alertcall.showWarning("Accepted", res["message"]);
        this.mainDATA = [];
        this.SNO = [];
        this.Date = [];
        this.Mpon = [];
        this.MatCode = [];
        this.MatDes = [];
        this.Mmg = [];
        this.Qty = [];
        this.Uom = [];
        this.VenName = [];
      }
    });
  }
  clearData() {
    // this.saveddataarray = [];
    this.dataSourcemaster.data = [];
    this.filenamearray1 = [];
    this.isAttachFileLength=true;
    // this.model = {};
  }
  exportExcelpoENum() {
    const url = this.imageUrl + '/attachments/PoUploadXlFormat.xlsx';
    console.log(url);

    window.open(url, '_blank');
  }

  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.purchaseordernumber = row1.number
    this.getexistingfiles()
  }
  openfileuploadmodel1(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.purchaserequestnumber = row1.number
    this.getexistingfilespr()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.purchaseordernumber)
      .set("document_type", "Purchase Order")
    this.custservice.getexistingfies(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.filedata = res.data
        this.createNewFile.fileName = ''
        this.fileUploadUrls = []
      } else {
        this.filedata = ''
        console.log(this.filedata);
      }
    })
  }
  getexistingfilespr() {
    console.log(this.prvaluenum);
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.purchaserequestnumber)
      .set("document_type", "Purchase Request")
    this.custservice.getexistingfies(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.filedata1 = res.data
        this.createNewFile1.fileName = ''
      } else {
        this.filedata1 = ''
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
      .set("document_number", this.purchaseordernumber,)
      .set("document_type", "Purchase Order")
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
      for (const file of this.fileUploadUrls) {
        this.filenamearray.push(file.name)

      }
    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type", "Purchase Order");
    postData.append("document_number", this.purchaseordernumber);
    for (const file of this.fileUploadUrls) {
      postData.append('doc', file);
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", res['message'])
        this.getexistingfiles()
        this.filenamearray = []
        this.fileUploadUrls = []
      } else {
        this.alertcall.showWarning("Error", res['message'])
      }
    })
  }
  getData() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      key: "",
    };
    this.custservice.getpurchaseorderdata(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }
  deleteFile() {
    let obj = {
      command: "del",
      number: this.deleteNumber,
      reason: this.deletemodel.reason
    };
    this.custservice.deletepurchaseorderdata(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.deletemodel.reason = ""
        this.getData();
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
  deleteItem(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
      // scrollStrategy: new NoopScrollStrategy()
    });
    this.deleteNumber = rw.number;
  }
}