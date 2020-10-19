import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { ErrorInterceptorProvider } from 'src/app/core/_services/error.interceptor';
import { appRoutes } from './routes';
import { AuthGuard } from 'src/app/core/_guards/auth.guard';
import { PreventUnsavedChanges } from 'src/app/core/_guards/prevent-unsaved-changes.guard';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MemeberListComponent } from './views/members/memeber-list/memeber-list.component';
import { MemberCardComponent } from './views/members/member-card/member-card.component';
import { MemberDetailComponent } from './views/members/member-detail/member-detail.component';
import { MemberEditComponent } from './views/members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './views/members/photo-editor/photo-editor.component';
import { QueryPdModelComponent } from './views/report/query-pd-model/query-pd-model.component';
import { GetNoOperationListComponent } from './views/report/get-no-operation-list/get-no-operation-list.component';
import { QueryChangeWorkerComponent } from './views/report/query-change-worker/query-change-worker.component';
import { AttendanceListComponent } from './views/report/attendance-list/attendance-list.component';

import { ReportService } from 'src/app/core/_services/report.service';
import { AuthService } from 'src/app/core/_services/auth.service';
import { UserService } from 'src/app/core/_services/user.service';
import { AlertifyService } from 'src/app/core/_services/alertify.service';
import { DatePipe } from '@angular/common';
import { GetReportDataPassComponent } from './views/report/get-report-data-pass/get-report-data-pass.component';
import { P404Component } from './views/report/error/404.component';
import { P500Component } from './views/report/error/500.component';





export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    GetReportDataPassComponent,
    MemeberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    QueryPdModelComponent,
    GetNoOperationListComponent,
    QueryChangeWorkerComponent,
    AttendanceListComponent,
    P404Component,
    P500Component,
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth'],
      },
    }),
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    PreventUnsavedChanges,
    ReportService,
    DatePipe,
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
