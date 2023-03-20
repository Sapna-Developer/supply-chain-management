import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { AuthService } from './../../../auth/auth.service';
import { HttpParams } from '@angular/common/http';
import {
  map,
  filter,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  switchAll,
} from 'rxjs/operators';
import { CustomerService } from './../../../services/customer.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  @ViewChild('btn') btn!: ElementRef;
  myControl = new FormControl();
  options: any[] = [];
  message: any;
  response$: any;
  filteredOptions: Observable<any[]>;
  image1: any;
  projectId: any;
  pageNumber = 1;
  records = 20;
  taskId: any;
  images$: any = [];
  Activity$: any;
  task_id: any;
  structures: any=[]
  imageCounts = 0;
  structure: string;
  result: string=''
  result1: string=''
  ulr:any= environment.url
  imgurl: any;
  constructor(
    private service: CustomerService,
    public dialog: MatDialog,
    public authService: AuthService,
    public alertCall: AlertCallsService,
    public _DomSanitizationService: DomSanitizer 
  ) {
    this.loadProjects();
    setTimeout(() => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    }, 2000);
  }

  ngOnInit(): void {
    
  }

  loadProjects() {
    const user = this.authService.currentUserRoleDetails;
    if (user) {
      const params = new HttpParams()
        .set('email', user.work_email)
        .set('role', user?.app_details?.roles);

      this.service.getUserListProjects(params).subscribe((resp: any) => {
        if (resp.status_code === 200) {
          this.options = resp.data;
        }
      });
    }
  }

  private _filter(value: string): string[] {
    if (!value) {
      return this.options;
    }
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.proj_short_name.toLowerCase().includes(filterValue)
    );
  }

  onSelectionChanged(data: any) {
    if (data) {
      const obj = this.options.find((x) => x.proj_short_name === data);
      if (obj) {
        this.projectId = obj.proj_id;
      }
    } else {
      this.projectId = null;
    }
  }
   getProjectImages() {
    let params: HttpParams;

      params = new HttpParams()
      .set('project_id', this.projectId.toString())
      .set('page_id', this.pageNumber.toString())
      .set('items_per_page', this.records.toString())
      .set('domain',this.ulr)
      .set("width","500")
      .set("height","500")

    this.service.getProjectImages(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        // this.images$ = [...this.images$, ...resp.data];
        console.log(resp);
        
        this.images$ = resp.data;
        this.imageCounts = resp.img_cnt;
        // this.images$.forEach((element:any) => {
        // this.gettaskimages(element.img_info.id).then((res:any) =>{

        //   element.img_path =  res
        // }
        // )
        // });
        
      } else {
        this.response$ = resp.message;
        this.alertCall.showSuccess('Images', resp.message);
      }
    });
  }

  loadMoreImages() {
    this.pageNumber = this.pageNumber + 1;
    this.getProjectImages();
  }

  pageChanged(data: any) {
    this.pageNumber = data;
    this.getProjectImages();
  }
  selectPage(page: string) {
    this.pageNumber = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
  getstructure(data:any){
    let result1=''
    for (let i = 0; i < data.length; i++) {
      result1 = result1.concat(data[i]);
      if (i < data.length - 1) {
        result1 = result1.concat(">");
    }  
  }
  return result1
}
getstructure1(){
  let result1=''
  for (let i = 0; i < this.structures.length; i++) {
    result1 = result1.concat(this.structures[i]);
    if (i < this.structures.length - 1) {
      result1 = result1.concat(">");
  }  
}
return result1
}
  getActivityModal(info: any, activityDialog: any) {
    (this.taskId = info?.img_info?.task_id),
      (this.image1 = info?.img_info?.img_url);
    this.structures = info?.structure;
    // console.log(this.image1, "dvifs");

    let params: HttpParams;

    params = new HttpParams().set('task_id', this.taskId);

    this.service.getActivityInfo(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.Activity$ = resp.data;
        this.dialog.open(activityDialog, {
          // width: '50px',
          // height: '50px',
          data: {},
        });
      }
    });
  }
}
