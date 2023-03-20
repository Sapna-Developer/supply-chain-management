import { PdfFilesViewComponent } from './../pdf-files-view/pdf-files-view.component';
import { AlertCallsService } from './../../../auth/alert-calls.service';
import { AuthService } from './../../../auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from './../../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
// import {jsPDF} from 'jspdf';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-pmc-folders',
  templateUrl: './pmc-folders.component.html',
  styleUrls: ['./pmc-folders.component.scss'],
})
export class PmcFoldersComponent implements OnInit {
  projectId: any;
  projectObj: any = {};
  startDate: any;
  endDate: any;
  folderName: any;
  parentId: any = 0;
  folders$: any = [];
  folderInnerDetails: any = [];
  currentParentObj = {
    id: this.parentId,
    folder_name: 'Root',
  };

  pdfFiles$: any = [];
  deleteFolderObj: any = {};
  deleteFileObj: any = {};

  currentUserId: any;

  createNewFile: any = {};
  versions$: any = [];
  drawing$: any = [];

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  selectedUsers: string[] = [];
  allUsers: string[] = [];
  mailTableArray: any[] = [];
  selectedArray: any[] = [];
  selectedArray1: any[] = [];

  fileUploadUrls: any;

  imageUrl = environment.base_url;
  searchdrawing:any=''
  searchId:any=''
  searchversion:any=''
  searchFolders:any=false
  FOLDERS:any=true;
  backbutton:any=false;
  searchbutton:any=true
  departmentsList:any;
  selectedDepartment:any;
  myDefaultValue : any = "GEPS"
  head = [['SNO', 'Name','Drawing No','Drawing Type','Version', 'Created By','Created On', 'Comments']]
  // @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('mytable') mytable: ElementRef;  
  saveddataarray: any = [];
  maildata: any = {};
  formdata: any[] = [];
  revision: any;
  title: any;
  drawing_type: any;
  approval_type: any[] = [];
  approvalType: any[] = [];
  Sheet: any[] = [];
  Status: any[] = [];
  Media: any[] = [];
  Quantity: any[] = [];
  Revision: any[] = [];
  hideButton:boolean=false;
  ProjectName: any;
  
