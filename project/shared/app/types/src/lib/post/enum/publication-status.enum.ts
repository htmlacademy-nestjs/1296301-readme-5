export enum PublicationStatus {
  Published = 'published',
  Draft = 'draft',
}

export const PublicationStatusValue = {
  Published: 'published',
  Draft: 'draft',
} as const;

export type PublicationStatusValues = typeof PublicationStatusValue[keyof typeof PublicationStatusValue];
