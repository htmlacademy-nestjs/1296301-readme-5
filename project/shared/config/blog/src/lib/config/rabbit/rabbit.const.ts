export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_RABBIT_PORT = 5672;
export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export type Environment = typeof ENVIRONMENTS[number];