  constructor(
    public route: ActivatedRoute,
    public customerService: CustomerService,
    public dialog: MatDialog,
    public ngModel: NgbModal,
    public authService: AuthService,
    public alertCall: AlertCallsService
  ) {
    this.route.queryParams.subscribe((resp: any) => {
      if (resp) {
        this.projectId = resp.id;
        this.startDate = resp.start;
        this.endDate = resp.end;
        this.getDataObj();
      }
    });

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allUsers.slice()
      )
    );
  }

  ngOnInit(): void {
    const user = this.authService.currentUserRoleDetails;
    if (user) {
      this.currentUserId = user.employee_id;
    }
    this.getFolders(this.currentParentObj);
    this.getPdfFileVersions();
    this.getPdfDrawingTypes();
    this.getProjectEmails();
    this.getDepartmentslist();
    // this.ADDPdfFileVersions()
    // console.log(this.selectedUsers)
    console.log(this.filteredFruits)
  }
  searchfolders(){
    this.searchFolders=true
    this.FOLDERS=false;
    this.backbutton=true;
    this.searchbutton=false;
    this.getsearchdata()
      }
      backtofolders(){
    this.searchFolders=false
    this.FOLDERS=true;
    this.backbutton=false;
    this.searchbutton=true;
    this.pdfFiles$.length = 0
    if(this.currentParentObj.id!==0){
      // this.getsearchdata()
     this.getFolderDocs() 
    }
    
      }
      searchbyname(){
        if(this.searchdrawing.length>2){
          this.getsearchdata()
        }
        if(!this.searchdrawing){
          this.getsearchdata()
        }
      }
      searchbyID(){
        if(this.searchId.length>0){
          this.getsearchdata()
        }
        if(!this.searchId){
          this.getsearchdata()
        }
      }
      searchbyversion(){
        if(this.searchversion.length>0){
          this.getsearchdata()
        }
        if(!this.searchversion){
          this.getsearchdata()
        }
      }
    getsearchdata(){
      // let obj={
      //   "proj_id" : 424 , 
      //    "drawing_no" : "", 
      //   "name" : "" ||this.searchdrawing, 
      //   "version" : "" 
      // }
      let params: HttpParams;
     if(this.currentParentObj.id !== 0){
    params = new HttpParams()
    .set('proj_id', this.projectId)
    .set('drawing_no',  this.searchId)
    .set('name', this.searchdrawing)
    .set('version',this.searchversion)
    .set('folder_id',this.currentParentObj.id)
  }else{
    params = new HttpParams()
    .set('proj_id', this.projectId)
    .set('drawing_no',  this.searchId)
    .set('name', this.searchdrawing)
    .set('version',this.searchversion)
  }
     
      // const postData = new FormData();
      // postData.append('proj_id', this.projectId);
      // postData.append('drawing_no', "" ||this.searchId);
      // postData.append('name', "" || this.searchdrawing);
      // postData.append('version',"" || this.searchversion);
      this.customerService.searchPmcFolders(params).subscribe((res:any)=>{
        if(res&&res['status_code']=='200'){
          this.pdfFiles$ = res.data;
          this.pdfFiles$.forEach((element:any) => {
            element.checked=false;
          });
          this.selectedArray=[]
        }else{
          this.pdfFiles$ = [] 
        }
        
      })
    }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedUsers.push(value);
    }

    // Clear the input value
    // Reset the input value
    if (event.input) {
      event.input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.selectedUsers.indexOf(fruit);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUsers.push(event.option.viewValue);
    // this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUsers.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  getPdfFileVersions() {
    
    this.customerService.getPdfFileVersions().subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.versions$ = resp.data;
      }
    });
  }
  ADDPdfFileVersions() {
    let obj={
      "version":"P10"
    }
    this.customerService.addPdfFileVersions(obj).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        // this.versions$ = resp.data;
      }
    });
  }
  
  getPdfDrawingTypes() {
    this.customerService.getPdfDrawingTypes().subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.drawing$ = resp.data;
      }
    });
  }

  async getDataObj() {
    this.customerService
      .getProjectDetails(this.projectId)
      .subscribe((resp: any) => {
        if (resp.status_code === 200) {
          this.projectObj = resp;
          this.ProjectName=resp.data.title;
          console.log(this.ProjectName);   
          // name.hasComps === "YES" ? true : false
        }
      });
  }

  getFolders(parent: any) {
    const obj = this.folderInnerDetails.find((x: any) => x.id === parent.id);
    if (!obj) {
      this.folderInnerDetails.push(parent);
    }
    this.currentParentObj = parent;
    this.parentId = parent.id;
    const params = new HttpParams()
      .set('project_id', this.projectId)
      .set('parent_id', this.parentId);

    this.customerService.getPmcFolders(params).subscribe(
      (resp: any) => {
        if (resp && resp.status_code === 200) {
          this.folders$ = resp.data;
        } else if (resp && resp.status_code === 304) {
          this.folders$ = [];
          this.alertCall.showSuccess('Folder', resp.message);
        } else {
          this.alertCall.showSuccess('Folder', resp.message);
        }
        if (this.currentParentObj.id !== 0) {
          this.getFolderDocs();
        }
      },
      (err) => {
        this.alertCall.showSuccess('Folder', err.message);
      }
    );
  }

  createFolder(content: any) {
    const dialogRef = this.dialog.open(content, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  addNewFiles(content: any) {
    this.getProjectEmails()
    const dialogRef = this.dialog.open(content, {
      width: '50%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  saveFolder() {
    const params = {
      project_id: this.projectId,
      folder_name: this.folderName,
      parent_id: this.parentId,
      created_by: this.currentUserId,
    };

    this.customerService.createPmcFolder(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.folderName = null;
        this.dialog.closeAll();
        this.getFolders(this.currentParentObj);
      }
    });
  }

  backToFolder(folder: any, folderIndex: number) {
    this.pdfFiles$ = [];
    this.currentParentObj = folder;
    this.folderInnerDetails.forEach((element: any, index: number) => {
      if (index >= folderIndex + 1) {
        this.folderInnerDetails.splice(index);
      }
    });
    this.parentId = folder.id;
    const params = new HttpParams()
      .set('project_id', this.projectId)
      .set('parent_id', this.parentId);

    this.customerService.getPmcFolders(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.folders$ = resp.data;
        this.selectedArray=[]
      } else if (resp && resp.status_code === 304) {
        this.folders$ = [];
      }

      if (this.currentParentObj.id !== 0) {
        this.getFolderDocs();
      }
    });
  }

  uploadWbsFile(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrls = fileInput.target.files[0];
      this.createNewFile.fileName = fileInput.target.files[0].name;
      // let count = fileInput.target.files.length;

      // for (const file of fileInput.target.files) {
      //   const postData = new FormData();
      //   postData.append('pdf_file', file);
      //   postData.append('folder_id', this.currentParentObj.id);
      //   postData.append('project_id', this.projectId);

      //   this.customerService.uploadPdfFiles(postData).subscribe((resp: any) => {
      //     count--;

      //     if (resp && resp.status_code === 200) {
      //       this.getFolderDocs();
      //     }
      //   });
      // }
    }
  }

  getFolderDocs() {
    this.pdfFiles$ = [];
    let params: HttpParams;

    params = new HttpParams()
      .set('project_id', this.projectId)
      .set('folder_id', this.currentParentObj.id);

    this.customerService.getPmcPdfFiles(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.pdfFiles$ = resp.data;
        this.pdfFiles$.forEach((ele:any)=>{
          ele.checked = false;
          
        })
        this.selectedArray=[]
      } else {
        this.pdfFiles$ = [];
      }
    });
  }

  openTaskImages(task: any) {
    const addDigital = this.ngModel.open(PdfFilesViewComponent, {
      size: 'lg',
    });
    addDigital.componentInstance.taskObj = [task];
    addDigital.componentInstance.passEntry.subscribe(
      (receivedEntry: any) => {}
    );
  }

  deleteConfirm(folder: any, content: any) {
    this.deleteFolderObj = folder;
    const dialogRef = this.dialog.open(content, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  deleteFolder() {
    let params: HttpParams;
    params = new HttpParams().set('folder_id', this.deleteFolderObj.id);

    this.customerService.deletePmcFolder(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.dialog.closeAll();
        this.deleteFolderObj = {};
        this.getFolders(this.currentParentObj);
      }
    });
  }

  deleteFileConfirm(folder: any, content: any) {
    this.deleteFileObj = folder;
    const dialogRef = this.dialog.open(content, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  deleteFile() {
    let params: HttpParams;
    params = new HttpParams().set('pdf_id', this.deleteFileObj.id);

    this.customerService.deleteFile(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.dialog.closeAll();
        this.deleteFileObj = {};
        this.getFolderDocs();
      }
    });
  }

  saveFolderFile() {
    const postData = new FormData();
    postData.append('pdf_file', this.fileUploadUrls);
    postData.append('folder_id', this.currentParentObj.id);
    postData.append('project_id', this.projectId);
    postData.append('created_by', this.currentUserId);
    postData.append('name', this.createNewFile.name);
    postData.append('version', this.createNewFile.version);
    postData.append('drawing_type', this.createNewFile.drawing_type);
    postData.append('drawing_no', this.createNewFile.drawing_no);
    postData.append('comments', this.createNewFile.comments);

    let path: any;
    this.folderInnerDetails.forEach((ele: any) => {
      if (ele.folder_name !== 'Root') {
        if (path) {
          path = path + '>' + ele.folder_name;
        } else {
          path = ele.folder_name;
        }
      }
    });

    if (path) {
      path = this.projectObj.data.title + ' - ' + path;
      postData.append('mail_subject', path);
    }

    let emails: any;
    this.selectedUsers.forEach((element) => {
      if (!emails) {
        emails = element;
      } else {
        emails = emails + ',' + element;
      }
    });
    postData.append('notification_mail_ids', emails);

    this.customerService.uploadPmcPdfFiles(postData).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.fileUploadUrls = [];
        this.createNewFile = {};
        this.selectedUsers = [];
        this.dialog.closeAll();
        this.getFolderDocs();
      }else{
        this.alertCall.showWarning("Alert",resp['message'])
      }
    });
  }

  viewDoc(file: any) {
    const url = this.imageUrl + '/' + file.pdf_path;
    window.open(url, '_blank');
  }

  getProjectEmails() {
    let params: HttpParams;
    params = new HttpParams().set('project_id', this.projectId.toString());
    this.customerService.getProjectEmails(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        if (resp.data && resp.data.length > 0 && resp.data[0].mail_ids) {
          this.selectedUsers = resp.data[0].mail_ids.split(',');
        }
      }
    });
  }
  // exportCSV(info) {
  //   this.outwardDatalist = info
  //    this.exportoutRecordsToexcels();
    
  // }

  // exportoutRecordsToexcels(): void {
   
  //   setTimeout(() => {

  //     / table id is passed over here /;
  //     let element = document.getElementById('outward-details-csv');
  //     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  //     / generate workbook and add the worksheet /;
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //     / save to file /;
  //     XLSX.writeFile(wb, `OutwardData_${moment().format('L')}.xlsx`);



  //   }, 3000);
  // }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('mytable');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, `Drawings_${moment().format('L')}.xlsx`);
 
  }
 
    public downloadpdf(): void{
      let array:any[]=[]
      this.pdfFiles$.forEach((element:any,index:any) => {
        array.push([index+1,element.name,element.drawing_no,element.drawing_type,element.version,element.created_by,
        moment(element.created_date).format("MMM DD,YYYY"),element.comments])
      });
      console.log(this.pdfFiles$)
      var doc = new jsPDF();

      doc.setFontSize(18);
      doc.text('', 11, 8);
      doc.setFontSize(11);
      doc.setTextColor(100);
  
      (doc as any).autoTable({
        head: this.head,
        body: array,
        theme: 'plain',
        didDrawCell: (data:any) => {
          // console.log(data.column.index)
        },
        showHead: "firstPage",
        columnStyles: {
          0: {cellWidth: 13},
          1: {cellWidth: 30},
          2: {cellWidth: 20},
          3: {cellWidth: 20},
          4: {cellWidth: 20},
          5: {cellWidth: 30},
          6: {cellWidth: 20},
          7: {cellWidth: 30},
         
        }
      })
      doc.save(`Drawings_${moment().format('L')}.pdf`);
    }
  //     let content = this.mytable.nativeElement;
  //     let options : any = {
  //       orientation: 'p',
  //       unit: 'pt',
  //       format: 'a2',
  //       };
  //       let doc = new jsPDF(options);
  //     // doc.html(content.innerHTML, {
  
  //     //   'width': 200,
  //     //   'elementHandlers': _elementHandlers
  //     // });
  //     doc.html(content.outerHTML, {
  //       callback: function (doc :any) {
  //         doc.save(`Drawings_${moment().format('L')}.pdf`);
  //       },
        
  //       margin:10,
  //       x: 100,
  //       y: 100
       
  //    });
     
  
  //   //  doc.save('Fuel-details.pdf');
    
    
  // }

  addtabledata(data: any) {
    this.dialog.open(data, {
      width: "1000px",
      height: '500px',
    });
  
    // console.log(file1);
  }
  closemodel() {
    this.dialog.closeAll();
  }
  // form: FormGroup;
  // private buildForm(): void {
  //   this.form = this.formBuilder.group({
  //     name: this.formBuilder.control(null),
  //     email: this.formBuilder.control(null),
  //     subject: this.formBuilder.control(null),
  //   });
  // }

  drawingType: any[] = [];
  drawingNo: any[] = [];
  drawingName: any[] = [];
  revisionNumber:any[]=[];
  mediaValue:string = "GEPS";
  media:any;
  quantity:any = 0;
  sheet:any
  checked:boolean
  pdfFiles2$ : any[]=[]
  // unchecked:boolean;
  checkedItem:boolean=false
  
  selectedFile(file: any) {
     console.log(file);
    
    this.media = "GEPS"
    this.hideButton = true
    if(file.checked===true){
      this.selectedArray.push(file);
    }else if(file.checked===false){
      let index = this.selectedArray.indexOf(file);
      this.selectedArray.splice(index, 1);
    }
  
    // if ($event.target.checked == true) {
  
    //   // this.pdfFiles2$.forEach((ele:any)=>{
    //   //   ele.checked = true
    //   //   this.checkedItem = ele.checked
        
    //   // })
    //   this.selectedArray.push(file);
    //   this.selectedArray.forEach((ele:any)=>{
    //     ele.checked=$event.target.checked
    //   })
    //   console.log(this.selectedArray);
    // } else {
    //   let index = this.selectedArray.indexOf(file);
    //   if (index > -1) {
    //     this.selectedArray.splice(index, 1);
    //     this.pdfFiles2$.forEach((ele:any)=>{
    //       ele.checked = false
    //       // this.unchecked = ele.checked
    //     })
    //   }
    // }
    this.drawingName = [];
    this.drawingNo = [];
    this.drawingType = [];
    this.revisionNumber = [];
    this.Media = [];
    this.Sheet = []
  
    this.selectedArray.forEach((element: any) => {
      element["approval_type"] = "";
      element["media"] = "";
      element["quantity"] = "";
      element["revision"] = "";
      element["sheet"] = "";
      element["status"] = "";
      element["numberofitems"]=""
    });
  
    
  }
  array:any[]=[]
  // isXyzChecked:boolean
  public saveUsername:boolean;
  isChecked:boolean
  onSubmit(fr: any) {
    let result1=''
    for (let i = 0; i < this.folderInnerDetails.length; i++) {
      result1 = result1.concat(this.folderInnerDetails[i].folder_name);
      if (i < this.folderInnerDetails.length - 1) {
        result1 = result1.concat(">");
    }  
  }
  const url: any = localStorage.getItem('redirect_uri');
    this.approvalType=[]
      this.Quantity=[]
      this.Revision=[]
      this.array=[]
      this.Status=[]
      this.drawingType=[]
      this.drawingNo=[]
      this.drawingName=[]
      this.revisionNumber=[]
    // let array:any[]=[]
    this.selectedArray.forEach((ele:any,index:any)=>{
      this.array.push(Number(index+1)+"of"+Number(this.selectedArray.length))
      this.approvalType.push(ele.approval_type);
      this.Quantity.push(ele.quantity);
      this.Revision.push(ele.version);
      this.Sheet.push(ele.sheet);
      this.Status.push(ele.status);
      this.drawingType.push(ele.drawing_type);
      this.drawingNo.push(ele.drawing_no);
      this.drawingName.push(ele.name);
      this.revisionNumber.push(ele.version)
      this.media = this.mediaValue;
      this.Media.push(this.media)
    })
    let obj = {
      "mail_subject": this.maildata.mail_subject,
      "mail_ids": this.maildata.mail_id,
      "mail_body": this.maildata.mail_body,
      "mail_note":this.maildata.note,
      "mail_signature":this.maildata.signature,
      "image_url": url,
      "image_folder": result1,
      "transmittal_number": this.maildata.transmittal_number,
      "title": this.drawingName,
      "drawing_type": this.drawingType,
      "drawing_number": this.drawingNo,
      "approval_type": this.approvalType,
      "media": this.mediaValue,
      "quantity": this.Quantity,
      "revision": this.revisionNumber,
      "sheet": this.array,
      "status": this.Status,
      'project_name':this.ProjectName
    };
    // debugger;
    this.customerService.getMailData(obj).subscribe((res: any) => {
       if (res && res.status_code === 200) {
         console.log(obj);
         fr.reset();
         this.selectedArray = [];
         this.maildata.mail_subject = "";
         this.maildata.mail_id = "";
         this.drawingName = [];
         this.drawingType = [];
         this.drawingNo = [];
         this.approvalType = [];
         this.Media = [];
         this.Quantity = [];
         this.revisionNumber = [];
         this.Sheet = [];
         this.Status = [];
         this.ProjectName='';
         this.dialog.closeAll();   
         this.pdfFiles$.forEach((ele:any)=>{
           ele.checked = false
           console.log(this.selectedArray);
         })   
         console.log(this.pdfFiles2$)   
         this.hideButton = false
         this.alertCall.showSuccess("Sent","Mail Sent Successfully")
       }else{
        this.alertCall.showWarning('Error', 'Mail not Sent');
        this.approvalType=[]
        this.Quantity=[]
        this.Revision=[]
        this.array=[]
        this.Status=[]
        this.drawingType=[]
        this.drawingNo=[]
        this.drawingName=[]
        this.revisionNumber=[]
        this.ProjectName='';
       }
    });
    
      
     
    // this.getFolderDocs(); 
    // this.Media.push(this.media)
    //   console.log(this.Media)
    
  }
  deleteitem(data:any){
    console.log(data);
    this.selectedArray.forEach((element:any,index:any) => {
      if(element.id===data.id){
        this.selectedArray.splice(index,1)
        console.log(this.selectedArray);
        if(this.selectedArray.length==0){
          this.dialog.closeAll(); 
          this.hideButton = false
          this.pdfFiles$.forEach((ele:any)=>{
            ele.checked=false 
            
          })
        }
        
      }
    });
  }
  keyPressNumbers(evt: any) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  getDepartmentslist(){
    this.customerService.getAllDept().subscribe((res:any)=>{
      console.log(res)
      this.departmentsList = res.data
    })
  }

  filterDepartmentData(ev:any){
    console.log(ev.target.value)
    this.selectedDepartment = ev.target.value
    if(this.selectedDepartment.length>2){
      this.getDepartmentslist();
    }
    if(!this.selectedDepartment){
      this.getDepartmentslist();
    }

  }
  enteredUser:any
  userdataList:any
  filterUserDetails(ev:any,val:any){
    console.log(ev.target.value);
    let nameArr:any = ev.target.value.split(',');
    this.enteredUser = ev.target.value;
    if (nameArr.length > 1){
      this.enteredUser = nameArr[nameArr.length - 1];
    }
    val = this.enteredUser.trim()
    if(this.enteredUser.length>2){
      this.customerService.getSearchUsers(val).subscribe((res:any)=>{
        console.log(res)
        this.userdataList = res.data
      })
    }
   
  }
  onSelFunc(inputVal:any, selectedVal:any){
    setTimeout(() => {
      let nameArr:any = inputVal.split(',');
    if (nameArr.length > 1){
     // this.enteredUser = nameArr[nameArr.length - 1];
     nameArr.splice(-1);
     nameArr = nameArr+','
    }
    else{
      nameArr = '';
    }
    this.maildata.mail_id = nameArr+selectedVal;
    }, 10);
    
    
  }
  focusUpdate(inputVal:any, selectedVal:any){


  }

}
