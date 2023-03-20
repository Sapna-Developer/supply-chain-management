import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import PhotoViewer from 'photoviewer';
import { PlatformLocation } from '@angular/common';
import { I } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-task-images',
  templateUrl: './task-images.component.html',
  styleUrls: ['./task-images.component.scss'],
})
export class TaskImagesComponent implements OnInit {
  resimages:any[]=[]
  @Input()
  taskObj: any = {};
data:any={}
  taskImages$: any = [];

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  imageslength: any;

  constructor(
    public customerService: CustomerService,
    public ngModel: NgbModal,
    private location: PlatformLocation,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    // this.resimages.push(this.data)
    // console.log(this.resimages);
  //   if(this.data){
  //   this.data.forEach((element: any) => {
  //     // element = element
  //     if (element.task_image) {
  //       element.src = element.task_image;
  //       element.thumb = element.task_image;
  //       // element.src = element.task_image.replace(
  //       //   "b'",
  //       //   'data:image/png;base64,'
  //       // );
  //       // element.src = element.src.replace("='", '=');
  //       // element.thumb = element.src.replace("='", '=');
  //       this.taskImages$.push(element);
  //     }
  //   });
  // } 
  if(this.taskObj){
    this.getTaskImages();
    this.location.onPopState(() => this.activeModal.close());
  }
   
  }

  getTaskImages() {
    this.customerService
      .getTaskImages(this.taskObj.task.id)
      .subscribe((resp: any) => {
        if (resp.status_code === 200) {
          this.imageslength = resp.data.length
          this.taskImages$ = [];
          resp.data.forEach((element: any) => {
            // element = element
            if (element.task_image) {
              element.src = element.task_image;
              element.thumb = element.task_image;
              // element.src = element.task_image.replace(
              //   "b'",
              //   'data:image/png;base64,'
              // );
              // element.src = element.src.replace("='", '=');
              // element.thumb = element.src.replace("='", '=');
              this.taskImages$.push(element);
            }
          });
        }
      });
  }

  closeModel() {
    this.activeModal.close();
    // this.ngModel.dismissAll();
  }

  openPhoto(index: any) {
    // this._lightbox.open(this.taskImages$, index);
    // return;
    const options: PhotoViewer.Options = {
      index,
      title: false,
      draggable: false,
      resizable: false,
      // movable: false,
      zIndex: 99999,
      initMaximized: false,
    };
    const viewer = new PhotoViewer(this.taskImages$, options);
  }
}
