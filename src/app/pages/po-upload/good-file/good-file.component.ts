import { AlertCallsService } from './../../../auth/alert-calls.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { SignaturePad } from 'ngx-signaturepad';

@Component({
  selector: 'app-good-file',
  templateUrl: './good-file.component.html',
  styleUrls: ['./good-file.component.scss'],
})
export class GoodFileComponent implements OnInit {
  goodsObj: any = {
    doc_ref_no: '',
    doc_date: '',
    plant_code: '',
    plant_name: '',
    grn_no: '',
    grn_date: '',
    gate_entry_no: '',
    gate_entry_date: '',
    po_no: '',
    po_date: '',
    invoice_no: '',
    invoice_date: '',
    dc_no: '',
    dc_date: '',
    no_of_pkgs: '',
    transporter_name: '',
    vehicle_no: '',
    lr_no: '',
    lr_date: '',
    eway_bill_no: '',
    store_remarks: '',
    inspection_remarks: '',
    prepared_by: '',
    inspected_by: '',
    authorized: '',
  };

  items$: any = [];

  signaturePadOptions: any = {
    // passed through to szimek/signature_pad constructor
    minWidth: 1,
    canvasWidth: 400,
    canvasHeight: 250,
  };

  @ViewChild(SignaturePad) signaturePad: any;

  dialogRef: any;
  signType: any;

  signDetails: any = {};

  constructor(
    public customerService: CustomerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public alertCall: AlertCallsService
  ) {}

  ngOnInit(): void {
    this.getGoodsReceipt();
    this.goodsObj.supplier_name = this.data.supplier_name;
  }

  getGoodsReceipt() {
    this.customerService
      .getGoodsReceipt(this.data.id)
      .subscribe((resp: any) => {
        if (resp && resp.status_code === 200) {
          this.items$ = resp.data.items;
          if (resp.data.goods_data && resp.data.goods_data.length > 0) {
            this.goodsObj =
              resp.data.goods_data[resp.data.goods_data.length - 1];
            this.goodsObj.supplier_name = this.data.supplier_name;
            if (this.goodsObj && this.goodsObj.id) {
              this.goodsObj.receipt_id = this.goodsObj.id;
            }
          }
        }
      });
  }

  updateFile() {
    const item: any = [];
    this.items$.forEach((element: any) => {
      item.push({
        id: element.id,
        received_qty: element.received_qty,
        accepted_qty: element.accepted_qty,
        rejected_qty: element.rejected_qty,
        damage_qty: element.damage_qty,
      });
    });
    const params = {
      items: item,
      po_id: this.data.id,
      ...this.goodsObj,
    };

    if (this.goodsObj && this.goodsObj.id) {
      params.receipt_id = this.goodsObj.id;
    }

    console.log(params);

    this.customerService.updateGoodsReceipt(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.alertCall.showSuccess(
          'Good Receipt',
          'Receipt Updated Successfully'
        );
        this.dialog.closeAll();
      }
    });
  }

  openSign(type: any, content: any) {
    this.signType = type;
    this.dialogRef = this.dialog.open(content, {
      data: {},
      hasBackdrop: true,
      panelClass: 'form-dialogs',
      width: '30%',
    });
  }

  closeSign() {
    this.dialogRef.close();
  }

  saveSign() {
    if (this.signType === 'prepared_by') {
      this.goodsObj.prepared = {
        name: this.signDetails.name,
        email: this.signDetails.email,
        signature: this.signaturePad.toDataURL(),
        prepared_date: new Date(),
      };
    } else if (this.signType === 'inspected_by') {
      this.goodsObj.inspected = {
        name: this.signDetails.name,
        email: this.signDetails.email,
        signature: this.signaturePad.toDataURL(),
        inspected_date: new Date(),
      };
    } else if (this.signType === 'authorized') {
      this.goodsObj.authorized = {
        name: this.signDetails.name,
        email: this.signDetails.email,
        signature: this.signaturePad.toDataURL(),
        authorised_date: new Date(),
      };
    }
    this.signDetails = {};
    // this.goodsObj[this.signType] = this.signaturePad.toDataURL();
    this.dialogRef.close();
  }
}
