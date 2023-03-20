import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertCallsService } from './../../../auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-material-layout',
  templateUrl: './material-layout.component.html',
  styleUrls: ['./material-layout.component.scss']
})
export class MaterialLayoutComponent implements OnInit {
  displayedColumns: any[] = [
    'sno',
    'material_code',
    'material_name',
    'long_description',
    'class',
    'criticality',
    'uom1',
    'uom2',
    'uomratio',
    'category',
    'maingroup',
    'subgroup',
    'sap_code',
    // 'ActiveStatus',
    'action'
  ];
  displayedColumnsmaingroup: any[] = [
    'sno',
    'maingroup',
    'code',
    // 'active',
    'action'
  ];
  displayedColumnssubgroup: any[] = [
    'sno',
    'maingroup',
    'subgroup',
    'code',

    // 'activestatus',
    'action'
  ];
  displayedColumnsunitgroup: any[] = [
    'sno',
    'description_measurements',
    'unitcode',
    'length',
    'width',
    'height',
    'action'
  ];
  displayedColumnscategory: any[] = [
    'sno',
    'categorycode',
    'description',
    // 'activestatus',
    'action'
  ];
  displayedColumnsvalution: any[] = [
    'sno',
    'description',
    'valution_code',
    // 'ActiveStatus',
    'action'
  ];
  displayedColumnscriticality: any[] = [
    'sno',
    'description',
    'code',
    // 'ActiveStatus',
    'action'
  ];
  displayedColumnsclass: any[] = [
    'sno',
    'description',
    'class_code',
    // 'ActiveStatus',
    'action'
  ];
  @ViewChild('masterpaginator') masterpaginator: MatPaginator;
  @ViewChild('paginatormain') paginatormain: MatPaginator;

  // @ViewChild(masterpaginator) masterpaginator: MatPaginator;
  // @ViewChild(MatPaginator) paginatormain: MatPaginator;
  @ViewChild('paginatorsubgrp') paginatorsubgrp: MatPaginator;
  @ViewChild('paginatorunit') paginatorunit: MatPaginator;
  @ViewChild('paginatorcat') paginatorcat: MatPaginator;
  @ViewChild('paginatorvalue') paginatorvalue: MatPaginator;
  @ViewChild('paginatorcrit') paginatorcrit: MatPaginator;
  @ViewChild('paginatorclass') paginatorclass: MatPaginator;


