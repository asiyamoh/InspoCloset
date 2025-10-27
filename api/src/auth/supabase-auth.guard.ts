import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { AppConfigService } from '../config/app.config.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { ProfileData } from './dto/auth-response.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  private supabase;

  constructor(
    private configService: AppConfigService,
    private prisma: PrismaService
  ) {
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
      
      // Fetch user profile using service role key
      const profile = await this.fetchUserProfile(user.id);
      
      if (!profile) {
        throw new UnauthorizedException('User profile not found');
      }

      // Add user and profile to request object for use in controllers
      request.user = user;
      request.profile = profile;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token verification failed');
    }
  }

  private async fetchUserProfile(userId: string): Promise<ProfileData | null> {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { id: userId }
      });

      if (!profile) {
        console.error('Profile not found for userId:', userId);
        return null;
      }

      return profile as ProfileData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }
}
