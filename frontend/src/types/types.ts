export type Character = {
  comics: object;
  description: string;
  events: object;
  id: number;
  name: string;
  resourceURI: string;
  series: object;
  stories: object;
  thumbnail: object;
  urls: object[];
};

export type Pagination = {
  offset: number;
  limit: number;
  total: number;
  count: number;
};
