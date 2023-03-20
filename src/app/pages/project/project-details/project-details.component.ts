import { AuthService } from './../../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTicketComponent } from './../../../components/create-ticket/create-ticket.component';
import { LoaderService } from './../../../shared/loader/loader.service';
import { GreenkoUtils } from './../../../utils/flip.utils';
import { QtyDetailsComponent } from './../qty-details/qty-details.component';
import { TaskImagesComponent } from './../task-images/task-images.component';
import { EventsService } from './../../../services/angular-events.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from './../../../services/customer.service';
import {
  CollectionViewer,
  SelectionChange,
  DataSource,
} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  ElementRef,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(
    public item: any,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  rootLevelNodes: any[] = [];

  isExpandable(node: any): boolean {
    return node.hasComps === 'YES' ? true : false;
  }
}
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): any[] {
    return this.dataChange.value;
  }
  set data(value: any[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  projectId: any;
  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: DynamicDatabase,
    public customerService: CustomerService,
    public route: ActivatedRoute,
    public events: EventsService
  ) {
    this.route.queryParams.subscribe((resp: any) => {
      if (resp) {
        this.projectId = resp.id;
      }
    });

    this.events.subscribe('node-mode').subscribe((resp: any) => {
      this.loadNodes(resp, true);
    });
  }
  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe((change) => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach((node) => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  async toggleNode(node: any, expand: boolean) {
    this.loadNodes(node, expand);
  }

  loadNodes(node: any, expand: boolean) {
    console.log(node,expand);
if (expand) {
      node.isLoading = true;
      this.customerService
        .getProjectActivityDetails(this.projectId, node.item.wbs_id)
        .subscribe((resp: any) => {
          if (resp.status_code === 200) {
            // if (resp.data.WBS.length === 0) {
            const index = this.data.indexOf(node);

            let count = 0;
            for (
              let i = index + 1;
              i < this.data.length && this.data[i].level > node.level;
              i++, count++
            ) {}

            if (expand) {
              for (
                let index = 0;
                index < resp.data.ativity_data.length;
                index++
              ) {
                const element = resp.data.ativity_data[index];
                element.actual_qty = 0;
                element.accepted_qty = 0;
                let totalAct: number = 0;
                let totalAcc: number = 0;
                element.act_quantity.forEach((qty: any) => {
                  totalAct = totalAct + Number(qty.actual_quantity);
                  qty.accepted_quantity.forEach((element:any) => {
                    totalAcc = totalAcc + Number(element); 
                  });
                 
                });
                element.actual_qty = totalAct;
                element.accepted_qty = totalAcc;
              }

              this.data[index].item.table = resp.data.ativity_data;
            } else {
              this.data[index].item.table = [];
            }

            // this.dataChange.next(this.data);
            // node.isLoading = false;
            // } else {
            const children = resp.data.WBS;
            // const index = this.data.indexOf(node);
            if (!children || index < 0) {
              // If no children, or cannot find the node, no op
              return;
            }

            if (expand) {
              const nodes = children.map(
                (name: any) => new DynamicFlatNode(name, node.level + 1, true)
              );
              this.data.splice(index + 1, 0, ...nodes);
            } else {
              let count = 0;
              for (
                let i = index + 1;
                i < this.data.length && this.data[i].level > node.level;
                i++, count++
              ) {}
              this.data.splice(index + 1, count);
            }

            // notify the change
            this.dataChange.next(this.data);
            node.isLoading = false;
            // }
          }
        });
    } else {
      const index = this.data.indexOf(node);

      let count = 0;
      for (
        let i = index + 1;
        i < this.data.length && this.data[i].level > node.level;
        i++, count++
      ) {}

      this.data.splice(index + 1, count);
      this.data[index].item.table = [];

      this.dataChange.next(this.data);
    }
  }
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: any;

  projectId: any;

  showQty = false;
  showAcceptedQty = false;

  projectObj: any = {
    data: {
      title: null,
      wbs_data: [],
    },
  };

  startDate: any;
  endDate: any;
  useDefault: boolean= false;;

  constructor(
    database: DynamicDatabase,
    public customerService: CustomerService,
    public route: ActivatedRoute,
    public events: EventsService,
    public ngModel: NgbModal,
    public utils: GreenkoUtils,
    public loader: LoaderService,
    public dialog: MatDialog,
    public authService: AuthService
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(
      this.treeControl,
      database,
      customerService,
      route,
      events
    );

    this.route.queryParams.subscribe((resp: any) => {
      if (resp) {
        this.projectId = resp.id;
        this.startDate = resp.start;
        this.endDate = resp.end;
        this.getDataObj();
      }
    });

    this.events.subscribe('activity').subscribe((resp: any) => {
      if (resp.title === 'Field Executive') {
        this.showQty = !this.showQty;
      } else if (resp.title === 'Quality') {
        this.showAcceptedQty = !this.showAcceptedQty;
      }
    });

    // this.dataSource.data = database.initialData();
  }

  ngOnInit(): void {}

  async getDataObj() {
    this.customerService
      .getProjectDetails(this.projectId)
      .subscribe((resp: any) => {
        if (resp.status_code === 200) {
          for (let index = 0; index < resp.data.ativity_data.length; index++) {
            const element = resp.data.ativity_data[index];
            element.actual_qty = 0;
            element.accepted_qty = 0;
            let totalAct: number = 0;
            let totalAcc: number = 0;
            element.act_quantity.forEach((qty: any) => {
              totalAct = totalAct + Number(qty.actual_quantity);
              totalAcc = totalAcc + Number(qty.accepted_quantity);
            });
            element.actual_qty = totalAct;
            element.accepted_qty = totalAcc;
          }
          this.projectObj = resp;
          this.dataSource.data = resp.data.wbs_data.map(
            (name: any) => new DynamicFlatNode(name, 0, true)
          );
          // name.hasComps === "YES" ? true : false
        }
      });
  }
  toggle(ev:any,data:any,node:any){
    let formData = new FormData()
    formData.append("task_id",data.task_id)
    formData.append("proj_id",data.proj_id)
    formData.append("wbs_id",data.wbs_id)
    formData.append("qc_enable",ev.checked)
    this.customerService.addQualityCheckForTask(formData).subscribe((res:any)=>{
      if(res&&res['status_code']==200){
        if (node !== 1) {
          this.events.publish('node-mode', node);
        } else {
          this.getDataObj();
        }
        
      }
      
    })
  }
  getLevel = (node: any) => node.level;

  isExpandable = (node: any) => node.expandable;

  hasChild = (_: number, _nodeData: any) => _nodeData.expandable;

  uploadFile(fileInput: any, task: any, node: any, taskIndex: number) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      // this.fileUploadUrls = [];
      let count = fileInput.target.files.length;

      for (const file of fileInput.target.files) {
        const postData = new FormData();
        postData.append('task_image', file);
        postData.append('wbs_id', task.wbs_id);
        postData.append('task_id', task.task_id);
        postData.append('project_id', task.proj_id);
        // postData.append('task_image', file.name);

        this.customerService.uploadFiles(postData).subscribe((resp: any) => {
          count--;

          if (count !== 0) {
            return;
          }
          this.loader.hide();

          if (node === 1) {
            this.getDataObj();
            return;
          }
          this.customerService
            .getProjectActivityDetails(task.proj_id, task.wbs_id)
            .subscribe((resp1: any) => {
              let table;
              if (resp1) {
                table = resp1.data.ativity_data.find(
                  (x: any) => x.task_id === task.task_id
                );
              }

              const index = this.dataSource.data.indexOf(node);

              let count = 0;
              for (
                let i = index + 1;
                i < this.dataSource.data.length &&
                this.dataSource.data[i].level > node.level;
                i++, count++
              ) {}

              if (table) {
                this.dataSource.data[index].item.table[
                  taskIndex
                ].task_images_count += 1;
              }
            });
        });
      }
    }
  }

  openTaskImages(task: any) {
    const addDigital = this.ngModel.open(TaskImagesComponent, {
      size: 'md',
    });
    addDigital.componentInstance.taskObj = task;
    addDigital.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      console.log();
    });
  }

  openQtyDetails(task: any, node: any) {
    const addDigital = this.ngModel.open(QtyDetailsComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      
     
    });
    addDigital.componentInstance.taskObj = task;
    addDigital.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      if (node !== 1) {
        this.events.publish('node-mode', node);
      } else {
        this.getDataObj();
      }
    });
    // const dialogRef = this.dialog.open(QtyDetailsComponent, {
    //   data: task,
    //   hasBackdrop: true,
    //   // backdropClass: 'modal-background',
    //   panelClass: 'form-dialogs',
    //   width: '70%',
    // });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (node !== 1) {
    //     this.events.publish('node-mode', node);
    //   } else {
    //     this.getDataObj();
    //   }
    // });
  }

  createTicket() {
    const dialogRef = this.dialog.open(CreateTicketComponent, {
      data: {
        projectId: this.projectId,
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
}