  dataSourcemain = new MatTableDataSource();
  dataSourcesub = new MatTableDataSource();
  dataSourceunit = new MatTableDataSource();
  dataSourcecategory = new MatTableDataSource();
  dataSourcevalution = new MatTableDataSource();
  dataSourcecritical = new MatTableDataSource();
  dataSourceclass = new MatTableDataSource();
  dataSourcemaster = new MatTableDataSource();
  materialname: any;
  description: any;
  classtype: any;
  uom: any;
  category: any;
  maingroup: any;
  subgroup: any;
  maingroupname: any;
  subgroupname: any;
  maingroupname1: any;
  unitdescription: any;
  unitcode: any;
  categorydescription: any;
  category1: any;
  valutiondescription: any;
  valutioncode: any;
  maindata: any = false;
  totalRecords = 0;
  loadingmasterRecords: any = false;
  loadingmainRecords: any = false;
  loadingsubRecords: any = false;
  loadingunitRecords: any = false;
  loadingcatRecords: any = false;
  loadingvalRecords: any = false;
  loadingcritRecords: any = false;
  loadingclassRecords: any = false;
  maingroupeditname: any;
  rowId: any;
  rowCode: any;
  materialData: any;
  subdata: any = false;
  totalsubRecords: any;
  subgroupeditname: any;
  maingroupeditname1: any;
  subgrpid: any;
  unitDATA: any = false;
  totalunitRecords: any;
  rowunitid: any;
  rowunitname: any;
  uniteditcode: any;
  uniteditdescription: any;
  categoryDATA: any = false;
  totalcategoryRecords: any;
  valutionDATA: any = false;
  totalvalutionRecords: any;
  valutionid: any;
  valutioneditdescription: any;
  valutioneditcode: any;
  categoryedit1: any;
  categoryeditdescription: any;
  categoryid: any;
  criticalitydescription: any;
  criticalitycode: any;
  criticalDATA: any = false;
  totalcriticalRecords: any;
  criticalid: any;
  criticalityeditdescription: any;
  criticalityeditcode: any;
  classdescription: any;
  classcode: any;
  classDATA: any = false;
  totalclassRecords: any;
  classid: any;
  classeditdescription: any;
  classeditcode: any;
  selectedmaingroupdata: any;
  HSN_sac_code: any;
  sap_code:any
  uom_ratio: any;
  criticality_code: any;
  uom1: any;
  masterDATA: any = false;
  HSN_sac_codeedit: any;
  sap_codeedit:any;
  totalmasterRecords: any;
  uom_ratioedit: any;
  criticality_codeedit: any;
  subgroupedit: any;
  maingroupedit: any;
  uom1edit: any;
  uomedit: any;
  categoryedit: any;
  classtypeedit: any;
  descriptionedit: any;
  materialeditname: any;
  mastercode: any;
  masterid: any;
  mymasterForm: FormGroup;
  classID: any;
  categoryID: any;
  uomID: any;
  uom1ID: any;
  criticalityID: any;
  totalmainRecords: any;
  pageIndex: any = 1;
  pageSize: any = 10;
  pageIndexmain: any = 1;
  pageSizemain: any = 10;
  pageIndexsub: any = 1;
  pageSizesub: any = 10;
  pageIndexunit: any = 1;
  pageSizeunit: any = 10;
  pageIndexcat: any = 1;
  pageSizecat: any = 10;
  pageIndexvalue: any = 1;
  pageSizevalue: any = 10;
  pageIndexcrit: any = 1;
  pageSizecrit: any = 10;
  pageIndexclass: any = 1;
  pageSizeclass: any = 10;
  classDescription: any;
  categoryDescription: any;
  deletecalssId: any;
  deletecalsscode: any;
  deletecritId: any;
  deletecritcode: any;
  deletevalId: any;
  deletevalcode: any;
  deletecatcode: any;
  deletecatId: any;
  deleteunitcode: any;
  deleteunitId: any;
  deletesubId: any;
  deletesubcode: any;
  deletemaincode: any;
  deletemainId: any;
  deletemastercode: any;
  deletemasterId: any;
  searchmasterData: any;
  searchmainData: any;
  searchsubData: any;
  searchunitData: any;
  searchcatData: any;
  searchvalueData: any;
  searchCRITData: any;
  searchclassData: any;
  classDATA1: any;
  categoryDATA1: any;
  unitDATA1: any;
  maindata1: any;
  criticalDATA1: any;
  height: any;
  width: any;
  length: any;
  lengthedit: any;
  widthedit: any;
  heightedit: any;
  constructor(private dialog: MatDialog, private custservice: CustomerService,
    public alertCall: AlertCallsService,) {
    this.mymasterForm = new FormGroup({
      materialeditname: new FormControl(null),
      descriptionedit: new FormControl(null),
      classtypeedit: new FormControl(null),
      categoryedit: new FormControl(null),
      uomedit: new FormControl(null),
      uom1edit: new FormControl(null),
      maingroupedit: new FormControl(null),
      subgroupedit: new FormControl(null),
      criticality_codeedit: new FormControl(null),
      uom_ratioedit: new FormControl(null),
      HSN_sac_codeedit: new FormControl(null),
      sap_codeedit:new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.getMasterData()
    this.getdata();
    // this.subgrpdropdowndata();
    this.getsubgroupData();
    this.getunitData();
    this.getcategoryData();
    this.getvalutionData();
    this.getCRITICALdata();
    this.getClassdata();
    this.selectedmaingroup();
    //  this.getClassdatadropdown()
    // this.getcategoryDatadropdown()
    // this.getunitDatadropdown() 
    // this.getdatadropdown()
    // this.getCRITICALdatadropdown()
  }
  onpageevent(event: any) {
    console.log(event);

    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    console.log(this.pageIndex);
    this.getMasterData()
  }
  getMasterData() {
    let obj = {
      "lmt": this.pageSize,
      'pid': this.pageIndex,
      'command': 'lst',
      "key": "" || this.searchmasterData
    }
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      this.masterDATA = false;
      this.totalmasterRecords = res?.count;
    
      console.log(this.totalmasterRecords);

      this.dataSourcemaster.data = res.data;
      // console.log(this.dataSourcemaster.data)
      if (res.data.length == 0) {
        this.masterDATA = true;
      }
      // setTimeout(()=>{
      //   this.dataSourcemaster.paginator = this.masterpaginator;
      //  })

    })
  }
  onclasspageevent(event: any) {
    console.log(event);

    this.pageIndexclass = event.pageIndex + 1;
    this.pageSizeclass = event.pageSize;
    console.log(this.pageIndex);
    this.getClassdata()
  }
  getClassdata() {
    let obj = {
      "lmt": this.pageSizeclass,
      'pid': this.pageIndexclass,
      "command": "lst",
      "key": "" || this.searchclassData
    }
    this.custservice.getmaterialclassdata(obj).subscribe((res: any) => {
      this.classDATA = false
      this.totalclassRecords = res?.count;
      this.dataSourceclass.data = res.data;
      // this.classDATA1=res.data;
      if (res.data.length == 0) {
        this.classDATA = true
      }
      // setTimeout(()=>{
      //   this.dataSourceclass.paginator = this.paginatorclass;
      //  })

    })
  }
  getClassdatadropdown() {
    let obj = {
      "lmt": 100000,
      'pid': 1,
      "command": "lst",
      "key": ""
    }
    this.custservice.getmaterialclassdata(obj).subscribe((res: any) => {

      this.classDATA1 = res.data;


    })
  }
  oncritpageevent(event: any) {
    console.log(event);

    this.pageIndexcrit = event.pageIndex + 1;
    this.pageSizecrit = event.pageSize;
    console.log(this.pageIndex);
    this.getCRITICALdata()
  }
  getCRITICALdata() {
    let obj = {
      "lmt": this.pageSizecrit,
      'pid': this.pageIndexcrit,
      "command": "lst",
      "key": "" || this.searchCRITData
    }
    this.custservice.getmaterialcriticaldata(obj).subscribe((res: any) => {
      this.criticalDATA = false
      this.totalcriticalRecords = res?.count;
      this.dataSourcecritical.data = res.data;
      // this.criticalDATA1=res.data
      if (res.data.length == 0) {
        this.criticalDATA = true
      }
      // setTimeout(()=>{
      //   this.dataSourcecritical.paginator = this.paginatorcrit;
      //  }) 

    })
  }
  getCRITICALdatadropdown() {
    let obj = {
      "lmt": 100000,
      'pid': 1,
      "command": "lst",
      "key": ""
    }
    this.custservice.getmaterialcriticaldata(obj).subscribe((res: any) => {
      this.criticalDATA1 = res.data
    })
  }
  onvaluepageevent(event: any) {
    console.log(event);

    this.pageIndexvalue = event.pageIndex + 1;
    this.pageSizevalue = event.pageSize;
    console.log(this.pageIndex);
    this.getvalutionData()
  }
  getvalutionData() {
    let obj = {
      "lmt": this.pageSizevalue,
      'pid': this.pageIndexvalue,
      "command": "lst",
      "key": "" || this.searchvalueData
    }
    this.custservice.getvalutiondata(obj).subscribe((res: any) => {
      this.valutionDATA = false;
      this.totalvalutionRecords = res?.count;
      this.dataSourcevalution.data = res.data;
      if (res.data.length == 0) {
        this.valutionDATA = true
      }
      // setTimeout(()=>{
      //   this.dataSourcevalution.paginator = this.paginatorvalue;
      //  })  
    })
  }
  oncatpageevent(event: any) {
    console.log(event);

    this.pageIndexcat = event.pageIndex + 1;
    this.pageSizecat = event.pageSize;
    console.log(this.pageIndex);
    this.getcategoryData()
  }
  getcategoryData() {
    let obj = {
      "lmt": this.pageSizecat,
      'pid': this.pageIndexcat,
      "command": "lst",
      "key": "" || this.searchcatData
    }
    this.custservice.getcategorydata(obj).subscribe((res: any) => {
      console.log(res);
      this.categoryDATA = false;;
      this.totalcategoryRecords = res?.count;
      this.dataSourcecategory.data = res.data;
      // this.categoryDATA1=res.data;
      if (res.data.length == 0) {
        this.categoryDATA = true;
      }
      // setTimeout(()=>{
      //   this.dataSourcecategory.paginator = this.paginatorcat;
      //  }) 
    })
  }
  getcategoryDatadropdown() {
    let obj = {
      "lmt": 100000,
      'pid': 1,
      "command": "lst",
      "key": ""
    }
    this.custservice.getcategorydata(obj).subscribe((res: any) => {
      console.log(res);
      this.categoryDATA1 = res.data;
    })
  }
  onunitpageevent(event: any) {
    console.log(event);

    this.pageIndexunit = event.pageIndex + 1;
    this.pageSizeunit = event.pageSize;
    console.log(this.pageIndex);
    this.getunitData()
  }
  getunitData() {
    let obj = {
      "lmt": this.pageSizeunit,
      'pid': this.pageIndexunit,
      "command": "lst",
      "key": "" || this.searchunitData
    }
    this.custservice.getunitdata(obj).subscribe((res: any) => {
      console.log(res);
      this.unitDATA = false;
      this.totalunitRecords = res?.count;
      this.dataSourceunit.data = res.data;
      // this.unitDATA1=res.data;
      if (res.data.length == 0) {
        this.unitDATA = true
      }
      // setTimeout(()=>{
      //   this.dataSourceunit.paginator = this.paginatorunit;
      //  })
    })
  }
  getunitDatadropdown() {
    let obj = {
      "lmt": 100000,
      'pid': 1,
      "command": "lst",
      "key": "" || this.searchunitData
    }
    this.custservice.getunitdata(obj).subscribe((res: any) => {
      console.log(res);
      this.unitDATA1 = res.data;

    })
  }
  onsubpageevent(event: any) {
    console.log(event);

    this.pageIndexsub = event.pageIndex + 1;
    this.pageSizesub = event.pageSize;
    console.log(this.pageIndex);
    this.getsubgroupData()
  }
  getsubgroupData() {
    let obj = {
      "lmt": this.pageSizesub,
      'pid': this.pageIndexsub,
      "command": "lst",
      "key": "" || this.searchsubData
    }
    this.custservice.getsubgroupdata(obj).subscribe((res: any) => {
      this.subdata = false;
      this.totalsubRecords = res?.count;
      this.dataSourcesub.data = res.data;
      if (res.data.length == 0) {
        this.subdata = true;
      }
      // setTimeout(()=>{
      //   this.dataSourcesub.paginator = this.paginatorsubgrp;
      //  })
    })
  }

