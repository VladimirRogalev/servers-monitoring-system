import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateServerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  url: string;

  @IsEnum(['http', 'https', 'ftp', 'ssh'])
  protocol: 'http' | 'https' | 'ftp' | 'ssh';

}
