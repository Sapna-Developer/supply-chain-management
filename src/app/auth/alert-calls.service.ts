import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AlertCallsService {
  constructor(private _snackBar: MatSnackBar, private toastr: ToastrService) {}

  showSnackBar(title: any, message: any) {
    this._snackBar.open(message, title);
  }

  showSuccess(title: any, message: any) {
    this.toastr.success(message, title);
  }

  showWarning(title: any, message: any) {
    this.toastr.warning(message, title);
  }
}
