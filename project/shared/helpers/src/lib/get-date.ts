import dayjs from 'dayjs';

export const getDate = (format = 'YYYY-MM-DD') => {
  return dayjs().format(format);
}
