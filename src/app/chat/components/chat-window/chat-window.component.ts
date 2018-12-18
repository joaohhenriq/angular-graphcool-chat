import { ChatService } from './../../services/chat.service';
import { AuthService } from './../../../core/services/auth.service';
import { MessageService } from './../../services/message.service';
import { User } from './../../../core/models/user.model';
import { UserService } from './../../../core/services/user.service';
import { Title } from '@angular/platform-browser';
import { map, mergeMap, tap, take } from 'rxjs/operators';
import { Chat } from './../../models/chat.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  chat: Chat;
  messages$: Observable<Message[]>;
  newMessage = '';
  recipientId: string = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private userService: UserService,
    private messageService: MessageService,
    public authService: AuthService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Loading...');

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

              this.messages$ = of([]);

            } else { // quando já tem o chat
              this.title.setTitle(this.chat.title || this.chat.users[0].name);
              this.messages$ = this.messageService.getChatMessages(this.chat.id);
            }
          })
        )
        .subscribe()
    );
  }

  sendMessage(): void {
    this.newMessage = this.newMessage.trim();
    if (this.newMessage) {

      if (this.chat) {
        this.messageService.createMessage({
          text: this.newMessage,
          chatId: this.chat.id,
          senderId: this.authService.authUser.id
        }).pipe(take(1)).subscribe(console.log);

        this.newMessage = '';
      } else {
        this.createPrivateChat();
      }
    }
  }

  private createPrivateChat(): void {
    this.chatService.createPrivateChat(this.recipientId)
      .pipe(
        take(1),
        tap((chat: Chat) => {
          this.chat = chat;
          this.sendMessage();
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.title.setTitle('Angular Graphcool Chat');
  }
}
