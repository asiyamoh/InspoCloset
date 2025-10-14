import { createFileRoute } from "@tanstack/react-router";
import { SubcategoryDetailPage } from "../../features/folder/subcategory-detail.page";

export const Route = createFileRoute("/_authenticated/folder-details/$folderId/subcategory/$subcategoryId")({
  component: SubcategoryDetailPage,
});
