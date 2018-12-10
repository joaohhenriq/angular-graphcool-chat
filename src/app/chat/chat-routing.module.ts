import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatUsersComponent } from './components/chat-users/chat-users.component';
import { AuthGuard } from './../login/auth.guard';
import { ChatTabComponent } from './components/chat-tab/chat-tab.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ChatTabComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'users', component: ChatUsersComponent },
      { path: '', component: ChatListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
