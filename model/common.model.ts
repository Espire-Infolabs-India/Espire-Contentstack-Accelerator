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
    title: string;
    url: string;
  };
}

export interface SEOProps {
  meta_title: string;
  meta_description: string;
  keywords: string[];
  enable_search_indexing: boolean;
  nofollow : boolean;
  noindex : boolean;
  open_graph_description: string;
  open_graph_image: ImageProps;
  open_graph_title: string;
  twitter_image: ImageProps;  
  twitter_description: string;  
  twitter_title: string;
  author: string;
}
