import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { RequestsModule } from '../requests/requests.module';
import { MailerModule } from '../mailer/mailer.module';
import { ServersModule } from '../servers/servers.module';

@Module({
  imports: [ServersModule, RequestsModule, MailerModule],
  providers: [MonitorService],
})
export class MonitorModule {}
