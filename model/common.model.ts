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
