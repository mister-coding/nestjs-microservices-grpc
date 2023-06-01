import { Controller, Get } from '@nestjs/common';
import { App3Service } from './app3.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class App3Controller {
  constructor(private readonly app3Service: App3Service) {}

  @Get()
  getHello(): string {
    return this.app3Service.getHello();
  }

  @GrpcMethod('HeroesService', 'FindOne')
  async findOne(
    data: any,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return {
      app: 'app3',
      data: items.find(({ id }) => id === data.id),
    };
  }
  
}
