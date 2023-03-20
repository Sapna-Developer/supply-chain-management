import { UserRolesAuthGuard } from './../../auth/user-roles-auth.guard';
import { AuthGuard } from './../../auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { ComponentsModule } from './../../components/components.module';
import { SharedMaterialModule } from './../../shared/material/shared-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Ticket List',
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_TICKETS'],
        redirectTo: '/ui/403',
      },
    },
    component: ListComponent,
  },
  {
    path: 'details',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Ticket Details',
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_TICKETS'],
        redirectTo: '/ui/403',
      },
    },
    component: DetailsComponent,
  },
];

@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    ComponentsModule,
    MomentModule,
    NgbModule,
  ],
})
export class TicketsModule {}
