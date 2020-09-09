import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemeberListComponent } from './members/memeber-list/memeber-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

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
  { path: '**', redirectTo: '', pathMatch: 'full' },
];