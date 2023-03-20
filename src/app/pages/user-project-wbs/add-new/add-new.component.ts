import { HttpParams } from '@angular/common/http';
import { LoaderService } from './../../../shared/loader/loader.service';
import { GreenkoUtils } from 'src/app/utils/flip.utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from './../../../services/angular-events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from './../../../services/customer.service';

import { FormControl } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Injectable,
} from '@angular/core';
import {
  CollectionViewer,
  SelectionChange,
  DataSource,
  SelectionModel,
} from '@angular/cdk/collections';

import { BehaviorSubject, merge, Observable } from 'rxjs';

/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(
    public item: any,
    public level = 1,
    public expandable = false,
    public isLoading = false
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

  currentUserId: any;

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: DynamicDatabase,
    public customerService: CustomerService,
    public route: ActivatedRoute,
    public events: EventsService
  ) {
    this.events.subscribe('project-id').subscribe((resp: any) => {
      if (resp) {
        this.projectId = resp.id;
      }
    });

    this.events.subscribe('current-user-id').subscribe((resp: any) => {
      if (resp) {
        this.currentUserId = resp.id;
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
    if (expand) {
      node.isLoading = true;
      let params: HttpParams;
      params = new HttpParams()
        .set('project_id', this.projectId.toString())
        .set('wbs_id', node.item.wbs_id)
        .set('wbs_username', this.currentUserId);

      this.customerService
        .getProjectWbsActivityDetails(params)
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
                  totalAcc = totalAcc + Number(qty.accepted_quantity);
                });
                element.actual_qty = totalAct;
                element.accepted_qty = totalAcc;
              }

              this.data[index].item.table = resp.data.ativity_data;
            } else {
              this.data[index].item.table = [];
            }

            resp.data.WBS.forEach((element: any) => {
              if (element.user_wbs > 0) {
                element.isSelected = true;
              }
            });

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

            this.events.publish('check-box', this.data);
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
      this.events.publish('check-box', this.data);
      this.dataChange.next(this.data);
    }
  }
}

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent implements OnInit {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);
  myControl = new FormControl();
  projectControl = new FormControl();
  wbsControl = new FormControl();

  filteredOptions: any;
  filteredProjects: Observable<any[]>;
  filteredWbs: any;

  allUsers$: any;

  projects$: any[] = [];
  departments$: any[] = [];
  roles$: any[] = [];
  subRoles$: any[] = [];

  addUserObj: any = {};

  allWBS$: any = [];

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: any;

  projectObj: any = {
    data: {
      title: null,
      wbs_data: [],
      ativity_data: [],
    },
  };

  /** The selection for checklist */
  checklistSelection = new SelectionModel<DynamicFlatNode>(true /* multiple */);

  projectId: any;

  allComplete = false;

  selectedActivities$: any = [];

  currentUser: any;

  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog,
    public alertCall: AlertCallsService,
    database: DynamicDatabase,
    public route: ActivatedRoute,
    public events: EventsService,
    public ngModel: NgbModal,
    public utils: GreenkoUtils,
    public loader: LoaderService,
    public router: Router
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

    // this.getAllProjects();
    this.events.subscribe('check-box').subscribe((resp: any) => {
      resp.map((x: any) => {
        if (x.item.isSelected) {
          this.checklistSelection.select(x);
        }
      });
    });

    setTimeout(() => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((val) => {
          return this.userFilter(val || '');
        })
      );

      this.filteredProjects = this.projectControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.projectFilter(value))
      );
    }, 1000);
  }

  ngOnInit(): void {
    this.projectControl.disable();
  }

  // User
  userFilter(val: string): any {
    if (!val) {
      return [];
    }
    return this.customerService.getSearchUsers(val).pipe(
      map((response: any) => {
        this.allUsers$ = response.data || [];
        return response.data || [];
      })
    );
  }

  //Project
  projectFilter(value: string): any {
    if (!value) {
      return this.projects$;
    }
    const filterValue = value.toLowerCase();
    return this.projects$.filter((option: any) =>
      option.proj_short_name.toLowerCase().includes(filterValue)
    );
  }

  getAllProjects() {
    this.customerService.getAllFilterProjects().subscribe((response: any) => {
      if (response && response.status_code === 200) {
        this.projects$ = response.data;
      }
    });
  }

  async getDataObj(project: any) {
    const projectObj = this.projects$.find(
      (x) => x.proj_short_name === project
    );

    if (!projectObj) {
      return;
    }

    this.projectId = projectObj.proj_id;
    this.events.publish('project-id', { id: this.projectId });

    let params = new HttpParams();
    params = new HttpParams()
      .set('project_id', this.projectId)
      .set('wbs_username', this.currentUser);

    this.customerService.getProjectWbsDetails(params).subscribe((resp: any) => {
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
        resp.data.wbs_data.forEach((element: any) => {
          if (element.user_wbs > 0) {
            element.isSelected = true;
          }
        });

        this.dataSource.data = resp.data.wbs_data.map(
          (name: any) => new DynamicFlatNode(name, 0, true)
        );

        this.dataSource.data.map((x: any) => {
          if (x.item.isSelected) {
            this.checklistSelection.select(x);
          }
        });
        // val[1].map(x => this.checklistSelection.select(x))
        // this.dataSource.data = val[0]
        // val[1].map(x => this.checklistSelection.select(x))

        if (this.projectObj.data && this.projectObj.data.ativity_data) {
          // this.projectObj.data.allComplete = false;
          this.projectObj.data.ativity_data.forEach((ele: any) => {
            if (ele.user_wbs > 0) {
              ele.completed = true;
            } else {
              ele.completed = false;
            }
          });
        }
        // name.hasComps === "YES" ? true : false
      }
    });
  }

  getLevel = (node: any) => node.level;

  isExpandable = (node: any) => node.expandable;

  hasChild = (_: number, _nodeData: any) => _nodeData.expandable;

  todoLeafItemSelectionToggle(node: DynamicFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: DynamicFlatNode): void {
    let parent: DynamicFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  getParentNode(node: DynamicFlatNode): DynamicFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: DynamicFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: DynamicFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: DynamicFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: DynamicFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  // getAllProjectWbs(project: any) {
  //   const projectObj = this.projects$.find(
  //     (x) => x.proj_short_name === project
  //   );
  //   if (projectObj) {
  //     this.customerService
  //       .getProjectDetails(projectObj.proj_id)
  //       .subscribe((resp: any) => {
  //         console.log(resp);
  //       });
  //   } else {
  //     this.allWBS$ = [];
  //   }
  // }

  /** Whether the number of selected elements matches the total number of rows. */
  setAll(completed: boolean, data: any) {
    if (data == null) {
      return;
    }
    data.forEach((t: any) => (t.completed = completed));

    if (completed) {
      const allLength = data.filter((t: any) => t.completed);
      this.selectedActivities$ = [...this.selectedActivities$, ...allLength];
    } else {
      const allLength = data.filter((t: any) => !t.completed);
      for (let index = 0; index < allLength.length; index++) {
        const element = allLength[index];
        const indexOfValue = this.selectedActivities$.findIndex(
          (ele: any) => element.task_id === ele.task_id
        );
        if (indexOfValue !== -1) {
          this.selectedActivities$.splice(indexOfValue, 1);
        }
      }
    }
    // data.allComplete = completed;
  }

  updateAllComplete(data: any, single: any, completed: boolean) {
    data.forEach((ele: any) => {
      if (ele.task_id === single.task_id) {
        ele.completed = completed;
      }
    });

    if (completed) {
      const allLength = [single];
      this.selectedActivities$ = [...this.selectedActivities$, ...allLength];
    } else {
      const indexOfValue = this.selectedActivities$.findIndex(
        (ele: any) => single.task_id === ele.task_id
      );
      if (indexOfValue !== -1) {
        this.selectedActivities$.splice(indexOfValue, 1);
      }
    }

    // data.allComplete = data != null && data.every((t: any) => t.completed);
  }

  someComplete(data: any, flag: boolean): boolean {
    if (data == null) {
      return false;
    }
    return data.filter((t: any) => t.completed).length > 0 && !flag;
  }

  addNewUser() {
    const project = this.projects$.find(
      (x: any) => x.proj_short_name === this.addUserObj.project
    );

    const menus: any = this.checklistSelection.selected;

    const wbs: any = [];
    menus.forEach((ele: any) => {
      if (ele) {
        wbs.push({
          wbs_id: ele.item.wbs_id,
          get_type:
            ele.item.sub_activities > 0 || ele.item.sub_tasks > 0 ? 'all' : '',
          type: 'wbs',
        });
      }
    });

    this.selectedActivities$.forEach((ele: any) => {
      if (ele) {
        wbs.push({ wbs_id: ele.task_id, get_type: '', type: 'activity' });
      }
    });

    const params = {
      username: this.addUserObj.user,
      project_id: project.proj_id,
      wbs_ids: wbs,
    };

    this.customerService.addUserProjectWbs(params).subscribe((resp: any) => {
      if (resp) {
        this.alertCall.showSuccess('WBS', 'Project WBS Added Successfully');
        this.router.navigateByUrl('/projectwbs');
      }
    });
  }

  loadUserProjects(data: any) {
    let user;
    if (data) {
      user = this.allUsers$.find((x: any) => x.usename === data);
    }
    if (user) {
      this.currentUser = user.usename;
      this.events.publish('current-user-id', { id: this.currentUser });
    }

    const params = new HttpParams().set('email', user.work_email);

    this.customerService.getUserListProjects(params).subscribe((resp: any) => {
      if (resp.status_code === 200) {
        this.projects$ = resp.data;
      } else {
        this.projects$ = [];
      }
      // this.projectFilter('');
      this.filteredProjects = this.projectControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.projectFilter(value))
      );
    });
  }
}
