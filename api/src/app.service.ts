import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHealth(): string {
    return 'OK';
  }

  async getHealthCheck(): Promise<{ status: string; timestamp: string }> {
    // Touch the database to keep Supabase active
    // Simple query that uses minimal resources
    await this.prisma.$queryRaw`SELECT 1`;
    
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}
