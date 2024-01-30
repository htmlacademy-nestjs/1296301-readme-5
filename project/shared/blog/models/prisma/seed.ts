import { PrismaClient } from '@prisma/client';
import { PostType } from '../../../app/types/src';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';
const THIRD_USER_ID = '030b503e305126581762309c';
const FOURTH_USER_ID = '305126581762309c030b503e';
const FIFTH_USER_ID = '303e2030b56581762309c051';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';
const THIRD_POST_UUID = '8b4b-da99-4fe3-ab04593b-e06d82e2ef4d';
const FOURTH_POST_UUID = 'd82e-99da-593b-ab044fe3-ef0db4b2e068';
const FIFTH_POST_UUID = '62309c0-030b-30b5-58170cbb-09c4b303e';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      userId: FIRST_USER_ID,
      type: PostType.text,
      title: 'Летняя вечеринка',
      description: 'Самая светлая ночь в году!',
      likes: [
        { userId: SECOND_USER_ID },
      ],
      messages: [
        {
          userId: SECOND_USER_ID,
          message: 'Отличный ивент!',
        },
      ],
      announcement: '22 июня в Бразилии',
    },
    {
      id: SECOND_POST_UUID,
      userId: SECOND_USER_ID,
      type: PostType.video,
      title: 'Видео с летней вечеринки в Бразилии',
      link: 'https://www.youtube.com/watch?v=R_osYkstaAE',
      tags: ['travel'],
      likes: [
        { userId: FIRST_USER_ID },
      ],
      messages: [
        {
          userId: FIRST_USER_ID,
          message: 'Вечеринка супер!',
        },
      ],
    },
    {
      id: THIRD_POST_UUID,
      userId: THIRD_USER_ID,
      type: PostType.photo,
      link: 'https://www.labirint.ru/books/459698/',
      tags: ['travel', 'books'],
      likes: [
        { userId: FOURTH_USER_ID },
      ],
      messages: [
        {
          userId: FIFTH_USER_ID,
          message: 'Где найти такую книгу?',
        },
      ],
    },
    {
      id: FOURTH_POST_UUID,
      userId: FOURTH_USER_ID,
      type: PostType.link,
      link: 'https://www.labirint.ru',
      description: 'Только в "Лабиринте"',
      likes: [
        { userId: FIFTH_USER_ID },
      ],
      messages: [
        {
          userId: THIRD_USER_ID,
          message: 'Спасибо за ссылку!',
        },
      ],
    },
    {
      id: FIFTH_POST_UUID,
      userId: FIFTH_USER_ID,
      type: PostType.quote,
      quoteAuthor: '«Безумный араб» Абдул Альхазред',
      description: 'В обычной живописи, знаешь ли, есть огромнейшая разница между живыми, дышащими вещами, написанными с натуры, и теми вымученными поделками, которые коммерческая мелкая сошка гонит по накатанному в мастерских с голыми стенами.',
      tags: ['books'],
    },
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();

  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        userId: post.userId,
        type: post.type,
        tags: post.tags,
        likes: post.likes ? {
          create: post.likes
        } : undefined,
        messages: post.messages ? {
          create: post.messages
        } : undefined,
        title: post.title,
        description: post.description,
        link: post.link,
        announcement: post.announcement,
        quoteAuthor: post.quoteAuthor,
      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
