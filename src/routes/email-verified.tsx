import { createFileRoute } from '@tanstack/react-router';
import { EmailVerifiedPage } from '../utils/auth/email-verified.page';

export const Route = createFileRoute('/email-verified')({
  component: EmailVerifiedPage,
});

