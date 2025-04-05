import { Injectable, Logger } from '@nestjs/common';
import { ServersService } from '../servers/servers.service';
import { MailerService } from '../mailer/mailer.service';
import { RequestsService } from '../requests/requests.service';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { Server } from '../servers/server.entity';

@Injectable()
export class MonitorService {
  private readonly logger = new Logger(MonitorService.name);

  constructor(
    private readonly serversService: ServersService,
    private readonly requestsService: RequestsService,
    private readonly mailerService: MailerService,
  ) {}

  @Cron('* * * * *')
  async handleCron() {
    this.logger.log('Running monitor');

    const servers: Server[] = await this.serversService.findAll();

    for (const server of servers) {
      const start = Date.now();
      let success = false;
      let latency = 0;
      let statusCode = 0;

      try {
        switch (server.protocol) {
          case 'http':
          case 'https': {
            const res = await axios.get(server.url, { timeout: 45000 });
            statusCode = res.status;
            if (res.status >= 200 && res.status < 300) {
              success = true;
            }
            break;
          }
          case 'ftp': {
            const ftp = require('basic-ftp');
            const client = new ftp.Client(45000);
            try {
              await client.access({
                host: new URL(server.url).hostname,
                user: 'dlpuser',
                password: 'rNrKYTX9g7z3RgJRmxWuGHbeu',
                secure: false,
              });
              success = true;
              statusCode = 200;
            } finally {
              client.close();
            }
            break;
          }
          case 'ssh': {
            const { Client } = require('ssh2');
            const conn = new Client();
            await new Promise<void>((resolve, reject) => {
              conn
                .on('ready', () => {
                  success = true;
                  statusCode = 200;
                  conn.end();
                  resolve();
                })
                .on('error', err => reject(err))
                .connect({
                  host: new URL(server.url).hostname,
                  username: 'demo',
                  password: 'password',
                  readyTimeout: 45000,
                });
            });
            break;
          }
        }
      } catch (error) {
        statusCode = error?.response?.status || 0;
        this.logger.warn(
          `Failed monitor server ${server.name}: ${error.message}`,
        );
      } finally {
        latency = Date.now() - start;
        await this.requestsService.create({
          server,
          statusCode,
          latency,
          success,
        });

        const newHealth = await this.requestsService.changeHealth(server.id);
        if (server.isHealthy !== newHealth) {
          await this.mailerService.sendStatus(
            'winten2@yandex.ru',
            server.name,
            newHealth,
          );
          await this.serversService.update(server.id, {
            isHealthy: newHealth,
          });
        }
      }
    }
  }
}
