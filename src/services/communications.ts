import { SendGridClient } from '@sendgrid/mail';
import { Twilio } from 'twilio';

class CommunicationsService {
  private sendGrid: SendGridClient;
  private twilio: Twilio;

  constructor() {
    this.sendGrid = new SendGridClient(process.env.SENDGRID_API_KEY);
    this.twilio = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendSMS(to: string, message: string) {
    try {
      const result = await this.twilio.messages.create({
        body: message,
        to,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
      return { success: true, messageId: result.sid };
    } catch (error) {
      console.error('SMS sending failed:', error);
      return { success: false, error };
    }
  }

  async sendEmail(to: string, subject: string, content: { text: string; html: string }) {
    try {
      const msg = {
        to,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject,
        text: content.text,
        html: content.html,
      };
      await this.sendGrid.send(msg);
      return { success: true };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error };
    }
  }
}

export const communicationsService = new CommunicationsService();