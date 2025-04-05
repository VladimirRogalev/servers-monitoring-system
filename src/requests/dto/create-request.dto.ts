import { IsBoolean, IsInt, IsObject } from 'class-validator';
import { Server } from '../../servers/server.entity';

export class CreateRequestDto {
  @IsObject()
  server: Server;

  @IsInt()
  statusCode: number;

  @IsInt()
  latency: number;

  @IsBoolean()
  success: boolean;
}
