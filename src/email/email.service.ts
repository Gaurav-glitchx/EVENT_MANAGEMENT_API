import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private escapeHtml(unsafe: string): string {
    return unsafe.replace(/[&<>"']/g, (match) => {
      switch (match) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        default:
          return match;
      }
    });
  }

  async sendUserRegistrationEmail(email: string, name: string) {
    const escapedName = this.escapeHtml(name);

    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Event Management App</title>
</head>
<body>
    <h1>Welcome ${escapedName}!</h1>
    <p>Thank you for registering with our Event Management App.</p>  
</body>
</html>`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Event Management App',
      html,
    });
  }

  async sendEventRegistrationEmail(
    email: string,
    name: string,
    eventTitle: string,
    eventDate: string,
  ) {
    const escapedName = this.escapeHtml(name);
    const escapedEventTitle = this.escapeHtml(eventTitle);
    const escapedEventDate = this.escapeHtml(eventDate);

    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Event Registration Confirmation</title>
</head>
<body>
    <h1>Event Registration Confirmation</h1>
    <p>Dear ${escapedName},</p>
    <p>You have successfully registered for the event:</p>
    <h2>${escapedEventTitle}</h2>
    <p>Event Date: ${escapedEventDate}</p>
    <p>We look forward to seeing you there!</p>
</body>
</html>`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Event Registration Confirmation',
      html,
    });
  }

  async sendEventUpdateEmail(email: string, name: string, eventTitle: string, changes: string) {
    const escapedName = this.escapeHtml(name);
    const escapedEventTitle = this.escapeHtml(eventTitle);
    const escapedChanges = this.escapeHtml(changes);

    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Event Update Notification</title>
</head>
<body>
    <h1>Event Update Notification</h1>
    <p>Dear ${escapedName},</p>
    <p>There have been changes to the event you registered for:</p>
    <h2>${escapedEventTitle}</h2>
    <p>Changes made:</p>
    <p>${escapedChanges}</p>
    <p>Please review these changes and contact us if you have any questions.</p>
</body>
</html>`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Event Update Notification',
      html,
    });
  }
}
