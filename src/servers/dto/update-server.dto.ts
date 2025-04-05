import { PartialType } from '@nestjs/mapped-types';
import { CreateServerDto } from './create-server.dto';
import { IsBoolean } from 'class-validator';

export class UpdateServerDto extends PartialType(CreateServerDto) {
  @IsBoolean()
  isHealthy?: boolean;
}
