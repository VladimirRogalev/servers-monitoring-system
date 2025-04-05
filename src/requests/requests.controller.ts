import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get(':id')
  async getHistory(@Param('id', ParseIntPipe) id: number) {
    return this.requestsService.findRecent(id, 10);
  }
}
