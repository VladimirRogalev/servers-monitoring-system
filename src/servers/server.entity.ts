import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RequestEntity } from '../requests/request.entity';

@Entity()
export class Server {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  protocol: 'http' | 'https' | 'ftp' | 'ssh';

  @Column({ default: false })
  isHealthy: boolean;

  @OneToMany(() => RequestEntity, log => log.server)
  requests: RequestEntity[];
}
