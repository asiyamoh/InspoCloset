import { createFileRoute } from '@tanstack/react-router';
import { BridesPage } from '../features/bride/brides.page';
import { FeatureGate } from '../components/guards/feature-guard/feature-gate';

function BridesRoute() {
  return (
    <FeatureGate feature="bride" fallback={<div>Feature not available in this environment</div>}>
      <BridesPage />
    </FeatureGate>
  );
}

export const Route = createFileRoute('/brides')({
  component: BridesRoute,
}); 