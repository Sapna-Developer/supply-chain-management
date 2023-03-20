import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from './../../../services/customer.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.scss'],
})
export class AddEmailComponent implements OnInit {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl();
  filteredEmails: Observable<string[]>;
  selectedUsers: string[] = [];

  previousEmails: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customerService: CustomerService,
    public alertCall: AlertCallsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.emails) {
      this.previousEmails = this.data.emails.split(',');
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.previousEmails.push(value);
    }

    // Clear the input value
    // Reset the input value
    if (event.input) {
      event.input.value = '';
    }

    this.emailCtrl.setValue(null);
  }

  remove(value: string): void {
    const index = this.previousEmails.indexOf(value);

    if (index >= 0) {
      this.previousEmails.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.previousEmails.push(event.option.viewValue);
    this.emailCtrl.setValue(null);
  }

  addOrUpdateEmails() {
    const params = {
      project_id: this.data.projectId,
      mail_ids: null,
    };
    let email: any;
    this.previousEmails.forEach((element: any) => {
      if (email) {
        email = email + ',' + element;
      } else {
        email = element;
      }
    });
    params.mail_ids = email;
    this.customerService.addProjectEmails(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.alertCall.showSuccess('Issue', 'Issue Log Created Successfully');
        this.dialog.closeAll();
      }
    });
  }
}
