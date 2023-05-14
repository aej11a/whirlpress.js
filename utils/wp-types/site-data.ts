export interface SiteData {
  ID: number;
  name: string;
  description: string;
  URL: string;
  jetpack: boolean;
  jetpack_connection: boolean;
  subscribers_count: number;
  lang: boolean;
  icon: Icon;
  logo: Logo;
  visible: any;
  is_private: boolean;
  is_coming_soon: boolean;
  is_following: boolean;
  organization_id: number;
  meta: Meta;
  launch_status: string;
  site_migration: any;
  is_fse_active: boolean;
  is_fse_eligible: boolean;
  is_core_site_editor_enabled: boolean;
  is_wpcom_atomic: boolean;
  is_wpcom_staging_site: boolean;
}

export interface Icon {
  img: string;
  ico: string;
}

export interface Logo {
  id: number;
  sizes: any[];
  url: string;
}

export interface Meta {
  links: Links;
}

export interface Links {
  self: string;
  help: string;
  posts: string;
  comments: string;
  xmlrpc: string;
}
