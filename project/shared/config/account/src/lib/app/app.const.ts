export enum AppParam {
  MinPort = 0,
  MaxPort = 65535,
  DefaultPort = 3333,
}

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export type Environment = typeof ENVIRONMENTS[number];
