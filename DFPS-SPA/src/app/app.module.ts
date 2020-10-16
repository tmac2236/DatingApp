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

import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './report/home.component';
import { MemeberListComponent } from './members/memeber-list/memeber-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MessagesComponent } from './messages/messages.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { QueryPdModelComponent } from './report/query-pd-model/query-pd-model.component';
import { GetNoOperationListComponent } from './report/get-no-operation-list/get-no-operation-list.component';
import { QueryChangeWorkerComponent } from './report/query-change-worker/query-change-worker.component';
import { AttendanceListComponent } from './report/attendance-list/attendance-list.component';

import { ReportService } from './_services/report.service';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AlertifyService } from './_services/alertify.service';
import { DatePipe } from '@angular/common';





export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    MemeberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    ListsComponent,
    MessagesComponent,
    PhotoEditorComponent,
    QueryPdModelComponent,
    GetNoOperationListComponent,
    QueryChangeWorkerComponent,
    AttendanceListComponent,
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
