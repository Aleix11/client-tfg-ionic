import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user";
import {Socket} from "ng-socket-io";
import {UserService} from "../../providers/userService";
import {Observable} from "rxjs/index";
import {PassChatUsers} from "../../providers/pass-data-service/passChatUsers";
import {ChatService} from "../../providers/chatService";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  userNick: string;
  user: User;
  userFrom: User;
  userTo: User;
  message: String;
  messages = [];
  users: {};
  room: String;

  chat: {};

  constructor(public socket: Socket,
              private passChatUsers: PassChatUsers,
              private chatService: ChatService,
              public storage: Storage,
              public userService: UserService) {
      let data = this.passChatUsers.getData();
      this.userFrom = data.from;
      this.userTo = data.to;
      this.userNick = data.userNick;

      this.storage.get('token').then(token => {
          this.userService.getUserFromUsername(this.userNick, token).subscribe(user => {
              this.user = user;
          });
      });

      this.users = {
          userFrom: this.userFrom,
          userTo: this.userTo,
      };
      this.socket.emit('subscribe', this.users);
      this.getMessagesSocket().subscribe(msg => {
          this.messages.push(msg);
          // Fer scroll to bottom
      });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
      this.storage.get('token').then(token => {
        console.log('users', this.users);
          this.chatService.getChatRoom(this.users, token).subscribe(room => {
              console.log('room', room);
              this.room = room.room;
              this.chatService.getMessages(room, token).subscribe(async messages => {
                  this.messages = messages.messages;
                  console.log('messages', this.messages);
              });
              if(this.user) {
                  this.chat = {
                      room: this.room,
                      user: this.user._id,
                      lastView: Date.now()
                  };
              }

              this.chatService.lastView(this.chat, token).subscribe();
          });
      });
  }
  // Scroll down


  sendMessage() {
    let message;
    if(this.message) {
        if(this.userNick === this.userFrom.username) {
            message = {
                room: this.room,
                message: this.message,
                from: this.userFrom._id,
                to: this.userTo._id,
                created: Date.now(),
                seen: false
            };
        } else {
            message = {
                room: this.room,
                message: this.message,
                from: this.userTo._id,
                to: this.userFrom._id,
                created: Date.now(),
                seen: false
            };
        }

        console.log('message', message);

        this.socket.emit('add-message', message);
        this.messages.push(message);
        //Scroll to bottom
        this.message = "";
        this.chat = {
            room: this.room,
            user: this.user._id,
            lastView: Date.now()
        };
        this.storage.get('token').then(token => {
          this.chatService.lastView(this.chat, token).subscribe();
        });
    }

  }

  getMessagesSocket() {
      let observable = new Observable(obs => {
          this.socket.on('message', data => {
              obs.next(data);
          });
      });
      return observable;
  }

}
