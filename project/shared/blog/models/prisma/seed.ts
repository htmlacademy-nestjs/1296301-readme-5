import { PrismaClient } from '../../../../node_modules/.prisma/client'
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

const FIRST_TAG_UUID = '39614113-8093-45b6-7ad5-06455437e1e2';
const SECOND_TAG_UUID = 'efd775e2-a308-4e0e-df55-58249f5ea202';
const THIRD_TAG_UUID = '775e2-a308-4e0e-df55-49f5ea2';

const FIRST_MESSAGE_UUID = '06455437e1e2-8093-45b6-7ad5-39614113';
const SECOND_MESSAGE_UUID = '58249f5ea202-df55-4e0e-a308-efd775e2';
const THIRD_MESSAGE_UUID = 'efd775e2202-ea202-0e4e-a308-58249f5ea';
const FOURTH_MESSAGE_UUID = '5e22645502-75e22-249f-f508-30o6ufd7';

const FIRST_LIKE_UUID = '58249f5ea202-7ad5-b645-8093-efd775e2';
const SECOND_LIKE_UUID = '06455437e1e2-5508-0e4e-a3df-39614113';
const THIRD_LIKE_UUID = '03e305126202-58102-170g-a308-e2030b56';
const FOURTH_LIKE_UUID = '5r353v423t-324f3-3444f4-g456fg-f4fg6h';

function getTags() {
  return [
    { id: FIRST_TAG_UUID, tag: 'путешествия' },
    { id: SECOND_TAG_UUID, tag: 'развлечения' },
    { id: THIRD_TAG_UUID, tag: 'книги' },
  ];
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      userId: FIRST_USER_ID,
      type: PostType.text,
      title: 'Летняя вечеринка',
      description: 'Самая светлая ночь в году!',
      tags: {
        connect: [{ id: FIRST_TAG_UUID }],
      },
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
      tags: {
        connect: [{ id: SECOND_TAG_UUID }],
      },
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
      tags: {
        connect: [{ id: THIRD_TAG_UUID }],
      },
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
      tags: {
        connect: [{ id: THIRD_TAG_UUID }],
      },
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
      tags: {
        connect: [{ id: THIRD_TAG_UUID }],
      },
    },
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTags = getTags();

  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: { id: tag.id, tag: tag.tag }
    });
  }

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
