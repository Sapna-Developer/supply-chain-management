import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { PendingsignatureComponent } from './pendingsignature/pendingsignature.component';
import { GoodissuereceiptSignatureLevelComponent } from './goodissuereceipt-signature-level/goodissuereceipt-signature-level.component';
import { GoodissueSignatureLevelComponent } from './goodissue-signature-level/goodissue-signature-level.component';
import { GoodreturnSignatureLevelComponent } from './goodreturn-signature-level/goodreturn-signature-level.component';
import { OutgatepassrgpSignatureLevelComponent } from './outgatepassrgp-signature-level/outgatepassrgp-signature-level.component';
import { OutgatepassnrgpSignatureLevelComponent } from './outgatepassnrgp-signature-level/outgatepassnrgp-signature-level.component';
import { DeliverychallanSignatureLevelComponent } from './deliverychallan-signature-level/deliverychallan-signature-level.component';
import { PurchaserequestsignaturelevelComponent } from './purchaserequestsignaturelevel/purchaserequestsignaturelevel.component';
import { PurchaseordersignaturelevelComponent } from './purchaseordersignaturelevel/purchaseordersignaturelevel.component';
import { WorkrequestsignaturelevelComponent } from './workrequestsignaturelevel/workrequestsignaturelevel.component';
import { WorkordersignaturelevelComponent } from './workordersignaturelevel/workordersignaturelevel.component';
const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "Pending Signatures",
      permission: {
        only: ["SUPER_ADMIN",'PENDING_SIGNATURES'],
        redirectTo: "/ui/403",
      },
    },
    component: PendingsignatureComponent,
  },
  {
    path: "goodissuereceipt-signature-level",
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "goods receipt note",
      permission: {
        only: ["SUPER_ADMIN"],
        redirectTo: "/ui/403",
      },
    },
    component: GoodissuereceiptSignatureLevelComponent,
  },
]




@NgModule({
  declarations: [
    PendingsignatureComponent,
    GoodissuereceiptSignatureLevelComponent,
    GoodissueSignatureLevelComponent,
    GoodreturnSignatureLevelComponent,
    OutgatepassrgpSignatureLevelComponent,
    OutgatepassnrgpSignatureLevelComponent,
    DeliverychallanSignatureLevelComponent,
    PurchaserequestsignaturelevelComponent,
    PurchaseordersignaturelevelComponent,
    WorkrequestsignaturelevelComponent,
    WorkordersignaturelevelComponent
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
export class PendingSignaturesModule { }
