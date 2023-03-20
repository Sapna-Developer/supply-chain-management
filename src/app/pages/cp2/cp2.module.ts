import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserRolesAuthGuard } from 'src/app/auth/user-roles-auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material-module';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignaturePadModule } from 'ngx-signaturepad';
import { NgxPrintElementModule } from 'ngx-print-element';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ExceluploadComponent } from './excelupload/excelupload.component';
const routes: Routes = [
  {
    path: 'excelupload',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'PO Excel Upload',
      permission: {
        only: ['SUPER_ADMIN','PO_EXCEL_UPLOAD_V2'],
        redirectTo: '/ui/403',
      },
    },
    component: ExceluploadComponent,
  }
];

@NgModule({
  declarations: [
    ExceluploadComponent
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
    MatTableModule
  ]
})
export class Cp2Module { }
