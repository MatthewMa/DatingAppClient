import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../_constants/constants';
import { Message } from '../_models/message';
import { getPaginaterResult, setParams } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessages(pageNumber, pageSize, container) {
    let params = setParams(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginaterResult<Message[]>(Constants.BASE_URL + Constants.MESSAGE_URL, params, this.http);
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(Constants.BASE_URL + Constants.MESSAGE_URL + '/thread/' + username);
  }

  sendMessage(recipientUsername: string, content: string) {
    return this.http.post<Message>(Constants.BASE_URL + Constants.MESSAGE_URL, {
      recipientUsername: recipientUsername,
      content: content
    });
  }

  deleteMessage(messageId: number) {
    console.log(messageId);
    return this.http.delete(Constants.BASE_URL + Constants.MESSAGE_URL + '/' + messageId);
  }
}
