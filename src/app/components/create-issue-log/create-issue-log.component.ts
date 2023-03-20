import { AuthService } from './../../auth/auth.service';
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertCallsService } from './../../auth/alert-calls.service';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-create-issue-log',
  templateUrl: './create-issue-log.component.html',
  styleUrls: ['./create-issue-log.component.scss'],
})
export class CreateIssueLogComponent implements OnInit {
  securityType$ = [];
  tomorrow = new Date();
  minDate = new Date();

  issueObj: any = {
    start_date: new Date(),
    create_gmat: false,
    due_date: null,
  };
  myControl = new FormControl();
  filteredOptions: any;
  allUsers$ = [];
  constructor(
    public customerService: CustomerService,
    public alertCall: AlertCallsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public authService: AuthService
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.filter(val);
      })
    );
  }

  ngOnInit(): void {
    this.getTicketSecurity();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.issueObj.due_date = this.tomorrow;
  }

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

  getTicketSecurity() {
    this.customerService.getTicketSecurity().subscribe((resp: any) => {
      if (resp.status_code === 200) {
        this.securityType$ = resp.data.data.masterData.options;
      }
    });
  }

  convertDate(date: string) {
    if (date) {
      const current = new Date(date).toDateString();
      const dates = current.split(' ');
      return dates[2] + '-' + dates[1] + '-' + dates[3];
    }
  }

  saveLog() {
    const params: any = {
      task_id: this.data.task_id,
      project_id: this.data.project_id,
      wbs_id: this.data.wbs_id,
      issue: this.issueObj.description,
      severity: this.issueObj.severity,
      start_date: this.convertDate(this.issueObj.start_date),
      due_date: this.convertDate(this.issueObj.due_date),
      title: this.issueObj.title,
      responsible: this.issueObj.responsible,
      create_gmat: this.issueObj.create_gmat ? 'True' : 'False',
    };

    this.customerService.createIssueLog(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.alertCall.showSuccess('Issue', 'Issue Log Created Successfully');
        this.dialog.closeAll();
      }
    });
  }
}
