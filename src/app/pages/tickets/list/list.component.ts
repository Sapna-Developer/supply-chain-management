import { DetailsComponent } from './../details/details.component';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tableData$ = [];
  displayedColumns: string[] = [
    'sno',
    'ticket_number',
    'subject',
    'description',
    'ticket_status',
    'created_date',
    'username',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: any;

  loadingRecords = false;
  totalRecords = 0;
  recordsPerPage = 10;
  pageNumber = 1;

  locations$: any = [];

  sortBy = 'locationId';
  sortType: any = false;
  startDate: any;
  endDate: any;

  selectedRecords$: any = [];
  selectedLocation: any;

  filterParams: any = {};
  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  pageChanged(ev: any) {
    this.recordsPerPage = ev.pageSize;
    this.pageNumber = ev.pageIndex + 1;
    this.getTickets();
  }

  sortBySelection(column: any) {
    this.sortBy = column.active;
    this.sortType = column.direction === 'desc' ? false : true;
    this.pageNumber = 1;
    this.paginator?.firstPage();
    this.getTickets();
  }

  getTickets() {
    this.customerService
      .getTickets(this.pageNumber, this.recordsPerPage)
      .subscribe((resp: any) => {
        if (resp && resp.status_code === 200) {
          this.tableData$ = resp.data;
          this.totalRecords = resp.count;
        }
      });
  }

  openDetails(ticket: any) {
    const dialogRef = this.dialog.open(DetailsComponent, {
      data: {
        ticketObj: ticket,
      },
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      console.log(result);
      // this.loadInvoices();
    });
  }
}
