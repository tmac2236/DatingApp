import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemeberListComponent } from './memeber-list/memeber-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '', // localhost:4200/''members
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemeberListComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
