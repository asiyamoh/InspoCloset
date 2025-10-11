import { createFileRoute } from "@tanstack/react-router";
import { BrideDetailPage } from "../features/bride/bride-detail.page";
import { FeatureGate } from "../components/guards/feature-guard/feature-gate";

function BrideDetailRoute() {
  return (
    <FeatureGate feature="bride" fallback={<div>Feature not available in this environment</div>}>
      <BrideDetailPage />
    </FeatureGate>
  );
}

export const Route = createFileRoute("/bride-detail/$brideId")({
  component: BrideDetailRoute,
});
