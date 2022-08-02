import { Component } from '@angular/core';

import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  placement = 'topRight';

  createBasicNotification(position: NzNotificationPlacement): void {
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      { nzPlacement: position }
    );
  }

  constructor(private notification: NzNotificationService) {}
}
