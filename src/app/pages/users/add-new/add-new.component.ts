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
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent implements OnInit {
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
  userSearchObj:any={}
  selectedProjects$: any = [];

  @ViewChild('menuInput')
  menuInput!: ElementRef<HTMLInputElement>;

  removable = true;
  selectable = true;

  deptObj: any = {};

  userAdminRoles$: any = [];
  isSuperAdmin = false;
  tableData$: never[];
  ROLE: any[]=[]
  L1ROLE:any=false;
  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog,
    public alertCall: AlertCallsService,
    public authService: AuthService
  ) {
    if (localStorage.getItem('user-menu-role')) {
      const menus: any = localStorage.getItem('user-menu-role');
      this.userAdminRoles$ = JSON.parse(menus);
      const obj = this.userAdminRoles$.find((x: any) => x === 'SUPER_ADMIN');
      if (obj) {
        this.isSuperAdmin = true;
      }
      if (this.isSuperAdmin) {
        this.getAllProjects();
        this.getDepts();
        this.getRoles();
        this.loadUserProjects();
      } else {
        this.loadUserProjects();
      }
    }

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

  ngOnInit(): void {
   this.getUserRoleDetails()
  }
  getUserRoleDetails() {
    const user = this.authService.currentUserRoleDetails;
    if(user){
    
      
      this.userSearchObj.user=user.work_email
    }
    let params = new HttpParams();
   
    
      // params.email = this.userSearchObj.user;
    
  

   
    // params.email = user.work_email;


   
    

    this.customerService.getUserRoles(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.tableData$ = resp.data;
       
        this.tableData$.forEach((ele:any)=>{
          if(ele.email==user.work_email){
            console.log(ele.role_name);
            this.ROLE.push(ele.role_name)
          }
        })

        //here you indicate the paginator
       
      } else {
        this.tableData$ = [];
      
      }
    });
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
    const dept = this.deptObj.departments.find(
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
        this.alertCall.showSuccess('Role', 'User Role Added Successfully');
      }
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedProjects$.push(event.option.viewValue);
    this.menuInput.nativeElement.value = '';
    this.projectControl.setValue(null);
    this.getUserRoles();
    }

  remove(fruit: any) {
    const index = this.selectedProjects$.indexOf(fruit);

    if (index >= 0) {
      this.selectedProjects$.splice(index, 1);
    }
    this.getUserRoles();
  }

  loadUserProjects() {
    if (this.isSuperAdmin) {
      return;
    }
    const user = this.authService.currentUserRoleDetails;
    if (user) {
      this.selectedProjects$ = [];
      const params = new HttpParams().set('email', user.work_email);
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

  getUserRoles() {
    if (this.isSuperAdmin) {
      return;
    }

    const user = this.authService.currentUserRoleDetails;

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
      email: user.work_email,
      project_id: menus,
    };
    this.deptObj = {};

    this.customerService.getUserProjectRoles(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.deptObj = resp.data;
      } else {
        this.alertCall.showSnackBar('User', resp.message);
      }
      this.deptFilter('');
    });
  }

  findUserRoles(data: any) {
    console.log(this.ROLE);
    this.ROLE.forEach((ele:any)=>{
      if(ele=='L1'){
        this.L1ROLE=true
      }
    })
    console.log(data);
    if (this.isSuperAdmin) {
      return;
    }
    if(data=='PMC'&&this.L1ROLE==true){
      this.getRoles()
    }
   else{
      console.log(data);
      this.roles$ = this.deptObj[data];
      console.log( this.roles$);
      
    } 
    // else {
    //   this.roles$ = [];
    // }
  }
}