  subgrpdropdowndata() {
    let obj = {
      "command": "lst"
    }
    this.custservice.dropdownsubgroupdata(obj).subscribe((res: any) => {
      console.log(res);
      this.materialData = res.data
    })
  }
  onmainpageevent(event: any) {
    console.log(event);

    this.pageIndexmain = event.pageIndex + 1;
    this.pageSizemain = event.pageSize;
    console.log(this.pageIndexmain);
    this.getdata()
  }
  getdata() {
    let obj = {
      "lmt": this.pageSizemain,
      'pid': this.pageIndexmain,
      "command": "lst",
      "key": "" || this.searchmainData
    }
    this.custservice.getmaingroupdata(obj).subscribe((res: any) => {
      console.log(res);
      this.maindata = false;
      this.totalmainRecords = res?.count;
      this.dataSourcemain.data = res.data;
      // this.maindata1=res.data
      if (res.data.length == 0) {
        this.maindata = true;
      }
      // setTimeout(()=>{
      //   this.dataSourcemain.paginator = this.paginatormain;
      //  })
    })
  }
  getdatadropdown() {
    let obj = {
      "lmt": 100000,
      'pid': 1,
      "command": "lst",
      "key": "" || this.searchmainData
    }
    this.custservice.getmaingroupdata(obj).subscribe((res: any) => {
      console.log(res);
      this.maindata1 = res.data

    })
  }
  addMaterialmaster(data: any) {
    this.dialog.open(data, {
      width: '800px',

    })
    this.classtype = null;
    this.getClassdatadropdown()
    this.getcategoryDatadropdown()
    this.getunitDatadropdown()
    this.getdatadropdown()
    this.getCRITICALdatadropdown()
    this.selectedmaingroup();

  }
  savematerialdata(form: any) {
    let obj = {
      "command": 'add',
      "name": this.materialname,
      "class_code": this.classtype.code,
      "criticality_code": this.criticality_code.code,
      "uom_1": this.uom.code,
      "uom_2": this.uom1.code,
      "description": this.description,
      "main_group_code": this.maingroup.code,
      "uom_ratio": this.uom_ratio,
      "category_code": this.category.code,
      "hsn_sac_code": this.HSN_sac_code,
      "sap_code":this.sap_code,
      "sub_group_code": this.subgroup.code,
      'class_name': this.classtype.description,
      'criticality_name': this.criticality_code.description,
      'main_group_name': this.maingroup.description,
      'sub_group_name': this.subgroup.description,
      'category_name': this.category.description
    }
    this.custservice.addmaterialmasterdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Added Successfully');
        this.dialog.closeAll();
        form.reset()
        this.getMasterData()
      } else {
        this.alertCall.showWarning('Accepted', res['message']);
      }
    })
  }
  editmaterialmasterdata(row1: any, data: any) {
    console.log(row1);

    this.dialog.open(data, {
      width: '800px'
    })
    this.mastercode = row1.code;
    this.masterid = row1.id

    this.mymasterForm.patchValue({
      materialeditname: row1.name,
      descriptionedit: row1.description,
      classtypeedit: row1.class_code,
      categoryedit: row1.category_code,
      uomedit: row1.uom_1,
      uom1edit: row1.uom_2,
      maingroupedit: row1.main_group_name,
      subgroupedit: row1.sub_group_name,
      criticality_codeedit: row1.criticality_code,
      uom_ratioedit: row1.uom_ratio,
      HSN_sac_codeedit: row1.hsn_sac_code,
      sap_codeedit:row1.sap_code
    })
    this.getClassdatadropdown()
    this.getcategoryDatadropdown()
    this.getunitDatadropdown()
    this.getdatadropdown()
    this.getCRITICALdatadropdown()
    this.selectedmaingroup();
  }
  updatematerialdata() {
    this.classDATA1.forEach((el: any) => {
      if (el.code == this.mymasterForm.value.classtypeedit) {
        this.classDescription = el.description
      }
    });
    this.categoryDATA1.forEach((el: any) => {
      if (el.code == this.mymasterForm.value.categoryedit) {
        this.categoryDescription = el.description
      }
    });

    this.criticalDATA1.forEach((el: any) => {
      if (el.code == this.mymasterForm.value.criticality_codeedit) {
        this.criticalityID = el.description
      }
    });

    let obj = {
      "code": this.mastercode,
      "name": this.mymasterForm.value.materialeditname,
      'class_name': this.classDescription,
      "class_code": this.mymasterForm.value.classtypeedit,
      "criticality_name": this.criticalityID,
      "criticality_code": this.mymasterForm.value.criticality_codeedit,
      "uom_1": this.mymasterForm.value.uomedit,
      "uom_2": this.mymasterForm.value.uom1edit,
      "description": this.mymasterForm.value.descriptionedit,
      "uom_ratio": this.mymasterForm.value.uom_ratioedit,
      'category_name': this.categoryDescription,
      "category_code": this.mymasterForm.value.categoryedit,
      "hsn_sac_code": this.mymasterForm.value.HSN_sac_codeedit,
      "sap_code":this.mymasterForm.value.sap_codeedit,
      'command': 'edt',
      'id': this.masterid
    }
    console.log(obj);

    this.custservice.updatematerialmasterdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Updated Successfully');
        this.dialog.closeAll()
        this.getMasterData()
      } else {
        this.alertCall.showWarning('Accepted', res['message']);
      }
    })
  }
  deletemasterdata(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px'
    })
    this.deletemasterId = rw.id
    this.deletemastercode = rw.code
  }

  deletemasterFile(data: any) {
    let obj = {
      "command": "del",
      "id": this.deletemasterId
    }
    this.custservice.deletematerialmasterdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Deleted Successfully');
        this.dialog.closeAll()
        this.getMasterData()
      } else {
        this.alertCall.showWarning('Accepted', res['message']);
      }
    })
  }

  addmaingroupmodel(data: any) {

    this.dialog.open(data, {
      width: '500px'
    })
  }
  savemaingropupdata(fr: any) {
    let obj = {
      'command': 'add',
      'name': this.maingroupname
    }
    this.custservice.addmaingroupdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Added Successfully');
        this.dialog.closeAll()
        this.getdata();
        fr.reset()
      } else {
        this.alertCall.showWarning('Accepted', res['message']);
      }

    })
    console.log(obj);

  }
  editmaindata(row: any, data: any) {
    this.maingroupname = row.description
    this.dialog.open(data, {
      width: '500px'
    })
    this.maingroupeditname = row.description;
    this.rowId = row.id;
    this.rowCode = row.code
    console.log(row);

  }
  updatemaingropupdata(editform: any) {
    let obj = {
      "command": "edt",
      "name": this.maingroupeditname,
      "id": this.rowId,
      "code": this.rowCode
    }
    this.custservice.updatemaingroupdata(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Updated Successfully');
        this.dialog.closeAll()
        this.getdata()
      } else {
        this.alertCall.showWarning('Accepted', res['message']);
      }
    })
  }
  Deletemaindata(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px'
    })
    this.deletemainId = rw.id
    this.deletemaincode = rw.code
  }
  deletemainFile(data: any) {
    let obj = {
      "command": "del",
      "id": this.deletemainId,
      "code": this.deletemaincode
    }
    this.custservice.deletemaingroupdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Deleted Successfully')
        this.getdata()
        this.dialog.closeAll()
      } else {
        this.alertCall.showWarning('Accepted', res['message']);
      }

    })
  }

  addsubgroupmodel(data: any) {
    this.subgrpdropdowndata();
    this.maingroupname1 = undefined
    console.log(this.maingroupname1);

    this.dialog.open(data, {
      width: '500px'
    })

  }
  selected() {
    console.log(this.maingroupname1.description);

  }
  savesubgropupdata(fr1: any) {
    console.log(this.maingroupname1);
    let obj = {
      "main_group_code": this.maingroupname1.code,
      "main_group_name": this.maingroupname1.description,
      "name": this.subgroupname,
      "command": "add"

    }

    this.custservice.addsubgroupdata(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Added Successfully')
        this.dialog.closeAll();
        fr1.reset()
        this.getsubgroupData()
      } else {
        this.alertCall.showSuccess('Accepted', res['message'])
      }
    })


  }
  editsubgrpdata(row1: any, data: any) {
    console.log(row1);

    this.dialog.open(data, {
      width: '500px'
    })
    this.maingroupeditname1 = row1.main_group_description;
    this.subgroupeditname = row1.description
    this.subgrpid = row1.id
    this.subgrpdropdowndata();
  }
  updatesubgropupdata(editformsub: any) {
    let obj = {
      "command": "edt",
      "id": this.subgrpid,
      "name": this.subgroupeditname
    }
    this.custservice.updatesubgroupdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Updated Successfully');
        this.dialog.closeAll();
        this.getsubgroupData()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }

    })
  }
  deletesubgrpdata(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px'
    })
    this.deletesubId = rw.id
    this.deletesubcode = rw.code
  }
  deletesubFile() {


    let obj = {
      "command": "del",
      "id": this.deletesubId,
      "code": this.deletesubcode
    }
    this.custservice.deletesubgroupdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Deleted Successfully')
        this.getsubgroupData()
        this.dialog.closeAll()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }

    })
  }
  addunitmeasurementmodel(data: any) {
    this.dialog.open(data, {
      width: '900px'
    })
  }
  saveunitmeasurementdata(unitform: any) {
    let obj = {
      "command": "add",
      'name': this.unitdescription,
      'code': this.unitcode,
      'length': Boolean(this.length),
      'width': Boolean(this.width),
      'height': Boolean(this.height)
    }
    console.log(obj);
    this.custservice.addunitdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Added Successfully')
        this.dialog.closeAll();
        this.getunitData()
        unitform.reset()
      }
      else {
        this.alertCall.showWarning('Accepted', res['message'])
      }

    })
  }
  editunitdata(row1: any, data: any) {
    console.log(row1);

    this.dialog.open(data, {
      width: '900px'
    })
    this.uniteditcode = row1.code;
    this.uniteditdescription = row1.description
    this.rowunitid = row1.id;
    this.rowunitname = row1.description
    this.lengthedit = row1.length
    this.widthedit = row1.width;
    this.heightedit = row1.height

  }
  updateunitmeasurementdata(uniteditform: any) {
    let obj = {
      "command": "edt",
      "id": this.rowunitid,
      "name": this.uniteditdescription,
      'length': Boolean(this.lengthedit),
      'width': Boolean(this.widthedit),
      'height': Boolean(this.heightedit)
    }
    this.custservice.updateunitdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Updated Successfully')
        this.dialog.closeAll();
        this.getunitData()
        uniteditform.reset()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }

    })
  }
  deleteunitdata(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px'
    })
    this.deleteunitId = rw.id
    this.deleteunitcode = rw.code
  }
  deleteunitFile() {
    let obj = {
      "command": "del",
      "id": this.deleteunitId,
      "code": this.deleteunitcode
    }
    this.custservice.deleteunitdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Deleted Successfully')
        this.getunitData()
        this.dialog.closeAll()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  addcategorymodel(data: any) {
    this.dialog.open(data, {
      width: '500px'
    })
  }
  savecategorydata(categoryform: any) {
    let obj = {
      "name": this.categorydescription,
      "code": this.category1,
      "command": "add"
      // 'category':this.category1,
      // 'description':this.categorydescription
    }
    this.custservice.addcategorydata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Added Successfully')
        this.dialog.closeAll();
        this.getcategoryData();
        categoryform.reset()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })


  }
  editcategorydata(row1: any, data: any) {
    console.log(row1);

    this.dialog.open(data, {
      width: '500px'
    })
    this.categoryid = row1.id;
    this.categoryedit1 = row1.code;
    this.categoryeditdescription = row1.description
  }
  updatecategorydata(categoryeditfr: any) {
    let obj = {
      "command": "edt",
      "id": this.categoryid,
      "name": this.categoryeditdescription
    }
    this.custservice.updatecategorydata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Updated Successfully')
        this.dialog.closeAll()
        this.getcategoryData()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  deletecategory(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px'
    })
    this.deletecatId = rw.id
    this.deletecatcode = rw.code
  }
  deletecatFile() {
    let obj = {
      "command": "del",
      "id": this.deletecatId,
      "code": this.deletecatcode,
    }
    this.custservice.deletecategorydata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Deleted Successfully')

        this.getcategoryData()
        this.dialog.closeAll()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }

  addvalutionmodel(data: any) {
    this.dialog.open(data, {
      width: '500px'
    })
  }
  savevalutiondata(valutionform: any) {
    let obj = {
      "name": this.valutiondescription,
      "code": this.valutioncode,
      "command": "add"
    }
    this.custservice.addvalutiondata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Added Successfully')
        this.dialog.closeAll();
        this.getvalutionData()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  editvalution(row1: any, data: any) {
    console.log(row1);

    this.dialog.open(data, {
      width: '500px'
    })
    this.valutionid = row1.id;
    this.valutioneditdescription = row1.description;
    this.valutioneditcode = row1.code
  }
  updatevalutiondata(editvalutionfr: any) {
    let obj = {
      "command": "edt",
      "id": this.valutionid,
      "name": this.valutioneditdescription
    }
    this.custservice.updatevalutiondata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Updated Successfully')
        this.dialog.closeAll();
        this.getvalutionData()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  deletevalutiondata(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px'
    })
    this.deletevalId = rw.id
    this.deletevalcode = rw.code
  }
  deletevalFile() {
    let obj = {
      "command": "del",
      "id": this.deletevalId,
      "code": this.deletevalcode
    }
    this.custservice.deletevalutiondata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Deleted Successfully')
        this.getvalutionData()
        this.dialog.closeAll()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  addmaterialcriticalitymodel(data: any) {
    this.dialog.open(data, {
      width: '500px'
    })
  }
  savecriticalitydata(fr: any) {
    let obj = {
      "name": this.criticalitydescription,
      "code": this.criticalitycode,
      "command": "add"
    }
    this.custservice.addmaterialcriticaldata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Added Successfully')
        this.dialog.closeAll()
        this.getCRITICALdata()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  editcriticaldata(row1: any, data: any) {
    console.log(row1);

    this.dialog.open(data, {
      width: '500px'
    })
    this.criticalid = row1.id
    this.criticalityeditdescription = row1.description;
    this.criticalityeditcode = row1.code
  }
  updatecriticalitydata(editform: any) {
    let obj = {
      "command": "edt",
      "id": this.criticalid,
      "name": this.criticalityeditdescription
    }
    this.custservice.updatematerialcriticaldata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Updated', 'Added Successfully')
        this.dialog.closeAll()
        this.getCRITICALdata()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  deletecriticaldata(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px'
    })
    this.deletecritId = rw.id
    this.deletecritcode = rw.code
  }
  deletecritFile(data: any) {
    let obj = {
      "command": "del",
      "id": this.deletecritId,
      "code": this.deletecritcode,
    }
    this.custservice.deletematerialcriticaldata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Deleted Successfully')
        this.getCRITICALdata()
        this.dialog.closeAll()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  addclassmodel(data: any) {
    this.dialog.open(data, {
      width: '500px'
    })
  }
  saveclassdata(fr: any) {
    let obj = {
      "name": this.classdescription,
      "code": this.classcode,
      "command": "add"
    }
    this.custservice.addmaterialclassdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Added Successfully')
        this.dialog.closeAll()
        this.getClassdata()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  editclass(row1: any, data: any) {
    console.log(row1);

    this.dialog.open(data, {
      width: '500px'
    })
    this.classid = row1.id
    this.classeditdescription = row1.description;
    this.classeditcode = row1.code
  }
  updateclassdata(fr: any) {
    let obj = {
      "command": "edt",
      "id": this.classid,
      "name": this.classeditdescription
    }
    this.custservice.updatematerialclassdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Updated', 'Added Successfully')
        this.dialog.closeAll()
        this.getClassdata()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  deleteclassdata(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px'
    })
    this.deletecalssId = rw.id
    this.deletecalsscode = rw.code
  }

  deleteclassFile() {
    let obj = {
      "command": "del",
      "id": this.deletecalssId,
      "code": this.deletecalsscode
    }
    this.custservice.deletematerialclassdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertCall.showSuccess('Accepted', 'Deleted Successfully')
        this.getClassdata()
        this.dialog.closeAll()
      } else {
        this.alertCall.showWarning('Accepted', res['message'])
      }
    })
  }
  selectedmaingroup() {

    console.log(this.maingroup.description);

    let obj = {
      "key": this.maingroup.description,
      "command": "lst",
      "lmt": 100000
    }
    this.custservice.getsubgroupdata(obj).subscribe((res: any) => {
      this.selectedmaingroupdata = res.data;
      console.log(this.selectedmaingroupdata);
      
      // this.subgroup = ''
    })
  }
  keyPressNumbers(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  searchmasterdata() {
    if (this.searchmasterData.length > 2) {
      this.getMasterData()
    }
    if (!this.searchmasterData) {
      this.getMasterData()
    }
  }
  searchmaindata() {
    if (this.searchmainData.length > 2) {
      this.getdata();
    }
    if (!this.searchmainData) {
      this.getdata();
    }
  }
  searchsubdata() {
    if (this.searchsubData.length > 2) {
      this.getsubgroupData();
    }
    if (!this.searchsubData) {
      this.getsubgroupData();
    }
  }
  searchunitdata() {
    if (this.searchunitData.length > 1) {
      this.getunitData();
    }
    if (!this.searchunitData) {
      this.getunitData();
    }
  }
  searchcatdata() {
    if (this.searchcatData.length > 2) {
      this.getcategoryData();
    }
    if (!this.searchcatData) {
      this.getcategoryData();
    }
  }
  searchvaluedata() {
    if (this.searchvalueData.length > 2) {
      this.getvalutionData();
    }
    if (!this.searchvalueData) {
      this.getvalutionData();
    }
  }
  searchcritdata() {
    if (this.searchCRITData.length > 2) {
      this.getCRITICALdata();
    }
    if (!this.searchCRITData) {
      this.getCRITICALdata();
    }
  }
  searchclassdata() {
    if (this.searchclassData.length > 2) {
      this.getClassdata();
    }
    if (!this.searchclassData) {
      this.getClassdata();
    }
  }
}
