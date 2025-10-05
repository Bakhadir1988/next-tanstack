import { PathType } from './path.type';

export type FaqType = {
  item_id: string;
  __path: PathType[];
  type_id: string | null;
  title: string;
  short_title: string;
  modify_ts: string;
  create_ts: string;
  answer: string;
  enable: string;
  url: string;
  manual_url: string;
  exists_in_lists: string[];
};
