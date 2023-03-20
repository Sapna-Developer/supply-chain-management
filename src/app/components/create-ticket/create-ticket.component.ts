import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertCallsService } from './../../auth/alert-calls.service';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  securityType$: any = [];
  dept$: any = [];

  ticketDetails: any = {};

  showLoader = false;

  projectId: any;
  constructor(
    public customerService: CustomerService,
    public alertCall: AlertCallsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getDepts();
    this.getTicketSecurity();
    console.log(this.data);
    this.projectId = this.data.projectId;
  }

  getDepts() {
    this.customerService.getTicketDepts().subscribe((resp: any) => {
      if (resp.status_code === 200) {
        this.dept$ = resp.data.data.depts;
      }
    });
  }

  getTicketSecurity() {
    this.customerService.getTicketSecurity().subscribe((resp: any) => {
      if (resp.status_code === 200) {
        this.securityType$ = resp.data.data.masterData.options;
      }
    });
  }

  saveTicket() {
    this.showLoader = true;
    const params = {
      ...this.ticketDetails,
      appid_context: 'CHAT_UPDATES',
      project_id: this.projectId,
      fun_code: '',
    };
    this.customerService.createTicket(params).subscribe((resp: any) => {
      this.showLoader = false;
      if (resp.status_code === 200) {
        this.alertCall.showSuccess('Ticket', resp.message);
        this.dialog.closeAll();
      } else {
        this.alertCall.showSuccess('Ticket', resp.message);
      }
    });
  }
}
