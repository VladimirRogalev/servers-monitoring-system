import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Log } from '../log/log.entity'

@Entity()
export class Server {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({
    type: 'enum',
    enum: ['HTTP', 'HTTPS', 'FTP', 'SSH'],
    default: 'HTTP',
  })
  protocol: 'HTTP' | 'HTTPS' | 'FTP' | 'SSH';

  @Column({ default: false })
  isHealthy: boolean;

  @OneToMany(() => Log, log => log.server)
  requests: Log[];
}
