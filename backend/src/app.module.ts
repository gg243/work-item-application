import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const raw =
          config.get<string>('DATABASE_URL') || process.env.DATABASE_URL;
        if (!raw) {
          throw new Error(
            'DATABASE_URL is not set. Check .env and working directory.',
          );
        }
        const connStr = raw.replace(/^['"]|['"]$/g, ''); // strip surrounding quotes if any
        const url = new URL(connStr);

        const dbSsl =
          (config.get<string>('DB_SSL') || process.env.DB_SSL) === 'true';
        const ssl = dbSsl ? { rejectUnauthorized: false } : false;

        return {
          type: 'postgres',
          host: url.hostname,
          port: Number(url.port) || 5432,
          username: decodeURIComponent(url.username),
          password: decodeURIComponent(url.password),
          database: url.pathname ? url.pathname.slice(1) : undefined,
          autoLoadEntities: true,
          synchronize: true,
          logging: ['error', 'query'],
          extra: { ssl },
        } as any;
      },
    }),
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
