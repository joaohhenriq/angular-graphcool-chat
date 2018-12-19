import { BaseComponent } from './../../../shared/components/base.component';
import { AuthService } from './../../../core/services/auth.service';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent extends BaseComponent<User> implements OnInit {

  users$: Observable<User[]>;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    super();
   }

  ngOnInit() {
    this.users$ = this.userService.allUsers(this.authService.authUser.id);
  }

}
