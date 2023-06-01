import { Controller, Get } from '@nestjs/common';
import { App1Service } from './app1.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class App1Controller {
  constructor(private readonly app1Service: App1Service) {}

  @Get()
  getHello(): string {
    return this.app1Service.getHello();
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
      app: 'app1',
      data: items.find(({ id }) => id === data.id),
    };
  }
}
