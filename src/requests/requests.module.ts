import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';
import { RequestsController } from './requests.controller';
import { ServersModule } from '../servers/servers.module';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity]), ServersModule],
  providers: [RequestsService],
  controllers: [RequestsController],
  exports: [RequestsService],
})
export class RequestsModule {}
