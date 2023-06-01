import { NestFactory } from '@nestjs/core';
import { App1Module } from './app1.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    App1Module,
    {
      transport: Transport.GRPC,
      options: {
        url:"0.0.0.0:50001",
        package: 'app1',
        protoPath: process.cwd() + '/proto/app1/app1.proto',
      },
    },
  );
  await app.listen();
}
bootstrap();
