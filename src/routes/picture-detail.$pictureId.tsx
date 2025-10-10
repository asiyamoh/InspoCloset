import { createFileRoute } from '@tanstack/react-router';
import { PictureDetailPage } from '../features/folder/picture-detail.page';

export const Route = createFileRoute('/picture-detail/$pictureId')({
  component: PictureDetailPage,
});
