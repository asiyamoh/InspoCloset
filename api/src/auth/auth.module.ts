import { Module } from '@nestjs/common';
import { AuthGuard } from './supabase-auth.guard';

@Module({
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
