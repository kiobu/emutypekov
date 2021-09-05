export type TarkovID = string;
export type ItemID = TarkovID;
export type TemplateID = ItemID;

export enum Currency {
  USD = '5696686a4bdc2da3298b456a',
  RUB = '5449016a4bdc2d6f028b456f',
  EUR = '569668774bdc2da2298b4568',
}

export interface Item<T> {
  createItem<T>(): Item<T>;
  _id: ItemID;
  _name: string;
  _parent: ItemID;
  _props: Record<string, unknown>;
  _proto: string;
}
