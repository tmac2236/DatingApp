import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

import { HomeComponent } from './report/home.component';
import { MemeberListComponent } from './members/memeber-list/memeber-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { QueryPdModelComponent } from './report/query-pd-model/query-pd-model.component';
import { GetNoOperationListComponent } from './report/get-no-operation-list/get-no-operation-list.component';
import { AttendanceListComponent } from './report/attendance-list/attendance-list.component';
import { QueryChangeWorkerComponent } from './report/query-change-worker/query-change-worker.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '', // localhost:4200/''members
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemeberListComponent,
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        canDeactivate: [PreventUnsavedChanges],
      },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  {
    path: '', // localhost:4200/''
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'getReportDataPass', component: HomeComponent },
      { path: 'queryPDModel', component: QueryPdModelComponent },
      { path: 'getNoOperationList', component: GetNoOperationListComponent },
      { path: 'attendanceList', component: AttendanceListComponent },
      { path:'queryChangeWorker', component: QueryChangeWorkerComponent},
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
