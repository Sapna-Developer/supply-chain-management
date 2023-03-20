import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../../services/customer.service';
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
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent implements OnInit {
  menuControl = new FormControl();
  deptControl = new FormControl();
  roleControl = new FormControl();
  subRoleControl = new FormControl();

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

  separatorKeysCodes: number[] = [];
  removable = true;
  selectable = true;

  selectedMenus$: any = [];

  @ViewChild('menuInput')
  menuInput!: ElementRef<HTMLInputElement>;

  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog,
    public alertCall: AlertCallsService
  ) {
    this.getAllProjects();
    this.getDepts();
    this.getRoles();
    this.getSubRoles();

    setTimeout(() => {
      this.filteredProjects = this.menuControl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) =>
          fruit ? this.projectFilter(fruit) : this.projects$.slice()
        )
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
    const filterValue = value.toLowerCase();

    return this.projects$.filter((fruit) =>
      fruit.menu_name.toLowerCase().includes(filterValue)
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

  getAllProjects() {
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

  addNewUser() {
    const dept = this.departments$.find(
      (x: any) => x.deparment_name === this.addUserObj.dept
    );
    const role = this.roles$.find((x: any) => x.role === this.addUserObj.role);
    const subRole = this.subRoles$.find(
      (x: any) => x.sub_role === this.addUserObj.subRole
    );

    const menus: any = [];
    this.selectedMenus$.forEach((element: any) => {
      const obj = this.projects$.find((x: any) => x.menu_name === element);
      if (obj) {
        menus.push(obj.id);
      }
    });
    const params = {
      menu_id: menus,
      dept_id: dept.id,
      role_id: role.id,
      sub_role_id: subRole.id,
    };
    this.customerService.addMenuRole(params).subscribe((resp: any) => {
      if (resp) {
        this.dialog.closeAll();
        this.alertCall.showSuccess('Menu', 'Menu Role Added Successfully');
      }
    });
  }

  remove(fruit: any) {
    const index = this.selectedMenus$.indexOf(fruit);

    if (index >= 0) {
      this.selectedMenus$.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedMenus$.push(event.option.viewValue);
    this.menuInput.nativeElement.value = '';
    this.menuControl.setValue(null);
  }
}
