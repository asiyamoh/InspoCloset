import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from './supabase-auth.guard';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  @Get('verify')
  async verifyAuth(@Request() req): Promise<AuthResponseDto> {
    const user = req.user;
    const profile = req.profile;

    return {
      user: {
        id: user.id,
        email: user.email,
        email_confirmed_at: user.email_confirmed_at,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      profile: {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        role: profile.role,
        profilePictureUrl: profile.profilePictureUrl,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
      success: true,
      message: 'Authentication successful',
    };
  }
}
