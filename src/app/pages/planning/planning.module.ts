import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialrequestComponent } from './materialrequest/materialrequest.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPrintElementModule } from "ngx-print-element";
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PurchaserequestComponent } from './purchaserequest/purchaserequest.component';
import { PrintpurchasereqComponent } from './printpurchasereq/printpurchasereq.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserRolesAuthGuard } from 'src/app/auth/user-roles-auth.guard';
import { MatButtonModule } from '@angular/material/button';
import { WorkrequestComponent } from './workrequest/workrequest.component';
import { WorkcompletionComponent } from './workcompletion/workcompletion.component';
import { JmsComponent } from './jms/jms.component';
import { PrintworkreqComponent } from './printworkreq/printworkreq.component';
import { PrintjmsComponent } from './printjms/printjms.component';
import { PrintworkcompletionComponent } from './printworkcompletion/printworkcompletion.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
const routes: Routes = [
  {
    path: 'goodsIssueRequest',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Goods Issue Request',
      permission: {
        only: ['SUPER_ADMIN', 'GOODS_ISSUE_REQUEST'],
        redirectTo: '/ui/403',
      },
    },
    component: MaterialrequestComponent,
    
  },
  {
    path: 'purchaserequest',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Purchase Request',
      permission: {
        only: ['SUPER_ADMIN', 'PURCHASE_REQUEST'],
        redirectTo: '/ui/403',
      },
    },
    component: PurchaserequestComponent,
    
  },
  // {path:'purchaserequest',component:PurchaserequestComponent},
  {path:'printpurchasereq',component:PrintpurchasereqComponent},
  {path:'workrequest',
  canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Work Request',
      permission: {
        only: ['SUPER_ADMIN', 'WORK_REQUEST'],
        redirectTo: '/ui/403',
      },
    },
  component:WorkrequestComponent},
  {path:'printworkreq',component:PrintworkreqComponent},
  {path:'workcompletion',
  canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Work Completion',
      permission: {
        only: ['SUPER_ADMIN', 'WORK_COMPLETION'],
        redirectTo: '/ui/403',
      },
    },
  component:WorkcompletionComponent},
  {path:'printwc',component:PrintworkcompletionComponent},
  {path:'jms',
  canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'JMS',
      permission: {
        only: ['SUPER_ADMIN', 'JMS'],
        redirectTo: '/ui/403',
      },
    },
  component:JmsComponent},
  {path:'printjms',component:PrintjmsComponent},

]
@NgModule({
  declarations: [
    MaterialrequestComponent,
    PurchaserequestComponent,
    PrintpurchasereqComponent,
    WorkrequestComponent,
    WorkcompletionComponent,
    JmsComponent,
    PrintworkreqComponent,
    PrintjmsComponent,
    PrintworkcompletionComponent,
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
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPrintElementModule,
    MatButtonModule,
    NgxQRCodeModule,
    ZXingScannerModule
  ]
})
export class PlanningModule { }
