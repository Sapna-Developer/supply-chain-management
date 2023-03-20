import { CustomerService } from './../../../services/customer.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-po-details',
  templateUrl: './po-details.component.html',
  styleUrls: ['./po-details.component.scss'],
})
export class PoDetailsComponent implements OnInit {
  @Input()
  poFileData: any = {};

  @Input()
  type: any = 'main';

  @Input()
  uploadType = 'po';

  itemsFile: any;

  dialogRef: any;

  itemsCount = 0;
  items$: any = [];
  currentIndex = 0;

  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.uploadType);
    this.items$ = [];
    if (
      this.poFileData &&
      this.poFileData.items &&
      this.poFileData.items.length > 2
    ) {
      this.currentIndex = 2;
      this.itemsCount = this.poFileData.items.length;
      for (let index = 0; index < this.currentIndex; index++) {
        const element = this.poFileData.items[index];
        this.items$.push(element);
      }
    } else {
      this.currentIndex = this.poFileData.items.length;
      this.items$ = this.poFileData.items;
    }
  }

  uploadFile(fileInput: any, content: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.itemsFile = fileInput.target.files;
      this.openTempModel(content);
    }
  }

  openTempModel(Content: any) {
    this.dialogRef = this.dialog.open(Content, {
      data: {},
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '20%',
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.itemsFile = null;
    });
  }

  updateFile() {
    const postData = new FormData();
    postData.append('file', this.itemsFile[0]);
    postData.append('type', this.type);
    postData.append('id', this.poFileData.id);
    postData.append('upload_type', this.uploadType);

    this.customerService.uploadPOFileItems(postData).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.poFileData.items = [...this.poFileData.items, ...resp.data];
        this.itemsCount = this.poFileData.items.length;
      }

      this.dialogRef.close();
    });
  }

  seeMore() {
    for (let index = this.currentIndex; index < this.itemsCount; index++) {
      const element = this.poFileData.items[index];
      this.items$.push(element);
    }
    this.currentIndex = this.itemsCount;
  }

  getTotal() {
    let sum = 0;
    if (this.items$.length > 0) {
      this.poFileData.items.forEach((element: any) => {
        sum = sum + Number(element.item_amount);
      });
    }
    return sum;
  }
}
