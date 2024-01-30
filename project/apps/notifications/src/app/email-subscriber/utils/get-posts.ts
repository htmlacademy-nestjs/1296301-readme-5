import dayjs from 'dayjs';

import { Subscriber } from '@project/shared/app/types';

import { SendNewsDto } from '../dto/send-news.dto';

export const getNewPosts = ({ posts, id }: SendNewsDto, { dateNotify }: Subscriber) => {
  return posts.filter((post) => {
    return post.userId !== id && dayjs(post.createdAt).isAfter(dateNotify ?? dayjs().subtract(1, 'day'));
  });
};
