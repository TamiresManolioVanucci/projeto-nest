import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permite acessar as variáveis globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT as string, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [], // Adicione todas as entidades aqui
      synchronize: process.env.TYPEORM_SYNC === 'true', // Controle isso via .env
      logging: process.env.TYPEORM_LOGGING === 'true',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
