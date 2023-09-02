export interface IDictionary {
  navigation: INavigation;
  page: IPage;
}

export interface INavigation {
  home: string;
  blog: string;
  about: string;
}

export interface IPage {
  home: IHome;
  about: IAbout;
  blog: IBlog;
}

export interface IHome {
  title: string;
  titleSpan: string;
  subtitle: string;
  cards: ICard[];
}

export interface ICard {
  title: string;
  subtitle: string;
  link: string;
}

export interface IAbout {
  title: string;
  description: string;
}

export interface IBlog {
  title: string;
  description: string;
}
