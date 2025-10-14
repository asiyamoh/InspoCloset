import { createFileRoute } from '@tanstack/react-router';
import { PictureDetailPage } from '../../features/folder/picture-detail.page';

export const Route = createFileRoute('/_authenticated/picture-detail/$pictureId')({
  component: PictureDetailPage,
});
