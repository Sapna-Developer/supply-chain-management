import { Component, Injector, OnInit } from '@angular/core';
import { CustomerService } from "src/app/services/customer.service";
import * as moment from "moment";
import Swal from "sweetalert2";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-gateinward',
  templateUrl: './gateinward.component.html',
  styleUrls: ['./gateinward.component.scss']
})
export class GateinwardComponent implements OnInit {
  activitylogcolumns :any[]=[
    "sno",
    "username",
    "created_date",
    "reference_number",
    "description",
    "remarks",
    // "reason",
    "action",
  ];
  reaDatalog: boolean;
  totalRecordslog: any;
  dataSourcemainlog = new MatTableDataSource();
  //SCANER
  public scannerEnabled: boolean = true;
  public information: string = "";
  doc_no: any;
  doc_name: any;
    // selecteddocumentNumb: any;
  
  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "";
    this.information = $event;
  }
  
  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "";
  }
  //END
  displayedColumns: any[] = [
    "sno",
    "materialCode",
    "materialDescription",
    "unit_of_measurement",
    "quantity",
    "action",
  ];
  displayedColumns1: any[] = [
    "GateEntryNumber",
    "Date",
    "company_Name",
    "document_type",
    "gateId",
    "vendor_name",
    // 'issue_type',
    // 'ActiveStatus',
    "action",
  ];
  gateinnumber: any;
  filedata: any;
  deleteid: any;
  fileUploadUrls: any[] = []
  resultginumber: any;
  editednumber: any;
  editModel: any = {}
  editdataa: any;
  demo1TabIndex: any = 0
  btn: any = "Save"
  logdata: any;
  selectedvendor: any;
  selectedrgpnumber: any;
  rgpnumber: any;
  rgpdata: any;
  selecteddocumentNumb: any;
  constructor(
    private dialog: MatDialog,
    private custservice: CustomerService,
    private alertcall: AlertCallsService,
    private router: Router,
    private route: ActivatedRoute, private injector: Injector
  ) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }
  dialogRef: any = null;
  comments: any;
  time: any;
  companyname: any;
  documenttype: any;
  documentnumber: any;
  gateid: any;
  guardname: any;
  carriername: any;
  vehiclenumber: any;
  carriercontactnumber: any;
  vendorname: any;
  remarks: any;
  documentdate: any;
  matName: any[] = [];
  matCodee: any[] = []
  UOM: any[] = [];
  qty: any[] = [];
  SNO: any[] = [];
  matCode: any[] = [];

  dialogdata: any = {};
  formdata: any = {};
  dataSource = new MatTableDataSource();
  dataSourcemain = new MatTableDataSource();
  companyData: any;
  vendorData: any;
  formdatatotablearray: any[] = [];
  material_description: any[] = [];
  selectedIndex: any;
  finaldataarray: any[] = [];
  editeddialogdata: any = {};
  masterData: any;
  selectedmaterial: any;
  selectedmaterialedit: any;
  systemref: any;
  materialCODE: any;
  materialNAME: any;
  editeddialogdatamatcode: any;
  editeddialogdatamatdes: any;
  editdialogdata: any = {};
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  deleteNumber: any;
  deletemodel: any = {}
  createNewFile: any = {}
  imageUrl = environment.base_url
  fileUploadUrlsgi: any[] = []
  selectedfiles: any[] = []
  filenamearray: any[] = []
  filenamearray1: any[] = []
  initialdata: any = true;
  editeddata: any = false;
  documentTypes: any = []
  documentNumbers: any = []
  tableDta: any = []
  masterDataList: any = []
  ngOnInit(): void {
    this.formdata.date = moment(new Date()).format("YYYY-MM-DD")
    this.formdata.documentdate = moment(new Date()).format("YYYY-MM-DD")
    let now = new Date();
    let hours = ("0" + now.getHours()).slice(-2);
    let minutes = ("0" + now.getMinutes()).slice(-2);
    let str = hours + ':' + minutes;
    this.formdata.time = str;
    this.route.queryParams.subscribe((params: any) => {
      if (params.tab == "notificationsissue") {
        this.demo1TabIndex = 1;
      } else {
        this.demo1TabIndex = 0;
      }
    });
    this.getData();
    this.getcompanydata();
    this.getvendordata();
    this.getmasterdata();
    this.getlogdata()
    this.getDocumentTypeslist()
    this.getmasterdatalist()
    this.getpoData()
  }
  getlogdata() {
    let obj = {
      command: "log",
      key: "GateInward"
    }
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      console.log(res);
      this.logdata = res.log;
      this.reaDatalog = false;
    this.totalRecordslog = res?.count;
    this.dataSourcemainlog = res.log;
    console.log(this.dataSourcemainlog);
    if (res.log.length == 0) {
      this.reaDatalog = true;
    }
    })
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.gateinnumber = row1.number
    this.getexistingfiles()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.gateinnumber,)
      .set("document_type", "Gate Inward")
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
      .set("document_number", this.gateinnumber,)
      .set("document_type", "Gate Inward")
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
        this.filenamearray1.push(file.name)
      }
    }
    const postData = new FormData();
    postData.append("document_type", "Gate Inward");
    postData.append("document_number", this.gateinnumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file)
    }

    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", res['message'])
        this.getexistingfiles()
        this.filenamearray1 = []
        this.fileUploadUrls = []
      } else {
        this.alertcall.showWarning("Error", res['message'])
      }
    })
  }
  uploadgifiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsgi = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for (const file of this.fileUploadUrlsgi) {
        this.filenamearray.push(file.name)
        this.selectedfiles.push(file)
      }
    }

  }
  uploadselectedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Gate Inward");
    postData.append("document_number", this.resultginumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file)
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.fileUploadUrlsgi = []
        this.filenamearray = []
        this.selectedfiles = []

      } else {

      }
    })
  }
  // get company name in dropdown1
  getcompanydata() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1
    };
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data;
    });
  }

  // validate number2
  // validateNumber(event: any) {
  //   var charCode = event.which ? event.which : event.keyCode;
  //   // Only Numbers 0-9
  //   if (charCode < 48 || charCode > 57) {
  //     event.preventDefault();
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // get vendor name in dropdown3
  getvendordata() {
    let obj = {
      command: "lst",
      key: this.selectedvendor
    };
    this.custservice.addvendormaster(obj).subscribe((res: any) => {
      this.vendorData = res.data;
    });
  }

  //final save button4
  savefinaldata(fr: any) {
    if (this.btn === "Save") {
      this.formdatatotablearray.forEach((ele: any, index) => {
        this.SNO.push(index + 1);
        this.matName.push(ele.material_description);
        this.matCodee.push(ele.material_code);
        this.UOM.push(ele.uom || ele.unit_of_measurment);
        this.qty.push(Number(ele.qty || ele.quantity));
      });
      let obj = {
        command: "add",
        comments: this.formdata.comments,
        date: moment(this.formdata.dateee).format("YYYY-MM-DD"),
        time: this.formdata.time,
        company_name: this.formdata.companyname,
        document_type: this.formdata.documenttype,
        document_number: this.formdata.documentnumber,
        gate_id: this.formdata.gateid,
        guard_name: this.formdata.guardname,
        carrier_name: this.formdata.carriername,
        vehicle_number: this.formdata.vehiclenumber,
        carrier_contact_number: this.formdata.carriercontactnumber,
        vendor_name: this.formdata.vendorname,
        remarks: this.formdata.remarks,
        document_date: this.formdata.documentdate,
        material_description: this.matName,
        material_code: this.matCodee,
        unit_of_measurment: this.UOM,
        quantity: this.qty,
        // material_code: this.matCode,
      };
      this.custservice.addGateInwardData(obj).subscribe((res: any) => {
        if (res && res["status_code"] == "200") {
          this.alertcall.showSuccess("Accepted", res["message"]);
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.formdatatotablearray = [];
          this.dataSource.data = [];
          this.SNO = [];
          this.matName = [];
          this.UOM = [];
          this.qty = [];
          this.matCodee = []
          this.getData();
          this.getlogdata()
          this.resultginumber = res['reference']
          if (this.fileUploadUrlsgi.length > 0) {
            this.uploadselectedfiles()
          }
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.SNO = [];
          this.matName = [];
          this.UOM = [];
          this.qty = [];
          this.matCodee = []
        }
      });
    } else {
      this.formdatatotablearray.forEach((ele: any, index) => {
        this.SNO.push(index + 1);
        this.matName.push(ele.material_description);
        this.matCodee.push(ele.material_code)
        this.UOM.push(ele.uom || ele.unit_of_measurment);
        this.qty.push(Number(ele.qty || ele.quantity));
      });
      let obj = {
        reason: this.editModel.reason,
        command: "edt",
        number: this.editednumber,
        comments: this.formdata.comments,
        date: moment(this.formdata.dateee).format("YYYY-MM-DD"),
        time: this.formdata.time,
        company_name: this.formdata.companyname,
        document_type: this.formdata.documenttype,
        document_number: this.formdata.documentnumber,
        gate_id: this.formdata.gateid,
        guard_name: this.formdata.guardname,
        carrier_name: this.formdata.carriername,
        vehicle_number: this.formdata.vehiclenumber,
        carrier_contact_number: this.formdata.carriercontactnumber,
        vendor_name: this.formdata.vendorname,
        remarks: this.formdata.remarks,
        document_date: this.formdata.documentdate,
        material_description: this.matName,
        material_code: this.matCodee,
        unit_of_measurment: this.UOM,
        quantity: this.qty,
        // material_code: this.matCode,
      };
      this.custservice.addGateInwardData(obj).subscribe((res: any) => {
        if (res && res["status_code"] == "200") {
          this.alertcall.showSuccess("Accepted", res["message"]);
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.formdatatotablearray = [];
          this.dataSource.data = [];
          this.SNO = [];
          this.matName = [];
          this.UOM = [];
          this.qty = [];
          this.matCodee = []
          this.getData();
          this.getlogdata()
          this.editModel.reason = ""
          this.resultginumber = this.editednumber
          if (this.fileUploadUrlsgi.length > 0) {
            this.uploadselectedfiles()
          }
          this.initialdata = true;
          this.editeddata = false;
          this.btn = "Save"
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.SNO = [];
          this.matName = [];
          this.UOM = [];
          this.qty = [];
          this.matCodee = []
        }
      });
    }
  }

  // add button to open gate inward dialogbox5
  addgateinward(data: any) {
    this.dialog.open(data, {
      width: "1000px",
    });
    this.getmasterdata();
  }

  // close gateinward dialogbox6
  closedialogdata() {
    this.dialog.closeAll();
  }

  // add the binded data in dialogbox to table7
  binddatatotable(form: any) {
    this.dialogdata["material_code"] = this.materialCODE;
    this.dialogdata["material_description"] = this.materialNAME;

    // this.editDATAA=true;
    this.formdatatotablearray.push(this.dialogdata);

    this.dataSource.data = this.formdatatotablearray;
    this.dialogdata = {};
    // this.smsdata = "";
    this.dialog.closeAll();
  }
  // dropdown for description
  getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100,
      pid: 1,
      key: this.selectedmaterial || this.selectedmaterialedit,
    };
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      this.masterData = res.data;
    });
  }
  getmasterdatalist() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
      key: "",
    };
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      this.masterDataList = res.data;
    });
  }
  filterdata(ev: any) {
    this.selectedmaterial = ev.target.value;
    if (this.selectedmaterial.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterial) {
      this.getmasterdata();
    }
  }
  selectedmaterialuom() {
    this.masterDataList.forEach((ele: any) => {
      if (ele.system_reference_1 == this.dialogdata.matcode) {
        this.dialogdata.uom = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });

    // this.getSMSdata();
  }
  // selectedqty() {
  //   if (this.dialogdata.qty > this.dialogdata.reqqty) {
  //     this.alertcall.showWarning(
  //       "Accepted",
  //       "Quantity Not More Than Request Quantity"
  //     );
  //   }
  //   console.log(this.dialogdata.qty);
  // }

  // edit gateinward dialogbox and update in table8
  editgateinwarddata(row1: any, index: any, data: any) {
    console.log(row1);

    // this.editDATAA=false

    this.selectedIndex = this.formdatatotablearray.indexOf(row1);
    this.dialog.open(data, {
      width: "1000px",
    });
    this.masterDataList.forEach((ele: any) => {
      if (ele.code == row1.material_code) {
        console.log("entered");

        this.systemref = ele.system_reference_1;
      }
    });
    this.editeddialogdata.matcode = this.systemref || row1.matcode
    this.editeddialogdata.uom = row1.uom || row1.unit_of_measurment;

    this.editeddialogdata.qty = row1.qty || row1.quantity;

    this.getmasterdata();
  }

  // close edited dialog box9
  closeeditdialogdata() {
    this.dialog.closeAll();
  }

  //edit the table content and update the editicon10
  editbindedDatatotable() {
    this.masterDataList.forEach((el: any) => {
      if (el.system_reference_1 == this.editeddialogdata.matcode) {
        this.editeddialogdatamatcode = el.code;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    this.editeddialogdata["material_code"] = this.materialCODE;
    this.editeddialogdata["material_description"] = this.materialNAME;
    this.formdatatotablearray.splice(
      this.selectedIndex,
      1,
      this.editeddialogdata
    );
    this.dataSource.data = this.formdatatotablearray;

    this.formdatatotablearray[this.selectedIndex].matcode =
      this.editeddialogdatamatcode;

    this.editeddialogdata = {};
    // this.smsdata = "";
    this.dialog.closeAll();
  }

  // delete the row data in the table11
  deleterowData(index: any) {
    this.formdatatotablearray.splice(index, 1);
    this.dataSource.data = this.formdatatotablearray;
    this.finaldataarray = [];
    // console.log(this.dataSource.data)
    // this.dataSource.data = new MatTableDataSource(this.count);
  }
  editfilterdata(ev: any) {
    this.selectedmaterialedit = ev.target.value;
    if (this.selectedmaterialedit.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterialedit) {
      this.getmasterdata();
    }
  }
  selectedmaterialuomedit() {
    this.masterDataList.forEach((el: any) => {
      if (el.system_reference_1 == this.editeddialogdata.matcode) {
        this.editeddialogdata.uom = el.uom_1;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    // this.getSMSdata();
  }
  keyPressNumbers(evt: any) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  onSelectionChange(ev: any) { }
  getData() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custservice.getGateInwardData(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
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
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }
  deleteFile() {
    let obj = {
      command: "del",
      number: this.deleteNumber,
      "reason": this.deletemodel.reason
    };
    this.custservice.deleteGateInwardData(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.deletemodel.reason = ""
        this.getData();
        this.getlogdata()
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
  editgidata(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px"
    })
    this.editednumber = data.number
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      // field: "number",
      key: this.editednumber,
    }
    this.custservice.addGateInwardData(obj).subscribe((res: any) => {
      this.dialog.closeAll()
      this.editdataa = res.data[0]
      this.formdatatotablearray = res.data
      this.dataSource.data = this.formdatatotablearray
      this.formdata.comments = this.editdataa.comments,
        this.formdata.dateee = moment(this.editdataa.comments).format("YYYY-MM-DD"),
        this.formdata.time = this.editdataa.time,
        this.formdata.companyname = this.editdataa.company_name,
        this.formdata.documenttype = this.editdataa.document_type,
        this.formdata.documentnumber = this.editdataa.document_number,
        this.formdata.gateid = this.editdataa.gate_id,
        this.formdata.guardname = this.editdataa.guard_name,
        this.formdata.carriername = this.editdataa.carrier_name,
        this.formdata.vehiclenumber = this.editdataa.vehicle_number,
        this.formdata.carriercontactnumber = this.editdataa.carrier_contact_number,
        this.formdata.vendorname = this.editdataa.vendor_name,
        this.formdata.remarks = this.editdataa.remarks,
        this.formdata.documentdate = moment(this.editdataa.document_date).format("YYYY-MM-DD"),
        this.demo1TabIndex = 0;
      this.btn = "Update"
      this.initialdata = false;
      this.editeddata = true;
    })
  }

  getdocumentdata(ev:any){
    this.selecteddocumentNumb=ev.target.value
    if(this.selecteddocumentNumb.length>2){
      this.getSelectedDocument()
    }if(!this.selecteddocumentNumb){
      this.getSelectedDocument()
    }
      }
  getSelectedDocument() {
    this.documentNumbers = []
    let obj = {
      "command": "doc",
      "document_type": this.formdata.documenttype ,
      key: this.formdata.documentnumber 
    }
    this.custservice.addGateInwardData(obj).subscribe((res: any) => {
      if (res) {
        this.documentNumbers = res.data
      }
    })
  }
  getSelectedDocumentNum() {
    // console.log(this.formdata.documentnumber);
    let obj = {
      "command": "set",
      "document_type": this.formdata.documenttype || this.doc_name,
      "key": this.formdata.documentnumber || this.doc_no
    }
    this.custservice.addGateInwardData(obj).subscribe((res: any) => {
      if (res) {
        this.dialog.closeAll();
        this.tableDta = res.data
        this.formdatatotablearray = res.data
        this.dataSource.data = this.formdatatotablearray;
        this.formdata.vendorname = res.data[0].company_name
        this.formdata.companyname = res.data[0].consignee_name
      }
    })
  }
  getDocumentTypeslist() {
    let obj = {
      "command": "dtp"
    }
    this.custservice.addGateInwardData(obj).subscribe((res: any) => {
      if (res) {
        this.documentTypes = res.data
      }
    })
  }
  filtervendor(ev: any) {
    this.selectedvendor = ev.target.value;
    if (this.selectedvendor.length > 2) {
      this.getvendordata();
    }
    if (!this.selectedvendor) {
      this.getvendordata();
    }
    console.log(this.selectedvendor);
    
  }


  //rgp modal
  openpurchaseordermodel(data: any) {
    this.dialog.open(data, {
      width: '600px'
    })
  }
  getpurchaseorderDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedrgpnumber = ev.target.value
    if (this.selectedrgpnumber.length > 2) {
      this.getpoData()
    }
    if (!this.selectedrgpnumber) {
      this.getpoData()
    }
  }
  getpoData() {
    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.rgpnumber
    }
    this.custservice.getoutgatepassrgp(obj).subscribe((res: any) => {
      this.rgpdata = res.data
    })
  }
  //   submitpono(fr:any){
  // let obj={
  // "command": "mat",
  // // "key": this.ponumber,
  // "field":"number"
  // }
  // this.custservice.getpurchaseorderdata(obj).subscribe((res:any)=>{
  // this.poiddata=res.data
  // res.data.forEach((ele:any)=>{
  //   this.POID.push(ele.id)
  // })
  // console.log(this.POID);
  // this.saveddataarray=res.data
  // const newArrayOfObj = this.saveddataarray.map(({
  //     quantity: invoice_quantity,
  //     quantity:received_quantity,
  //     ...rest
  //   }) => ({
  //     invoice_quantity,
  //     received_quantity,
  //     ...rest
  //   }));
  // })
  // console.log(newArrayOfObj);
  // this.saveddataarray=newArrayOfObj
  //  this.dataSource.data=this.saveddataarray
  //  this.tabledata=res.data[0]
  // this.model1.companyname=this.tabledata.company_name
  // this.model1.dateee=moment(new Date()).format("YYYY-MM-DD")
  // this.model1.ponumber=this.tabledata.number
  // this.model1.podate=moment(this.tabledata.date).format("YYYY-MM-DD")
  // this.model1.genumber=this.tabledata.gate_entry_number
  // this.model1.invoicenumber=this.tabledata.invoice_number
  // this.model1.dcnumber=this.tabledata.dc_number
  // this.model1.vendorname=this.tabledata.vendor_name
  // this.model1.packdetails=this.tabledata.packing_details
  // this.model1.trsname=this.tabledata.transporter_name
  // this.model1.vnumber=this.tabledata.vehicle_number
  // this.model1.irnumber=this.tabledata.lr_number
  // this.model1.basicfreight=this.tabledata.basic_freight
  // this.model1.frtaxdescription=this.tabledata.freight_tax_description
  // this.model1.frtaxpercentage=this.tabledata.freight_tax_percent
  // this.model1.frtaxvalue=this.tabledata.freight_tax_value
  // this.model1.totalfreight=this.tabledata.total_freight
  // this.model1.othercharges=this.tabledata.other_charges_description
  // this.model1.otherchargesval=this.tabledata.other_charges_value
  // this.model1.othertaxdescription=this.tabledata.other_tax_description
  // this.model1.othertaxper=this.tabledata.other_tax_percent
  // this.model1.othertaxvalue=this.tabledata.other_tax_value
  // this.model1.qualitycheck=this.tabledata.quality_check
  // this.model1.comments=this.tabledata.comments
  // this.model1.waybillno=this.tabledata.waybillno
  // console.log(this.model1.vendorname);
  // this.SUM=0
  // this.saveddataarray.forEach((el:any)=>{
  //   this.SUM+= el.basic_price
  // })
  // console.log(this.SUM);
  // this.dialog.closeAll()
  // this.ponumber=''
  // this.copieddmr=''
  // this.model1.add({vendorname:this.editabledata.vendor_name})
  // })

  //   }


   //Scanner  model
   qrScanner(data: any) {
    this.dialog.open(data, {
      width: '400px',
    })
    this.information=""
    this.scannerEnabled=true
  }
  confirmQrCode(){
    if(this.information.length > 0){
      // console.log(this.information);
      // console.log(this.information.split(":"));
      this.doc_no=this.information.split(":")[1].split(",")[0];
      this.doc_name=this.information.split(":")[2];
      this.formdata.documenttype=this.doc_name
      this.formdata.documentnumber=this.doc_no
      setTimeout(() => {
        this.getSelectedDocumentNum()
      }, 100);
      // this.getSelectedDocument()
    }
    else{
      this.alertcall.showWarning("Warning", "Please Scan QR Code");
    }
  }


}
