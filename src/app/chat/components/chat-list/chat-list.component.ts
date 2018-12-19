import { BaseComponent } from './../../../shared/components/base.component';
import { AuthService } from './../../../core/services/auth.service';
import { Chat } from './../../models/chat.model';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent extends BaseComponent<Chat> implements OnInit {

  chats$: Observable<Chat[]>;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.chats$ = this.chatService.getUserChats();
  }

  getChatTitle(chat: Chat): string {
    return chat.title || chat.users[0].name;
  }

  getLastMessage(chat: Chat): string {
    const message = chat.messages[0];
    if (message) {
      const sender =
        (message.sender.id === this.authService.authUser.id)
          ? 'You'
          : message.sender.name;
      return `${sender}: ${message.text}`;
    }
    return 'No messages';
  }

}
