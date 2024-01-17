import { SortDirection } from '@project/shared/app/types';

export const MAX_MESSAGES_COUNT = 50;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;

export enum MessageInfo {
  Add = 'Comment added',
  Remove = 'Comment removed',
  Update = 'Comment updated',
  ShowAll = 'All comments',
  Show = 'Comment by id'
}
