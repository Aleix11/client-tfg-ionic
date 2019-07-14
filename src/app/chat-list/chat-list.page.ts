import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {Chat} from "../../models/chat";
import {ModalController, NavParams} from "@ionic/angular";
import {UserService} from "../../providers/userService";
import {ChatService} from "../../providers/chatService";
import {Observable} from "rxjs";
import {Socket} from "ng-socket-io";
import { Storage } from '@ionic/storage';
import {Router} from "@angular/router";
import * as moment from 'moment';
import {ModalCreateChatPage} from "./modal-create-chat/modal-create-chat.page";
import {PassChatUsers} from "../../providers/pass-data-service/passChatUsers";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage {
    user: User;
    users: User[] = [];
    nick: string = "";

    messages = [];
    message: String;

    chats: Chat[];

    constructor(private router: Router,
                public socket: Socket,
                public _modalCtrl: ModalController,
                public userService: UserService,
                public passChatUsers: PassChatUsers,
                public storage: Storage,
                public chatService: ChatService) {
        this.storage.get('user').then( (user) => {
            console.log("propietario valor directo de storage: ", user.username);
            this.nick = user.username;
            this.user = user;
            console.log('user', this.user);
        });
        this.getUsers().subscribe(data => {
            console.log('holaa', data);
        });
    }

    async ionViewDidLoad() {
        this.reloadChats();
        this.user = await this.storage.get('user');

    }
    ionViewDidEnter() {
        this.reloadChats();
    }

    getUsers() {
        let observable = new Observable(observer => {
            this.socket.on('users-changed', data => {
                console.log(data);
                observer.next(data);
            })
        });
        return observable;
    }

    openChat(user: User) {
        this.passChatUsers.setData({
            from: this.user,
            to: user,
            userNick: ''
        });
        this.router.navigate(['/chat']);
    }

    openChatFromUsers(users) {
        let user = users.find(usr => usr.userId != this.user._id);
        this.storage.get('token').then(token => {
            this.userService.getUser(user.userId, token).subscribe(user => {
                this.passChatUsers.setData({
                    from: this.user,
                    to: user,
                    userNick: this.nick
                });
                this.router.navigate(['/chat']);
            });
        });
    }

    reloadChats() {
        this.storage.get('token').then(token => {
            this.chatService.getChats(this.user, token).subscribe(async chats => {
                console.log(chats);
                this.chats = chats;
                await this.chats.sort((a: Chat, b: Chat) => {
                    return new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime();
                });
                this.chats.forEach(chat => {
                    chat.users.forEach(user => {
                        this.userService.getUser(user.userId, token).subscribe(usr => {
                            user.userFoto = usr.profilePhoto;
                            user.userName = usr.username;
                        });
                    });
                    //chat.lastMessageDate = new Date(chat.lastMessageDate);
                    chat.lastMessageDateString = moment(chat.lastMessageDate).fromNow();
                });
            });
        });
    }

    async modalCreateChat() {
        const modal = await this._modalCtrl.create({
            component: ModalCreateChatPage
            // componentProps: { value: 123 }
        });

        await modal.present();
    }
}
