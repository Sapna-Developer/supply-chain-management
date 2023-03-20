import { environment } from './../../../../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pdf-files-view',
  templateUrl: './pdf-files-view.component.html',
  styleUrls: ['./pdf-files-view.component.scss'],
})
export class PdfFilesViewComponent implements OnInit {
  @Input()
  taskObj: any = {};

  imageUrl = environment.base_url;
  currentIndex = 0;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  pdfFiles$: any = [];

  currentPdfUrl: any;
  showPdf = true;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log(this.taskObj);
    // this.currentPdfUrl = this.pdfFiles$[0];
    this.pdfFiles$ = this.taskObj;
    if (this.pdfFiles$.length > 0) {
      this.currentPdfUrl = this.imageUrl + '/' + this.pdfFiles$[0].pdf_path;
    }
  }

  closeModel() {
    this.activeModal.close();
  }

  goNext(index: any) {
    this.showPdf = false;
    if (index === 1) {
      this.currentIndex = this.currentIndex - 1;
    } else {
      this.currentIndex = this.currentIndex + 1;
    }

    console.log(this.currentIndex);

    // this.currentPdfUrl = this.pdfFiles$[this.currentIndex];
    this.currentPdfUrl =
      this.imageUrl + '/' + this.pdfFiles$[this.currentIndex].pdf_path;
    console.log(this.currentPdfUrl);
    setTimeout(() => {
      this.showPdf = true;
    }, 500);
  }
}
