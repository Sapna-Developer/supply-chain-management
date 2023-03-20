import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "src/app/services/customer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SignaturePad } from 'ngx-signaturepad';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { Overlay } from "ngx-toastr";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-pendingsignature',
  templateUrl: './pendingsignature.component.html',
  styleUrls: ['./pendingsignature.component.scss']
})
export class PendingsignatureComponent implements OnInit {
  demo1TabIndex: any = 0;
  displayedColumns: any[] = [
    "sno",
    "Document_No",
    "Concern_Name",
    "View",
    "signature",
  ];
  constructor(private dialog: MatDialog,
    private custservice: CustomerService,
    private snackbar: MatSnackBar,
    public overlay: Overlay,
    private alertcall: AlertCallsService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private injector: Injector) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.tab == "notificationsissue") {
        this.demo1TabIndex = 1;
        console.log(params);
      } else {
        this.demo1TabIndex = 0;
      }
    });
  }

}
