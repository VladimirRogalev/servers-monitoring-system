import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity])],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}
