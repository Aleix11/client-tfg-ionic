import {Message} from "./message";
import {ChatUser} from "./chatUser";

export class Chat {
    room: String;
    users: ChatUser[];
    created: Date;
    messages: Message[];
    lastMessage: String;
    lastMessageDate: Date;
    lastMessageDateString: String;
}
