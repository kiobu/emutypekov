export type LocaleCode = string;

export type MenuLocale = Record<string, any>;
export type GlobalLocale = Record<string, any>;

export type Locale = {
  menu: MenuLocale;
  global: GlobalLocale;
};
