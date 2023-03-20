import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material-module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignaturePadModule } from 'ngx-signaturepad';
import { NgxPrintElementModule } from 'ngx-print-element';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { UserRolesAuthGuard } from 'src/app/auth/user-roles-auth.guard';
import { AuthGuard } from 'src/app/auth/auth.guard';
const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "Signature Pad",
      permission: {
        only: ["SUPER_ADMIN",'USER_PROFILE'],
        redirectTo: "/ui/403",
      },
    },
    component: UserprofileComponent,
  },
]


@NgModule({
  declarations: [
    UserprofileComponent
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
  ]
})
export class UserprofilesModule { }
