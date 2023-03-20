import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { CustomerService } from "src/app/services/customer.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-nrgp2',
  templateUrl: './nrgp2.component.html',
  styleUrls: ['./nrgp2.component.scss']
})
export class Nrgp2Component implements OnInit {
  displayedColumns: any[] = [
    "sno",
    "material_code",
    "material_description",
    "unit_of_measurement",
    "storage_location",
    "request_quantity",
    "quantity",
    "item_remarks",
    // "batch_no",
    "valuation_type",
    "action",
  ];
  displayedColumns1: any[] = [
    "sno",
    "Number",
    "Date",
    "request_number",
    // "transfer_type",
    'gate_outward_number',
    "action",
  ];
  demo1TabIndex = 0;
  model1: any = {};
  btn: any = "Save";
  masterData: any;
  selectedmaterial: any;
  model: any = {};
  materialCODE: any;
  materialNAME: any;
  selectedstorage: any;
  storageData: any;
  valutiondata: any;
  saveddataarray: any[] = [];
  matCode: any[] = [];
  matName: any[] = [];
  UOM: any[] = [];
  storageLocation: any[] = [];
  InvoiceQuantity: any[] = [];
  ReqQTY: any[] = [];
  qty: any[] = [];
  itemremarks: any[] = [];
  // batchno: any[] = [];
  valutionType: any[] = [];
  dataSource = new MatTableDataSource();
  dataSourcemain = new MatTableDataSource();
  SNO: any[] = [];
  selectedIndex: number;
  systemref: any;
  model2: any = {};
  selectedmaterial1: any;
  model2matcode: any;
  model2matdes: any;
  selectedstorage1: any;
  pageIndex: any = 1;
  pageSize: any = 10;
  reaData: boolean;
  totalRecords: any = 0;
  editednumber: any;
  deleteNumber: any;
  editdataa: any;
  editModel: any = {};
  deletemodel: any = {};
  nrgp2num: any;
  filedata: any;
  createNewFile: any = {};
  fileUploadUrls: any[] = [];
  filenamearray1: any[] = [];
  imageUrl = environment.base_url;
  deleteid: any;
  dialogRef: any = null;
  fileUploadUrlsgt: any[] = [];
  filenamearray: any[] = [];
  selectedfiles: any[] = [];
  resultNrgp2number: any;
  columnname: any;
  searchData: any;
  smsdata: any;
  logdata: any;
  smsdata1: any;
  constructor(
    private custservice: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getmasterdata();
    this.getstoragelocData();
    this.getvalutionData();
    this.getNRGP2list();
    this.getlogdata();
  }
  savefinaldata(fr: any) {
    if (this.btn === "Save") {
      console.log(this.saveddataarray);

      this.saveddataarray.forEach((ele: any, index) => {
        this.SNO.push(index + 1);
        this.matCode.push(ele.material_code);
        this.matName.push(ele.material_description);
        this.UOM.push(ele.uom);
        this.storageLocation.push(ele.storagelocation);
        this.ReqQTY.push(Number(ele.reqqty));
        this.qty.push(Number(ele.qty));
        this.itemremarks.push(ele.itemremarks);
        // this.batchno.push(ele.batchno);
        this.valutionType.push(ele.valutiontype);
      });
      let obj = {
        command: "add",
        work_order_number: this.model1.wonumber,
        date: moment(this.model1.date).format("YYYY-MM-DD"),
        receiver_name: this.model1.receivername,
        request_date: moment(this.model1.reqdate).format("YYYY-MM-DD"),
        request_number: this.model1.reqnumber,
        comments: this.model1.cmts,
        vehicle_number: this.model1.vehnumber,
        // Transfer_type: this.model1.ttype,
        consignee_name: this.model1.cosignee,
        lr_number: this.model1.lrnumber,
        transporter_name: this.model1.tname,
        lr_date: this.model1.lrdate,
        purpose: this.model1.purpose,
        locations: this.model1.location,
        line_item: this.SNO,
        material_code: this.matCode,
        material_description: this.matName,
        unit_of_measurment: this.UOM,
        request_quantity: this.ReqQTY,
        quantity: this.qty,
        item_remarks: this.itemremarks,
        valuation_type: this.valutionType,
        storage_location: this.storageLocation,
        // batch_number: this.batchno,
        // comments: this.model1.comments,
      };
      this.custservice.addOutGatePassNrgp2(obj).subscribe((res: any) => {
        console.log(res);

        if (res && res["status_code"] == "200") {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.saveddataarray = [];
          this.dataSource.data = [];
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.storageLocation = [];
          this.ReqQTY = [];
          this.qty = [];
          this.itemremarks = [];
          // this.batchno = [];
          this.smsdata = "";
          this.smsdata1="";
          this.getNRGP2list();
          this.resultNrgp2number = res["reference"];
          if (this.fileUploadUrlsgt.length > 0) {
            this.uploadselectedfiles();
          }
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.storageLocation = [];
          this.ReqQTY = [];
          this.qty = [];
          this.itemremarks = [];
          // this.batchno = [];
        }
      });
    } else {
      console.log(this.saveddataarray);
      this.saveddataarray.forEach((ele: any, index) => {
        this.SNO.push(index + 1);
        this.matCode.push(ele.material_code);
        this.matName.push(ele.material_description);
        this.UOM.push(ele.uom || ele.unit_of_measurment);
        this.storageLocation.push(ele.storagelocation || ele.storage_location);
        this.ReqQTY.push(Number(ele.reqqty || ele.request_quantity));
        this.qty.push(Number(ele.qty || ele.quantity));
        this.itemremarks.push(ele.itemremarks || ele.item_remarks);
        // this.batchno.push(ele.batchno || ele.batch_number);
        this.valutionType.push(ele.valutiontype || ele.valuation_type);
      });
      let obj = {
        reason: this.editModel.reason,
        work_order_number: this.model1.wonumber,
        date: moment(this.model1.date).format("YYYY-MM-DD"),
        receiver_name: this.model1.receivername,
        request_date: moment(this.model1.reqdate).format("YYYY-MM-DD"),
        request_number: this.model1.reqnumber,
        comments: this.model1.cmts,
        vehicle_number: this.model1.vehnumber,
        // Transfer_type: this.model1.ttype,
        transporter_name: this.model1.tname,
        consignee_name: this.model1.cosignee,
        lr_number: this.model1.lrnumber,
        lr_date: moment(this.model1.lrdate).format("YYYY-MM-DD"),
        locations: this.model1.location,
        purpose: this.model1.purpose,
        line_item: this.SNO,
        material_code: this.matCode,
        material_description: this.matName,
        unit_of_measurment: this.UOM,
        request_quantity: this.ReqQTY,
        quantity: this.qty,
        item_remarks: this.itemremarks,
        valuation_type: this.valutionType,
        storage_location: this.storageLocation,
        // batch_number: this.batchno,

        command: "edt",
        number: this.editednumber,
      };
      this.custservice.addOutGatePassNrgp2(obj).subscribe((res: any) => {
        if (res && res["status_code"] == "200") {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.saveddataarray = [];
          this.dataSource.data = [];
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.storageLocation = [];
          this.ReqQTY = [];
          this.qty = [];
          this.itemremarks = [];
          // this.batchno = [];
          this.smsdata = "";
          this.smsdata1="";
          this.getNRGP2list();
          this.editModel.reason = "";
          this.resultNrgp2number = this.editednumber;
          if (this.fileUploadUrlsgt.length > 0) {
            this.uploadselectedfiles();
          }
          this.btn = "Save";
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.storageLocation = [];
          this.ReqQTY = [];
          this.qty = [];
          this.itemremarks = [];
          // this.batchno = [];
        }
      });
    }
  }
  addNrgp2(data: any) {
    this.dialog.open(data, {
      width: "1100px",
    });
  }
  closemodel() {
    this.dialog.closeAll();
  }

  getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100,
      pid: 1,
      key: this.selectedmaterial || this.selectedmaterial1,
    };
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data;
    });
  }
  getmaterialDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedmaterial = ev.target.value;
    if (this.selectedmaterial.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterial) {
      this.getmasterdata();
    }
  }
  selectedmastergroup() {
    console.log(this.model.matcode);
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.model.matcode) {
        this.model.uom = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });
    this.getSMSdata();
  }
  getstorageDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedstorage = ev.target.value;
    if (this.selectedstorage.length > 2) {
      this.getstoragelocData();
    }
  }
  getstoragelocData() {
    let obj = {
      command: "mat",
      field: "storage_location",
      key: this.selectedstorage,
    };
    this.custservice.getmatstoragelocdata(obj).subscribe((res: any) => {
      this.storageData = res.data;
    });
  }
  keyPressNumbers(evt: any) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  getvalutionData() {
    let obj = {
      lmt: 100000,
      pid: 1,
      command: "lst",
      key: "",
    };
    this.custservice.getvalutiondata(obj).subscribe((res: any) => {
      this.valutiondata = res.data;
    });
  }
  saveaddeddata() {
    this.model["material_code"] = this.materialCODE;
    this.model["material_description"] = this.materialNAME;
    console.log(this.model);

    // this.editDATAA=true;
    this.saveddataarray.push(this.model);
    console.log(this.saveddataarray);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
    this.model = {};
    this.smsdata = "";
    this.smsdata1="";
    this.dialog.closeAll();
  }
  editdata(row1: any, index: any, data: any) {
    // this.editDATAA=false
    console.log(row1);

    this.selectedIndex = this.saveddataarray.indexOf(row1);
    console.log(this.selectedIndex);
    this.dialog.open(data, {
      width: "1100px",
    });
    this.masterData.forEach((ele: any) => {
      if (ele.code == row1.material_code) {
        this.systemref = ele.system_reference_1;
      }
    });
    this.model2.matcode = this.systemref || row1.matcode;
    this.model2.uom = row1.uom || row1.unit_of_measurment;
    this.model2.storagelocation = row1.storagelocation || row1.storage_location;
    this.model2.reqqty = row1.reqqty || row1.request_quantity;
    this.model2.qty = row1.qty || row1.quantity;
    this.model2.itemremarks = row1.itemremarks || row1.item_remarks;
    // this.model2.batchno = row1.batchno || row1.batch_number;
    this.model2.valutiontype = row1.valutiontype || row1.valuation_type;
  }

  getmaterialDATA1(ev: any) {
    this.selectedmaterial1 = ev.target.value;
    if (this.selectedmaterial1.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterial1) {
      this.getmasterdata();
    }
  }
  selectedmastereditgroup() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.model2.matcode) {
        this.model2.uom = el.uom_1;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    this.getSMSdata();
    console.log(this.model2matcode, this.model2matdes);
  }
  getstorageDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedstorage1 = ev.target.value;
    if (this.selectedstorage1.length > 2) {
      this.getstoragelocData();
    }
  }
  saveaddededitdata(fr: any) {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.model2.matcode) {
        this.model2matcode = el.code;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    this.model2["material_code"] = this.materialCODE;
    this.model2["material_description"] = this.materialNAME;
    this.saveddataarray.splice(this.selectedIndex, 1, this.model2);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);

    this.saveddataarray[this.selectedIndex].matcode = this.model2matcode;

    this.model2 = {};
    this.smsdata = "";
    this.smsdata1="";
    this.dialog.closeAll();
  }
  deleterow(index: any) {
    this.saveddataarray.splice(index, 1);
    console.log(this.saveddataarray);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
  }
  getNRGP2list() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custservice.getNrgp2DataList(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }
  editNrgp2Data(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px",
    });
    this.editednumber = data.number;
    console.log(this.editednumber);
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      number: this.editednumber,
    };
    this.custservice.editNrgp2Data(obj).subscribe((res: any) => {
      console.log(res);
      this.dialog.closeAll();
      this.editdataa = res.data[0];
      this.saveddataarray = res.data;
      this.dataSource.data = this.saveddataarray;
      (this.model1.wonumber = this.editdataa.work_order_number),
        (this.model1.date = moment(this.editdataa.date).format("YYYY-MM-DD")),
        (this.model1.reqnumber = this.editdataa.request_number),
        (this.model1.reqdate = moment(this.editdataa.request_date).format(
          "YYYY-MM-DD"
        )),
        (this.model1.receivername = this.editdataa.receiver_name),
        // (this.model1.ttype = this.editdataa.Transfer_type),
        (this.model1.expectedredate = moment(
          this.editdataa.expected_return_date
        ).format("YYYY-MM-DD")),
        (this.model1.vehnumber = this.editdataa.vehicle_number),
        (this.model1.tname = this.editdataa.transporter_name),
        (this.model1.lrnumber = this.editdataa.lr_number),
        (this.model1.lrdate = moment(this.editdataa.lr_date).format(
          "YYYY-MM-DD"
        )),
        (this.model1.cmts = this.editdataa.comments),
        (this.model1.cosignee = this.editdataa.consignee_name),
        (this.model1.purpose = this.editdataa.purpose),
        (this.model1.location = this.editdataa.locations),
        (this.demo1TabIndex = 0);
      this.btn = "Update";
    });
  }
  deleteNrgp2Item(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
    });
    this.deleteNumber = rw.number;
  }
  deleteFile() {
    let obj = {
      command: "del",
      number: this.deleteNumber,
      reason: this.deletemodel.reason,
    };
    this.custservice.deleteNrgp2List(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.deletemodel.reason = "";
        this.getNRGP2list();
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
  printNRGP2(data: any) {
    console.log(data.number);
    this.router.navigate(["/inventory2/printoutgatepassrgp2nrgp"], {
      queryParams: { ogpnumber: data.number },
    });
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: "800px",
    });
    this.nrgp2num = row1.number;
    this.getexistingfiles();
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.nrgp2num)
      .set("document_type", "Out Gate Pass NRGP2");
    // let obj={
    //   "document_number" : this.dmrnumber,
    //   "document_type": "Daily Material Receipt"
    // }
    this.custservice.getexistingfies(params).subscribe((res: any) => {
      console.log(res);
      if (res && res["status_code"] == "200") {
        this.filedata = res.data;
        this.createNewFile.fileName = "";
      } else {
        this.filedata = "";
        console.log(this.filedata);
      }
    });
  }
  viewDoc(file: any) {
    const url = this.imageUrl + "/" + file.file_path;
    window.open(url, "_blank");
  }
  deleterowfile(row: any, data: any) {
    this.deleteid = data.id;
    this.dialogRef = this.dialog.open(row, {
      width: "400px",
    });
  }
  deleteexistingfile() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.nrgp2num)
      .set("document_type", "Out Gate Pass")
      .set("id", this.deleteid);
    this.custservice.deletefiles(params).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", "File Deleted Successfully");
        this.getexistingfiles();
        this.dialogRef.close();
      } else {
        this.alertcall.showWarning("Error", res["message"]);
      }
    });
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getNRGP2list();
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
        this.filenamearray1.push(file.name);
      }
    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type", "Out Gate Pass NRGP2");
    postData.append("document_number", this.nrgp2num);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file);
    }

    let obj = {
      document_type: "Out Gate Pass NRGP2",
      document_number: this.nrgp2num,
      doc: this.fileUploadUrls,
    };
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);
        this.getexistingfiles();
        this.filenamearray1 = [];
      } else {
        this.alertcall.showWarning("Error", res["message"]);
      }
    });
  }
  uploadgtfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsgt = fileInput.target.files;
      for (const file of this.fileUploadUrlsgt) {
        this.filenamearray.push(file.name);
        this.selectedfiles.push(file);
      }
    }
  }
  uploadselectedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Out Gate Pass");
    postData.append("document_number", this.resultNrgp2number);
    for (const file of this.selectedfiles) {
      postData.append("doc", file);
    }

    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.filenamearray = [];
        this.selectedfiles = [];
        this.fileUploadUrlsgt = [];
      } else {
      }
    });
  }
  onChange() {
    console.log("Selected:", this.columnname);
    this.searchData = "";
  }
  search() {
    console.log(this.searchData);
    let obj = {
      command: "lst",
      field: this.columnname,
      key: this.searchData,
      lmt: this.pageSize,
      pid: this.pageIndex,
    };
    if (this.searchData.length > 2) {
      this.custservice.getNRGP2searchData(obj).subscribe((res: any) => {
        this.reaData = false;
        this.totalRecords = res?.count;
        this.dataSourcemain.data = res.data;
        if (res.data.length == 0) {
          this.reaData = true;
        }
      });
    } else if (!this.searchData) {
      this.getNRGP2list();
      this.columnname = "";
    }
  }
    //activity log
    getlogdata() {
      let obj = {
        command: "log",
        key: "OutGatePassNRGP2"
      }
      this.custservice.getActivityLog(obj).subscribe((res: any) => {
        if (res.log.length > 0) {
          this.logdata = res.log
        }
      })
    }
  getSMSdata() {
    let obj = {
      material_code: this.materialCODE,
      command: "sms",
    };
    this.custservice.getsmsdata2(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res["status_code"] == "200") {
        console.log(res);

        this.smsdata = res.message;
        this.smsdata1=res.storage_locations;
      } else {
        this.smsdata = "";
        this.smsdata1="";
        this.alertcall.showWarning("Warning", res["message"]);
      }
    });
  }
}
