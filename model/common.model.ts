export type PageReference = {
  uid: string;
  title: string;
  url: string;
};


export interface ImageProps {
  url: string;
  title: string;
  filename: string;
}

export interface ImageComponentProps {
  file: {
    uid: string;
    _version: number;
    title: string;
    parent_uid: string;
    created_by: string;
    updated_by: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    content_type: string;
    file_size: string;
    filename: string;
    ACL: Record<string, unknown>;
    is_dir: boolean;
    tags: string[];
    publish_details: {
      time: string; // ISO date string
      user: string;
      environment: string;
      locale: string;
    };
    url: string;
  };
  _metadata: {
    uid: string;
  };
}
