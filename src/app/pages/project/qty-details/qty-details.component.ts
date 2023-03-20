import { AuthService } from './../../../auth/auth.service';
import { CreateIssueLogComponent } from './../../../components/create-issue-log/create-issue-log.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GreenkoUtils } from './../../../utils/flip.utils';
import { TaskImagesComponent } from './../task-images/task-images.component';
import { PlatformLocation } from '@angular/common';
import { AlertCallsService } from './../../../auth/alert-calls.service';
import { CustomerService } from './../../../services/customer.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { LogicalFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
import { AcceptedqtyimagesComponent } from '../acceptedqtyimages/acceptedqtyimages.component';

@Component({
  selector: 'app-qty-details',
  templateUrl: './qty-details.component.html',
  styleUrls: ['./qty-details.component.scss'],
})
export class QtyDetailsComponent implements OnInit {
  @Input()
  taskObj: any = {};

  isQtyActivity = false;

  fileUploadUrls: any = [];

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  showQtyBtn = true;
  deleteFileObj: any = {};
  actualquantity: any;
  rowId: any;
  acceptedquantity: any[]=[]
  qty: any;
  clickedrow: any;
  actualqtydate: any;
  actualqtycomments: any;
  acceptedqtydate: any;
  acceptedqtycomments: any;
  acceptedQuantity: any;
  addeddata: any;
  sum:any=0;
  sum1:any=0;
  acceptedqtydata:any[]=[]
  showQtyBtn1: boolean;
  accdata:any[]=[]
  showview: boolean=false;
  accepted_qty1:any;
  acceptedqtycomments1:any;
  acceptedquantitycomments:any
  SUM: any;
  acceptedqtysum:any[]=[]
  actSUM:any=0
  fileUploadUrls1: any = [];
  fileurls:any=[]
  selectedvalue:any;
  array:any[]=[]
  array1: any[];
  sum11:any;
  newarray: any[]=[]
  pendingbalqty: any[];
  fileToUpload: File | null = null;
  currentUserId: any;
  selected:any=false;
  rowClicked: any;
  selectedIndex = -1;
  finalsum: number;
  accqtyimage:any;
  constructor(
    public ngModel: NgbModal,
    public customerService: CustomerService,
    public alertCall: AlertCallsService,
    private location: PlatformLocation,
    public activeModal: NgbActiveModal,
    public utils: GreenkoUtils,
    public dialog: MatDialog,
    public authService: AuthService,
    public loader: LoaderService,
  ) {}

  ngOnInit(): void {
   
    this.location.onPopState(() => this.activeModal.close());
    if (
      Number(this.taskObj.actual_qty).toFixed(0) ===
      Number(this.taskObj.quantity).toFixed(0)
    ) {
      this.showQtyBtn = false;
    }
   
    const user = this.authService.currentUserRoleDetails;
    if (user) {
      this.currentUserId = user.employee_id;
    } 
  }
  showContent(index:any) {
    this.selectedIndex = index;  
    console.log(this.selectedIndex);
     
  }
  gettotal(data:any,dt1:any){
    
    // console.log(dt1);
    
       this.array.push(data)
        // console.log(this.array);
       
    this.pendingbalqty = this.array.map((sum => (value:any) => sum += value)(0))
    // console.log( this.pendingbalqty);
    return this.pendingbalqty[dt1]
  

  }

  getActQty(data:any){
    this.actSUM=0
    let actdata:any
    data.forEach((element:any) => {
    //  actdata= Number(element.actual_quantity).toFixed(2)
      this.actSUM += +element.actual_quantity
    });
   return this.actSUM
    
  }
  
  getbalanceqty(acc_qty:any,act_qty:any){
   let sum=0
   acc_qty.forEach((element:any) => {
    //  actdata= Number(element.actual_quantity).toFixed(2)
      sum += +element
    }); 
    this.finalsum=act_qty-sum
    return this.finalsum
  }
  getbalanceaccQty(data:any){
    
    let array1:any=[],total=0;
    data.forEach((element:any) => {
      array1.push(element.balance_quantity)
      total=total+element.balance_quantity;
    });
    // console.log(total);
    
    // const last = array1[array1.length - 1];
    const last=total;
// console.log(last);
    return last
  }
  closeModel() {
    this.ngModel.dismissAll();
    this.passEntry.emit();
  }

