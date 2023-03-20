import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "src/app/services/customer.service";
import * as moment from "moment";
import Swal from "sweetalert2";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-fuelreceiptnote2',
  templateUrl: './fuelreceiptnote2.component.html',
  styleUrls: ['./fuelreceiptnote2.component.scss']
})
export class Fuelreceiptnote2Component implements OnInit {
 
  displayedColumns: any[] = [
    "lineItem",
    "requestnumber",
    "materialcode",
    "materialDescription",
    "unitofMeasurement",
    "receivedQuantity",
    "invoiceQuantity",
    "unitPrice",
    "basicPrice",
    "action",
  ];
  displayedColumns1: any[] = [
    "sno",
    "Date",
    "Number",
    // "CompanyName",
    "VendorName",
    "action",
  ];
  demo1TabIndex: any = 0;
  CompanyData: any;
  dataSource = new MatTableDataSource();
  VendorData: any;
  selectCompanyName: any;
  selectedVendorName: any;
  masterData: any;
  selectedmaterial: any;
  material_code: any[] = [];
  saveddataarray: any[] = [];
  addmodel: any = {};
  inputmodel: any = {};
  line_item: any[] = [];
  confirm_number: any[] = [];
  material_description: any[] = [];
  unit_of_measurement: any[] = [];
  invoice_quantity: any[] = [];
  basic_price: any[] = [];
  quantity: any[] = [];
  received_quantity: any[] = [];
  unit_price: any[] = [];
  materialCODE: any;
  materialNAME: any;
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  dataSourcemain = new MatTableDataSource();
  data_for_edit: any;
  editednumber: any;
  editModel: any = {};
  editdataa: any;
  btn: any = "Save";
  deleteNumber: any;
  deleteModel: any = {};
  deletecn: any[] = [];
  filenamearray1: any[] = [];
  fileUploadUrlspr: any[] = [];
  selectedfiles: any[] = [];
  resultFrnnumber: any;
  frnnumber: any;
  filedata: any;
  createNewFile: any = {};
  imageUrl = environment.base_url;
  deleteid: any;
  dialogRef: any = null;
  fileUploadUrls: any[] = [];
  filenamearray: any[] = [];
  selectedIndex: number;
  systemref: any;
  editaddmodel: any = {};
  selectedmaterialedit: any;
  selectedcfrm: any;
  cfrmData: any;
  qtyData: any;
  seletedcfrmvalue: any;
  editselectcfrmvalue: any;
  selectedPOnumber: any;
  purchaseOrderData: any[]=[];
  logdata: any;
  constructor(
    private custService: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService
  ) { }

  ngOnInit(): void {
    // this.getCompanyData();
    this.getVendorData();
    this.getmasterdata();
    this.getFuelReceiptList();
    this.getcfrmData();
    this.getPurchaseOrderData();
    this.getlogdata();
  }
  // getCompanyData() {
  //   let obj = {
  //     command: "lst",
  //     key: this.selectCompanyName,
  //   };
  //   this.custService.getcompanymasterdata(obj).subscribe((res: any) => {
  //     this.CompanyData = res.data;
  //     console.log(this.CompanyData);
  //   });
  // }
  getVendorData() {
    let obj = {
      command: "lst",
      key: this.selectedVendorName,
    };
    this.custService.getvendormasterdata(obj).subscribe((res: any) => {
      this.VendorData = res.data;
      console.log(this.VendorData);
    });
  }
  addFuelInwardModel(data: any) {
    this.dialog.open(data, {
      width: "1050px",
    });
  }
  closemodel() {
    this.dialog.closeAll();
  }
  // filterCompanyData(ev: any) {
  //   this.selectCompanyName = ev.target.value;
  //   console.log(ev.target.value);
  //   if (this.selectCompanyName > 2) {
  //     this.getCompanyData();
  //   } else {
  //     this.getCompanyData();
  //   }
  // }
  // getCompanyCode() {
  //   this.CompanyData.forEach((ele: any) => {
  //     console.log(ele);

