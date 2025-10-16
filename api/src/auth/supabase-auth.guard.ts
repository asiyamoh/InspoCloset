import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { AppConfigService } from '../config/app.config.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private supabase;

  constructor(private configService: AppConfigService) {
    this.supabase = createClient(
      this.configService.supabaseUrl,
      this.configService.supabaseServiceRoleKey
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No authorization token provided');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      // Verify the JWT token with Supabase
      const { data: { user }, error } = await this.supabase.auth.getUser(token);

      if (error || !user) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      // Add user to request object for use in controllers
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
