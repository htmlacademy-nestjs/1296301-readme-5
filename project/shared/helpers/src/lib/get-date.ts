import dayjs from 'dayjs';

export const getDate = (format = 'DD-MM-YYYY') => {
  return dayjs().format(format);
}
