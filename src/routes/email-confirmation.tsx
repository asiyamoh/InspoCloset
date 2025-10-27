import { createFileRoute } from '@tanstack/react-router';
import { EmailConfirmationPage } from '../utils/auth/email-confirmation.page';

export const Route = createFileRoute('/email-confirmation')({
  component: EmailConfirmationPage,
});
