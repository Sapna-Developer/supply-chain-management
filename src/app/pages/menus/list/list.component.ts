import { AuthService } from './../../../auth/auth.service';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { MatPaginator } from '@angular/material/paginator';
import { AddNewComponent } from '../add-new/add-new.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { CustomerService } from '../../../services/customer.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  myControl = new FormControl();
  projectControl = new FormControl();
  deptControl = new FormControl();
  roleControl = new FormControl();
  subRoleControl = new FormControl();

  filteredOptions: any;
  filteredProjects: Observable<any[]>;
  filteredDept: Observable<any[]>;
  filteredRoles: Observable<any[]>;
  filteredSubRoles: Observable<any[]>;

  allUsers$: any;

  projects$: any[] = [];
  departments$: any[] = [];
  roles$: any[] = [];
  subRoles$: any[] = [];

  options = [];

  userSearchObj: any = {};

  tableData$ = [];
  displayedColumns: string[] = [
    'sno',
    'dept',
    'role',
    'sub_role',
    'menu',
    'created_date',
    'action'
  ];

  loadingRecords = false;
  totalRecords = 0;
  recordsPerPage = 100;
  pageNumber = 1;

  locations$: any = [];

  sortBy = 'locationId';
  sortType: any = false;
  startDate: any;
  endDate: any;

  selectedRecords$: any = [];
  selectedLocation: any;

  filterParams: any = {};

  menuName: any;
  selectedfile: any;
  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog,
    public alertCall: AlertCallsService,
    public authService: AuthService
  ) {
    this.getAllMenus();
    this.getDepts();
    this.getRoles();
    this.getSubRoles();
    this.getUserRoleDetails();

    setTimeout(() => {
      this.filteredProjects = this.projectControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.projectFilter(value))
      );

      this.filteredDept = this.deptControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.deptFilter(value))
      );

      this.filteredRoles = this.roleControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.roleFilter(value))
      );

      this.filteredSubRoles = this.subRoleControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.subRoleFilter(value))
      );
    }, 1000);
  }

  ngOnInit(): void {}
  pageChanged(ev:any){
    
  }
  //Project
  projectFilter(value: string): any {
    if (!value) {
      return this.projects$;
    }
    const filterValue = value.toLowerCase();
    return this.projects$.filter((option: any) =>
      option.menu_name.toLowerCase().includes(filterValue)
    );
  }

  //Dept
  deptFilter(value: string): any {
    if (!value) {
      return this.departments$;
    }
    const filterValue = value.toLowerCase();
    return this.departments$.filter((option: any) =>
      option.deparment_name.toLowerCase().includes(filterValue)
    );
  }
  deleteFileConfirm(row:any,data:any){
    this.selectedfile=row.id
    console.log(this.selectedfile);
    
    this.dialog.open(data,{
      width:"300px"
    })
  }
  deleteFile() {
    let obj={
      "id": this.selectedfile
    }
    this.customerService
      .deleteUsermenu(obj)
      .subscribe((resp: any) => {
        if (resp && resp.status_code === 200) {
          this.dialog.closeAll();
          this.alertCall.showSuccess('Accepted', 'Deleted Successfully');
          this.getUserRoleDetails();
        }else{
          this.alertCall.showSuccess('Accepted', resp['message']);
        }
      });
  }
  //Roles
  roleFilter(value: string): any {
    if (!value) {
      return this.roles$;
    }
    const filterValue = value.toLowerCase();
    return this.roles$.filter((option: any) =>
      option.role.toLowerCase().includes(filterValue)
    );
  }

  //Sub Roles
  subRoleFilter(value: string): any {
    if (!value) {
      return this.subRoles$;
    }
    const filterValue = value.toLowerCase();
    return this.subRoles$.filter((option: any) =>
      option.sub_role.toLowerCase().includes(filterValue)
    );
  }

  getUserDetails(ev: any, type: any) {
    let menu;
    let dept;
    let role;
    let subRole;

    if (ev && type === 'menu') {
      menu = this.projects$.find((x: any) => x.menu_name === ev);
    }

    if (ev && type === 'dept') {
      dept = this.departments$.find((x: any) => x.deparment_name === ev);
    }

    if (ev && type === 'role') {
      role = this.roles$.find((x: any) => x.role === ev);
    }

    if (ev && type === 'sub_role') {
      subRole = this.subRoles$.find((x: any) => x.sub_role === ev);
    }

    if (menu) {
      this.userSearchObj.menu = menu.id;
    } else {
      this.userSearchObj.menu = null;
    }

    if (dept) {
      this.userSearchObj.dept = dept.id;
    }

    if (role) {
      this.userSearchObj.role = role.id;
    }

    if (subRole) {
      this.userSearchObj.subRole = subRole.id;
    }

    this.getUserRoleDetails();
  }

  getUserRoleDetails() {
    let params = new HttpParams();

    if (this.userSearchObj && this.userSearchObj.menu) {
      params = params.append('menu_id', this.userSearchObj.menu.toString());
    }

    if (this.userSearchObj && this.userSearchObj.dept) {
      params = params.append('dept_id', this.userSearchObj.dept.toString());
    }

    if (this.userSearchObj && this.userSearchObj.role) {
      params = params.append('role_id', this.userSearchObj.role.toString());
    }

    if (this.userSearchObj && this.userSearchObj.subRole) {
      params = params.append(
        'sub_role_id',
        this.userSearchObj.subRole.toString()
      );
    }

    this.customerService.getAllRoleMenus(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.tableData$ = resp.data;
        this.totalRecords = resp.data.length;
        this.dataSource.data = this.tableData$

        //here you indicate the paginator
        setTimeout(()=>{
         this.dataSource.paginator = this.paginator;
        })
      } else {
        this.tableData$ = [];
        this.totalRecords = 0;
        this.dataSource.data = this.tableData$

        //here you indicate the paginator
        setTimeout(()=>{
         this.dataSource.paginator = this.paginator;
        })
      }
    });
  }

  addNewUser() {
    const dialogRef = this.dialog.open(AddNewComponent, {
      data: {},
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '25%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getUserRoleDetails();
    });
  }

  getAllMenus() {
    this.customerService.getAllMenus().subscribe((response: any) => {
      if (response && response.status_code === 200) {
        this.projects$ = response.data;
      }
    });
  }

  getDepts() {
    this.customerService.getAllDept().subscribe((response: any) => {
      if (response && response.status_code === 200) {
        this.departments$ = response.data;
      }
    });
  }

  getRoles() {
    this.customerService.getAllRoles().subscribe((response: any) => {
      if (response && response.status_code === 200) {
        this.roles$ = response.data;
      }
    });
  }

  getSubRoles() {
    this.customerService.getAllSubRoles().subscribe((response: any) => {
      if (response && response.status_code === 200) {
        this.subRoles$ = response.data;
      }
    });
  }

  addNewMenuDialog(content: any) {
    const dialogRef = this.dialog.open(content, {
      data: {},
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '20%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      this.getAllMenus();
    });
  }

  addMenu() {
    const params = {
      menu_name: this.menuName,
    };
    this.customerService.addNewMenu(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.alertCall.showSuccess('Menu', 'Menu Added Successfully');
        this.dialog.closeAll();
      }
    });
  }
}
