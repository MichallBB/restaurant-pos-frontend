import { Injectable } from '@angular/core';
import { Client, Message, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ServedWebSocketService {
  private client: Client;
  private messageSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws', 
      connectHeaders: {},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      this.client.subscribe('/topic/served', (message: Message) => {
        this.messageSubject.next(message.body);
      });
    };

    this.client.activate();
  }

  public getMessages(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  public disconnect(): void {
    if (this.client) {
      this.client.deactivate();
    }
  }
}
