import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification$ = new BehaviorSubject<Notification | null>(null);

  getNotification(): Observable<Notification | null> {
    return this.notification$.asObservable();
  }

  show(message: string, type: 'success' | 'error' = 'success', duration: number = 3000) {
    this.notification$.next({ message, type, duration });
    if (duration > 0) {
      setTimeout(() => this.hide(), duration);
    }
  }

  hide() {
    this.notification$.next(null);
  }
} 