import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Server } from '../servers/server.entity';

@Entity()
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Server, server => server.requests, { onDelete: 'CASCADE' })
  server: Server;
  @Column()
  statusCode: number;

  @Column()
  latency: number;

  @Column()
  success: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
