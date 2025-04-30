export interface HeaderEntryResponse {
    // entry?: HeaderEntry;
    // // headerData?: HeaderEntry;
    // // fields?: HeaderEntry;
    uid?: string;
    _version: number;
    locale?: string;
    ACL?: Record<string, unknown>;
    // _in_progress: boolean;
    // created_at: string;
    // created_by: string;
    logo?: Asset;
    navigation_menu: NavigationMenuItem[];
    notification_bar: NotificationBar;
    // tags: string[];
    // title: string;
    // updated_at: string;
    // updated_by: string;
    // publish_details: PublishDetails;
  }
  
  // export interface HeaderEntry {
  //   uid?: string;
  //   _version: number;
  //   locale?: string;
  //   ACL?: Record<string, unknown>;
  //   _in_progress: boolean;
  //   created_at: string;
  //   created_by: string;
  //   logo?: Asset;
  //   navigation_menu: NavigationMenuItem[];
  //   notification_bar: NotificationBar;
  //   tags: string[];
  //   title: string;
  //   updated_at: string;
  //   updated_by: string;
  //   publish_details: PublishDetails;
  // }
  
  export interface Asset {
    _version: number;
    is_dir: boolean;
    uid: string;
    ACL: Record<string, unknown>;
    content_type: string;
    created_at: string;
    created_by: string;
    description: string;
    file_size: string;
    filename: string;
    parent_uid: string;
    tags: string[];
    title: string;
    updated_at: string;
    updated_by: string;
    publish_details: PublishDetails;
    url: string;
  }
  
  export interface PublishDetails {
    environment: string;
    locale: string;
    time: string;
    user: string;
  }
  
  export interface NavigationMenuItem {
    label: string;
    _metadata: {
      uid: string;
    };
    page_reference: PageReference[];
  }
  
  export interface PageReference {
    uid: string;
    _content_type_uid: string;
  }
  
  export interface NotificationBar {
    show_announcement: boolean;
    announcement_text: AnnouncementText;
  }
  
  export interface AnnouncementText {
    attrs: Record<string, unknown>;
    children: AnnouncementNode[];
    type: string;
    uid: string;
    _version: number;
  }
  
  export interface AnnouncementNode {
    type: string;
    attrs: Record<string, unknown>;
    children: TextNode[];
    uid: string;
  }
  
  export interface TextNode {
    text: string;
  }
  