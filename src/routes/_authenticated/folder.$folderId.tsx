import { createFileRoute } from "@tanstack/react-router";
import { FolderDetailPage } from "../../features/folder/folder-detail.page";

export const Route = createFileRoute("/_authenticated/folder/$folderId")({
  component: FolderDetailPage,
});
