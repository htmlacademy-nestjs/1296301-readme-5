export enum PostType {
  video = 'video',
  text = 'text',
  quote = 'quote',
  photo = 'photo',
  link = 'link',
}

export const PostTypeValue = {
  Video: 'video',
  Photo: 'photo',
  Link: 'link',
  Quote: 'quote',
  Text: 'text'
} as const;

export type PostTypeValues = typeof PostTypeValue[keyof typeof PostTypeValue];
