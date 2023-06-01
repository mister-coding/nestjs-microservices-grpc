import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'APP1',
        transport: Transport.GRPC,
        options: {
          url:"0.0.0.0:50001",
          package: 'app1',
          protoPath: process.cwd() + '/proto/app1/app1.proto',
        },
      },
      {
        name: 'APP2',
        transport: Transport.GRPC,
        options: {
          url:"0.0.0.0:50002",
          package: 'app2',
          protoPath: process.cwd() + '/proto/app2/app2.proto',
        },
      },
      {
        name: 'APP3',
        transport: Transport.GRPC,
        options: {
          url:"0.0.0.0:50003",
          package: 'app3',
          protoPath: process.cwd() + '/proto/app3/app3.proto',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
