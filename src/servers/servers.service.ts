import { Injectable, NotFoundException } from '@nestjs/common';
import { Server } from './server.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';

@Injectable()
export class ServersService {
  constructor(
    @InjectRepository(Server)
    private readonly serverRepository: Repository<Server>,
  ) {}

  create(dto: CreateServerDto): Promise<Server> {
    const server = this.serverRepository.create(dto);
    return this.serverRepository.save(server);
  }

  findAll() {
    return this.serverRepository.find();
  }

  async findOne(id: number): Promise<Server> {
    const server = await this.serverRepository.findOne({
      where: { id },
      relations: ['requests'],
    });
    if (!server) {
      throw new NotFoundException(`Server with ID ${id} not found`);
    }
    return server;
  }

  async update(id: number, dto: UpdateServerDto): Promise<Server> {
    const server = await this.findOne(id);
    Object.assign(server, dto);
    return this.serverRepository.save(server);
  }

  async remove(id: number): Promise<Server> {
    const server = await this.findOne(id);
    return this.serverRepository.remove(server);
  }
}