  updateAcceptedQty(task: any) {
     console.log(this.fileUploadUrls1);
    
    // this.acceptedQuantity=task.accepted_qty
    // this.qty=Number(this.acceptedQuantity) + Number(this.sum);
    if (!task.accepted_qty) {
      return;
    }

    if (!task.accepted_qty || !task.acceptedquantitycomments) {
      this.alertCall.showWarning('Accepted', 'Plz Enter Details');
      return;
    }

    if (Number(task.accepted_qty) > task.actual_quantity) {
      this.alertCall.showWarning(
        'Accepted',
        'Accepted Qty Not More than Actual Qty'
      );
      return;
    }
    const postData = new FormData();

    for (const file of this.fileUploadUrls1) {
      postData.append('task_image', file);
    }
    postData.append('task_quantity_id', task.id);
    postData.append('accepted_qty', task.accepted_qty);
    postData.append('accepted_qty_by', this.currentUserId);
    postData.append('accepted_qty_comments', task.acceptedquantitycomments);
   
    // postData.append('project_id', this.taskObj.wbs_id);
    // postData.append(' wbs_id', task.actual_qty_comments);
    // postData.append(' task_id', this.taskObj.task_id);
    // const params = {
    //   task_quantity_id: task.id ,
    //   accepted_qty: task.accepted_qty,
    //   accepted_qty_by: null,
    //   accepted_qty_comments: task.acceptedquantitycomments,
    //   // task_image:this.Photo
    // };

    this.customerService
      .updateTaskAcceptedQtyUpdate(postData)
      .subscribe((resp: any) => {
        if (resp.status_code === 200) {
          this.alertCall.showSuccess('Accepted', 'Accepted Qty Added');
        
          this.fileUploadUrls1 = [];
          this.fileurls=[]
          this.loadActivityDetails();
         this.selectedIndex=-1
        
        // this.taskObj.act_quantity[this.rowId].accepted_quantity.push(this.qty)
          
        } else if (resp.status_code === 304) {
          this.alertCall.showWarning('Accepted', resp.message);
        }else{
          this.alertCall.showWarning('Accepted', resp.message);
        }
      });
  }
  updateAcceptedQty1() {
    // console.log(task.accepted_qty);
    
    this.acceptedQuantity=this.accepted_qty1
    this.qty=Number(this.acceptedQuantity) + Number(this.sum);
    if (!this.accepted_qty1) {
      return;
    }

    if (!this.accepted_qty1 || !this.acceptedqtycomments1) {
      this.alertCall.showWarning('Accepted', 'Plz Enter Details');
      return;
    }

    if (Number(this.qty) > Number(this.actualquantity)) {
      this.alertCall.showWarning(
        'Accepted',
        'Accepted Qty Not More than Actual Qty'
      );
      return;
    }

    // const params = {
    //   task_quantity_id:  this.rowId,
    //   accepted_qty: this.accepted_qty1,
    //   accepted_qty_by: null,
    //   accepted_qty_comments: this.acceptedqtycomments1,
    // };
    const postData = new FormData();

    for (const file of this.fileUploadUrls1) {
      postData.append('task_image', file);
    }
    postData.append('task_quantity_id', this.rowId);
    postData.append('accepted_qty', this.accepted_qty1);
    postData.append('accepted_qty_by', this.currentUserId);
    postData.append('accepted_qty_comments', this.acceptedqtycomments1);
   
    this.customerService
      .updateTaskAcceptedQtyUpdate(postData)
      .subscribe((resp: any) => {
        if (resp.status_code === 200) {
          this.alertCall.showSuccess('Accepted', 'Accepted Qty Added');
        this.dialog.closeAll()
          this.loadActivityDetails();
          this.fileUploadUrls1=[]
          
         
        
        // this.taskObj.act_quantity[this.rowId].accepted_quantity.push(this.qty)
          
        } else if (resp.status_code === 304) {
          this.alertCall.showWarning('Accepted', resp.message);
        }
      });
  }
  updateActualQty(task: any) {
    console.log(task.balance_quantity);
    
    if (!task.actual_qty || !task.actual_qty_comments) {
      this.alertCall.showWarning('Actual', 'Plz Enter Details');
      return;
    }

    if (Number(task.actual_qty) > Number(this.taskObj.quantity)) {
      this.alertCall.showWarning(
        'Actual',
        'Actual Qty Not More than Planned Qty'
      );
      return;
    }
    const params = {
      project_id: this.taskObj.proj_id,
      wbs_id: this.taskObj.wbs_id,
      task_id: this.taskObj.task_id,
      actual_qty: task.actual_qty,
      actual_qty_by: null,
      actual_qty_comments: task.actual_qty_comments,
    };

    const postData = new FormData();

    for (const file of this.fileUploadUrls) {
      postData.append('task_image', file);
    }

    postData.append('wbs_id', this.taskObj.wbs_id);
    postData.append('task_id', this.taskObj.task_id);
    postData.append('project_id', this.taskObj.proj_id);
    postData.append('actual_qty', task.actual_qty);
    // postData.append('actual_qty_by', 'null');
    postData.append('actual_qty_comments', task.actual_qty_comments);

    this.customerService.updateTaskActualQtyUpdateNew(postData).subscribe(
      (resp: any) => {
        if (resp.status_code === 200) {
          this.showview=true;
          this.alertCall.showSuccess('Actual', 'Actual Qty Added');
          this.fileUploadUrls = [];
          this.loadActivityDetails();
          this.ngOnInit()
          
        } else if (resp.status_code === 304) {
          this.alertCall.showWarning('Actual', resp.message);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addNewQty() {
    if (!this.taskObj.quantity || this.taskObj.quantity === '') {
      this.alertCall.showWarning('Planned Qty', 'Planned Qty Not Added');
      return;
    }
    if (!this.isQtyActivity) {
      this.isQtyActivity = true;
      const obj = {};
      this.taskObj.act_quantity.push(obj);
    }
  }
  addRow(value:any,index:any,data:any){
    this.accepted_qty1='';
    this.acceptedqtycomments1='';
    console.log(value);
    let sum2=0
    this.rowId=value.id;
    this.acceptedquantity=value.accepted_quantity;
    // const sum =  Number(this.acceptedquantity.reduce((sum, current) => sum + current.total, 0));
    if(value.accepted_quantity.length !==0) {
 this.acceptedquantity.forEach(element=>{
   
        sum2 += element;
        this.sum=sum2
    });
    console.log(sum2);
    }
   


    
   this.actualquantity=value.actual_quantity
   this.actualqtydate=value.actual_quantity_date
   this.actualqtycomments=value.actual_qty_comments
   this.acceptedqtydate=value.accepted_quantity_date
   this.acceptedqtycomments=value.acceptedquantitycomments
    // const obj = {actual_quantity:this.actualquantity,actual_quantity_date :this.actualqtydate};
    // this.taskObj.act_quantity.push(obj);
    // console.log(obj);
    this.dialog.open(data,{
      width:'1000px'
    })
  }
  
  loadActivityDetails() {
    this.loader.show();
    this.customerService
      .getProjectActivityDetails(this.taskObj.proj_id, this.taskObj.wbs_id)
      .subscribe((resp: any) => {
        this.loader.hide()
        if (resp.status_code === 200) {
          const obj = resp.data.ativity_data.find(
            (x: any) => x.task_id === this.taskObj.task_id
          );
          if (obj) {
            this.taskObj = obj;
            let addedsum=0
           this.taskObj.act_quantity.forEach((el:any) => {
           this.acceptedqtysum=el.accepted_quantity
            
          //   this.acceptedqtysum.forEach((el1:any) => {
          //     addedsum += el1 
          //    this.SUM=addedsum
          // });
          // console.log(this.SUM);
            });
         
            
         
            console.log(this.taskObj);
            
             
          }
        //   this.acceptedqtydata=this.taskObj.act_quantity
        //   this.acceptedqtydata.forEach(ele=>{
        //     this.accdata=ele.accepted_quantity
        //     this.acceptedqtydata.forEach(e1=>{
        //       this.sum1 += e1;
        //     })
          
        //   })
        //   console.log(this.sum1);
          
        //   if( Number(this.sum1).toFixed(0) >=
        //   Number(this.taskObj.actual_quantity).toFixed(0)
        // ) {
        //   this.showQtyBtn1 = false;
        // }
          if (
            Number(this.taskObj.actual_qty).toFixed(0) ===
            Number(this.taskObj.quantity).toFixed(0)
          ) {
            this.showQtyBtn = false;
          }
          this.isQtyActivity = false;
        
        }
       
  
      });
  }

  uploadFile(fileInput: any, task: any, node: any, taskIndex: number) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrls = fileInput.target.files;
      console.log(this.fileUploadUrls);
    }
  }
  uploadFile1(fileInput: any, task: any, node: any, taskIndex: number) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrls1 = fileInput.target.files;
      this.fileurls=fileInput.target.files;
      console.log(this.fileUploadUrls1);
    }
  }
  closemodel(){
    this.dialog.closeAll()
    this.fileurls=[]
  }
  openTaskImages(task: any,taskname:any) {
    const addDigital = this.ngModel.open(TaskImagesComponent, {
      size: 'md',
    });
    addDigital.componentInstance.taskObj = {"task":task,"taskname":taskname};
    addDigital.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      console.log();
    });
  }
  openTaskImages1(index:any,data:any,taskname:any){
     data.forEach((element:any,i:any) => {
      if(i===index){
         this.accqtyimage = element
        
      }
    });
    const addDigital = this.ngModel.open(AcceptedqtyimagesComponent, {
      size: 'md',
    });
    addDigital.componentInstance.data = {"id":this.accqtyimage,"taskname":taskname};
    addDigital.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      console.log();
    });
  //  task.forEach((element: any) => {
  //     // element = element
  //     if (element.task_image) {
  //       element.src = element.task_image;
  //       element.thumb = element.task_image;
  //       // element.src = element.task_image.replace(
  //       //   "b'",
  //       //   'data:image/png;base64,'
  //       // );
  //       // element.src = element.src.replace("='", '=');
  //       // element.thumb = element.src.replace("='", '=');
  //       this.taskImages$.push(element);
  //     }
  //   });
  }
  createIssueLog() {
    const dialogRef = this.dialog.open(CreateIssueLogComponent, {
      data: {
        project_id: this.taskObj.proj_id,
        wbs_id: this.taskObj.wbs_id,
        task_id: this.taskObj.task_id,
      },
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      console.log(result);
      // this.loadInvoices();
    });
  }

  deleteFileConfirm(folder: any, content: any, i: number) {
    this.deleteFileObj = folder;
    this.deleteFileObj.index = i;
    const dialogRef = this.dialog.open(content, {
      width: '250px',
      data: {},
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  deleteFile() {
    this.customerService
      .deleteProjectActualQty(this.deleteFileObj.id)
      .subscribe((resp: any) => {
        if (resp && resp.status_code === 200) {
          this.dialog.closeAll();
          this.taskObj.act_quantity.splice(this.deleteFileObj.index, 1);
          this.loadActivityDetails()
          this.deleteFileObj = {};
        }
      });
  }
  getstructure(data:any){
   data= data.map(data.pop,[...data])      //to reverse array instead of reverse method
    let result1=''
    for (let i = 0; i < data.length; i++) {
      result1 = result1.concat(data[i]);
      if (i < data.length - 1) {
        result1 = result1.concat(">");
    }  
  }
  return result1
  }
}
