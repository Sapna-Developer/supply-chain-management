import { AuthService } from './../../../../auth/auth.service';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from './../../../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-roles',
  templateUrl: './sub-roles.component.html',
  styleUrls: ['./sub-roles.component.scss'],
})
export class SubRolesComponent implements OnInit {
  tableData$ = [];
  displayedColumns: string[] = ['sno', 'name', 'created_by', 'created_date'];

  loadingRecords = false;

  addValue: any;

  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog,
    public alertCall: AlertCallsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loadingRecords = true;
    this.customerService.getAllSubRoles().subscribe(
      (resp: any) => {
        this.tableData$ = [];
        if (resp && resp.status_code === 200) {
          this.tableData$ = resp.data;
        }
        this.loadingRecords = false;
      },
      (err) => {
        this.loadingRecords = false;
      }
    );
  }

  addNew(content: any) {
    const dialogRef = this.dialog.open(content, {
      data: {},
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '20%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAll();
    });
  }

  updateNew() {
    const params = {
      sub_role: this.addValue,
    };
    this.customerService.addSubRole(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.dialog.closeAll();
        this.alertCall.showSuccess('Add', resp.message);
        this.addValue = null;
      }
    });
  }
}
