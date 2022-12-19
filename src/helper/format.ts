import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import i18next from 'i18next';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

export const changeLocale = (locale: string): void => {
  dayjs.locale(locale);
};
export const toLocalStringTime = (date: Date): string => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const requireField = (field: string) => {
  return i18next.t('error.require', {field}) || '';
};

export const formatDate = (
  date: Date | string | number,
  defaultFormat = '',
) => {
  if (!date) {
    return '';
  }
  return `${dayjs(date).format(defaultFormat)}`;
};

export const hexToRgbCode = (hex: string) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
  }
  throw new Error('Bad Hex');
};

export const hexToRgba = (hex: string, opacity: number) => {
  return 'rgba(' + hexToRgbCode(hex).join(',') + ',' + opacity + ')';
};
