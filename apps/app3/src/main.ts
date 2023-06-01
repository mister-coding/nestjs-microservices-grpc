import { NestFactory } from '@nestjs/core';
import { App3Module } from './app3.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    App3Module,
    {
      transport: Transport.GRPC,
      options: {
        url:"0.0.0.0:50003",
        package: 'app3',
        protoPath: process.cwd() + '/proto/app3/app3.proto',
      },
    },
  );
  await app.listen();
}
bootstrap();
