import { User } from './../../../core/models/user.model';
import { UserService } from './../../../core/services/user.service';
import { Title } from '@angular/platform-browser';
import { map, mergeMap, tap, take } from 'rxjs/operators';
import { Chat } from './../../models/chat.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  chat: Chat;
  recipientId: string = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.data
        .pipe(
          map(routeData => this.chat = routeData.chat),
          mergeMap(() => this.route.paramMap),
          tap((params: ParamMap) => {
            if (!this.chat) { // quando ainda não temos o chat criado
              this.recipientId = params.get('id'); // pega o parametro que chega na url

              this.userService.getUserById(this.recipientId)
                .pipe(take(1))
                .subscribe((user: User) => this.title.setTitle(user.name));
            } else { // quando já tem o chat
              this.title.setTitle(this.chat.title || this.chat.users[0].name);
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.title.setTitle('Angular Graphcool Chat');
  }
}
