import { UserRolesAuthGuard } from './../../auth/user-roles-auth.guard';
import { AuthGuard } from './../../auth/auth.guard';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MomentModule } from "ngx-moment";
import { ComponentsModule } from "./../../components/components.module";
import { SharedMaterialModule } from "./../../shared/material/shared-material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PoFilesComponent } from "./po-files/po-files.component";
import { PoDetailsComponent } from "./po-details/po-details.component";
import { TableDataComponent } from "./table-data/table-data.component";
import { WoFilesComponent } from "./wo-files/wo-files.component";
import { GoodFileComponent } from "./good-file/good-file.component";
import { SignaturePadModule } from "ngx-signaturepad";
import { NgxPrintElementModule } from "ngx-print-element";
import { PurchaseorderComponent } from "./purchaseorder/purchaseorder.component";
import { PrintpurchaseorderComponent } from "./printpurchaseorder/printpurchaseorder.component";
import { WorkorderComponent } from "./workorder/workorder.component";
import { PrintwoComponent } from "./printwo/printwo.component";
import { JobOrderComponent } from "./job-order/job-order.component";
import { PoExcelUploadComponent } from "./po-excel-upload/po-excel-upload.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from '@angular/material/table';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

const routes: Routes = [
  {
    path: "po",
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "PO Upload",
      permission: {
        only: ["SUPER_ADMIN", "VIEW_PO_UPLOADS"],
        redirectTo: "/ui/403",
      },
    },
    component: PoFilesComponent,
  },
  {
    path: "wo",
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "WO Upload",
      permission: {
        only: ["SUPER_ADMIN", "VIEW_WO_UPLOADS"],
        redirectTo: "/ui/403",
      },
    },
    component: PoFilesComponent,
  },
  {
    path: "purchase_order",
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "Purchase Order",
      permission: {
        only: ["SUPER_ADMIN", "PURCHASE_ORDER"],
        redirectTo: "/ui/403",
      },
    },
    component: PurchaseorderComponent,
  },
  {
    path: "joborder",
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "Job Order",
      permission: {
        only: ["SUPER_ADMIN"],
        redirectTo: "/ui/403",
      },
    },
    component: JobOrderComponent,
  },
  { path: 'print_purchase_order', component: PrintpurchaseorderComponent },
  {
    path: 'workorder',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "Job Order",
      permission: {
        only: ["SUPER_ADMIN","WORK_ORDER"],
        redirectTo: "/ui/403",
      },
    },
    component: WorkorderComponent
  },
  { path: 'printwo', component: PrintwoComponent },
  {
    path: 'po-excel-upload',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "Excel Upload",
      permission: {
        only: ["SUPER_ADMIN",'PO_EXCEL_UPLOAD'],
        redirectTo: "/ui/403",
      },
    },
    component: PoExcelUploadComponent
  },
];

@NgModule({
  declarations: [
    PoFilesComponent,
    PoDetailsComponent,
    TableDataComponent,
    WoFilesComponent,
    GoodFileComponent,
    PurchaseorderComponent,
    PrintpurchaseorderComponent,
    WorkorderComponent,
    PrintwoComponent,
    JobOrderComponent,
    PoExcelUploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    ComponentsModule,
    MomentModule,
    NgbModule,
    SignaturePadModule,
    NgxPrintElementModule,
    MatTabsModule,
    MatTableModule,
    NgxQRCodeModule
  ],
})
export class PoUploadModule { }
