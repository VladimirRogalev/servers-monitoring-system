import { Module } from '@nestjs/common';
import { RequestsModule } from './requests/requests.module';
import { ConfigModule } from '@nestjs/config';
import { ServersModule } from './servers/servers.module';
import { MonitorModule } from './monitor/monitor.module';
import { MailerModule } from './mailer/mailer.module';
import * as process from 'node:process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT)
        : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    ServersModule,
    MonitorModule,
    MailerModule,
    RequestsModule,
  ],
})
export class AppModule {}
