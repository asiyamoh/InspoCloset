import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === 'development';
  }

  get isStaging(): boolean {
    return this.configService.get('NODE_ENV') === 'staging';
  }

  get isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL')!;
  }

  get supabaseUrl(): string {
    return this.configService.get<string>('SUPABASE_URL')!;
  }

  get supabaseServiceRoleKey(): string {
    return this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')!;
  }

  get port(): number {
    return this.configService.get<number>('PORT', 8080);
  }

  get apiUrl(): string {
    return this.configService.get<string>('API_URL')!;
  }

  get corsOrigins(): string[] {
    if (this.isDevelopment) {
      return ['http://localhost:3000', 'http://127.0.0.1:3000'];
    }
    if (this.isStaging) {
      return ['https://your-staging-frontend.com'];
    }
    return ['https://your-production-frontend.com'];
  }
}
