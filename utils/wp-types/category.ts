export interface Category {
  ID: number;
  name: string;
  slug: string;
  description: string;
  post_count: number;
  feed_url: string;
  parent: number;
  meta: Meta;
}

export interface Meta {
  links: Links;
}

export interface Links {
  self: string;
  help: string;
  site: string;
}
