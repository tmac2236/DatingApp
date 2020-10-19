import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/_guards/auth.guard';
import { PreventUnsavedChanges } from 'src/app/core/_guards/prevent-unsaved-changes.guard';

import { MemeberListComponent } from './views/members/memeber-list/memeber-list.component';
import { MemberDetailComponent } from './views/members/member-detail/member-detail.component';
import { MemberEditComponent } from './views/members/member-edit/member-edit.component';
import { QueryPdModelComponent } from './views/report/query-pd-model/query-pd-model.component';
import { GetNoOperationListComponent } from './views/report/get-no-operation-list/get-no-operation-list.component';
import { AttendanceListComponent } from './views/report/attendance-list/attendance-list.component';
import { QueryChangeWorkerComponent } from './views/report/query-change-worker/query-change-worker.component';
import { GetReportDataPassComponent } from './views/report/get-report-data-pass/get-report-data-pass.component';
import { P404Component } from './views/report/error/404.component';
import { P500Component } from './views/report/error/500.component';

export const appRoutes: Routes = [
  { path: '', component: GetReportDataPassComponent }, // 首頁
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
    ],
  },
  {
    path: '', // localhost:4200/''
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'report/getReportDataPass', component: GetReportDataPassComponent },
      { path: 'report/queryPDModel', component: QueryPdModelComponent },
      { path: 'report/getNoOperationList', component: GetNoOperationListComponent },
      { path: 'report/attendanceList', component: AttendanceListComponent },
      { path: 'report/queryChangeWorker', component: QueryChangeWorkerComponent},
      { path: 'P404', component: P404Component},
      { path: 'P500', component: P500Component}
    ],
  },
  { path: '**', redirectTo: 'P404', pathMatch: 'full' },
];
