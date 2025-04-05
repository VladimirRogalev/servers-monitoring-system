import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from 'node:process';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMPT_PORT ? parseInt(process.env.SMPT_PORT) : 587,
    secure: false,
    auth: {
      user: process.env.SMPT_USER || 'christ.armstrong2@ethereal.email',
      pass: process.env.SMPT_PASS || 'zC1PepStFm18DWvzN8',
    },
  });

  async sendStatus(to: string, serverName: string, isHealthy: boolean) {
    await this.transporter.sendMail({
      from: 'Alarm e-mail <christ.armstrong2@ethereal.email>',
      to: to,
      subject: `Alarm e-mail, server ${serverName} changed status`,
      text: `Server "${serverName}" is now ${isHealthy ? 'Healthy' : 'Unhealthy'}.`,
    });
  }
}
