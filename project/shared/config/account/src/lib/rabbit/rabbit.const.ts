export enum RabbitParam {
  MinPort = 0,
  MaxPort = 65535,
  DefaultPort = 5672,
}

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

export type Environment = typeof ENVIRONMENTS[number];
