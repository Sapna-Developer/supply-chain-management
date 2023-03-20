import { AddUserProjectComponent } from './../add-user-project/add-user-project.component';
import { AuthService } from './../../../auth/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { AddNewComponent } from './../add-new/add-new.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { CustomerService } from './../../../services/customer.service';
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

  tableData$ :any= [];
  displayedColumns: any[] = [
    'sno',
    'email',
    'project',
    'dept',
    'role',
    'sub_role',
    'created_date',
    'action',
  ];
  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatPaginator) paginator: any;

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

  selectedProjects$: any = [];

  deleteFileObj: any = {};

  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog,
    public authService: AuthService,
  ) {
    this.getAllProjects();
    this.getDepts();
    this.getRoles();
    this.getSubRoles();
    this.getUserRoleDetails();

    setTimeout(() => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((val) => {
          return this.filter(val);
        })
      );

      // this.filteredProjects = this.projectControl.valueChanges.pipe(
      //   startWith(''),
      //   map((value) => this.projectFilter(value))
      // );

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
    }, 2000);
  }

  ngOnInit(): void {}

  filter(val: string): any {
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
    let user;
    let project;
    let dept;
    let role;
    let subRole;
    if (ev && type === 'user') {
      user = this.allUsers$.find((x: any) => x.work_email === ev);
    }

    if (ev && type === 'project') {
      project = this.projects$.find((x: any) => x.proj_short_name === ev);
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

    if (user) {
      this.userSearchObj.user = user.work_email;
    }

    if (project) {
      this.userSearchObj.project = project.proj_id;
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
    // let params = new HttpParams();

    // if (this.userSearchObj && this.userSearchObj.user) {
    //   params = params.append('user_id', this.userSearchObj.user.toString());
    // }

    // if (this.userSearchObj && this.userSearchObj.project) {
    //   params = params.append(
    //     'project_id',
    //     this.userSearchObj.project.toString()
    //   );
    // }

    // if (this.userSearchObj && this.userSearchObj.dept) {
    //   params = params.append('dept_id', this.userSearchObj.dept.toString());
    // }

    // if (this.userSearchObj && this.userSearchObj.role) {
    //   params = params.append('role_id', this.userSearchObj.role.toString());
    // }

    // if (this.userSearchObj && this.userSearchObj.subRole) {
    //   params = params.append(
    //     'sub_role_id',
    //     this.userSearchObj.subRole.toString()
    //   );
    // }

    const params: any = {};

    if (this.userSearchObj.user) {
      params.email = this.userSearchObj.user;
    }

    if (this.userSearchObj.dept) {
      params.dept_id = this.userSearchObj.dept;
    }

    if (this.userSearchObj.role) {
      params.role_id = this.userSearchObj.role;
    }

    if (this.userSearchObj.subRole) {
      params.sub_role_id = this.userSearchObj.subRole;
    }

    const projects: any = [];
    if (this.userSearchObj.project && this.userSearchObj.project.length > 0) {
      this.userSearchObj.project.forEach((ele: any) => {
        const obj = this.projects$.find((x) => x.proj_short_name === ele);
        if (obj) {
          projects.push(obj.proj_id);
        }
      });
      if (projects && projects.length > 0) {
        params.project_id = projects;
      }
      // params.project_id = [this.userSearchObj.project];
    }

    this.customerService.getUserRoles(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.tableData$ = resp.data;
        this.totalRecords = resp.data.length;
        this.dataSource.data = resp.data

        //here you indicate the paginator
        setTimeout(()=>{
         this.dataSource.paginator = this.paginator;
        })
      } else {
        this.tableData$ = [];
        this.totalRecords = 0;
        this.dataSource.data = resp.data

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
      console.log(result);
    });
  }

  addUserProjects() {
    const dialogRef = this.dialog.open(AddUserProjectComponent, {
      data: {},
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '25%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }

  getAllProjects() {
    this.customerService.getAllFilterProjects().subscribe((response: any) => {
      if (response && response.status_code === 200) {
        this.projects$ = response.data;
        this.selectedProjects$ = response.data;
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

  onKey(data: any) {
    if (data) {
      this.selectedProjects$ = this.projects$.filter((x) =>
        x.proj_short_name.toLowerCase().includes(data.toLowerCase())
      );
    } else {
      this.selectedProjects$ = this.projects$;
    }
  }

  deleteFileConfirm(folder: any, content: any) {
    this.deleteFileObj = folder;
    const dialogRef = this.dialog.open(content, {
      width: '250px',
      data: {},
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  deleteFile() {
    this.customerService
      .deleteUserRole(this.deleteFileObj.id)
      .subscribe((resp: any) => {
        if (resp && resp.status_code === 200) {
          this.dialog.closeAll();
          this.getUserRoleDetails();
        }
      });
  }
}
