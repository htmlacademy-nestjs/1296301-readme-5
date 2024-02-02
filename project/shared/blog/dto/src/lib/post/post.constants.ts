export const PostTitleLength = {
  Min: 20,
  Max: 50,
} as const;

export const PostAnnouncementLength = {
  Min: 50,
  Max: 225,
} as const;

export const TextPostLength = {
  Min: 100,
  Max: 1024,
} as const;

export const QuotePostLength = {
  Min: 20,
  Max: 300,
} as const;

export const PostAuthorLength = {
  Min: 3,
  Max: 50,
} as const;

export const TagDefaultParam = {
  MinLength: 3,
  MaxLength: 10,
  Amount: 8,
} as const;

export const LINK_DESCRIPTION_LENGTH = 300;

export const RegExpPattern = {
  Video: /(?:(?:https?:\/\/)(?:www)?\.?(?:youtu\.?be)(?:\.com)?\/(?:.*[=/])*)([^= &?/\r\n]{8,11})/,
  Tag: /^[A-Za-zА-Яа-я]([A-Za-zА-Яа-я0-9_.])+$/g,
} as const;

export const PostsError = {
  WrongSourse : 'Video link must be from Youtube',
  WrongTagStart : 'Tags should start with digit',
  SpacesInTag:'Tags should not contain spaces',
} as const;
