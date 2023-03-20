import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AlertCallsService } from './../../../auth/alert-calls.service';
import { AuthService } from './../../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GreenkoUtils } from 'src/app/utils/flip.utils';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerService } from './../../../services/customer.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { I } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  minDate = new Date();
  projectObj: any = {
    data: {
      title: null,
      wbs_data: [],
    },
  };

  startDate: any=new Date();
  endDate: any;
  projectId: any;
  projectName: any;

  tableData$ = [];

  displayedColumns: string[] = [
    'sno',
    'structure',
    'issue',
    'severity',
    'status',
    'created_date',
    'action',
  ];

  loadingRecords = false;
  totalRecords = 0;
  recordsPerPage = 10;
  pageNumber = 1;

  poFileData: any;

  logDataObj: any = {};

  myControl = new FormControl();
  filteredOptions: any;
  allUsers$ = [];
  tomorrow = new Date();
  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  Currenturl: string | null;
  constructor(
    public route: ActivatedRoute,
    public customerService: CustomerService,
    public utils: GreenkoUtils,
    public dialog: MatDialog,
    public authService: AuthService,
    public alertCall: AlertCallsService
  ) {
    this.route.queryParams.subscribe((resp: any) => {
      if (resp) {
        this.projectId = resp.id;
        this.startDate = resp.start;
        this.endDate = resp.end;
        this.projectName = resp.name;
        this.getDataObj();
      }
    });

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
this.Currenturl=localStorage.getItem("redirect_uri")
    console.log()
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

  getDataObj() {
    
    let params: HttpParams;

    params = new HttpParams().set('project_id', this.projectId.toString());
    this.customerService.getIssueLog(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.tableData$ = resp.data.reverse()
        this.totalRecords = resp.data.length;
        this.dataSource.data = this.tableData$

        //here you indicate the paginator
        setTimeout(()=>{
         this.dataSource.paginator = this.paginator;
        })
      }else{
        this.totalRecords = 0;
        this.dataSource.data = resp.data.reverse()

        //here you indicate the paginator
        setTimeout(()=>{
         this.dataSource.paginator = this.paginator;
        })
      }
    });
  }

  openTempModel(data: any, content: any) {
    console.log(data);
    
    this.logDataObj = { ...data };
    // this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    // this.logDataObj.due_date = this.tomorrow;
    // this.logDataObj.start_date = new Date();
    const dialogRef = this.dialog.open(content, {
      width: '50%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  convertDate(date: string) {
    if (date) {
      const current = new Date(date).toDateString();
      const dates = current.split(' ');
      return dates[2] + '-' + dates[1] + '-' + dates[3];
    }
  }

  updateIssueLog() {
    // let headers=new HttpHeaders()
    // headers.append("AppId",'GCHAT_APP')
    const params: any = {
      id: this.logDataObj.id,
    };
    if (this.logDataObj.closeStatus) {
      params.status = 'Closed';
    }
    if (this.logDataObj.gmatStatus) {
      // if(this.Currenturl==="https://testgeps.greenko.net"){
      //   params.server = 'TEST'; 
      // }else if(this.Currenturl==="https://gepsv2.greenkogroup.com"){
      //   params.server = 'V2'; 
      // }
      // this.logDataObj.responsible
      params.create_gmat = 'True';
      params.title = this.logDataObj.title;
      params.responsible = this.logDataObj.responsible;
      params.start_date = this.convertDate(this.logDataObj.start_date);
      params.due_date = this.convertDate(this.logDataObj.due_date);
      params.description='Action Item Creation from TEST_GEPS App';
      params.severity=this.logDataObj.severity;
      params.server = 'TEST';
    }
    this.customerService.updateIssueLog(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.logDataObj = {};
        this.myControl.setValue(null);
        this.alertCall.showSuccess('Issue', resp.message);
        this.dialog.closeAll();
        this.getDataObj();
      }
       else {
        this.alertCall.showWarning('ERROR', resp.message);

      }
    });
  }

  updateCheckBox(checked: any, flag: any) {
    if (checked && flag === 1) {
      this.logDataObj.gmatStatus = false;
    } else if (checked && flag === 2) {
      this.logDataObj.closeStatus = false;
    }
  }
}
