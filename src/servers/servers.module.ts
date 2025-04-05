import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './server.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Server])],
  providers: [ServersService],
  controllers: [ServersController],
  exports: [ServersService],
})
export class ServersModule {}
