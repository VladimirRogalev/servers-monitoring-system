import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from 'node:process';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT ? parseInt(process.env.SMPT_PORT) : 587,
    secure: false,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASS,
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
