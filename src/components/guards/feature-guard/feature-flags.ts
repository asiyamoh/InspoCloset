export type FeatureFlag = 'bride';

export interface FeatureFlagConfig {
  local: FeatureFlag[];
  development: FeatureFlag[];
  staging: FeatureFlag[];
  production: FeatureFlag[];
}

export const featureFlags: FeatureFlagConfig = {
  local: ['bride'],
  development: ['bride'],
  staging: [],
  production: [],
};

export function getEnvironment(): keyof FeatureFlagConfig {
  const origin = window.location.origin;
  if (origin.includes('localhost')) return 'local';
  if (origin.includes('develop')) return 'development';
  if (origin.includes('staging')) return 'staging';
  return 'production';
}
