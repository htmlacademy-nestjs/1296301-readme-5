export const API_TAG_NAME = 'feeds';

export const FeedError = {
  EmptyList: 'There are no posts that can be loaded',
} as const;

export const FeedMessages = {
  ShowAll: 'List of publications is showing',
} as const;

export const FeedPath = {
  Main: 'feed',
  Id: ':id',
  Search: 'search',
  Details: ':id/details',
  Follow: ':id/details/follow',
  Unfollow: ':id/details/follow/unsubscribe'
} as const;
