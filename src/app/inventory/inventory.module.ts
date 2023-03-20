import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialreceiptComponent } from './materialreceipt/materialreceipt.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserRolesAuthGuard } from '../auth/user-roles-auth.guard';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedMaterialModule } from '../shared/material/shared-material-module';
import { QualitycheckComponent } from './qualitycheck/qualitycheck.component';
import { GoodsreceiptComponent } from './goodsreceipt/goodsreceipt.component';
import { GoodsissueComponent } from './goodsissue/goodsissue.component';
import { GoodsreturnComponent } from './goodsreturn/goodsreturn.component';
import { GoodstransferComponent } from './goodstransfer/goodstransfer.component';
import { PrintdmrComponent } from './printdmr/printdmr.component';
import { NgxPrintElementModule } from "ngx-print-element";
import { PrintgoodsissueComponent } from './printgoodsissue/printgoodsissue.component';
import { PrintgoodsreturnComponent } from './printgoodsreturn/printgoodsreturn.component';
import { PrintoutgatepassComponent } from './printoutgatepass/printoutgatepass.component';
import { PrintoutgatepassrgpComponent } from './printoutgatepassrgp/printoutgatepassrgp.component';
import { SubContractGoodsIssueComponent } from './sub-contract-goods-issue/sub-contract-goods-issue.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TestComponent } from './test/test.component';
import { DeliverychallanComponent } from './deliverychallan/deliverychallan.component';
import { Outgatepassrgp1Component } from './outgatepassrgp1/outgatepassrgp1.component';
import { Printoutgatepassrgp1Component } from './printoutgatepassrgp1/printoutgatepassrgp1.component';
import { Printoutgatepassrgpnrgp1Component } from './printoutgatepassrgpnrgp1/printoutgatepassrgpnrgp1.component';
import { NrgpComponent } from './nrgp/nrgp.component';
import { PrintDcComponent } from './print-dc/print-dc.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
const routes: Routes = [
  {
    path: 'dmr',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Daily Material Receipt',
      permission: {
        only: ['SUPER_ADMIN', 'DAILY_MATERIAL_RECEIPT'],
        redirectTo: '/ui/403',
      },
    },
    component: MaterialreceiptComponent,
  },
  {
    path: 'qualitycheck',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Quality Check',
      permission: {
        only: ['SUPER_ADMIN', 'QUALITY_CHECK'],
        redirectTo: '/ui/403',
      },
    },
    component: QualitycheckComponent
  },
  {
    path: 'goodsreceipt',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Goods Receipt',
      permission: {
        only: ['SUPER_ADMIN', 'GOODS_RECEIPT'],
        redirectTo: '/ui/403',
      },
    },
    component: GoodsreceiptComponent
  },
  { path: 'goodsissue', 
  canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Goods Issue',
      permission: {
        only: ['SUPER_ADMIN', 'GOODS_ISSUE'],
        redirectTo: '/ui/403',
      },
    },
  component: GoodsissueComponent },
  {
    path: 'goodsreturn',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Goods Return',
      permission: {
        only: ['SUPER_ADMIN', 'GOODS_RETURN'],
        redirectTo: '/ui/403',
      },
    },
    component: GoodsreturnComponent
  },
  {
    path: 'goodstransfer',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Out Gate Pass',
      permission: {
        only: ['SUPER_ADMIN', 'OUT_GATE_PASS'],
        redirectTo: '/ui/403',
      },
    },
    component: GoodstransferComponent
  },
  { path: 'printdmr', component: PrintdmrComponent },
  { path: 'printgoodsissue', component: PrintgoodsissueComponent },
  { path: 'printgoodsreturn', component: PrintgoodsreturnComponent },
  { path: 'printoutgatepass', component: PrintoutgatepassComponent },
  { path: 'printrgppass', component: PrintoutgatepassrgpComponent },
  {path:'deliverychallan',
  canActivate: [AuthGuard, UserRolesAuthGuard],
  data: {
    title: 'Delivery Challan',
    permission: {
      only: ['SUPER_ADMIN', 'DELIVERY_CHALLAN'],
      redirectTo: '/ui/403',
    },
  },
  component:DeliverychallanComponent
},
  {path:'print-dc',component:PrintDcComponent},
 
  {
    path: 'subContractGoodsIssue',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Sub-Contract Goods Issue',
      permission: {
        only: ['SUPER_ADMIN', 'OUT_GATE_PASS'],
        redirectTo: '/ui/403',
      },
    },
    component: SubContractGoodsIssueComponent
  },
  { path: 'test', component: TestComponent },
  {
    path: 'outgatepassrgp1',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'OutGatePass RGP',
      permission: {
        only: ['SUPER_ADMIN','OUT_GATE_PASS_RGP'],
        redirectTo: '/ui/403',
      },
    },
    component: Outgatepassrgp1Component,
    
  },
  {path:'printoutgatepassrgp1',component:Printoutgatepassrgp1Component},
  {path:'printoutgatepassrgpnrgp1',component:Printoutgatepassrgpnrgp1Component},
  {
    path:'nrgp',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'OutGatePass NRGP',
      permission: {
        only: ['SUPER_ADMIN','OUT_GATE_PASS_NRGP'],
        redirectTo: '/ui/403',
      },
    },
    component:NrgpComponent
  },
 
]

@NgModule({
  declarations: [
    MaterialreceiptComponent,
    QualitycheckComponent,
    GoodsreceiptComponent,
    GoodsissueComponent,
    GoodsreturnComponent,
    GoodstransferComponent,
    PrintdmrComponent,
    PrintgoodsissueComponent,
    PrintgoodsreturnComponent,
    PrintoutgatepassComponent,
    PrintoutgatepassrgpComponent,
    SubContractGoodsIssueComponent,
    TestComponent,
    DeliverychallanComponent,
    Outgatepassrgp1Component,
    Printoutgatepassrgp1Component,
    Printoutgatepassrgpnrgp1Component,
    NrgpComponent,
    PrintDcComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    SharedMaterialModule,
    NgxPrintElementModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    NgxQRCodeModule,
    ZXingScannerModule
  ],

})
export class InventoryModule { }