  //     if (this.inputmodel.company_name == ele.name) {
  //       this.inputmodel.company_code = ele.code;
  //     }
  //   });
  // }
  filterVendorData(ev: any) {
    this.selectedVendorName = ev.target.value;
    console.log(ev.target.value);
    if (this.selectedVendorName > 2) {
      this.getVendorData();
    } else {
      this.getVendorData();
    }
  }
  getVendorCode() {
    this.VendorData.forEach((ele: any) => {
      console.log(ele);

      if (this.inputmodel.vendor_name == ele.name) {
        this.inputmodel.vendor_code = ele.code;
      }
    });
  }
  getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
      key: this.selectedmaterial,
    };
    this.custService.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data;
    });
  }
  filterMaterialData(ev: any) {
    this.selectedmaterial = ev.target.value;
    if (this.selectedmaterial > 2) {
      this.getmasterdata();
    } else {
      this.getmasterdata();
    }
  }
  getMaterialGroup() {
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.addmodel.material_code_des) {
        this.addmodel.unit_of_measurement = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });
  }
  editfilterMaterialData(ev: any) {
    this.selectedmaterialedit = ev.target.value;
    if (this.selectedmaterialedit.length > 2) {
      this.getmasterdata();
    } else {
      this.getmasterdata();
    }
  }
  editgetMaterialGroup() {
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.editaddmodel.material_code_des) {
        this.editaddmodel.unit_of_measurement = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });
  }
  filtercfrmdata(ev: any) {
    this.selectedcfrm = ev.target.value
    if (this.selectedcfrm.length > 2) {
      this.getcfrmData()
    }
    if (!this.selectedcfrm) {
      this.getcfrmData()
    }
  }
  getcfrmData() {
    let obj = {
      "command": "con",
    }
    this.custService.getconfrimationnodata2(obj).subscribe((res: any) => {
      this.cfrmData = res.data
      this.getQuantitydata()
    })
  }
  selectedcfrmno() {
    this.seletedcfrmvalue = this.addmodel.confirm_number;
    this.getQuantitydata();
  }
  getPurchaseOrderData() {
    let obj = {
      "command": "lst",
      "lmt": 100,
      "pid": 1,
      "key": this.selectedPOnumber
    }
    this.custService.getpurchaseorderdata(obj).subscribe((res: any) => {
      console.log(res)
      this.purchaseOrderData = res.data
    })
  }
  filterPurchaseOrderData(ev: any) {
    this.selectedPOnumber = ev.target.value
    if (this.selectedPOnumber.length > 2) {
      this.getPurchaseOrderData()
    }
    if (!this.selectedPOnumber) {
      this.getPurchaseOrderData()
    }
  }

  getQuantitydata() {
    let obj = {
      "command": "mat",
      "key": this.seletedcfrmvalue
    }
    this.custService.getQuantityData2(obj).subscribe((res: any) => {
      if (res) {
        this.qtyData = res.data[0]
        this.addmodel.filled_quantity= this.qtyData.filled_quantity;
        this.addmodel.balanced_quantity = this.qtyData.filled_quantity - this.qtyData.receipt_quantity;
        this.materialCODE=this.qtyData.material_code
        this.materialNAME=this.qtyData.material_description
        this.addmodel.material_code_des = this.qtyData.material_code + "-" + this.qtyData.material_description
        this.addmodel.unit_of_measurement = this.qtyData.unit_of_measurement
        // this.addmodel.billed_quantity=this.qtyData.
      }
    })
  }
  geteditQuantitydata() {
    this.editselectcfrmvalue=this.confirm_number 
    console.log(this.editselectcfrmvalue);
    
    let obj = {
      "command": "mat",
      "key": this.editselectcfrmvalue
    }
    this.custService.getQuantityData(obj).subscribe((res: any) => {
      if (res) {
        this.qtyData = res.data[0]
        console.log(this.qtyData);
        
        this.editaddmodel.filled_quantity= this.qtyData.filled_quantity;
        this.editaddmodel.balanced_quantity = this.qtyData.filled_quantity - this.qtyData.receipt_quantity;
      
        // this.addmodel.billed_quantity=this.qtyData.
      }
    })
  }
  saveadddata() {
    this.addmodel["material_code"] = this.materialCODE;
    this.addmodel["material_description"] = this.materialNAME;
    
    console.log(this.addmodel);
    this.saveddataarray.push(this.addmodel);
    console.log(this.saveddataarray);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
    this.addmodel = {};
    this.dialog.closeAll();
  }
  savefinaldata(fr: any) {
    if (this.btn === "Save") {
      // this.saveddataarray.push(this.inputmodel);
      console.log(this.saveddataarray);
      this.saveddataarray.forEach((ele: any, index) => {
        console.log(ele);
        this.line_item.push(index + 1);

        this.material_code.push(ele.material_code);
        this.material_description.push(ele.material_description);
        this.unit_of_measurement.push(ele.unit_of_measurement);
        this.basic_price.push(Number(ele.basic_price));
        this.invoice_quantity.push(Number(ele.invoice_quantity));
        this.confirm_number.push(ele.confirm_number);
        this.received_quantity.push(Number(ele.received_quantity));
        this.unit_price.push(Number(ele.unit_price));
      });
      let obj = {
        command: "add",
        invoice_number: this.inputmodel.invoice_number,
        date: moment(this.inputmodel.date).format("YYYY-MM-DD"),
        invoice_date: moment(this.inputmodel.invoice_date).format("YYYY-MM-DD"),
        vehicle_number: this.inputmodel.vehicle_number,
        driver_name: this.inputmodel.driver_name,
        // company_name: this.inputmodel.company_name,
        // company_code: this.inputmodel.company_code,
        indent_number: this.inputmodel.indent_number,
        indent_date: moment(this.inputmodel.indent_date).format("YYYY-MM-DD"),
        transporter_name: this.inputmodel.transporter_name,
        e_way_bill: this.inputmodel.e_way_bill,
        vendor_name: this.inputmodel.vendor_name,
        vendor_code: this.inputmodel.vendor_code,
        gate_entry_number: this.inputmodel.gate_entry_number,
        gate_entry_date: this.inputmodel.gate_entry_date,
        lr_number: this.inputmodel.lr_number,
        lr_date: moment(this.inputmodel.lr_date).format("YYYY-MM-DD"),
        purchase_order_number:this.inputmodel.purchase_order_number,
        purchase_order_date: moment(this.inputmodel.purchase_order_date).format(
          "YYYY-MM-DD"
        ),
        tax_description: this.inputmodel.tax_description,
        tax_percent: Number(this.inputmodel.tax_percent),
        confirm_number: this.confirm_number,
        material_code: this.material_code,
        material_description: this.material_description,
        line_item: this.line_item,
        invoice_quantity: this.invoice_quantity,
        received_quantity: this.received_quantity,
        unit_price: this.unit_price,
        basic_price: this.basic_price,
        unit_of_measurement: this.unit_of_measurement,
      };
      this.custService.addfuelReceiptData2(obj).subscribe((res: any) => {
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

          this.line_item = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
          this.confirm_number = [];
          this.invoice_quantity = [];
          this.received_quantity = [];
          this.unit_price = [];
          this.basic_price = [];
          this.getFuelReceiptList();
          this.resultFrnnumber = res["reference"];
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.line_item = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
          this.confirm_number = [];

          this.invoice_quantity = [];
          this.received_quantity = [];
          this.unit_price = [];
          this.basic_price = [];
        }
      });
    }
    if (this.btn === "Update") {
      console.log(this.saveddataarray);
      console.log(this.addmodel);
      console.log(this.inputmodel);
      this.line_item = [];
      this.material_code = [];
      this.material_description = [];
      this.unit_of_measurement = [];
      this.confirm_number = [];
      this.invoice_quantity = [];
      this.received_quantity = [];
      this.unit_price = [];
      this.basic_price = [];

      this.saveddataarray.forEach((ele: any, index) => {
        console.log(ele);
        this.line_item.push(index + 1);

        this.material_code.push(ele.material_code);
        this.material_description.push(ele.material_description);
        this.unit_of_measurement.push(ele.unit_of_measurement);
        this.basic_price.push(Number(ele.basic_price));
        this.invoice_quantity.push(Number(ele.invoice_quantity));
        this.confirm_number.push(ele.confirm_number);
        this.received_quantity.push(Number(ele.received_quantity));
        this.unit_price.push(Number(ele.unit_price));
      });
      let obj = {
        reason: this.editModel.reason,
        command: "edt",
        created_by: "admin",
        updated_by: "admin",
        number: this.editednumber,
        invoice_number: this.inputmodel.invoice_number,
        date: moment(this.inputmodel.date).format("YYYY-MM-DD"),
        invoice_date: moment(this.inputmodel.invoice_date).format("YYYY-MM-DD"),
        vehicle_number: this.inputmodel.vehicle_number,
        driver_name: this.inputmodel.driver_name,
        // company_name: this.inputmodel.company_name,
        // company_code: this.inputmodel.company_code,
        indent_number: this.inputmodel.indent_number,
        indent_date: moment(this.inputmodel.indent_date).format("YYYY-MM-DD"),
        transporter_name: this.inputmodel.transporter_name,
        e_way_bill: this.inputmodel.e_way_bill,
        vendor_name: this.inputmodel.vendor_name,
        vendor_code: this.inputmodel.vendor_code,
        gate_entry_number: this.inputmodel.gate_entry_number,
        gate_entry_date: this.inputmodel.gate_entry_date,
        lr_number: this.inputmodel.lr_number,
        lr_date: moment(this.inputmodel.lr_date).format("YYYY-MM-DD"),
        purchase_order_number:this.inputmodel.purchase_order_number,
        purchase_order_date: moment(this.inputmodel.purchase_order_date).format(
          "YYYY-MM-DD"
        ),
        tax_description: this.inputmodel.tax_description,
        tax_percent: Number(this.inputmodel.tax_percent),
        tax_value: this.inputmodel.tax_value,
        total_value: Number(this.inputmodel.total_value),

        confirm_number: this.confirm_number,
        material_code: this.material_code,
        material_description: this.material_description,
        line_item: this.line_item,
        invoice_quantity: this.invoice_quantity,
        received_quantity: this.received_quantity,
        unit_price: this.unit_price,
        basic_price: this.basic_price,
        unit_of_measurement: this.unit_of_measurement,
      };

      this.custService.updateFuelReceipt2(obj).subscribe((res: any) => {
        if (res && res["status_code"] == "200") {
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
          this.line_item = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
          this.confirm_number = [];
          this.invoice_quantity = [];
          this.received_quantity = [];
          this.unit_price = [];
          this.basic_price = [];
          this.getFuelReceiptList();
          this.resultFrnnumber = this.editednumber;
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles();
          }
          this.editednumber = "";
          this.editModel.reason = "";
          // this.smsdata = "";
          this.btn = "Save";
        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.line_item = [];
          this.material_code = [];
          this.material_description = [];
          this.unit_of_measurement = [];
          this.confirm_number = [];
          this.invoice_quantity = [];
          this.received_quantity = [];
          this.unit_price = [];
          this.basic_price = [];
        }
      });
    }
  }
  getFuelReceiptList() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      // key: "",
    };
    this.custService.getFuelReceiptData2(obj).subscribe((res: any) => {
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
    this.getFuelReceiptList();
  }
  editdata(row1: any, index: any, data: any) {
    console.log(row1);
    this.geteditQuantitydata();
    this.selectedIndex = this.saveddataarray.indexOf(row1);
    console.log(this.selectedIndex);
    this.dialog.open(data, {
      width: "1100px",
      
    });
    this.getQuantitydata();
    this.masterData.forEach((ele: any) => {
      if (ele.code == row1.material_code) {
        this.systemref = ele.system_reference_1;
      }
    });
    this.editaddmodel.material_code_des =  row1.material_code+"-"+row1.material_description;
    // this.editaddmodel.material_code = row1.material_code;
    this.editaddmodel.vehicle_number = row1.vehicle_number;
    this.editaddmodel.unit_of_measurement = row1.unit_of_measurement;
    this.editaddmodel.confirm_number = row1.confirm_number;
    this.editaddmodel.invoice_quantity = row1.invoice_quantity;
    this.editaddmodel.received_quantity = row1.received_quantity;
    this.editaddmodel.unit_price = row1.unit_price;
    this.editaddmodel.basic_price = row1.basic_price;
    this.materialCODE=row1.material_code;
    this.materialNAME=row1.material_description;
  }
  saveaddededitdata(fr: any) {
    this.editaddmodel["material_code"] = this.materialCODE;
    this.editaddmodel["material_description"] = this.materialNAME;
    this.saveddataarray.splice(this.selectedIndex, 1, this.editaddmodel);
    console.log(this.saveddataarray);

    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);

    this.editaddmodel = {};

    //  this.smsdata = "";comments
    this.dialog.closeAll();
  }
  deleterow(index: any) {
    this.saveddataarray.splice(index, 1);
    this.dataSource.data = this.saveddataarray;
  }
  editListdata(data: any, dialog: any) {
    console.log(data);
    this.data_for_edit = data;
    this.dialog.open(dialog, {
      width: "400px",
    });
    this.editednumber = data.number;
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      number: this.editednumber,
    };

    this.custService.addfuelReceiptData2(obj).subscribe((res: any) => {
      this.dialog.closeAll();
      this.editModel.reason = "";
      this.editdataa = res.data[0];
      console.log(this.editdataa);
      this.saveddataarray = res.data;
      this.dataSource.data = this.saveddataarray;
      console.log(this.dataSource);
      this.inputmodel.date = moment(this.editdataa.date).format("YYYY-MM-DD");
      // this.inputmodel.company_name = this.editdataa.company_name;
      (this.inputmodel.invoice_number = this.editdataa.invoice_number),
        // date: moment(this.inputmodel.date).format("YYYY-MM-DD"),
        (this.inputmodel.invoice_date = moment(
          this.editdataa.invoice_date
        ).format("YYYY-MM-DD")),
        (this.inputmodel.vehicle_number = this.editdataa.vehicle_number),
        (this.inputmodel.driver_name = this.editdataa.driver_name),
        // (this.inputmodel.company_name = this.editdataa.company_name),
        // (this.inputmodel.company_code = this.editdataa.company_code),
        (this.inputmodel.indent_number = this.editdataa.indent_number),
        (this.inputmodel.indent_date = moment(
          this.editdataa.indent_date
        ).format("YYYY-MM-DD")),
        (this.inputmodel.transporter_name = this.editdataa.transporter_name),
        (this.inputmodel.e_way_bill = this.editdataa.e_way_bill),
        (this.inputmodel.vendor_name = this.editdataa.vendor_name),
        (this.inputmodel.vendor_code = this.editdataa.vendor_code),
        (this.inputmodel.gate_entry_number = this.editdataa.gate_entry_number),
        (this.inputmodel.gate_entry_date = this.editdataa.gate_entry_date),
        (this.inputmodel.lr_number = this.editdataa.lr_number),
        (this.inputmodel.lr_date = moment(this.editdataa.lr_date).format(
          "YYYY-MM-DD"
        )),
       (this.inputmodel.purchase_order_number= this.editdataa.purchase_order_number),
        (this.inputmodel.purchase_order_date = moment(
          this.inputmodel.purchase_order_date
        ).format("YYYY-MM-DD")),
        (this.inputmodel.tax_description = this.editdataa.tax_description),
        (this.inputmodel.tax_percent = this.editdataa.tax_percent),
        (this.inputmodel.tax_value = this.editdataa.tax_value),
        (this.inputmodel.total_value = this.editdataa.total_value),
        (this.inputmodel.number = this.editdataa.number),
        (this.confirm_number = this.editdataa.confirm_number),
        (this.material_code = this.editdataa.material_code),
        (this.material_description = this.editdataa.material_description),
        (this.line_item = this.editdataa.line_item),
        (this.invoice_quantity = this.editdataa.invoice_quantity),
        (this.received_quantity = this.editdataa.received_quantity),
        (this.unit_price = this.editdataa.unit_price),
        (this.basic_price = this.editdataa.basic_price),
        (this.unit_of_measurement = this.editdataa.unit_of_measurement),
        (this.demo1TabIndex = 0);
      this.btn = "Update";
    });
  }
  deleteItem(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
    });
    this.deleteNumber = rw.number;
    this.deletecn = rw.confirm_number;
  }
  deleteFile() {
    let obj = {
      command: "del",
      deleted_by: "admin",
      number: this.deleteNumber,
      confirm_number: [this.deletecn],
      reason: this.deleteModel.reason,
    };
    this.custService.deleteFuelReceiptFile2(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.getFuelReceiptList();
        this.deleteModel.reason = "";
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
  uploadprfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlspr = fileInput.target.files;
      for (const file of this.fileUploadUrlspr) {
        this.filenamearray1.push(file.name);
        this.selectedfiles.push(file);
      }
    }
  }
  uploadedselctedfiles() {
    const postData = new FormData();
    postData.append("document_type", "FuelReceiptNote2");
    postData.append("document_number", this.resultFrnnumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file);
    }

    this.custService.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.fileUploadUrlspr = [];
        this.selectedfiles = [];
        this.filenamearray1 = [];
      } else {
      }
    });
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: "800px",
    });
    this.frnnumber = row1.number;
    this.getexistingfiles();
  }

  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.frnnumber)
      .set("document_type", "FuelReceiptNote2");
    this.custService.getexistingfies(params).subscribe((res: any) => {
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
        this.filenamearray.push(file.name);
      }
    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type", "FuelReceiptNote2");
    postData.append("document_number", this.frnnumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file);
    }
    this.custService.addfileupload(postData).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);
        this.getexistingfiles();
        this.filenamearray = [];
        this.fileUploadUrls = [];
      } else {
        this.alertcall.showWarning("Error", res["message"]);
      }
    });
  }
  deleteexistingfile() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.frnnumber)
      .set("document_type", "FuelReceiptNote2")
      .set("id", this.deleteid);
    this.custService.deletefiles(params).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", "File Deleted Successfully");
        this.getexistingfiles();
        this.dialogRef.close();
      } else {
        this.alertcall.showWarning("Error", res["message"]);
      }
    });
  }
  //activity log
  getlogdata() {
    let obj = {
      command: "log",
      key: "FuelReceiptNote2"
    }
    this.custService.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log
      }
    })
  }
}
