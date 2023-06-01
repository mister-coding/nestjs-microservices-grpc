import { Controller, Get } from '@nestjs/common';
import { App2Service } from './app2.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class App2Controller {
  constructor(private readonly app2Service: App2Service) {}

  @Get()
  getHello(): string {
    return this.app2Service.getHello();
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
      app: 'app2',
      data: items.find(({ id }) => id === data.id),
    };
  }
}
