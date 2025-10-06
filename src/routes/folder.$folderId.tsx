import { createFileRoute } from "@tanstack/react-router";
import { FolderDetailPage } from "../features/folder/folder-detail.page";

export const Route = createFileRoute("/folder/$folderId")({
  component: FolderDetailPage,
});
