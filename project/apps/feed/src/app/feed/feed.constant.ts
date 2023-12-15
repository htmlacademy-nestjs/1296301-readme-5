export const FeedPath = {
  Main: 'feed',
  Id: ':id',
  Search: 'search',
  Details: ':id/details',
  Follow: ':id/details/follow',
  Unfollow: ':id/details/follow/unsubscribe'
} as const;
