import { createFileRoute } from "@tanstack/react-router";
import { BrideDetailPage } from "../features/bride/bride-detail.page";

export const Route = createFileRoute("/bride-detail/$brideId")({
  component: BrideDetailPage,
});
