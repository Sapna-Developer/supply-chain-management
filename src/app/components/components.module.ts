import { SharedMaterialModule } from './../shared/material/shared-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from './page-header/page-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { CreateIssueLogComponent } from './create-issue-log/create-issue-log.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    CreateTicketComponent,
    CreateIssueLogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ],
  exports: [
    PageHeaderComponent,
    CreateTicketComponent,
    CreateIssueLogComponent,
  ],
})
export class ComponentsModule {}
