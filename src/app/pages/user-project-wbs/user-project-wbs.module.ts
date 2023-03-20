import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { ComponentsModule } from './../../components/components.module';
import { SharedMaterialModule } from './../../shared/material/shared-material-module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddNewComponent } from './add-new/add-new.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User Projects WBS',
    },
    component: ListComponent,
  },
  {
    path: 'add',
    data: {
      title: 'User Projects WBS',
    },
    component: AddNewComponent,
  },
];

@NgModule({
  declarations: [ListComponent, AddNewComponent],
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
export class UserProjectWbsModule {}
