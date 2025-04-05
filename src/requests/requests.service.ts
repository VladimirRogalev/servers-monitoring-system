import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestEntity } from './request.entity';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
  ) {}

  create(dto: CreateRequestDto) {
    const entry = this.requestRepository.create(dto);
    console.log('Saving request entry:', entry);
    return this.requestRepository.save(entry);
  }

  findRecent(serverId: number, limit = 10) {
    return this.requestRepository.find({
      where: { server: { id: serverId } },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async changeHealth(serverId: number): Promise<boolean> {
    const logs = await this.findRecent(serverId, 5);
    const last5Success = logs.length === 5 && logs.every(log => log.success);
    const last3Failed = logs.slice(0, 3).every(log => !log.success);

    if (last5Success) return true;
    if (last3Failed) return false;
    return logs[0]?.success ?? false;
  }
}
