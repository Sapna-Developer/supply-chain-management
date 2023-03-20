import { AuthService } from './../../../../auth/auth.service';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from './../../../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
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
    this.customerService.getAllMenus().subscribe(
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
      menu_name: this.addValue,
    };
    this.customerService.addNewMenu(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.dialog.closeAll();
        this.alertCall.showSuccess('Add', resp.message);
        this.addValue = null;
      }
    });
  }
}
