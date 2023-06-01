import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface HeroesService {
  findOne(data: { id: number }): Observable<any>;
}

@Controller()
export class AppController implements OnModuleInit {
  private heroesService: HeroesService;
  private heroesService2: HeroesService;
  private heroesService3: HeroesService;

  constructor(
    @Inject('APP1') private client: ClientGrpc,
    @Inject('APP2') private client2: ClientGrpc,
    @Inject('APP3') private client3: ClientGrpc,
    private readonly appService: AppService,
  ) {}

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
    this.heroesService2 = this.client2.getService<HeroesService>('HeroesService');
    this.heroesService3 = this.client3.getService<HeroesService>('HeroesService');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hero1')
  async getHero() {
    return await this.heroesService.findOne({ id: 1 });
  }

  @Get('hero2')
  async getHero2() {
    return await this.heroesService2.findOne({ id: 1 });
  }

  @Get('hero3')
  async getHero3() {
    return await this.heroesService3.findOne({ id: 1 });
  }
}
