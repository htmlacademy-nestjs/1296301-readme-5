export enum FileLoaderInfo {
  Uploaded = 'File is uploaded',
  Show = 'Show file path',
}

export const  FileError = {
  FileNotFound : 'File with such id is not found',
  MimetypeError: 'Wrong file mimetype',
  InvalidSize: 'File size is too big',
} as const;

export const MaxImageSizeInByte = {
  Avatar: 512000,
  Photo: 1048576,
} as const;

export const ImageType = {
  Avatar: 'avatar',
  Photo: 'photo',
} as const;

export const ALLOWED_MIMETYPES = ['jpeg','jpg','png'];
