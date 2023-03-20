import { AuthService } from './../../../auth/auth.service';
import { HttpParams } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from './../../../services/customer.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-user-project',
  templateUrl: './add-user-project.component.html',
  styleUrls: ['./add-user-project.component.scss'],
})
export class AddUserProjectComponent implements OnInit {
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

  addUserObj: any = {};

  selectedProjects$: any = [];

  @ViewChild('menuInput')
  menuInput!: ElementRef<HTMLInputElement>;

  removable = true;
  selectable = true;

  deptObj: any = {};

  userAdminRoles$: any = [];
  isSuperAdmin = false;

  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog,
    public alertCall: AlertCallsService,
    public authService: AuthService
  ) {
    this.loadUserProjects();
    this.getDepts();
    this.getRoles();

    this.getSubRoles();

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

  //Dept
  deptFilter(value: string): any {
    if (!value) {
      return this.deptObj.departments;
    }
    const filterValue = value.toLowerCase();
    return this.deptObj.departments.filter((option: any) =>
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

  getAllProjects() {
    this.customerService.getAllFilterProjects().subscribe((response: any) => {
      if (response && response.status_code === 200) {
        this.projects$ = response.data;
      }
    });
  }

  getDepts() {
    this.customerService.getAllDept().subscribe((response: any) => {
      if (response && response.status_code === 200) {
        this.departments$ = response.data;
        this.deptObj.departments = response.data;
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

  addNewUser() {
    const user = this.allUsers$.find(
      (x: any) => x.work_email === this.addUserObj.user
    );
    const project = this.projects$.find(
      (x: any) => x.proj_short_name === this.addUserObj.project
    );
    const dept = this.departments$.find(
      (x: any) => x.deparment_name === this.addUserObj.dept
    );
    const role = this.roles$.find((x: any) => x.role === this.addUserObj.role);
    const subRole = this.subRoles$.find(
      (x: any) => x.sub_role === this.addUserObj.subRole
    );

    const menus: any = [];
    this.selectedProjects$.forEach((element: any) => {
      const obj = this.projects$.find(
        (x: any) => x.proj_short_name === element
      );
      if (obj) {
        menus.push(obj.proj_id);
      }
    });

    const params = {
      user_id: user.employee_id,
      project_id: menus,
      dept_id: dept.id,
      role_id: role.id,
      sub_role_id: subRole.id,
      email: this.addUserObj.user,
    };
    this.customerService.addUserRole(params).subscribe((resp: any) => {
      if (resp) {
        this.dialog.closeAll();
        this.alertCall.showSuccess(
          'Projects',
          'User Projects Added Successfully'
        );
      }
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedProjects$.push(event.option.viewValue);
    this.menuInput.nativeElement.value = '';
    this.projectControl.setValue(null);
  }

  remove(fruit: any) {
    const index = this.selectedProjects$.indexOf(fruit);

    if (index >= 0) {
      this.selectedProjects$.splice(index, 1);
    }
  }

  loadUserProjects() {
    const user = this.authService.currentUserRoleDetails;
    if (user) {
      const params = new HttpParams()
        .set('email', user.work_email)
        .set('role', user?.app_details?.roles);
      this.customerService
        .getUserListProjects(params)
        .subscribe((resp: any) => {
          if (resp.status_code === 200) {
            this.projects$ = resp.data;
            this.filteredProjects = this.projectControl.valueChanges.pipe(
              startWith(''),
              map((value) => this.projectFilter(value))
            );
          }
        });
    }
  }
}
