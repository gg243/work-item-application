// src/database.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';

@Injectable()
export class DatabaseService {
  private readonly sql;

  constructor(private readonly configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined in .env file');
    }

    this.sql = neon(databaseUrl);
    console.log('Connected to Neon PostgreSQL');
  }

  // Reusable query method
  async query(query: any, ...params: any[]) {
    return await this.sql(query, ...params);
  }
}
