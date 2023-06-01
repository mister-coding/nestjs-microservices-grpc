import { NestFactory } from '@nestjs/core';
import { App2Module } from './app2.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    App2Module,
    {
      transport: Transport.GRPC,
      options: {
        url:"0.0.0.0:50002",
        package: 'app2',
        protoPath: process.cwd() + '/proto/app2/app2.proto',
      },
    },
  );
  await app.listen();
}
bootstrap();
