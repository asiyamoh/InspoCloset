import { ReactNode } from 'react';
import { getEnvironment, featureFlags, FeatureFlag } from './feature-flags';

interface FeatureGateProps {
  feature: FeatureFlag;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureGate({
  feature,
  children,
  fallback = null,
}: FeatureGateProps) {
  const environment = getEnvironment();
  const isEnabled = featureFlags[environment].includes(feature);

  if (!isEnabled) return fallback;
  return <>{children}</>;
}
