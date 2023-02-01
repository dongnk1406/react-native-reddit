import i18next from 'i18next';
import * as yup from 'yup';

export const REGEX_EMAIL =
  /^(([^<>()[\]\\x.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REGEX_PHONE = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
export const REGEX_PASSWORD = /^[aA-zZ0-9]+$/;
export const REGEX_KATAKANA = /^[\u30A0-\u30FF\u3005]+$/i;
export const REGEX_HASHTAG = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\s]/gi;

export const USERNAME_MIN_LENGTH = 5;
export const USERNAME_MAX_LENGTH = 20;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 32;

export const yupValidate = {
  name: () =>
    yup
      .string()
      .required(() => requireField('name'))
      .trim(i18next.t('error.trimSpace'))
      .strict(true)
      .min(USERNAME_MIN_LENGTH, i18next.t('error.nameLength'))
      .max(USERNAME_MAX_LENGTH, i18next.t('error.nameLength')),

  email: () =>
    yup
      .string()
      .required(i18next.t('error.emailRequired'))
      .email(i18next.t('error.emailInvalid'))
      .matches(REGEX_EMAIL, i18next.t('error.emailInvalid')),

  phone: () =>
    yup
      .string()
      .required(() => requireField('phone'))
      .matches(REGEX_PHONE, i18next.t('error.phoneInvalid')),

  /**
   * @param ref : the name of StyledInputForm want to compare
   * @param isMatchCurrentPassword
   * password() : input password
   * password(ref) : input passwordConfirm, have to be the same with password
   * password(ref, false) : input newPassword, have not to be the same with currentPassword
   */
  password: (ref?: string, isMatchCurrentPassword = true): any => {
    if (ref) {
      // NEW PASSWORD
      if (!isMatchCurrentPassword) {
        return yupValidate
          .password()
          .not([yup.ref(ref), null], i18next.t('error.duplicatePassword'));
      }

      // CONFIRM PASSWORD
      return yup
        .string()
        .required(i18next.t('error.passConfirmRequired'))
        .oneOf([yup.ref(ref), null], i18next.t('error.passwordNotMatch'));
    }

    return yup
      .string()
      .required(i18next.t('error.passRequired'))
      .strict(true)
      .min(PASSWORD_MIN_LENGTH, i18next.t('error.passwordMin'))
      .max(PASSWORD_MAX_LENGTH, i18next.t('error.passwordMax'));
  },

  lastName: () => yup.string().required(i18next.t('common.confirm')),

  firstName: () => yup.string().required('firstName require'),

  message: () => yup.string().required(() => requireField('Message')),

  summary: () => yup.string().required(i18next.t('error.summaryRequired')),
  chapterTitle: () =>
    yup.string().required(i18next.t('error.chapterTitleRequired')),
  artworkTitle: () =>
    yup.string().required(i18next.t('error.artworkTitleRequired')),
  bookCover: () =>
    yup.mixed().nullable().required(i18next.t('error.bookCoverRequired')),
  seriesBanner: () =>
    yup.mixed().nullable().required(i18next.t('error.seriesBannerRequired')),
  genre: () => yup.string().required(i18next.t('error.genreIdRequired')),
  image: () => yup.mixed().nullable().required('This field is required!'),
  bankName: () => yup.string().required(i18next.t('error.required')),
  categoryId: () =>
    yup
      .array()
      .min(1)
      .required(i18next.t('There are not categories for this genre yet')),
  files: () => yup.array(),
};
