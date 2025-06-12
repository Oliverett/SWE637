import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="notification" 
         [class]="'notification ' + notification.type"
         [style.opacity]="opacity">
      {{ notification.message }}
    </div>
  `,
  styles: [`
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 4px;
      color: white;
      z-index: 1000;
      transition: opacity 0.3s ease-in-out;
    }
    .success {
      background-color: #4CAF50;
    }
    .error {
      background-color: #f44336;
    }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notification: Notification | null = null;
  opacity = 0;
  private subscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {
    console.log('NotificationComponent constructor called');
  }

  ngOnInit() {
    console.log('NotificationComponent initialized');
    this.subscription = this.notificationService.getNotification().subscribe(notification => {
      console.log('Notification received:', notification);
      this.notification = notification;
      if (notification) {
        this.opacity = 1;
        setTimeout(() => {
          this.opacity = 0;
        }, (notification.duration || 3000) - 300);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
} 